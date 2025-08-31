"use client";
import React from "react";

export default function InputField({ label, type = "text", name, value, onChange, ...rest }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label htmlFor={name} className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
}
