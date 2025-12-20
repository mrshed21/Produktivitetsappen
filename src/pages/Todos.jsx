import { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "./Todos.css";
import { toast } from "react-toastify";

const Todos = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useData();
  const { currentUser } = useAuth();

  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortBy, setSortBy] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");

  const userTodos = useMemo(() => {
    let filtered = todos.filter((t) => t.userId === currentUser);

    if (statusFilter === "completed") {
      filtered = filtered.filter((t) => t.completed);
    } else if (statusFilter === "incomplete") {
      filtered = filtered.filter((t) => !t.completed);
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((t) => categoryFilter.includes(t.category));
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "deadline") {
        comparison =
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortBy === "timeEstimate") {
        comparison = a.timeEstimate - b.timeEstimate;
      } else if (sortBy === "status") {
        comparison = a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [todos, currentUser, statusFilter, categoryFilter, sortBy, sortOrder]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeEstimate: 30,
    category: "övrigt",
    deadline: new Date().toISOString().split("T")[0],
  });

  const categories = ["hälsa", "hushåll", "jobbrelaterat", "nöje", "övrigt"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateTodo(editingId, formData);
      setEditingId(null);
    } else {
      addTodo({ ...formData, completed: false });
    }
    resetForm();
    toast.success("Ärendet har sparats.");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      timeEstimate: 30,
      category: "övrigt",
      deadline: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
  };

  const handleEdit = (todo) => {
    setFormData({
      title: todo.title,
      description: todo.description,
      timeEstimate: todo.timeEstimate,
      category: todo.category,
      deadline: todo.deadline.split("T")[0],
    });
    setEditingId(todo.id);
    setShowForm(true);
  };

  const toggleCategory = (category) => {
    setCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="todos-page">
      <div className="page-header">
        <h1>Ärenden</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? "Stäng" : "+ Nytt ärende"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-row">
            <div className="form-group">
              <label>Titel *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Kategori</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Beskrivning</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tidsestimat (minuter)</label>
              <input
                type="number"
                value={formData.timeEstimate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeEstimate: parseInt(e.target.value) || 0,
                  })
                }
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
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
          <label>Status:</label>
          <div className="filter-buttons">
            <button
              className={statusFilter === "all" ? "active" : ""}
              onClick={() => setStatusFilter("all")}
            >
              Alla
            </button>
            <button
              className={statusFilter === "incomplete" ? "active" : ""}
              onClick={() => setStatusFilter("incomplete")}
            >
              Ej utförda
            </button>
            <button
              className={statusFilter === "completed" ? "active" : ""}
              onClick={() => setStatusFilter("completed")}
            >
              Slutförda
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>Kategorier:</label>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={categoryFilter.includes(cat) ? "active" : ""}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Sortera:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="deadline">Deadline</option>
            <option value="timeEstimate">Tidsestimat</option>
            <option value="status">Status</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="sort-toggle"
          >
            {sortOrder === "asc" ? "↑ Stigande" : "↓ Fallande"}
          </button>
        </div>
      </div>

      <div className="todos-list">
        {userTodos.length === 0 ? (
          <p className="empty-message">Inga ärenden matchar filtren</p>
        ) : (
          userTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.completed ? "completed" : ""}`}
            >
              <div className="todo-header">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) =>
                    updateTodo(todo.id, { completed: e.target.checked })
                  }
                />
                <h3>{todo.title}</h3>
                <span className={`category-badge ${todo.category}`}>
                  {todo.category}
                </span>
              </div>
              <p className="todo-description">{todo.description}</p>
              <div className="todo-meta">
                <span>⏱️ {todo.timeEstimate} min</span>
                <span>
                  📅 {new Date(todo.deadline).toLocaleDateString("sv-SE")}
                </span>
              </div>
              <div className="todo-actions">
                <button onClick={() => handleEdit(todo)} className="btn-edit">
                  Redigera
                </button>
                <button
                  onClick={() => { toast.error("Ärendet har tagits bort.", { closeOnClick: true }); deleteTodo(todo.id); }}
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

export default Todos;
