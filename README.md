📋 Fake TrelloFake Trello is a full-stack Kanban application built on a Monorepo architecture (React-Express-MySQL). This project follows the industry-standard "Wild Code School" architecture (v7.2.4), designed for scalability and maintainability.Extrait de codesequenceDiagram
box Web Client (Frontend)
participant React as React (Vite)
participant Fetcher as Fetcher (Axios/Fetch)
end
box Web Server (Backend)
participant Express as Express (Node.js)
participant Module as Repository/Action
end
box DB Server (Database)
participant DB as MySQL Server
end

    React-)Fetcher: User Interaction
    activate Fetcher
    Fetcher-)Express: API Request (HTTP)
    activate Express
    Express-)Module: Business Logic
    activate Module
    Module-)DB: SQL Query
    activate DB
    DB--)Module: Result (Rows)
    deactivate DB
    Module--)Express: JSON Response
    deactivate Module
    Express--)Fetcher: HTTP Response
    deactivate Express
    Fetcher--)React: State Update / Render
    deactivate Fetcher

🛠️ Tech StackFrontend: Vite + React (Fast & Modern).Backend: Node.js + Express.Database: MySQL (via mysql2 driver).Code Quality: Biome (Unified tool for Linting & Formatting).Testing: Supertest for API integration testing.Workflow: Concurrently to run both client and server in one terminal.🚀 Quick Start1. PrerequisitesEnsure you have the Biome extension installed in VSCode.A running MySQL instance.2. InstallationBashnpm install 3. Environment SetupCreate your local environment files (do not delete the .sample files):Copy server/.env.sample to server/.env (Fill in your DB credentials).Copy client/.env.sample to client/.env.4. Database InitializationBashnpm run db:migrate 5. Launch Development ModeBashnpm run dev
Access your app at http://localhost:3000📂 Project StructureThe project is organized as a monorepo for seamless development:client/: The React UI.src/components/: Reusable Trello cards, boards, and UI elements.src/pages/: Main application views.server/: The REST API.app/modules/: Domain-driven folders (e.g., task, column, user).database/schema.sql: Source of truth for your SQL tables.📖 Essential CommandsCommandActionnpm run devStartup: Starts Vite (Client) and Nodemon (Server) simultaneously.npm run checkQuality: Runs Biome to check linting and formatting rules.npm run db:migrateDatabase: Updates your local DB schema based on schema.sql.npm run testTests: Runs unit and integration tests.🛡️ Best PracticesSecurity: Always use environment variables for sensitive data. Never commit .env files.Data Integrity: Validate all user inputs on the backend before running SQL queries.Clean Code: Follow the Repository pattern in server/app/modules/ to separate SQL logic from Express routes.Formatting: Run npm run check before every commit to keep the codebase consistent.
