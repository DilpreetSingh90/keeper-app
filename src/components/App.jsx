import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect( () =>{
    axios.get("https://keeper-app-back.herokuapp.com").then( res => setNotes(res.data))
    .catch( err => console.log(err));
  }
  ,[notes]);

  function addNote(newNote) {
    axios.post("https://keeper-app-back.herokuapp.com/create", {title: newNote.title, content: newNote.content}).then(
      (response) => {
      setNotes([...notes, {_id: response.data._id, title: response.data.title,
      content:response.data.content}]);
      }); 
  } 

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            _id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
