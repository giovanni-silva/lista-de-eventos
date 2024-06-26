import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Importando o arquivo CSS local

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null); // Estado para controlar o evento em edição
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    fetchEvents(); // Busca os eventos quando o componente é montado
  }, []);

  // Função assíncrona para buscar eventos do servidor
  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/events");
    setEvents(res.data);
  };

  // Função para lidar com o envio do formulário de evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // Se estiver editando, realiza uma requisição PUT para atualizar o evento existente
      await axios.put(`http://localhost:5000/events/${editing}`, formData);
    } else {
      // Se não estiver editando, realiza uma requisição POST para adicionar um novo evento
      await axios.post("http://localhost:5000/events", formData);
    }
    setEditing(null); // Limpa o estado de edição
    setFormData({ title: "", date: "", description: "" }); // Limpa o formulário
    fetchEvents(); // Atualiza a lista de eventos
  };

  // Função para preencher o formulário com os dados do evento a ser editado
  const handleEdit = (event) => {
    setEditing(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description,
    });
  };

  // Função para deletar um evento
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/events/${id}`);
    fetchEvents(); // Atualiza a lista de eventos após a exclusão
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Eventos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? "Update" : "Adicionar Evento"}
        </button>
      </form>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item event-item">
            <div className="event-details">
              <h2>{event.title}</h2>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
            <div className="event-actions">
              <button
                className="btn btn-secondary edit"
                onClick={() => handleEdit(event)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger delete"
                onClick={() => handleDelete(event.id)}
              >
                Apagar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
