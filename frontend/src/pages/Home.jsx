import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
export default function Home() {
  const [shortened, setShortened] = useState(false);
  const [url, setUrl] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-move relative overflow-hidden">
      {/* Animated Gradient Background */}
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

      {/* Hero Section */}
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-3 rounded-lg shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 text-gray-800 w-72 md:w-96 transition-all duration-200"
          />
          <Button
            size="lg"
            className="ml-0 md:ml-2 px-8 py-3 font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-l cursor-pointer"
            onClick={() => setShortened(true)}
            disabled={!url}
          >
            Shorten URL
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <Button
            size="lg"
            className="px-8 py-4 font-semibold text-lg bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-xl rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-l cursor-pointer"
            disabled={!shortened}
          >
            Redirect URL
          </Button>
          <Button
            size="lg"
            className="px-8 py-4 font-semibold text-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-xl rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-l cursor-pointer"
          >
            Get All My URLs
          </Button>
        </div>
      </main>

      {/* Custom CSS for animated gradient */}
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
