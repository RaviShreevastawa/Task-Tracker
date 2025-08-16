import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login(form));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white border rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg w-full transition duration-200"
        >
          Login
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
