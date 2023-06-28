DROP DATABASE IF EXISTS gnk_db;
CREATE DATABASE gnk_db;

USE gnk_db;

-- renaming the primary keys as just ids to differentiate from foreigns
-- hi renzo here. not sure of the syntax regarding commented columns. please verify correctness.
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    username NVARCHAR(100) UNIQUE,
    first_name NVARCHAR(100),
    last_name NVARCHAR(100),
    email NVARCHAR(100) UNIQUE,
    mobile_phone INT,
    bed_time DATETIME,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


--renamed to chat to follow singular model for table
CREATE TABLE chat(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    chat_name NVARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE SET NULL
    --created_date DATETIME CURRENT_TIMESTAMP
);

CREATE TABLE chats_users_mapping(
    id INT NOT NULL AUTO_INCREMENT,
    chat_id INT,
    FOREIGN KEY (chat_id)
    REFERENCES chat(id)
    ON DELETE SET NULL,
    user_id INT,
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE SET NULL,
    --created_date DATETIME CURRENT_TIMESTAMP
);

CREATE TABLE message(
    id INT NOT NULL AUTO_INCREMENT,
    chat_id INT,
    FOREIGN KEY (chat_id)
    REFERENCES chat(id)
    ON DELETE SET NULL,
    -- consider renaming message column to content
    --content TEXT
    -- Consider FK to user to track which user sent which message
    --user_id INT,
    --FOREIGN KEY (user_id)
    --REFERENCES user(id)
    --ON DELETE SET NULL,
    --delay_send BIT,
    --created_date DATETIME CURRENT_TIMESTAMP
);