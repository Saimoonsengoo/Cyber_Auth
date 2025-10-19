import React, { useEffect, useRef, useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function EmailVerification() {
    const [code, setCode]       = useState(Array(6).fill(""));
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setError]    = useState(null);
    const { dispatch }          = useContext(AuthContext);
    const inputRefs = useRef([]);
    const navigate  = useNavigate();

    // Handle typing & pasting
    const handleChange = (index, value) => {
        const newCode  = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = code.join("");
        try {
            setLoading(true);
            setError(null);
            const email = localStorage.getItem("userEmail");

            const res = await axios.post(
                "/api/user/verify-email",
                { email, code: otp },
                { withCredentials: true }
            );

            if (res.status === 200) {
                setLoading(false);
                setSuccess(true); //  Show success popup
                dispatch({ type: "VERIFY_EMAIL", payload: res.data.user });

                // Automatically close popup and redirect after 2s
                setTimeout(() => {
                    setSuccess(false);
                    navigate("/");
                }, 2000);
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.errors || "Verification failed");
            console.error("Verification failed", err.response?.data || err.message);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg mt-5 relative">
            {/*  Success Popup */}
            {success && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
                    <div className="bg-white p-6 rounded-xl text-center shadow-lg animate-fadeIn">
                        <CheckCircle className="mx-auto text-green-500 mb-3" size={40} />
                        <h3 className="text-xl font-semibold text-gray-800">Email Verified!</h3>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Verify Your Email
                </h1>
                <p className="text-center text-gray-600 text-sm">
                    We sent a verification code to your email. <br />
                    Please enter it below to activate your account.
                </p>

                <div className="flex justify-center">
                    <Mail className="size-10 text-blue-500" />
                </div>

                {/* OTP Inputs */}
                <div className="flex justify-between gap-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    ))}
                </div>

                {errors && (
                    <p className="text-center text-red-500 text-sm">{errors}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                >
                    {loading && (
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                                5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 
                                5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                    Verify Email
                </button>
            </form>
        </div>
    );
}
