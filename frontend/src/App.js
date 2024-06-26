import React from "react";
import EventList from "./components/EventList";
import "./App.css"; // Importando o arquivo CSS local

function App() {
  return (
    <div className="App">
      <EventList /> {/* Renderiza o componente EventList */}
    </div>
  );
}

export default App;
