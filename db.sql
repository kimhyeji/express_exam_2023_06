DROP DATABASE IF EXISTS music_list;
CREATE DATABASE music_list;
USE music_list;

CREATE TABLE music_list (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    title VARCHAR(200) NOT NULL,
    singer VARCHAR(50) NOT NULL
);

INSERT INTO music_list
SET regDate = NOW(),
title = 'Ditto',
singer = '뉴진스';

INSERT INTO music_list
SET regDate = NOW(),
title = 'Butter',
singer = 'BTS';

INSERT INTO music_list
SET regDate = NOW(),
title = 'Kitsch',
singer = '아이브';

SELECT * FROM music_list;