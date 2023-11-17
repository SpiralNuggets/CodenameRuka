// Register.tsx

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

interface LoginFormValues {
  email: string;
  password: string;
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // Implement your password validation logic here
    // For a simple example, checking if it has at least 6 characters
    return password.length >= 6;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail()) {
      setError("Invalid email address");
      return;
    }
    if (!validatePassword()) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-8 items-center">
        <div>
          <h1 className="text-4xl text-white font-medium">Codename Ruka</h1>
        </div>
        <div className="w-64 sm:w-80 md:w-[30rem] bg-neutral-300 rounded-lg flex flex-col items-center px-6 pb-6 pt-2 gap-6">
          <form onSubmit={handleFormSubmit} className="w-full space-y-6">
            <div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-black text-base">Email Address</span>
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered bg-white !outline-neutral-500 shadow"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-black text-base">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered bg-white !outline-neutral-500 shadow"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                </div>
                <div className="form-control">
                <label className="label">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered bg-white !outline-neutral-500 shadow"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                </div>
            </div>
            <button className="btn w-full bg-[#28507d] hover:bg-[#1b2e49] border-2 text-white" type="submit">
              Sign up
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
