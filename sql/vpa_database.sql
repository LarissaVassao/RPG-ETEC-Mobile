CREATE DATABASE IF NOT EXISTS rpg_etec;
USE rpg_etec;

CREATE TABLE campanha(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(256) NOT NULL,
  criacao TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  descricao VARCHAR(256),
  senha VARCHAR(256)
);

CREATE TABLE usuario(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL UNIQUE,
  senha VARCHAR(256) NOT NULL
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
  nome VARCHAR(64) NOT NULL,
  antepassado VARCHAR(64) NOT NULL,
  vida INT NOT NULL DEFAULT 10,
  vidaAtual INT NOT NULL DEFAULT 10,
  tokenImage VARCHAR(256) NOT NULL,
  profileImage VARCHAR(256) NOT NULL,
  mental INT NOT NULL DEFAULT 10,
  mentalAtual INT NOT NULL DEFAULT 10,
  energia INT NOT NULL DEFAULT 10,
  energiaAtual INT NOT NULL DEFAULT 10,
  ca INT NOT NULL DEFAULT 3,
  cargaMax INT NOT NULL DEFAULT 10,
  carga INT NOT NULL DEFAULT 0,
  credito INT NOT NULL DEFAULT 0,
  creditoMax INT NOT NULL DEFAULT 5,
  movimento INT NOT NULL DEFAULT 6,
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
  nome VARCHAR(64) NOT NULL,
  vida INT NOT NULL DEFAULT 10,
  tokenImage VARCHAR(256) NOT NULL,
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
  nome VARCHAR(128) NOT NULL
);

CREATE TABLE personagem_pericia (
  id_personagem INT NOT NULL,
  id_pericia INT NOT NULL,
  valor INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id_personagem, id_pericia),
  FOREIGN KEY (id_personagem) REFERENCES personagem(id) ON DELETE CASCADE,
  FOREIGN KEY (id_pericia) REFERENCES pericia(id) ON DELETE CASCADE
);

CREATE TABLE equipamento(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_personagem INT NOT NULL,
  nome VARCHAR(256) NOT NULL,
  tipo VARCHAR(32) NOT NULL,
  preco int(4) not null,
  volume INT(4) NOT NULL,
  descricao VARCHAR(512),
  requisito VARCHAR(128),
  dano VARCHAR(128),
  critico VARCHAR(128),
  FOREIGN KEY (id_personagem) REFERENCES personagem(id) ON DELETE CASCADE
);

CREATE TABLE mapa(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(128) NOT NULL,
  id_campanha INT NOT NULL,
  mapImage VARCHAR(256),
  largura int(4) NOT NULL,
  altura int(4) NOT NULL,
  cellSize int(4) NOT NULL,
  FOREIGN KEY (id_campanha) REFERENCES campanha(id) ON DELETE CASCADE
);

CREATE TABLE token(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_mapa INT NOT NULL,
  id_personagem INT NULL DEFAULT NULL,
  id_npc INT NULL DEFAULT NULL,
  positionY INT(4),
  positionX INT(4),
  tokenImage VARCHAR(256),
  FOREIGN KEY (id_mapa) REFERENCES mapa(id) ON DELETE CASCADE,
  FOREIGN KEY (id_personagem) REFERENCES personagem(id) ON DELETE CASCADE,
  FOREIGN KEY (id_npc) REFERENCES npc(id) ON DELETE CASCADE
);

 