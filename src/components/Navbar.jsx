import { Link, useLocation } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useDarkMode();

  const linkClasses = (path) =>
    `px-3 py-2 rounded hover:bg-blue-600 transition ${
      location.pathname === path ? "bg-blue-700 text-white" : "text-white"
    }`;

  return (
    <nav className="bg-blue-800 text-white fixed top-0 left-0 w-full z-10 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          🎬 <Link to="/">Informações de Filmes</Link>
        </h1>
        <div className="flex gap-4">
          <Link to="/" className={linkClasses("/")}>Home</Link>
          <Link to="/favoritos" className={linkClasses("/favoritos")}>Favoritos</Link>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;