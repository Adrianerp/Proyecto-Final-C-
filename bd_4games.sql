
USE MASTER
GO

IF EXISTS(SELECT * FROM sys.databases where name='FOURGAMES')
BEGIN
    DROP DATABASE FOURGAMES
END
GO

CREATE DATABASE FOURGAMES
GO

USE FOURGAMES
GO

-- Tabla de usuarios (trabajadores del sistema)
CREATE TABLE Usuario (
    UsuarioId INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Usuario NVARCHAR(50) NOT NULL UNIQUE,
    Clave NVARCHAR(100) NOT NULL, 
    Rol NVARCHAR(20) DEFAULT 'Trabajador' 
)
GO

INSERT INTO Usuario (Nombre, Usuario, Clave, Rol) VALUES
('Administrador', 'admin', '1234', 'Admin'),
('Trabajador1', 'trabajador1', '1234', 'Trabajador'),
('Trabajador2', 'trabajador2', '1234', 'Trabajador')
GO

-- Tabla de clientes (los que reservan los videojuegos)
CREATE TABLE Cliente (
    ClienteId INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Documento NVARCHAR(20),
    Telefono NVARCHAR(20),
    Email NVARCHAR(100),
    FechaRegistro DATETIME DEFAULT GETDATE()
)
GO

INSERT INTO Cliente (Nombre, Documento, Telefono, Email) VALUES
('Adrian', '12345678', '987654321', 'adrian@email.com'),
('Gabriel', '20654321987', '998877665', 'gabriel@email.com'),
('Xiomara', '45678912', '976543210', 'xiomara@email.com'),
('Rai', '10987654', '954321098', 'rai@email.com')
GO

-- Tabla de categorías
CREATE TABLE Categoria (
    CategoriaId INT PRIMARY KEY IDENTITY(1,1),
    NombreCategoria NVARCHAR(100) NOT NULL UNIQUE,
    Descripcion NVARCHAR(255)
)
GO

INSERT INTO Categoria (NombreCategoria, Descripcion) VALUES
('Acción', 'Videojuegos enfocados en acción y adrenalina'),
('Aventura', 'Juegos que combinan exploración y resolución de acertijos'),
('Deportes', 'Videojuegos de deportes y simuladores'),
('Carreras', 'Juegos de carreras de vehículos'),
('Lucha', 'Juegos de pelea entre personajes'),
('Simulación', 'Juegos que simulan actividades de la vida real'),
('Rol', 'Videojuegos donde el jugador asume el rol de un personaje'),
('Estrategia', 'Juegos que requieren planificación y estrategia'),
('Plataforma', 'Juegos en los que se debe saltar entre plataformas'),
('Terror', 'Juegos que buscan generar miedo y tensión en el jugador')
GO

-- Tabla de videojuegos disponibles
CREATE TABLE Videojuego (
    VideojuegoId INT PRIMARY KEY IDENTITY(1,1),
    Titulo NVARCHAR(150) NOT NULL,
    Genero NVARCHAR(50),
    Plataforma NVARCHAR(50),
    Stock INT NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    FechaLanzamiento DATE,
    CategoriaId INT, -- Relación con la tabla Categoria
    FOREIGN KEY (CategoriaId) REFERENCES Categoria(CategoriaId)
)
GO

INSERT INTO Videojuego (Titulo, Genero, Plataforma, Stock, Precio, FechaLanzamiento, CategoriaId) VALUES
('Grand Theft Auto V', 'Acción', 'PS5', 50, 59.99, '2013-09-17', 1),
('The Legend of Zelda: Breath of the Wild', 'Aventura', 'Nintendo Switch', 30, 49.99, '2017-03-03', 2),
('FIFA 23', 'Deportes', 'PS4', 100, 59.99, '2022-09-30', 3),
('Need for Speed: Heat', 'Carreras', 'PC', 70, 39.99, '2019-11-08', 4),
('Street Fighter V', 'Lucha', 'PC', 20, 29.99, '2016-02-16', 5),
('The Sims 4', 'Simulación', 'PC', 80, 39.99, '2014-09-02', 6),
('The Witcher 3: Wild Hunt', 'Rol', 'PS4', 40, 59.99, '2015-05-19', 7),
('Civilization VI', 'Estrategia', 'PC', 60, 49.99, '2016-10-21', 8),
('Super Mario Odyssey', 'Plataforma', 'Nintendo Switch', 90, 59.99, '2017-10-27', 9),
('Resident Evil 2', 'Terror', 'PS4', 50, 39.99, '2019-01-25', 10)
GO

-- Tabla de reservas de videojuegos
CREATE TABLE Reserva (
    ReservaId INT PRIMARY KEY IDENTITY(1,1),
    ClienteId INT NOT NULL,
    UsuarioId INT NOT NULL, -- Trabajador que registra la reserva
    FechaReserva DATETIME DEFAULT GETDATE(),
	FechaLimite DATETIME,
    FechaReal DATETIME,
    Estado NVARCHAR(20),
	Total DECIMAL(10,2),
	CHECK(Estado IN ('Reservado','Devuelto')),
    FOREIGN KEY (ClienteId) REFERENCES Cliente(ClienteId),
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId)
)
GO

-- Tabla intermedia: videojuegos reservados
CREATE TABLE ReservaVideojuego (
    ReservaVideojuegoId INT PRIMARY KEY IDENTITY(1,1),
    ReservaId INT NOT NULL,
    VideojuegoId INT NOT NULL,
    Cantidad INT NOT NULL,
	Total DECIMAL(10,2),
    FOREIGN KEY (ReservaId) REFERENCES Reserva(ReservaId),
    FOREIGN KEY (VideojuegoId) REFERENCES Videojuego(VideojuegoId)
)
GO