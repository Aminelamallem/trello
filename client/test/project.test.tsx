import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest"; // Règle ton erreur de type
import Create from "../../client/src/pages/project/Create";

describe("Composant Create", () => {
  
  it("devrait afficher le formulaire correctement", () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    // Vérifie que le titre est là
    expect(screen.getByText(/Créer un projet/i)).toBeInTheDocument();
  });

  it("devrait afficher une erreur si l'API répond mal", async () => {
    // On simule un fetch qui échoue
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Erreur de test" }),
    } as Response);

    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    // On clique sur le bouton sans rien remplir (pour déclencher le submit)
    const button = screen.getByRole("button", { name: /CRÉER LE PROJET/i });
    fireEvent.click(button);

    // On attend que le message d'erreur apparaisse
    const errorMsg = await screen.findByText(/Erreur de test/i);
    expect(errorMsg).toBeInTheDocument();
  });
});