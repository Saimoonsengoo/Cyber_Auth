import '../index.css'
import { useContext } from 'react'
import App from '../App.jsx'
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import SignupForm from '../pages/SignupForm.jsx';
import SignInForm from '../pages/SignInForm.jsx';
import EmailVerification from '../pages/EmailVerification.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function index() {

    const { user } = useContext(AuthContext);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                //HOME PAGE
                {
                    path: '/',
                    element: user ? ( user.isVerified ? <Home />: <Navigate to='/email-verify' /> ) : <Navigate to='/sign-in' />
                },
                //ABOUT PAGE
                {
                    path: '/about',
                    element: user ? ( user.isVerified? <About />: <Navigate to='/email-verify' /> ) : <Navigate to='/sign-in' />
                },
                // Contact page
                {
                    path: '/contact',
                    element: user ? ( user.isVerified? <Contact />: <Navigate to='/email-verify' /> ) : <Navigate to='/sign-in' />
                },
                {
                    path: '/email-verify',
                    element: user && !user.isVerified ? <EmailVerification /> : <Navigate to='/' />
                },
                {
                    path: '/sign-in',
                    element: !user ? <SignInForm /> : <Navigate to='/' />
                },
                {
                    path: '/sign-up',
                    element: !user ? <SignupForm /> : <Navigate to='/' />
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />
}

