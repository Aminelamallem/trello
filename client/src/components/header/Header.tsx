import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/authContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
  {/* LOGO */}


  {/* RECHERCHE (Adaptative) */}
  <div className="flex-none gap-2">
   

    {/* UTILISATEUR OU BOUTONS */}
    {user ? (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="user" />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3  p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li><Link to="/profile">Profil</Link></li>
          <li><button onClick={handleLogout} className="text-red-500">Déconnexion</button></li>
        </ul>
      </div>
    ) : (
      <div className="flex gap-1">
        <Link to="/login" className="btn btn-ghost btn-sm">Connexion</Link>
        <Link to="/register" className="btn btn-primary btn-sm">S'inscrire</Link>
      </div>
    )}
  </div>
</div>
  );
}
