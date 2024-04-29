import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState("");

  const fetchData = async () => {
    try {
      const URL = "http://localhost:5000/note";
      const response = await axios.get(URL);
      setNotes(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/note", { note: value });
      setValue(""); // Clear the input after submitting
      fetchData(); // Refresh the list of notes
    } catch (error) {
      console.log("Error posting data:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Note box */}
      <h2>Write your confessions here...</h2>
      <div
        className="note_box"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          marginBottom: "20px",
          width: "60%",
        }}
      >
        <textarea
          cols="30"
          rows="10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Submit
        </button>
      </div>

      <div className="confessions">
        <center>
          <u>
            <h2>Confessions</h2>
          </u>
        </center>
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            fontSize: "16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {notes.map((note, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f1f1f1",
                padding: "10px",
                // marginBottom: "2px",
                borderRadius: "5px",
                width: "500px",
              }}
            >
              <p>{`Date: ${note.createdAt}`}</p>
              <li>{note.note}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
