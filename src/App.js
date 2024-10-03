import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [artists, setArtists] = useState("");
  const [songs, setSongs] = useState("");
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await axios.get(
          `https://api.lyrics.ovh/v1/${artists}/${songs}`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setLyrics(data.lyrics);
      } catch (e) {
        console.error(e);
      }
    };

    fetchLyrics();
  }, [artists, songs]);

  return (
  <div className="flex flex-col justify-center content-center">
      <h1 className="text-xl font-serif font-bold">Find Lyrics</h1>
      <div>
      <input type="text" placeholder="Artist Name" onChange={(e) => {setArtists(e.target.value)}}/>
      <input type="text" placeholder="Song Title" onChange={(e) => {setSongs(e.target.value)}}/>
      </div>
      <p>{lyrics}</p>
  </div>
  );
    
  
}

export default App;
