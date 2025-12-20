import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";

// Importing all the page components
import HomePage from "./pages/HomePage";
import Todos from "./pages/Todos";
import Habits from "./pages/Habits";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Importing the components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Guest from "./components/auth/Guest";
import ProtectedRoute from "./components/auth/ProtectedRoute";


// importing toast container
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route element={<Guest />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/todos" element={<Todos />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/events" element={<Events />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
