import  { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};





// AuthProvider component 
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(storedCurrentUser);
    }
  }, []);

  const register = (username, password) => {
    if (users.find(u => u.username === username)) {
      return false;
    }
    const newUsers = [...users, { username, password }];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    return true;
  };

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(username);
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
