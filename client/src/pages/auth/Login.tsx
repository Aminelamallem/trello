import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/authContext";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fond de page blanc
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Formulaire avec bordure bleue en bas et à droite (effet ombre) */}
      <div className="bg-[#f5f5f5] w-full max-w-md p-10 border-b-8 border-r-8 border-[#002855] shadow-sm">
        <h1 className="text-[#002855] text-3xl font-bold mb-12 text-center">
          Se connecter
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 text-sm border-l-4 border-red-500">
              {error}
            </div>
          )}

          {/* Champ Email */}
          <div className="relative">
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
          </div>

          {/* Champ Mot de passe */}
          <div className="relative">
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
          </div>

          <button
            type="submit"
            className="w-full bg-[#001a41] text-white py-4 text-xl font-bold mt-4 hover:bg-[#002855] active:scale-[0.98] transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "CONNEXION..." : "Se connecter"}
          </button>

          <div className="text-center space-y-4 mt-4">
            <p className="text-gray-600 text-lg cursor-pointer hover:underline">
              Mot de passe oublier?
            </p>

            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#001a41]"
                id="remember"
              />
              <label htmlFor="remember" className="text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <div className="pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-500">Pas de compte ?</p>
              <Link
                to="/register"
                className="text-[#002855] font-bold hover:underline"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
