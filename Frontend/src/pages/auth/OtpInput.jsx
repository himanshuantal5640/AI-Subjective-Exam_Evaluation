import React from "react";
import { useRef } from "react";

const OtpInput = ({ setOtp }) => {

  const inputs = useRef([]);

  const handleChange = (value, index) => {

    if (!/^\d?$/.test(value)) return;

    inputs.current[index].value = value;

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    const otpValue = inputs.current
      .map(input => input.value)
      .join("");

    setOtp(otpValue);
  };

  return (
    <div className="flex justify-center gap-3 mb-6">

      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          ref={el => inputs.current[index] = el}
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          className="w-12 h-12 text-center text-xl
          rounded-lg bg-white/30
          focus:ring-2 focus:ring-white
          outline-none transition"
        />
      ))}

    </div>
  );
};

export default OtpInput;
