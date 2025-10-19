import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
const AuthContext = createContext();

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null
};


const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case "LOGOUT":
            localStorage.removeItem("user");
            return { ...state, user: null };
        case "VERIFY_EMAIL":
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        try {
            axios.get('/api/users/check').then(res => {
                let user = res.data
                if (user) {
                    dispatch({ type: "LOGIN", payload: user });
                } else {
                    dispatch({ type: "LOGOUT" });
                }
            })
        } catch (e) {
            dispatch({ type: "LOGOUT" });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthContextProvider };