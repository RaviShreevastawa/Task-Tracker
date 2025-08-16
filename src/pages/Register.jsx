// src/pages/Register.jsx
import { useDispatch } from "react-redux";
import { register } from "../store/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullname: "", username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullname || !form.username || !form.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      dispatch(register(form));
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-blue-800 to-blue-400 w-full max-w-md p-8 rounded-2xl shadow-lg border"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Choose a username"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter a strong password"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Register
        </button>

        {/* Link to login */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
