CREATE TABLE notes(
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
pinned BOOLEAN NOT NULL DEFAULT FALSE,
tags TEXT[] DEFAULT '{}',
date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
last_time_edited TIMESTAMP WITH TIME ZONE,
note_text TEXT
);

INSERT INTO notes(title, pinned, tags, date_created, last_time_edited, note_text)
VALUES
('Title 1', FALSE, ARRAY['tag1', 'tag2'], TIMESTAMP '2023-05-25 14:00:00', TIMESTAMP '2023-05-26 10:00:00', 'This is note text 1'),
('Title 2', TRUE, ARRAY['tag3', 'tag4'], TIMESTAMP '2023-05-24 13:00:00', TIMESTAMP '2023-05-24 16:00:00', 'This is note text 2'),
('Title 3', FALSE, ARRAY['tag1', 'tag5'], TIMESTAMP '2023-05-22 15:00:00', TIMESTAMP '2023-05-24 17:00:00', 'This is note text 3');

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
passwordhash VARCHAR(255) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
