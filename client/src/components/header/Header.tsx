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
    <nav className="bg-[#f5f5f5] border-b-4 border-[#001a41] px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Style Thème */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-[#001a41] text-2xl font-black uppercase tracking-tighter"
          >
            Fake <span className="bg-[#001a41] text-white px-1">Trello</span>
          </Link>
        </div>

        {/* Barre de recherche style Input Thème */}

        {/* Actions Utilisateur */}
        <div className="flex-1 flex justify-end items-center gap-6">
          {user ? (
            <div className="group relative">
              <button
                className="flex items-center gap-3 focus:outline-none py-1 border-b-2 border-transparent hover:border-[#001a41] transition-all"
                type="button"
              >
                <span className="hidden sm:block text-[#001a41] font-bold text-sm uppercase">
                  {user.username}
                </span>
              </button>

              {/* Dropdown Menu Style Thème */}
              <div className="absolute right-0 w-48 mt-2 bg-[#f5f5f5] shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-[#001a41] font-bold text-xs uppercase hover:bg-[#d9d9d9] transition-colors"
                >
                  Mon Profil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 font-bold text-xs uppercase hover:bg-red-50 transition-colors border-t border-gray-200"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-[#001a41] font-bold text-sm uppercase hover:underline"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-[#001a41] text-white px-5 py-2 font-bold text-sm uppercase hover:bg-[#002855] transition-all shadow-md"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
