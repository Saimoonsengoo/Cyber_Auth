// src/components/SignInForm.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, CheckCircle } from "lucide-react";
import InputWithIcon from "../components/InputWithIcon";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios";
export default function SignInForm() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [success, setSuccess]   = useState(false);
  const { dispatch } = useContext(AuthContext);
  const Navigate     = useNavigate();

  let signin = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      let data = {
        email,
        password
      }

      let res = await axios.post('/api/user/login', data, { withCredentials: true });
      if (res.status === 200) {
        dispatch({ type: "LOGIN", payload: res.data.user })
        setSuccess(true); //  Show success popup

        // Automatically close popup and redirect after 2s
        setTimeout(() => {
          setSuccess(false);
          if (res.data.user.isVerified) {
            Navigate('/'); // Home if verified
          } else {
            Navigate('/email-verify'); // Go to email verification
          }
        }, 2000);

      }
    } catch (e) {
      setSuccess(false);
      console.log(e);
      setError(e.response.data.msg);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg mt-5">
      {/*  Success Popup */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg animate-fadeIn">
            <CheckCircle className="mx-auto text-green-500 mb-3" size={40} />
            <h3 className="text-xl font-semibold text-gray-800">SingUp Success!</h3>
          </div>
        </div>
      )}

      <form onSubmit={signin} className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500">
          Sign in to continue to Talent Bridge
        </p>

        {/* Email */}
        <InputWithIcon
          icon={Mail}
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}

        {/* Password */}
        <InputWithIcon
          icon={Lock}
          type="password"
          id="password"
          label="Password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Sign In
        </button>

        {/* Redirect to Sign Up */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
