import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

// Importing all the page components
import HomePage from "./pages/HomePage";
import Todos from "./pages/Todos";
import Habits from "./pages/Habits";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Importing the Navbar component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
