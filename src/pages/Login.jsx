import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vänligen fyll i alla fält');
      return;
    }

    if (isRegister) {
      const success = register(username, password);
      if (success) {
        setError('');
        alert('Registrering lyckades! Du kan nu logga in.');
        setIsRegister(false);
        setPassword('');
      } else {
        setError('Användarnamn finns redan');
      }
    } else {
      const success = login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Felaktigt användarnamn eller lösenord');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isRegister ? 'Registrera' : 'Logga in'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Användarnamn</label>
            <input
              type="text"
              value={username}
              minLength={3}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ange användarnamn"
            />
          </div>
          <div className="form-group">
            <label>Lösenord</label>
            <input
              type="password"
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ange lösenord"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary">
            {isRegister ? 'Registrera' : 'Logga in'}
          </button>
        </form>
        <p className="toggle-auth">
          {isRegister ? 'Har du redan ett konto?' : 'Har du inget konto?'}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="link-button"
          >
            {isRegister ? 'Logga in här' : 'Registrera här'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
