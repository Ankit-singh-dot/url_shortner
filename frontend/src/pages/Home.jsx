import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Home() {
  const [shortened, setShortened] = useState({
    longUrl: "",
  });
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showUrl, setShowUrl] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post(
        "https://url-shortner-rho-one.vercel.app/api/url/",
        shortened
      );
      console.log(data);
      setRedirectUrl(`https://url-shortner-rho-one.vercel.app${data.data.shortUrl}`);
      setShowUrl(`https://url-shortner-rho-one.vercel.app${data.data.shortUrl}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to shorten URL. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-move relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-indigo-400 via-fuchsia-500 to-pink-400 opacity-60 blur-2xl animate-gradient-move" />
      </div>

      <nav className="z-10 relative flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">
          URL Shortener
        </div>
        <div className="flex gap-4">
          <div>
            <Link to={"/login"}>
              <Button
                variant="outline"
                className="transition-all duration-200 hover:scale-105 hover:bg-white hover:text-indigo-600 shadow-md cursor-pointer"
              >
                Login
              </Button>
            </Link>
          </div>
          <div>
            <Link to={"/register"}>
              <Button
                variant="default"
                className="transition-all duration-200 hover:scale-105 hover:bg-indigo-600 hover:text-white shadow-lg cursor-pointer"
              >
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="z-10 relative flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
          Shorten, Share,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-400 animate-gradient-move">
            Simplify
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Instantly turn long links into short, memorable URLs. Fast, secure,
          and easy to use.
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={shortened.longUrl}
            onChange={(e) =>
              setShortened({ ...setShortened, longUrl: e.target.value })
            }
            className="px-4 py-3 rounded-lg shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 text-gray-800 w-72 md:w-96 transition-all duration-200"
          />
          <Button
            size="lg"
            className="ml-0 md:ml-2 px-8 py-3 font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-l cursor-pointer"
            onClick={handleSubmit}
          >
            Shorten URL
          </Button>
        </div>
        <div>
          <input
            type="text"
            value={showUrl}
            placeholder="shortULR"
            readOnly
            onClick={() => {
              navigator.clipboard.writeText(showUrl);
              toast.success("Short URL copied to clipboard!");
            }}
            className="border w-56 h-7 rounded-lg mb-4 pl-1.5 pr-1.5 text-center"
          ></input>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <Button
            size="lg"
            className="px-8 py-4 font-semibold text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-xl rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-l cursor-pointer"
            disabled={!redirectUrl}
            onClick={() => window.open(redirectUrl, "_blank")}
          >
            Redirect URL
          </Button>
          <Link to={"/getAllUrl"}>
            <Button
              size="lg"
              className="px-8 py-4 font-semibold text-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-xl rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-l cursor-pointer"
            >
              Get All My URLs
            </Button>
          </Link>
        </div>
      </main>

      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
