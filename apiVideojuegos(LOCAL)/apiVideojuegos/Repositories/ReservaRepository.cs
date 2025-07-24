using apiVideojuegos.Helpers;
using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace apiVideojuegos.Repositories
{
    public class ReservaRepository : IReservaRepository
    {
        private readonly IDatabaseExecutor _executor;

        public ReservaRepository(IDatabaseExecutor executor)
        {
            _executor = executor;
        }

        public async Task<Reserva> CreateReservas(ReservaRequest request)
        {
            var sp = "USP_INSERT_RESERVA";

            var parameters = new DynamicParameters();
            parameters.Add("ReservaId", DbType.Int32, direction: ParameterDirection.Output);

            parameters.Add("Observacion", request.Observacion, DbType.String, ParameterDirection.Input);
            parameters.Add("ClienteId", request.ClienteId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("UsuarioId", request.UsuarioId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("FechaLimite", request.FechaLimite, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("FechaReal", request.FechaReal, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("Estado", request.Estado, DbType.String, ParameterDirection.Input);
            parameters.Add("Total", request.Total, DbType.Decimal, ParameterDirection.Input);

            var resultado = await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));
            var idGenerado = parameters.Get<int>("ReservaId");

            var reservaRegister = await _executor.ExecuteCommand(async con =>
            {
                var sql = "SELECT * FROM Reserva WHERE ReservaId = @ReservaId";
                return (await con.QueryFirstOrDefaultAsync<Reserva>(sql, new { ReservaId = idGenerado }));
            });

            return reservaRegister;
        }

        public async Task<string> DeleteReservas(int ReservaId)
        {
            var sp = "USP_DELETE_RESERVA";
            var parameters = new DynamicParameters();
            parameters.Add("ReservaId", ReservaId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return "Se elimino la Reserva";
        }

        public async Task<IEnumerable<ReservaDataResponse>> GetAllReservas()
        {
            var sp = "USP_GET_RESERVAS";
            var listado = await _executor.ExecuteCommand(conexion =>
            conexion.QueryAsync<ReservaDataResponse>(sp));

            return listado;
        }

        public async Task<ReservaOneResponse> GetOneReservas(int ReservaId)
        {
            var sp = "USP_GET_ONE_RESERVA";
            var parameters = new DynamicParameters();
            parameters.Add("ReservaId", ReservaId, DbType.Int32, direction: ParameterDirection.Input);

            var result = await _executor.ExecuteCommand(conexion => conexion.QuerySingleAsync<ReservaOneResponse>(sp, parameters));
            return result;
        }

        public async Task<string> UpdateReservas(int ReservaId, ReservaRequest request)
        {
            var sp = "USP_UPDATE_RESERVA";
            var parameters = new DynamicParameters();

            parameters.Add("ReservaId", ReservaId, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("ClienteId", request.ClienteId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("UsuarioId", request.UsuarioId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("FechaLimite", request.FechaLimite, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("FechaReal", request.FechaReal, DbType.DateTime, ParameterDirection.Input);
            parameters.Add("Estado", request.Estado, DbType.String, ParameterDirection.Input);
            parameters.Add("Total", request.Total, DbType.Decimal, ParameterDirection.Input);


            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            var mensaje = $"Se ha actualizado el Reserva con el ID: {ReservaId}";
            return mensaje;
        }
    }
}
