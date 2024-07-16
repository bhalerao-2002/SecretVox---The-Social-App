import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import XSvg from "../../../components/svgs/X";


const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setMessage(data.error);
      setEmail("");
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
            Update your Password
          </h1>
          {message ? (
            <p className="text-green-500 mb-4">{message}</p>
          ) : (
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdOutlineMail />
              <input
                type="email"
                className="grow"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className={`btn rounded-full btn-primary text-white ${
              message ? "hidden" : ""
            }`}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpass;