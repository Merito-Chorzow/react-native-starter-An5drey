import React, { useState } from "react";

function AddPage() {
  const [text, setText] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Twoja przeglądarka nie obsługuje geolokalizacji.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(5));
        setLongitude(pos.coords.longitude.toFixed(5));
      },
      (err) => alert("Błąd lokalizacji: " + err.message)
    );
  };

  const saveNote = () => {
    if (!text || !latitude || !longitude) {
      alert("Wypełnij wszystkie pola.");
      return;
    }

    const newNote = {
      id: Date.now(),
      text,
      latitude,
      longitude,
      date: new Date().toLocaleString("pl-PL"),
    };

    const existing = JSON.parse(localStorage.getItem("notes") || "[]");
    localStorage.setItem("notes", JSON.stringify([...existing, newNote]));

    alert("Zapisano wspomnienie 💛");
    setText("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <div className="page">
      <h2>Dodaj nowe wspomnienie</h2>
      <textarea
        placeholder="Napisz, co czujesz..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="coords">
        <input
          type="text"
          placeholder="Szerokość"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Długość"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={getLocation}>Twoje współrzędne 📍</button>
      </div>
      <button className="btn" onClick={saveNote}>
        Zapisz
      </button>
    </div>
  );
}

export default AddPage;