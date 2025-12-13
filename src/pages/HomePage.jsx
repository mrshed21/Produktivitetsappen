import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { quote, fetchQuote } = useData();
  const [loading, setLoading] = useState(false);





  const handleUpdateQuote = () => {
    setLoading(true);
    setTimeout(() => {
      fetchQuote();
      setLoading(false);
    }, 2000);
  };



  
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Välkommen, {currentUser}!</h1>
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
           
            <p className="empty-message">Inga ärenden ännu</p>
        
        </section>

        <section className="home-page-card">
          <div className="card-header">
            <h2>Topp rutiner</h2>
            <Link to="/habits" className="view-all-link">
              Visa alla →
            </Link>
          </div>
           
            <p className="empty-message">Inga rutiner ännu</p>
        
        </section>

        <section className="home-page-card">
          <div className="card-header">
            <h2>Kommande händelser</h2>
            <Link to="/events" className="view-all-link">
              Visa alla →
            </Link>
          </div>
          
            <p className="empty-message">Inga kommande händelser</p>
          
        </section>
      </div>
    </div>
  );
};

export default HomePage;
