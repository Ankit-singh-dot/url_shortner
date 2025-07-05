import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Copy, ExternalLink, Trash2, Calendar, Clock } from "lucide-react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function AllUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:6969/api/url/me");
        const urlData = response.data;

        const transformedUrls = urlData.map((url, index) => {
          let title = `URL ${index + 1}`;
          if (url.longUrl) {
            try {
              const urlObj = new URL(url.longUrl);
              title = urlObj.hostname.replace("www.", "");
            } catch (e) {
              title =
                url.longUrl.length > 30
                  ? url.longUrl.substring(0, 30) + "..."
                  : url.longUrl;
            }
          }

          return {
            id: url.id,
            originalUrl: url.longUrl || "No URL provided",
            shortUrl: `http://localhost:6969/api/url/${url.shortCode}`,
            createdAt: new Date(url.createdAt).toLocaleDateString(),
            clicks: 0, // You can add this field to your API if needed
            title: title,
            shortCode: url.shortCode,
          };
        });

        setUrls(transformedUrls);
      } catch (error) {
        console.error("Failed to fetch URLs", error);
        setUrls([]);
      } finally {
        setLoading(false);
      }
    };
    getMyUrls();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteUrl = (id) => {
    setUrls(urls.filter((url) => url.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-move relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-indigo-400 via-fuchsia-500 to-pink-400 opacity-60 blur-2xl animate-gradient-move" />
      </div>


      <nav className="z-10 relative flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">
          URL Shortener
        </div>
        <div className="flex gap-4">
          <Link to="/">
            <Button
              variant="outline"
              className="transition-all duration-200 hover:scale-105 hover:bg-white hover:text-indigo-600 shadow-md"
            >
              Home
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="default"
              className="transition-all duration-200 hover:scale-105 hover:bg-indigo-600 hover:text-white shadow-lg"
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>


      <main className="z-10 relative px-8 py-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
              Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-400 animate-gradient-move">
                URLs
              </span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Manage and track all your shortened URLs in one place
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">
                {urls.length}
              </div>
              <div className="text-white/80">Total URLs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">
                {urls.reduce((sum, url) => sum + url.clicks, 0)}
              </div>
              <div className="text-white/80">Total Clicks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">
                {urls.length > 0
                  ? Math.round(
                      urls.reduce((sum, url) => sum + url.clicks, 0) /
                        urls.length
                    )
                  : 0}
              </div>
              <div className="text-white/80">Avg. Clicks</div>
            </div>
          </div>


          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/70">Loading your URLs...</p>
            </div>
          )}


          {!loading && (
            <div className="space-y-6">
              {urls.map((url) => (
                <div
                  key={url.id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {url.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30">
                          Active
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 text-sm min-w-[60px]">
                            Original:
                          </span>
                          <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 truncate text-sm"
                          >
                            {url.originalUrl}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-white/60 text-sm min-w-[60px]">
                            Short:
                          </span>
                          <span className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
                            {url.shortUrl}
                          </span>
                        </div>
                      </div>


                      <div className="flex items-center gap-6 mt-4 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{url.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{url.clicks} clicks</span>
                        </div>
                      </div>
                    </div>


                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
                        onClick={() => copyToClipboard(url.shortUrl)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200"
                        onClick={() => window.open(url.shortUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:scale-105 transition-all duration-200"
                        onClick={() => deleteUrl(url.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


          {!loading && urls.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No URLs yet
              </h3>
              <p className="text-white/70 mb-6">
                Start shortening URLs to see them here
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200">
                  Create Your First URL
                </Button>
              </Link>
            </div>
          )}
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
