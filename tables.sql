-- Create tables

CREATE TABLE user (
    user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(40),
    lastname VARCHAR(40),
    email VARCHAR(255),
    phone VARCHAR(255),
    profile_url VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(5),
    is_recruter BOOLEAN NOT NULL
);

CREATE TABLE company (
    company_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_name VARCHAR(255),
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(5),
    logo_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE announcement (
    announcement_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    contract_type VARCHAR(20) CHECK (contract_type = 'CDI' OR contract_type = 'CDD' OR contract_type = 'Alternance' OR contract_type = 'Stage'),
    job_title VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    postal_code VARCHAR(5),
    description TEXT,
    category VARCHAR(255),
    wage INT,
    working_time INT,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    edit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES user (user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (company_id)
        REFERENCES company (company_id)
        ON DELETE CASCADE
);

CREATE TABLE application (
    application_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    announcement_id INT NOT NULL,
    message TEXT NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (announcement_id)
        REFERENCES announcement (announcement_id)
        ON DELETE CASCADE
);

CREATE TABLE admin (
  admin_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

-- Examples inserted

INSERT INTO user (firstname, lastname, email, phone, password, address, postal_code, city, is_recruter)
VALUES
('Gérard', 'Gastro', 'Gégédu72@gmail.com', '06 12 34 56 78', '123456789', '89 rue du moulin rouge', '75015', 'Paris', FALSE),
('Jeff', 'Cartois', 'Jeff_Cartois@artista.com', '07 85 42 13 58', 'Jeffitr#12ù', '172 av. de la carte', '82620', 'Montcuq', TRUE),
('Antoine', 'Azar', 'jaymango18@gmail.com', '07 12 34 56 78', 'hubjob123', '12 av. de la porte', '92510', 'Ville-Sans-Nom', TRUE);

INSERT INTO company (user_id, company_name, description, address, city, postal_code)
VALUES
(2, 'Artista', 'A mini start-up for some artists to deploy their talents.', '102 rue du travail', 'Ville-sans-nom', '92050'),
(3, 'HubJob', 'A mini start-up to deploy jobs', '104 rue du travail', 'Ville-sans-nom', '92050');

INSERT INTO announcement (user_id, company_id, contract_type, job_title, address, city, postal_code, description, category, wage, working_time)
VALUES
(2, 1, 'CDI', 'Recherche Secrétaire Vente', '102 rue du travail','Ville-Sans-Nom', '92050', 'Recherche belle secrétaire pour l''''entreprise', 'Vente', '2000', 35),
(2, 1, 'CDD', 'Recherche Designer Pro', '102 rue du travail','Ville-Sans-Nom', '92050', 'Recherche bon designer', 'Animation', '3500', 35),
(2, 1, 'Alternance', 'Recherche Programmeur WEB', '102 rue du travail','Ville-Sans-Nom', '92050', 'Recherche programmeur pour site web', 'Informatique', '2500', 35),
(3, 2, 'CDD', 'Recherche Designer Pro', '103 rue du travail', 'Ville-Sans-Nom', '92050', 'Recherche bon designer', 'Animation', '3500', 35);
