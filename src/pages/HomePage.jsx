import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { quote, fetchQuote, todos, habits, events } = useData();
  const [loading, setLoading] = useState(false);

  const handleUpdateQuote = () => {
    setLoading(true);
    setTimeout(() => {
      fetchQuote();
      setLoading(false);
    }, 2000);
  };

  const userTodos = todos.filter((t) => t.userId === currentUser);
  const incompleteTodos = userTodos
    .filter((t) => !t.completed)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .slice(0, 3);

  const userHabits = habits.filter((h) => h.userId === currentUser);
  const topHabits = [...userHabits]
    .sort((a, b) => b.repetitions - a.repetitions)
    .slice(0, 3);

  const userEvents = events.filter((e) => e.userId === currentUser);
  const now = new Date();
  const upcomingEvents = userEvents
    .filter((e) => new Date(e.start) >= now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 3);
  console.log(quote);


 if (!currentUser) {
    return (
      <div className="dashboard guest-home-page">
        <div className="guest-hero">
          <h1>Välkommen till din nya produktiva vardag!</h1>
          <p className="guest-subtitle">
            Samla dina ärenden, rutiner och händelser på ett och samma ställe.
            Få ordning på kaoset och nå dina mål snabbare.
          </p>

          {quote && (
            <div className="quote-box guest-quote">
              <p className="quote-text">"{quote.content}"</p>
              <p className="quote-author">- {quote.author}</p>
            </div>
          )}

          <div className="guest-cta">
            <p>Redo att ta kontroll?</p>
            <Link to="/login" className="cta-button">
              Kom igång nu
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="home-page">
      <div className="welcome-section">
        {currentUser && <h1>Välkommen, {currentUser}!</h1>}
        {quote && (
          <div className="quote-box">
            <p className="quote-text">"{quote.content}"</p>
            <p className="quote-author">- {quote.author}</p>
            <button
              disabled={loading}
              onClick={handleUpdateQuote}
              className="refresh-btn"
            >
              🔄️
            </button>
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        <section className="home-page-card">
          <div className="card-header">
            <h2>Senaste ärenden</h2>
            <Link to="/todos" className="view-all-link">
              Visa alla →
            </Link>
          </div>

          {incompleteTodos.length > 0 ? (
            <ul className="preview-list">
              {incompleteTodos.map((todo) => (
                <li key={todo.id} className="preview-item">
                  <span className="preview-title">{todo.title}</span>
                  <span className="preview-meta">
                    {new Date(todo.deadline).toLocaleDateString("sv-SE")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">Inga ärenden ännu</p>
          )}
        </section>

        <section className="home-page-card">
          <div className="card-header">
            <h2>Topp rutiner</h2>
            <Link to="/habits" className="view-all-link">
              Visa alla →
            </Link>
          </div>
          {topHabits.length > 0 ? (
            <ul className="preview-list">
              {topHabits.map((habit) => (
                <li key={habit.id} className="preview-item">
                  <span className="preview-title">{habit.title}</span>
                  <span className="preview-meta badge">
                    {habit.repetitions} ggr
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">Inga rutiner ännu</p>
          )}{" "}
        </section>

        <section className="home-page-card">
          <div className="card-header">
            <h2>Kommande händelser</h2>
            <Link to="/events" className="view-all-link">
              Visa alla →
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <ul className="preview-list">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="preview-item">
                  <span className="preview-title">{event.name}</span>
                  <span className="preview-meta">
                    {new Date(event.start).toLocaleDateString("sv-SE")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">Inga kommande händelser</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
