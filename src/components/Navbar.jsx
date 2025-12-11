import { NavLink , useNavigate} from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
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
        <span className="username">currentUser</span>
        <button onClick={() => navigate("/login")} className="btn-primary">Logga in </button>
      </div>
    </nav>
  );
};

export default Navbar;
