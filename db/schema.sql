IF EXISTS DROP DATABASE gnk_db;
CREATE DATABASE gnk_db;

USE gnk_db;

IF EXISTS DROP TABLE users;
CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) CHARACTER SET utf8 UNIQUE NOT NULL,
    first_name VARCHAR(100) CHARACTER SET utf8,
    last_name VARCHAR(100) CHARACTER SET utf8,
    email VARCHAR(100) CHARACTER SET utf8 UNIQUE NOT NULL,
    mobile_phone INT,
    bed_time DATETIME NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

IF EXISTS DROP TABLE chats;
CREATE TABLE chats(
    chat_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    chat_name VARCHAR(100) CHARACTER SET utf8 NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

IF EXISTS DROP TABLE chats_users_mapping;
CREATE TABLE chats_users_mapping(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    chat_id INT NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES chats (chat_id) ON DELETE CASCADE
);

IF EXISTS DROP TABLE messages;
CREATE TABLE messages(
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    chat_id INT NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    delay_send TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (chat_id) REFERENCES chats (chat_id) ON DELETE CASCADE
);