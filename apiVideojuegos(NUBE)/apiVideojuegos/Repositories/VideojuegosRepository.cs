using apiVideojuegos.Helpers;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace apiVideojuegos.Repositories
{
    public class VideojuegosRepository : IVideojuegosRepository
    {
        private readonly IDatabaseExecutor _executor;

        public VideojuegosRepository(IDatabaseExecutor executor)
        {
            _executor = executor;
        }

        public async Task<string> CreateVideojuegos(VideojuegosRequest request)
        {
            var sp = "USP_INSERT_VIDEOJUEGO";

            var parameters = new DynamicParameters();

            parameters.Add("Titulo", request.Titulo, DbType.String, ParameterDirection.Input);
            parameters.Add("Genero", request.Genero, DbType.String, ParameterDirection.Input);
            parameters.Add("Plataforma", request.Plataforma, DbType.String, ParameterDirection.Input);
            parameters.Add("Stock", request.Stock, DbType.Int32, ParameterDirection.Input);
            parameters.Add("Precio", request.Precio, DbType.Decimal, ParameterDirection.Input);
            parameters.Add("FechaLanzamiento", request.FechaLanzamiento, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("CategoriaId", request.CategoriaId, DbType.Int64, ParameterDirection.Input);


            var resultado = await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return $"Se ha insertado un nuevo Videojuego con el titulo: {request.Titulo}";
        }

        public async Task<string> DeleteVideojuegos(int VideojuegoId)
        {
            var sp = "USP_DELETE_VIDEOJUEGO";
            var parameters = new DynamicParameters();
            parameters.Add("VideojuegoId", VideojuegoId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return "Se elimino el Videojuego";
        }

        public async Task<IEnumerable<VideojuegosDataResponse>> GetAllVideojuegos()
        {
            var sp = "USP_GET_VIDEOJUEGOS";
            var listado = await _executor.ExecuteCommand(conexion =>
            conexion.QueryAsync<VideojuegosDataResponse>(sp));

            return listado;
        }

        public async Task<VideojuegosOneResponse> GetOneVideojuegos(int VideojuegoId)
        {
            var sp = "USP_GET_ONE_VIDEOJUEGO";
            var parameters = new DynamicParameters();
            parameters.Add("VideojuegoId", VideojuegoId, DbType.Int32, direction: ParameterDirection.Input);

            var result = await _executor.ExecuteCommand(conexion => conexion.QuerySingleAsync<VideojuegosOneResponse>(sp, parameters));
            return result;
        }

        public async Task<string> UpdateVideojuegos(int VideojuegoId, VideojuegosRequest request)
        {
            var sp = "USP_UPDATE_VIDEOJUEGO";
            var parameters = new DynamicParameters();

            parameters.Add("VideojuegoId", VideojuegoId, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("Titulo", request.Titulo, DbType.String, direction: ParameterDirection.Input);
            parameters.Add("Genero", request.Genero, DbType.String, direction: ParameterDirection.Input);
            parameters.Add("Plataforma", request.Plataforma, DbType.String, direction: ParameterDirection.Input);
            parameters.Add("Stock", request.Stock, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("Precio", request.Precio, DbType.Decimal, direction: ParameterDirection.Input);
            parameters.Add("FechaLanzamiento", request.FechaLanzamiento, DbType.DateTime, direction: ParameterDirection.Input);
            parameters.Add("CategoriaId", request.CategoriaId, DbType.Int32, direction: ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            var mensaje = $"Se ha actualizado el Videojuego con el ID: {VideojuegoId}";
            return mensaje;
        }
    }
}
