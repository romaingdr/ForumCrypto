CREATE DATABASE forum;

USE forum;

-- Table des rôles
CREATE TABLE Roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Table des utilisateurs
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    biography TEXT,
    last_connected DATETIME,
    profile_pic VARCHAR(255),
    id_role INT,
    FOREIGN KEY (id_role) REFERENCES Roles(id_role)
);

-- Table des catégories
CREATE TABLE Categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des sujets
CREATE TABLE Topics (
    id_topic INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    id_category INT,
    user_id INT,
    FOREIGN KEY (id_category) REFERENCES Categories(id_category),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Table des messages
CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    title VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_topic INT,
    user_id INT,
    FOREIGN KEY (id_topic) REFERENCES Topics(id_topic),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Table des images des messages
CREATE TABLE Post_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    url_path VARCHAR(255) NOT NULL,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Table des likes (associations)
CREATE TABLE Likes (
    user_id INT,
    post_id INT,
    isLiked BOOLEAN NOT NULL,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Table des réponses aux messages (associations)
CREATE TABLE Post_replies (
    reply_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    reply_to_post_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (reply_to_post_id) REFERENCES Posts(post_id)
);


CREATE TABLE friend_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

CREATE TABLE friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id)
);

ALTER TABLE Topics
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE conversation (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    user1_id INT,
    user2_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES users(user_id),
    FOREIGN KEY (user2_id) REFERENCES users(user_id)
);

CREATE TABLE message (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    sender_id INT,
    content TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversation(conversation_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
); 

alter table topics add column status varchar(30);

CREATE TABLE tags (
    id_tag INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL,
    id_topic INT,
    FOREIGN KEY (id_topic) REFERENCES topics(id_topic) ON DELETE CASCADE
);


drop table post_images;
drop table post_replies;
drop table likes;
drop table posts;
CREATE TABLE posts (
    id_post INT AUTO_INCREMENT PRIMARY KEY,
    id_topic INT NOT NULL,
    parent_post_id INT DEFAULT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_topic) REFERENCES topics(id_topic),
    FOREIGN KEY (parent_post_id) REFERENCES posts(id_post),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);