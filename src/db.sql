CREATE DATABASE IF NOT EXISTS prueba;

USE prueba;

CREATE TABLE usuarios (
	nombre VARCHAR(45) DEFAULT NULL,
    documento INT(10) DEFAULT NULL,
    pass INT(20) DEFAULT NULL,
    fecha DATE,
    id INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id)
    
);

CREATE TABLE hobbies (
	nombre VARCHAR(15) DEFAULT NULL,
    descripcion VARCHAR(60) DEFAULT NULL,
    id INT(11) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id)
    
);


DESCRIBE usuarios, hobbies;