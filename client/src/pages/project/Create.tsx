import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { ProjectDTO } from "../../types/ProjectDTO";

const API_URL = "http://localhost:3310/api";

export default function Create() {
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "public",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de la création du projet");
      }
      setProject(data);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project) {
      navigate("/");
    }
  }, [project, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001a41] p-4">
      <div className="bg-[#f5f5f5] w-full max-w-md p-10 shadow-2xl">
        <h1 className="text-[#002855] text-3xl font-bold mb-12 text-center">
          Créer un projet
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 text-sm border-l-4 border-red-500">
              {error}
            </div>
          )}

          {/* Champ Nom */}
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Nom du projet"
            className="w-full bg-[#d9d9d9] py-4 px-6 text-gray-700 placeholder-gray-500 focus:outline-none border-b-2 border-gray-400 focus:border-[#002855] transition-all"
            required
          />

          {/* Champ Description */}
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="text"
            placeholder="Description du projet"
            className="w-full bg-[#d9d9d9] py-4 px-6 text-gray-700 placeholder-gray-500 focus:outline-none border-b-2 border-gray-400 focus:border-[#002855] transition-all"
            required
          />

          {/* Champ Statut */}
          <div className="relative">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-[#d9d9d9] py-4 px-6 text-gray-700 focus:outline-none border-b-2 border-gray-400 focus:border-[#002855] appearance-none cursor-pointer"
              required
            >
              <option value="public">Public</option>
              <option value="private">Privé</option>
            </select>
            {/* Petit indicateur visuel pour le select sans SVG */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
              ▼
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#001a41] text-white py-4 text-xl font-bold mt-4 hover:bg-[#002855] active:scale-[0.98] transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "CHARGEMENT..." : "CRÉER LE PROJET"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4 cursor-pointer hover:underline">
            Annuler la création ?
          </p>
        </form>
      </div>
    </div>
  );
}
