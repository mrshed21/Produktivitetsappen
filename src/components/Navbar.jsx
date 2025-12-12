import { NavLink , useNavigate} from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const { currentUser, logout } = useAuth();

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
        <h2>📋 Produktivitetsappen</h2>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-user">
        {currentUser &&
        <span className="username">Hej {currentUser}</span>
        }
        {currentUser ? (
          <button onClick={logout} className="btn-logout">
            Logga ut
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="btn-primary">Logga in </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
