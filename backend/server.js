const express = require("express");
const cors = require("cors");
const { get } = require("mongoose");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let events = [];

// Rota para obter todos os eventos
app.get("/events", (req, res) => {
  res.json(events);
});

// Rota para adicionar um novo evento
app.post("/events", (req, res) => {
  const newEvent = { id: Date.now().toString(), ...req.body };
  events.push(newEvent);
  res.json(newEvent);
  console.log("Evento Novo", newEvent);
});

// Rota para atualizar um evento existente
app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const index = events.findIndex((event) => event.id === id);
  if (index !== -1) {
    events[index] = { id, ...req.body };
    res.json(events[index]);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
  console.log("Update", events);
});

// Rota para deletar um evento
app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  events = events.filter((event) => event.id !== id);
  res.json({ message: "Event deleted" });
  console.log("Evento Apagado", id);
});

//Inicia o servidor na porta especifica
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
