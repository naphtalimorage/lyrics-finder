import React from "react";
import "./index.css";
import { useState } from "react";

function App() {
  const [artists, setArtists] = useState("");
  const [songs, setSongs] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLyrics = async () => {
    if (artists === "" || songs === "") {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artists}/${songs}`
      );
      if (response.status === 404) {
        throw new Error("No lyrics found for the given artist and song.");
      } else if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.lyrics) {
        throw new Error("No lyrics found for the given artist and song.");
      }
      setLyrics(data.lyrics);
    } catch (e) {
      setError("No lyrics found for the given artist and song", e);
    } finally {
      setLoading(false);
      setError("");
    }
  };

  return (
    <div className="flex flex-col justify-center ml-auto mr-auto content-cente w-[700px] mt-20 shadow-2xl mb-20">
      <h1 className="text-2xl font-serif font-bold text-center mb-6 mt-10">
        Find Lyrics
      </h1>
      <div className="flex flex-row gap-5 justify-center items-center">
        <input
          type="text"
          placeholder="Artist Name"
          className="rounded w-60 h-10 text-sm px-2 border"
          onChange={(e) => {
            setArtists(e.target.value);
          }}
        />
        <input
          type="text"
          className="rounded w-60 h-10 text-sm px-2 border "
          placeholder="Song Title"
          onChange={(e) => {
            setSongs(e.target.value);
          }}
        />
      </div>
      <div className="flex  justify-center mt-10 mb-10">
        <button
          onClick={() => fetchLyrics()}
          className=" w-52 h-8 rounded  bg-lime-600 text-white hover:bg-lime-700"
        >
          Search
        </button>
      </div>
      <hr />
      {lyrics && <pre className="text-black text-center mt-6 mb-10">{lyrics}</pre>}
      {loading && <p className="text-center mt-3 mb-3">Loading...</p>}
      {error && <p className="text-red-600 text-center mt-3 mb-3 ">{error}</p>}
    </div>
  );
}

export default App;
