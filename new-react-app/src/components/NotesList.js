import React from "react";
import { Link } from "react-router-dom";

function NotesList() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  return (
    <div className="page">
      <h2>Twoje wspomnienia</h2>
      {notes.length === 0 ? (
        <p>Brak zapisanych wspomnień.</p>
      ) : (
        notes.map((n) => (
          <div key={n.id} className="note-item">
            <p>{n.text}</p>
            <p>
              📍 {n.latitude}, {n.longitude}
            </p>
            <Link className="details" to={`/details/${n.id}`}>
              Zobacz
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default NotesList;
