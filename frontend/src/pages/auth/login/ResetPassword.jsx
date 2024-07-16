import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import XSvg from "../../../components/svgs/X";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const token = searchParams.get("token");
      const response = await fetch(`/api/auth/setpass?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      setMessage(data.msg);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg width="60%" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <div className="w-24 h-24 mb-4 ml-16 lg:hidden">
            <img
              src="https://res.cloudinary.com/df9i867uq/image/upload/v1720737455/Imp%20Data/inq4que3umnyrwu3xovh.jpg"
              alt="logo"
            />
          </div>
          <h1 className="text-4xl font-extrabold my-6 text-white mb-2">
            Reset Password
          </h1>
          {message ? (
            <p className="text-green-500 mb-4">{message}</p>
          ) : (
            <>
              <label className="input input-bordered rounded flex items-center gap-2">
                <MdPassword />
                <input
                  type="password"
                  className="grow"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label className="input input-bordered rounded flex items-center gap-2">
                <MdPassword />
                <input
                  type="password"
                  className="grow"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                className="btn rounded-full btn-primary text-white"
                type="submit"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;