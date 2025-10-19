// src/pages/SignupForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, CheckCircle } from "lucide-react";
import InputWithIcon from "../components/InputWithIcon";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import axios from "../helpers/axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignUpForm() {
  const [name, setName]    = useState("");
  const [email, setEmail]  = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError]    = useState(null);
  const [success, setSuccess]   = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaToken, setCaptchaToken]       = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    //Validate captcha
    if (!captchaToken) {
      setError("Please complete the captcha!");
      return;
    }

    //Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    const data = { name, email, password, captchaToken };
    console.log("Signup payload:", data); // Debug

    try {
      const res = await axios.post('/api/user/signup', data, { withCredentials: true });

      if (res.status === 200) {
        setLoading(false);
        setSuccess(true);

        // Save user info and redirect
        setTimeout(() => {
          setSuccess(false);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userName", name);
          navigate('/sign-in');
        }, 3000);
      }
    } catch (e) {
      setLoading(false);
      setError(e.response?.data?.msg || "Signup failed!");
    }
  };


  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg mt-5">
      {/*  Success Popup */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl z-10 animate-fadeIn">
          <div className="bg-white p-6 rounded-xl text-center shadow-xl transform transition-all duration-300 scale-105">
            <CheckCircle className="mx-auto text-green-500 mb-3" size={40} />
            <h3 className="text-xl font-semibold text-gray-800">SignUp Successful!</h3>
          </div>
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <InputWithIcon
          icon={User}
          id="name"
          label="Username"
          placeholder="Enter username..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputWithIcon
          icon={Mail}
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputWithIcon
          icon={Lock}
          type="password"
          id="password"
          label="Password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputWithIcon
          icon={Lock}
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPassword == password ? null : <p className="text-red-500 font-semibold mt-2">Please make same Password</p>}
        {errors && <p className="text-red-500 font-semibold mt-2">{errors}</p>}

        <PasswordStrengthMeter password={password} />

        {/* reCaptcha */}
        <div className="mt-4 flex justify-center">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_GOOGLE_API_KEY}
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center"
        >
          {loading && <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>}
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
