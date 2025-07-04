import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  async function handleLogin(e) {
    try {
      e.preventDefault();
      const data = await axios.post(
        "http://localhost:6969/api/auth/login",
        input
      );
      toast.success("Logged-IN");
      navigate("/");
      console.log(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleLogin}
          action=""
          className="w-1/2 border border-red-900 rounded-xl p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-2">
            <Label className="mb-1">E-mail</Label>
            <Input
              type="text"
              placeholder="Johndoe@gmail.com"
              value={input.email}
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
            Login
          </Button>
          <p className="mt-2 text-red-800">
            No account ? create new account{" "}
            <Link className="text-black" to={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
