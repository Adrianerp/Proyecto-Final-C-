
USE FOURGAMES
GO


--- PROCEDURES CATEGORIA:

CREATE OR ALTER PROC USP_GET_CATEGORIAS
AS
BEGIN
	SELECT * FROM Categoria
END
GO

EXEC USP_GET_CATEGORIAS
GO

CREATE OR ALTER PROC USP_GET_ONE_CATEGORIA
@CategoriaId INT
AS
BEGIN
	SELECT * FROM Categoria WHERE CategoriaId = @CategoriaId
END
GO

EXEC USP_GET_ONE_CATEGORIA 1
GO

CREATE OR ALTER PROC USP_INSERT_CATEGORIA
@NombreCategoria NVARCHAR(100),
@Descripcion NVARCHAR(255)
AS
BEGIN
	INSERT INTO Categoria(NombreCategoria, Descripcion)
	VALUES(@NombreCategoria, @Descripcion)
END
GO

CREATE OR ALTER PROC USP_UPDATE_CATEGORIA
@CategoriaId INT,
@NombreCategoria NVARCHAR(100),
@Descripcion NVARCHAR(255)
AS
BEGIN
	UPDATE Categoria
	SET
		NombreCategoria = @NombreCategoria,
		Descripcion = @Descripcion
	WHERE
		CategoriaId = @CategoriaId
END
GO


CREATE OR ALTER PROC USP_DELETE_CATEGORIA
@CategoriaId INT
AS
BEGIN
	DELETE FROM Categoria
	WHERE CategoriaId = @CategoriaId
END
GO

-- PROCEDURES VIDEOJUEGOS:

CREATE OR ALTER PROC USP_GET_VIDEOJUEGOS
AS
BEGIN
	SELECT 
		v.VideojuegoId,
		v.Titulo,
		v.Genero,
		v.Plataforma,
		v.Stock,
		v.Precio,
		v.FechaLanzamiento,
		c.CategoriaId,
		c.NombreCategoria 
	FROM 
		Videojuego v
	INNER JOIN
		Categoria c ON c.CategoriaId = v.CategoriaId
END
GO

EXEC USP_GET_VIDEOJUEGOS
GO


CREATE OR ALTER PROC USP_GET_ONE_VIDEOJUEGO
@VideojuegoId INT
AS
BEGIN
	SELECT 
		v.VideojuegoId,
		v.Titulo,
		v.Genero,
		v.Plataforma,
		v.Stock,
		v.Precio,
		v.FechaLanzamiento,
		c.CategoriaId,
		c.NombreCategoria 
	FROM 
		Videojuego v
	INNER JOIN
		Categoria c ON c.CategoriaId = v.CategoriaId
	WHERE 
		VideojuegoId = @VideojuegoId
END
GO

EXEC USP_GET_ONE_VIDEOJUEGO 1
GO

CREATE OR ALTER PROC USP_INSERT_VIDEOJUEGO
@Titulo NVARCHAR(150),
@Genero NVARCHAR(50),
@Plataforma NVARCHAR(50),
@Stock INT,
@Precio DECIMAL(10,2),
@FechaLanzamiento DATE,
@CategoriaId INT
AS
BEGIN
	INSERT INTO Videojuego(Titulo, Genero, Plataforma, Stock, Precio, FechaLanzamiento, CategoriaId)
	VALUES(@Titulo, @Genero, @Plataforma, @Stock, @Precio, @FechaLanzamiento, @CategoriaId)
END
GO


CREATE OR ALTER PROC USP_UPDATE_VIDEOJUEGO
@VideojuegoId INT,
@Titulo NVARCHAR(150),
@Genero NVARCHAR(50),
@Plataforma NVARCHAR(50),
@Stock INT,
@Precio DECIMAL(10,2),
@FechaLanzamiento DATE,
@CategoriaId INT
AS
BEGIN
	UPDATE Videojuego
	SET
		Titulo = @Titulo,
		Genero = @Genero,
		Plataforma = @Plataforma,
		Stock = @Stock,
		Precio = @Precio,
		FechaLanzamiento = @FechaLanzamiento,
		CategoriaId = @CategoriaId
	WHERE
		VideojuegoId = @VideojuegoId
END
GO


CREATE OR ALTER PROC USP_DELETE_VIDEOJUEGO
@VideojuegoId INT
AS
BEGIN
	DELETE FROM Videojuego
	WHERE VideojuegoId = @VideojuegoId
END
GO


-- PROCEDURES CLIENTES:

CREATE OR ALTER PROC USP_GET_CLIENTES
AS
BEGIN
	SELECT * FROM Cliente
END
GO

EXEC USP_GET_CLIENTES
GO


CREATE OR ALTER PROC USP_GET_ONE_CLIENTE
@ClienteId INT
AS
BEGIN
	SELECT * FROM Cliente WHERE ClienteId = @ClienteId
END
GO

EXEC USP_GET_ONE_CLIENTE 1
GO

CREATE OR ALTER PROC USP_INSERT_CLIENTE
@ClienteId INT OUTPUT,
@Nombre NVARCHAR(100),
@Documento NVARCHAR(20),
@Telefono NVARCHAR(20),
@Email NVARCHAR(100)
AS
BEGIN
    INSERT INTO Cliente(Nombre, Documento, Telefono, Email)
    VALUES(@Nombre, @Documento, @Telefono, @Email)

    SET @ClienteId = SCOPE_IDENTITY()
END
GO



CREATE OR ALTER PROC USP_UPDATE_CLIENTE
@ClienteId INT,
@Nombre NVARCHAR(100),
@Documento NVARCHAR(20),
@Telefono NVARCHAR(20),
@Email NVARCHAR(100)
AS
BEGIN
	UPDATE Cliente
	SET
		Nombre = @Nombre,
		Documento = @Documento,
		Telefono = @Telefono,
		Email = @Email
	WHERE
		ClienteId = @ClienteId
END
GO


CREATE OR ALTER PROC USP_DELETE_CLIENTE
@ClienteId INT
AS
BEGIN
	DELETE FROM Cliente
	WHERE ClienteId = @ClienteId
END
GO


-- PROCEDURES USUARIOS:

CREATE OR ALTER PROC USP_GET_USUARIOS
AS
BEGIN
	SELECT * FROM Usuario
END
GO

EXEC USP_GET_USUARIOS
GO


CREATE OR ALTER PROC USP_GET_ONE_USUARIO
@UsuarioId INT
AS
BEGIN
	SELECT * FROM Usuario WHERE UsuarioId = @UsuarioId
END
GO

EXEC USP_GET_ONE_USUARIO 1
GO


CREATE OR ALTER PROC USP_INSERT_USUARIO
@Nombre NVARCHAR(100),
@Usuario NVARCHAR(50),
@Clave NVARCHAR(100),
@Rol NVARCHAR(20) = 'Trabajador'
AS
BEGIN
	INSERT INTO Usuario(Nombre, Usuario, Clave, Rol)
	VALUES(@Nombre, @Usuario, @Clave, @Rol)
END
GO


CREATE OR ALTER PROC USP_UPDATE_USUARIO
@UsuarioId INT,
@Nombre NVARCHAR(100),
@Usuario NVARCHAR(50),
@Clave NVARCHAR(100),
@Rol NVARCHAR(20)
AS
BEGIN
	UPDATE Usuario
	SET
		Nombre = @Nombre,
		Usuario = @Usuario,
		Clave = @Clave,
		Rol = @Rol
	WHERE
		UsuarioId = @UsuarioId
END
GO


CREATE OR ALTER PROC USP_DELETE_USUARIO
@UsuarioId INT
AS
BEGIN
	DELETE FROM Usuario
	WHERE UsuarioId = @UsuarioId
END
GO


-- PROCEDURES RESERVAS:

CREATE OR ALTER PROC USP_GET_RESERVAS
AS
BEGIN
	SELECT 
		r.ReservaId,
		c.ClienteId,
		c.Nombre AS NombreCliente,
		u.UsuarioId,
		u.Nombre AS NombreUsuario,
		r.FechaReserva,
		r.FechaLimite,
		r.FechaReal,
		r.Estado,
		r.Total
	FROM 
		Reserva r
	INNER JOIN
		Cliente c ON c.ClienteId = r.ClienteId
	INNER JOIN 
		Usuario u ON u.UsuarioId = r.UsuarioId
END
GO

EXEC USP_GET_RESERVAS
GO


CREATE OR ALTER PROC USP_GET_ONE_RESERVA
@ReservaId INT
AS
BEGIN
	SELECT 
		r.ReservaId,
		c.ClienteId,
		c.Nombre AS NombreCliente,
		u.UsuarioId,
		u.Nombre AS NombreUsuario,
		r.FechaReserva,
		r.FechaLimite,
		r.FechaReal,
		r.Estado,
		r.Total
	FROM 
		Reserva r
	INNER JOIN
		Cliente c ON c.ClienteId = r.ClienteId
	INNER JOIN 
		Usuario u ON u.UsuarioId = r.UsuarioId
	WHERE ReservaId = @ReservaId
END
GO

EXEC USP_GET_ONE_RESERVA 1
GO


CREATE OR ALTER PROC USP_INSERT_RESERVA
    @ReservaId INT OUTPUT,
    @ClienteId INT,
    @UsuarioId INT,
    @FechaLimite DATETIME,
    @FechaReal DATETIME,
    @Estado NVARCHAR(20),
    @Total DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Reserva (ClienteId, UsuarioId, FechaLimite, FechaReal, Estado, Total)
    VALUES (@ClienteId, @UsuarioId, @FechaLimite, @FechaReal, @Estado, @Total);

    SET @ReservaId = SCOPE_IDENTITY()
END
GO

DECLARE @ReservaId INT;
EXEC USP_INSERT_RESERVA
	@ReservaId = @ReservaId,
    @ClienteId = 1, 
    @UsuarioId = 1,  
    @FechaLimite = '2024-08-04 18:00:00', 
    @FechaReal = '2024-08-04 18:00:00', 
    @Estado = 'Reservado',
	@Total = 45.00
GO

CREATE OR ALTER PROC USP_UPDATE_RESERVA
@ReservaId INT,
@ClienteId INT,
@UsuarioId INT,
@FechaLimite DATETIME,
@FechaReal DATETIME,
@Estado NVARCHAR(20),
@Total DECIMAL(10,2)
AS
BEGIN
    UPDATE Reserva
    SET
        ClienteId = @ClienteId,
        UsuarioId = @UsuarioId,
        FechaLimite = @FechaLimite, 
        FechaReal = @FechaReal,   
        Estado = @Estado,
		Total = @Total
    WHERE
        ReservaId = @ReservaId;
END
GO

CREATE OR ALTER PROC USP_DELETE_RESERVA
@ReservaId INT
AS
BEGIN
	DELETE FROM Reserva
	WHERE ReservaId = @ReservaId
END
GO


-- PROCEDURES RESERVAVIDEOJUEGOS:

CREATE OR ALTER PROC USP_GET_RESERVAVIDEOJUEGOS
AS
BEGIN
    SELECT 
		r.ReservaVideojuegoId,
		r.ReservaId,
		v.VideojuegoId,
		v.Titulo,
		v.Precio,
		r.Cantidad,
		r.Total
	FROM 
		ReservaVideojuego r
	INNER JOIN
		Videojuego v ON v.VideojuegoId = r.VideojuegoId
END
GO

EXEC USP_GET_RESERVAVIDEOJUEGOS
GO


CREATE OR ALTER PROC USP_GET_ONE_RESERVAVIDEOJUEGO
@ReservaVideojuegoId INT
AS
BEGIN
    SELECT 
		r.ReservaVideojuegoId,
		r.ReservaId,
		v.VideojuegoId,
		v.Titulo,
		v.Precio,
		r.Cantidad,
		r.Total
	FROM 
		ReservaVideojuego r
	INNER JOIN
		Videojuego v ON v.VideojuegoId = r.VideojuegoId
	WHERE 
		ReservaVideojuegoId = @ReservaVideojuegoId
END
GO

EXEC USP_GET_ONE_RESERVAVIDEOJUEGO 1
GO


CREATE OR ALTER PROC USP_INSERT_RESERVAVIDEOJUEGO
@ReservaId INT,
@VideojuegoId INT,
@Cantidad INT,
@Total DECIMAL(10,2)
AS
BEGIN
    DECLARE @StockActual INT

    -- Obtener el stock del videojuego
    SELECT @StockActual = Stock FROM Videojuego WHERE VideojuegoId = @VideojuegoId

    -- Validar si hay suficiente stock
    IF @StockActual IS NULL
    BEGIN
        RAISERROR('El videojuego no existe.', 16, 1)
        RETURN
    END

    IF @StockActual < @Cantidad
    BEGIN
        RAISERROR('No hay suficiente stock disponible.', 16, 1)
        RETURN
    END

    -- Insertar en ReservaVideojuego
    INSERT INTO ReservaVideojuego (ReservaId, VideojuegoId, Cantidad, Total)
    VALUES (@ReservaId, @VideojuegoId, @Cantidad, @Total)

    -- Disminuir el stock en la tabla Videojuego
    UPDATE Videojuego
    SET Stock = Stock - @Cantidad
    WHERE VideojuegoId = @VideojuegoId
END
GO

EXEC USP_INSERT_RESERVAVIDEOJUEGO
    @ReservaId = 1,  
    @VideojuegoId = 1, 
    @Cantidad = 2,
	@Total = 23.0;
GO


CREATE OR ALTER PROC USP_UPDATE_RESERVAVIDEOJUEGO
@ReservaVideojuegoId INT,
@ReservaId INT,
@VideojuegoId INT,
@Cantidad INT,
@Total DECIMAL(10,2)
AS
BEGIN
    UPDATE ReservaVideojuego
    SET
        ReservaId = @ReservaId,
        VideojuegoId = @VideojuegoId,
        Cantidad = @Cantidad,
		Total = @Total
    WHERE
        ReservaVideojuegoId = @ReservaVideojuegoId
END
GO


CREATE OR ALTER PROC USP_DELETE_RESERVAVIDEOJUEGO
@ReservaVideojuegoId INT
AS
BEGIN
    DELETE FROM ReservaVideojuego
    WHERE ReservaVideojuegoId = @ReservaVideojuegoId
END
GO



CREATE OR ALTER PROC INICIAR_SESION
@Nombre NVARCHAR(100),
@Clave NVARCHAR(50)
AS
BEGIN
	SELECT * FROM Usuario WHERE Nombre = @Nombre AND Clave = @Clave
END
GO

