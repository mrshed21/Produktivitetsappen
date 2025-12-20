import { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "./Events.css";
import { toast } from "react-toastify";

const Events = () => {
  const { currentUser } = useAuth();
  const { events, addEvent, updateEvent, deleteEvent } = useData();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
  });

  const [timeFilter, setTimeFilter] = useState("all");

  const now = new Date();

  const userEvents = useMemo(() => {
    let filtered = events.filter((e) => e.userId === currentUser);

    if (timeFilter === "upcoming") {
      filtered = filtered.filter((e) => new Date(e.start) >= now);
    } else if (timeFilter === "past") {
      filtered = filtered.filter((e) => new Date(e.start) < now);
    }

    filtered.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    return filtered;
  }, [events, currentUser, timeFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.start || !formData.end) return;
    if (new Date(formData.start) > new Date(formData.end)) {
      toast.error("Startdatum måste vara före slutdatum.");
      return;
    }
    if (new Date(formData.start) < now) {
      toast.error("Startdatum måste vara i framtiden.");
      return;
    }

    if (editingId) {
      updateEvent(editingId, formData);
      setEditingId(null);
    } else {
      addEvent(formData);
    }
    resetForm();
    toast.success("Händelsen har sparats.");
  };

  const resetForm = () => {
    setFormData({ name: "", start: "", end: "" });
    setShowForm(false);
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      start: event.start,
      end: event.end,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    toast.error("Händelsen har tagits bort.", { closeOnClick: true });
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("sv-SE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPast = (event) => new Date(event.end) < now;

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>Händelser</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? "Stäng" : "+ Ny händelse"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Namn på händelse *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start (datum & tid) *</label>
              <input
                type="datetime-local"
                value={formData.start}
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) =>
                  setFormData({ ...formData, start: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Slut (datum & tid) *</label>
              <input
                type="datetime-local"
                value={formData.end}
                min={formData.start}
                onChange={(e) =>
                  setFormData({ ...formData, end: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? "Uppdatera" : "Lägg till"}
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">
              Avbryt
            </button>
          </div>
        </form>
      )}

      <div className="filters-section">
        <div className="filter-group">
          <label>Visa:</label>
          <div className="filter-buttons">
            <button
              className={timeFilter === "all" ? "active" : ""}
              onClick={() => setTimeFilter("all")}
            >
              Alla händelser
            </button>
            <button
              className={timeFilter === "upcoming" ? "active" : ""}
              onClick={() => setTimeFilter("upcoming")}
            >
              Kommande
            </button>
            <button
              className={timeFilter === "past" ? "active" : ""}
              onClick={() => setTimeFilter("past")}
            >
              Tidigare
            </button>
          </div>
        </div>
      </div>

      <div className="events-list">
        {userEvents.length === 0 ? (
          <p className="empty-message">Inga händelser matchar filtren</p>
        ) : (
          userEvents.map((event) => (
            <div
              key={event.id}
              className={`event-card ${isPast(event) ? "past-event" : ""}`}
            >
              <div className="event-header">
                <h3>{event.name}</h3>
                {isPast(event) && <span className="past-badge">Tidigare</span>}
              </div>
              <div className="event-time">
                <div className="time-row">
                  <span className="time-label">Start:</span>
                  <span>{formatDateTime(event.start)}</span>
                </div>
                <div className="time-row">
                  <span className="time-label">Slut:</span>
                  <span>{formatDateTime(event.end)}</span>
                </div>
              </div>
              <div className="event-actions">
                <button onClick={() => handleEdit(event)} className="btn-edit">
                  Redigera
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="btn-delete"
                >
                  Ta bort
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
