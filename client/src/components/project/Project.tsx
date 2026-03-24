import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../../contexts/authContext";
import type { IProject } from "../../types/IProject";

const API_URL = "http://localhost:3310/api";

export default function Project() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects/user/${user?.uuid}`, {
          credentials: "include",
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user?.uuid) fetchProjects();
  }, [user]);

  const deleteProject = async (uuid: string) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await fetch(`${API_URL}/projects/${uuid}`, {
        method: "DELETE",
        credentials: "include",
      });

      setProjects((prev) =>
        prev.filter((project: IProject) => project.uuid !== uuid),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#001a41] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header avec le style de bouton du thème */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-white text-3xl font-bold uppercase tracking-tight">
            Mes Projets
          </h1>
          <Link
            to="/projects/create"
            className="bg-[#f5f5f5] text-[#001a41] px-6 py-3 font-bold hover:bg-white transition-colors shadow-lg uppercase text-sm"
          >
            + Créer un projet
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-[#f5f5f5] p-12 text-center shadow-2xl">
            <p className="text-[#001a41] text-xl font-bold uppercase">
              Aucun projet trouvé
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project: IProject) => (
              <div
                key={project.uuid}
                className="bg-[#f5f5f5] shadow-2xl flex flex-col  transition-transform hover:-translate-y-1"
              >
                {/* Section haute de la carte */}
                <div className="p-6 ">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${
                        project.status === "public"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {project.status === "public" ? "Public" : "Privé"}
                    </span>

                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      onClick={() => deleteProject(project.uuid)}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <h2 className="text-[#002855] text-xl font-bold mb-3 uppercase border-b-2 border-[#d9d9d9] pb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Section basse de la carte (Gris plus foncé comme les inputs) */}
                <div className="bg-[#d9d9d9] p-4 flex justify-between items-center mt-auto">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">
                    {new Date(project.createdAt).toLocaleDateString()} —{" "}
                    {new Date(project.createdAt).getHours()}H
                    {new Date(project.createdAt).getMinutes()}
                  </div>

                  <Link
                    to={`/projects/${project.uuid}`}
                    className="bg-[#001a41] text-white px-4 py-2 text-xs font-bold hover:bg-[#002855] transition-all uppercase"
                  >
                    Ouvrir
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
