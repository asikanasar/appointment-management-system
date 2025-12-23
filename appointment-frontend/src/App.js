import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    purpose: ""
  });

  // Load all appointments
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    axios.get("http://localhost:8080/appointments")
      .then(res => setAppointments(res.data));
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create or Update appointment
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId === null) {
      // CREATE
      axios.post("http://localhost:8080/appointments", formData)
        .then(() => {
          loadAppointments();
          resetForm();
        });
    } else {
      // UPDATE
      axios.put(`http://localhost:8080/appointments/${editingId}`, formData)
        .then(() => {
          loadAppointments();
          resetForm();
          setEditingId(null);
        });
    }
  };

  // Delete appointment
  const deleteAppointment = (id) => {
    axios.delete(`http://localhost:8080/appointments/${id}`)
      .then(() => loadAppointments());
  };

  // Edit appointment (load data into form)
  const editAppointment = (a) => {
    setEditingId(a.id);
    setFormData({
      name: a.name,
      email: a.email,
      appointmentDate: a.appointmentDate,
      appointmentTime: a.appointmentTime,
      purpose: a.purpose
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      purpose: ""
    });
  };

  return (
    <div className="container">
      <h1>Appointment Management</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Appointment" : "New Appointment"}</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          required
        />

        <input
          name="purpose"
          placeholder="Purpose of Appointment"
          value={formData.purpose}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary">
          {editingId ? "Update Appointment" : "Save Appointment"}
        </button>
      </form>

      <div className="list-card">
        <h2>Appointments List</h2>

        {appointments.length === 0 && (
          <p className="empty-text">No appointments available</p>
        )}

        {appointments.map(a => (
          <div className="appointment-item" key={a.id}>
            <div className="info">
              <strong>{a.name}</strong>
              <span>{a.purpose}</span>
              <small>
                {a.appointmentDate} | {a.appointmentTime}
              </small>
            </div>

            <div className="actions">
              <button
                className="btn-edit"
                onClick={() => editAppointment(a)}
              >
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => deleteAppointment(a.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
