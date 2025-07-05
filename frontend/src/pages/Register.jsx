import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "../config/api";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post(API_ENDPOINTS.SIGNUP, input);
      toast.success("Account created Successfully");
      console.log(data);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={changeEventHandler}
          action=""
          className="w-1/2 border border-red-900 rounded-xl p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Register</h1>

          <div className="my-2 ">
            <Label className="mb-1">Email</Label>
            <Input
              type="text"
              placeholder="Johndoe@gmail.com"
              value={input.emailId}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            ></Input>
          </div>
          <div className="my-2 ">
            <Label className="mb-1">Password</Label>
            <Input
              type="Password"
              placeholder="**********"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            ></Input>
          </div>

          <Button className="block w-full mt-3 rounded-md text-white">
            Submit
          </Button>
          <p className="mt-2 text-red-800">
            Already have an account ?{" "}
            <Link className="text-black" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
