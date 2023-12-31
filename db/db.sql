-- Creating 'Episodes' table
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    episodes_number VARCHAR(10),
    title VARCHAR(255),
    broadcast_date DATE,
    guest VARCHAR(50),
    img_url VARCHAR(255),
    youtube_url VARCHAR(255),
    painting_index VARCHAR(50)
);

-- Creating 'UniqueSubjects' table
CREATE TABLE unique_subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

-- Creating 'UniqueColors' table
CREATE TABLE unique_colors (
    color_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    hex_code VARCHAR(7) UNIQUE
);

-- Creating 'Episode-Subject' join table
CREATE TABLE episode_subject (
    episode_id INT REFERENCES episodes(episode_id),
    subject_id INT REFERENCES unique_subjects(subject_id),
    PRIMARY KEY (episode_id, subject_id)
);

-- Creating 'Episode-Color' join table
CREATE TABLE episode_color (
    episode_id INT REFERENCES episodes(episode_id),
    color_id INT REFERENCES unique_colors(color_id),
    PRIMARY KEY (episode_id, color_id)
);
CREATE INDEX idx_episode_color ON episode_color(episode_id, color_id);
