import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/authContext";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001a41]">
        <div className="w-12 h-12 border-4 border-[#f5f5f5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001a41] p-4">
        <div className="bg-[#f5f5f5] w-full max-w-md p-10 shadow-2xl text-center">
          <p className="text-[#002855] font-bold mb-6 uppercase">
            Vous devez être connecté pour voir cette page.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-[#001a41] text-white py-4 font-bold hover:bg-[#002855] transition-all uppercase"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001a41] p-4">
      <div className="bg-[#f5f5f5] w-full max-w-md p-10 shadow-2xl">
        <h1 className="text-[#002855] text-3xl font-bold mb-12 text-center uppercase tracking-tight">
          Mon Profil
        </h1>

        <div className="flex flex-col gap-8">
          {/* Section Nom d'utilisateur */}
          <div className="border-b-2 border-[#d9d9d9] pb-2">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Nom d'utilisateur
            </span>
            <span className="text-xl text-[#001a41] font-medium">
              {user.username}
            </span>
          </div>

          {/* Section Email */}
          <div className="border-b-2 border-[#d9d9d9] pb-2">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Adresse Email
            </span>
            <span className="text-xl text-[#001a41] font-medium">
              {user.email}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full border-2 border-[#001a41] text-[#001a41] py-3 font-bold hover:bg-[#001a41] hover:text-white transition-all uppercase text-sm"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}
