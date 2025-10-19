// src/components/InputWithIcon.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputWithIcon({
  icon: Icon,
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  label,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        {/* Left Icon */}
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
        )}

        {/* Input */}
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
        />

        {/* Password toggle (eye icon) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>
    </div>
  );
}
