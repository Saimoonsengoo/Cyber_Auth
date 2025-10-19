// src/components/PasswordStrengthMeter.jsx
import React from "react";
import { Check, X } from "lucide-react";

function PasswordCriteria({ password }) {
  const criteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item, idx) => (
        <div key={idx} className="flex items-center text-sm">
          {item.met ? (
            <Check className="text-green-500 size-4 mr-2" />
          ) : (
            <X className="text-gray-400 size-4 mr-2" />
          )}
          <span className={item.met ? "text-green-600" : "text-gray-500"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PasswordStrengthMeter({ password }) {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"][strength] || "Very Weak";
  const colors = ["bg-red-500", "bg-red-400", "bg-yellow-500", "bg-yellow-400", "bg-green-500"];

  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm mb-1">
        <span>Password strength:</span>
        <span className="font-medium">{strengthText}</span>
      </div>

      {/* Progress bars */}
      <div className="flex space-x-1 mb-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < strength ? colors[strength] : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
}
