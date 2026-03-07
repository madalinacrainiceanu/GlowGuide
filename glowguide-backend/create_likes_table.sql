-- Rulează acest script în MySQL pentru a adăuga tabela LikePostare
USE glowguide_db;

CREATE TABLE IF NOT EXISTS LikePostare (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postareId INT NOT NULL,
    membruId INT NOT NULL,
    dataLike TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (postareId, membruId),
    FOREIGN KEY (postareId) REFERENCES Postare(id) ON DELETE CASCADE,
    FOREIGN KEY (membruId) REFERENCES Membru(id) ON DELETE CASCADE
);
