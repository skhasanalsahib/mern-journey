import { useState } from "react";
import initialArtist from "../data/artist-data";

export default function ArrayOfObjListDelete() {
  const [artists, setArtists] = useState(initialArtist);

  // add hasan
  const addHasan = () => {
    const hasan = { id: artists.length, name: "Hasan" };
    // artists.push(hasan);

    setArtists([...artists, hasan]);
  };

  // delete artist
  const deleteArtist = (id) => {
    const filteredArray = artists.filter((artist) => artist.id !== id);
    setArtists(filteredArray);
  };

  return (
    <div>
      <button onClick={addHasan}>Add Hasan</button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{" "}
            <button
              onClick={() => {
                deleteArtist(artist.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
