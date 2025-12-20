import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import './Habits.css';
import { toast } from 'react-toastify';

const Habits = () => {
  const { currentUser } = useAuth();
  const { habits, addHabit, updateHabit, deleteHabit } = useData();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    priority: 'mellan',
  });

  const [priorityFilter, setPriorityFilter] = useState([]);
  const [sortBy, setSortBy] = useState('repetitions');
  const [sortOrder, setSortOrder] = useState('desc');

  const priorities = ['låg', 'mellan', 'hög'];

  const priorityValue = (p) => {
    return { 'låg': 1, 'mellan': 2, 'hög': 3 }[p];
  };

  const userHabits = useMemo(() => {
    let filtered = habits.filter(h => h.userId === currentUser);

    if (priorityFilter.length > 0) {
      filtered = filtered.filter(h => priorityFilter.includes(h.priority));
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'repetitions') {
        comparison = a.repetitions - b.repetitions;
      } else if (sortBy === 'priority') {
        comparison = priorityValue(a.priority) - priorityValue(b.priority);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [habits, currentUser, priorityFilter, sortBy, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit({ ...formData, repetitions: 0 });
    setFormData({ title: '', priority: 'mellan' });
    setShowForm(false);
    toast.success("Rutinen har lagts till.");
  };

  const adjustRepetitions = (id, delta) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      updateHabit(id, { repetitions: Math.max(0, habit.repetitions + delta) });
    }
  };

  const resetRepetitions = (id) => {
    updateHabit(id, { repetitions: 0 });
    toast.success("Antal repetitioner har återställts.");
  };

  const togglePriorityFilter = (priority) => {
    setPriorityFilter(prev =>
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  return (
    <div className="habits-page">
      <div className="page-header">
        <h1>Rutiner</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Stäng' : '+ Ny rutin'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="habit-form">
          <div className="form-row">
            <div className="form-group">
              <label>Titel *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="t.ex. Träning, Läsa bok, Meditera"
                required
              />
            </div>
            <div className="form-group">
              <label>Prioritet</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {priorities.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Lägg till</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
              Avbryt
            </button>
          </div>
        </form>
      )}

      <div className="filters-section">
        <div className="filter-group">
          <label>Prioritet:</label>
          <div className="filter-buttons">
            {priorities.map(p => (
              <button
                key={p}
                className={`priority-${p} ${priorityFilter.includes(p) ? 'active' : ''}`}
                onClick={() => togglePriorityFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Sortera:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="repetitions">Repetitioner</option>
            <option value="priority">Prioritet</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-toggle">
            {sortOrder === 'asc' ? '↑ Stigande' : '↓ Fallande'}
          </button>
        </div>
      </div>

      <div className="habits-grid">
        {userHabits.length === 0 ? (
          <p className="empty-message">Inga rutiner matchar filtren</p>
        ) : (
          userHabits.map(habit => (
            <div key={habit.id} className={`habit-card priority-${habit.priority}`}>
              <div className="habit-header">
                <h3>{habit.title}</h3>
                <span className={`priority-badge priority-${habit.priority}`}>
                  {habit.priority}
                </span>
              </div>
              
              <div className="repetitions-display">
                <span className="rep-count">{habit.repetitions}</span>
                <span className="rep-label">repetitioner</span>
              </div>

              <div className="habit-controls">
                <button onClick={() => adjustRepetitions(habit.id, -1)} className="btn-control">
                  −
                </button>
                <button onClick={() => adjustRepetitions(habit.id, 1)} className="btn-control">
                  +
                </button>
                <button onClick={() => resetRepetitions(habit.id)} className="btn-reset">
                  Nollställ
                </button>
              </div>

              <button onClick={() => { toast.error("Rutinen har tagits bort.", { closeOnClick: true }); deleteHabit(habit.id); }} className="btn-delete">
                Ta bort
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Habits;
