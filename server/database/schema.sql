-- Suppression et recréation de la base de données
DROP DATABASE IF EXISTS task_manager;
CREATE DATABASE task_manager;
USE task_manager;

-- Table des Utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    username VARCHAR(36) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table des Projets
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('public', 'private') DEFAULT 'private',
    createdBy VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Correction : Users -> users
    CONSTRAINT fk_projects_user FOREIGN KEY (createdBy) REFERENCES users(uuid) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des Colonnes
CREATE TABLE projectColumns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    position INT NOT NULL,
    projectId VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Correction : Projects -> projects
    CONSTRAINT fk_columns_project FOREIGN KEY (projectId) REFERENCES projects(uuid) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des Tâches
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    position INT NOT NULL,
    isCompleted BOOLEAN DEFAULT FALSE,
    userId VARCHAR(36),
    columnId VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Correction : Users -> users / ProjectColumns -> projectColumns
    CONSTRAINT fk_tasks_user FOREIGN KEY (userId) REFERENCES users(uuid) ON DELETE SET NULL,
    CONSTRAINT fk_tasks_column FOREIGN KEY (columnId) REFERENCES projectColumns(uuid) ON DELETE CASCADE
) ENGINE=InnoDB;