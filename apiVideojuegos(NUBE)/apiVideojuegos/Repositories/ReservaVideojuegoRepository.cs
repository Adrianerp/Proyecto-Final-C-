using apiVideojuegos.Helpers;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace apiVideojuegos.Repositories
{
    public class ReservaVideojuegoRepository : IReservaVideojuegoRepository
    {
        private readonly IDatabaseExecutor _executor;

        public ReservaVideojuegoRepository(IDatabaseExecutor executor)
        {
            _executor = executor;
        }

        public async Task<string> CreateReservaVideojuego(ReservaVideojuegoRequest request)
        {
            var sp = "USP_INSERT_RESERVAVIDEOJUEGO";

            var parameters = new DynamicParameters();

            parameters.Add("ReservaId", request.ReservaId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("VideojuegoId", request.VideojuegoId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("Cantidad", request.Cantidad, DbType.Int32, ParameterDirection.Input);
            parameters.Add("Total", request.Total, DbType.Decimal, ParameterDirection.Input);

            var resultado = await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return $"Se ha insertado una nueva ReservaVideojuego";
        }

        public async Task<string> DeleteReservaVideojuego(int ReservaVideojuegoId)
        {
            var sp = "USP_DELETE_RESERVAVIDEOJUEGO";
            var parameters = new DynamicParameters();
            parameters.Add("ReservaVideojuegoId", ReservaVideojuegoId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return "Se elimino la ReservaVideojuego";
        }

        public async Task<IEnumerable<ReservaVideojuegoDataReponse>> GetAllReservaVideojuego()
        {
            var sp = "USP_GET_RESERVAVIDEOJUEGOS";
            var listado = await _executor.ExecuteCommand(conexion =>
            conexion.QueryAsync<ReservaVideojuegoDataReponse>(sp));

            return listado;
        }

        public async Task<ReservaVideojuegoOneResponse> GetOneReservaVideojuego(int ReservaVideojuegoId)
        {
            var sp = "USP_GET_ONE_RESERVAVIDEOJUEGO";
            var parameters = new DynamicParameters();
            parameters.Add("ReservaVideojuegoId", ReservaVideojuegoId, DbType.Int32, direction: ParameterDirection.Input);

            var result = await _executor.ExecuteCommand(conexion => conexion.QuerySingleAsync<ReservaVideojuegoOneResponse>(sp, parameters));
            return result;
        }

        public async Task<string> UpdateReservaVideojuego(int ReservaVideojuegoId, ReservaVideojuegoRequest request)
        {
            var sp = "USP_UPDATE_RESERVAVIDEOJUEGO";
            var parameters = new DynamicParameters();

            parameters.Add("ReservaVideojuegoId", ReservaVideojuegoId, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("ReservaId", request.ReservaId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("VideojuegoId", request.VideojuegoId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("Cantidad", request.Cantidad, DbType.Int32, ParameterDirection.Input);
            parameters.Add("Total", request.Total, DbType.Decimal, ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            var mensaje = $"Se ha actualizado la ReservaVideojuego con el ID: {ReservaVideojuegoId}";
            return mensaje;
        }


    }
}
