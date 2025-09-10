CREATE DATABASE IF NOT EXISTS rpg_etec;
USE rpg_etec;

CREATE TABLE campanha(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(250) NOT NULL,
  criacao TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  descricao VARCHAR(250),
  senha VARCHAR(250)
);

CREATE TABLE usuario(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  senha VARCHAR(250) NOT NULL
);

CREATE TABLE campanha_usuario(
  id_usuario INT NOT NULL,
  id_campanha INT NOT NULL,
  mestre TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(id_usuario, id_campanha),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (id_campanha) REFERENCES campanha(id) ON DELETE CASCADE,
  INDEX idx_user (id_usuario),
  INDEX idx_campanha (id_campanha)
);

CREATE TABLE personagem(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_campanha INT NOT NULL,
  id_usuario INT NOT NULL,
  nome VARCHAR(50) NOT NULL,
  vida INT NOT NULL DEFAULT 10,
  tokenImage VARCHAR(250) NOT NULL,
  profileImage VARCHAR(250) NOT NULL,
  mental INT NOT NULL DEFAULT 10,
  energia INT NOT NULL DEFAULT 10,
  forca INT NOT NULL DEFAULT 1,
  agilidade INT NOT NULL DEFAULT 1,
  constituicao INT NOT NULL DEFAULT 1,
  vontade INT NOT NULL DEFAULT 1,
  inteligencia INT NOT NULL DEFAULT 1,
  percepcao INT NOT NULL DEFAULT 1,
  sorte INT NOT NULL DEFAULT 1,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (id_campanha) REFERENCES campanha(id) ON DELETE CASCADE,
  INDEX idx_usuario (id_usuario),
  INDEX idx_campanha (id_campanha)
);

CREATE TABLE npc(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_campanha INT NOT NULL,
  nome VARCHAR(50) NOT NULL,
  vida INT NOT NULL DEFAULT 10,
  tokenImage VARCHAR(250) NOT NULL,
  mental INT NOT NULL DEFAULT 10,
  energia INT NOT NULL DEFAULT 10,
  forca INT NOT NULL DEFAULT 1,
  agilidade INT NOT NULL DEFAULT 1,
  constituicao INT NOT NULL DEFAULT 1,
  vontade INT NOT NULL DEFAULT 1,
  inteligencia INT NOT NULL DEFAULT 1,
  percepcao INT NOT NULL DEFAULT 1,
  sorte INT NOT NULL DEFAULT 1,
  FOREIGN KEY (id_campanha) REFERENCES campanha(id) ON DELETE CASCADE,
  INDEX idx_campanha (id_campanha)
);

CREATE TABLE pericia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT
);

CREATE TABLE personagem_pericia (
  id_personagem INT NOT NULL,
  id_pericia INT NOT NULL,
  valor INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id_personagem, id_pericia),
  FOREIGN KEY (id_personagem) REFERENCES personagem(id) ON DELETE CASCADE,
  FOREIGN KEY (id_pericia) REFERENCES pericia(id) ON DELETE CASCADE
);

 