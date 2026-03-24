import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/authContext";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await register(formData.email, formData.username, formData.password);
      navigate("/login");
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // bg-white au lieu de bg-[#001a41]
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Ajout de border-b-8 et border-r-8 pour l'effet de contour/ombre à droite et en bas */}
      <div className="bg-[#f5f5f5] w-full max-w-md p-10 shadow-2xl border-b-8 border-r-8 border-[#002855]">
        <h1 className="text-[#002855] text-3xl font-bold mb-12 text-center">
          S'inscrire
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 text-sm border-l-4 border-red-500">
              {error}
            </div>
          )}

          {/* Champ Username */}
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Nom d'utilisateur"
            className="w-full bg-[#d9d9d9] py-4 px-6 text-gray-700 placeholder-gray-500 focus:outline-none border-b-2 border-gray-400 focus:border-[#002855] transition-all"
            required
          />

          {/* Champ Email */}
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full bg-[#d9d9d9] py-4 px-6 text-gray-700 placeholder-gray-500 focus:outline-none border-b-2 border-gray-400 focus:border-[#002855] transition-all"
            required
          />

          {/* Champ Mot de passe */}
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Mot de passe"
            className="w-full bg-[#d9d9d9] py-4 px-6 text-gray-700 placeholder-gray-500 focus:outline-none border-b-2 border-gray-400 focus:border-[#002855] transition-all"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#001a41] text-white py-4 text-xl font-bold mt-4 hover:bg-[#002855] active:scale-[0.98] transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "INSCRIPTION..." : "S'inscrire"}
          </button>

          <div className="text-center pt-6 border-t border-gray-300 mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Vous avez déjà un compte ?
            </p>
            <Link
              to="/login"
              className="text-[#002855] font-bold text-lg hover:underline"
            >
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
