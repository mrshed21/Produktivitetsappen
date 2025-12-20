import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/logo.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const navItems = [
    { name: "Startsida", path: "/" },
    { name: "Ärenden", path: "/todos" },
    { name: "Rutiner", path: "/habits" },
    { name: "Händelser", path: "/events" },
  ];
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="logo" onClick={() => navigate("/")}>
          <img style={{ width: "60px" }} src={Logo} alt="Logo" />
          <h2>Produktivitetsappen</h2>
        </div>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-user">
        {currentUser && <span className="username">{currentUser}</span>}
        {currentUser ? (
          <button onClick={() => { toast.info("Du har loggat ut.", { closeOnClick: true }); logout(); }} className="btn-logout">
            Logga ut
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="btn-primary">
            Logga in{" "}
          </button>
        )}
      </div>

      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </button>
    </nav>
  );
};

export default Navbar;
