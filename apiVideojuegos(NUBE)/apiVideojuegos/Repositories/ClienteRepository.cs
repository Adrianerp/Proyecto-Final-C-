using apiVideojuegos.Helpers;
using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace apiVideojuegos.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly IDatabaseExecutor _executor;

        public ClienteRepository(IDatabaseExecutor executor)
        {
            _executor = executor;
        }

        public async Task<Cliente> CreateClientes(ClienteRequest request)
        {
            var sp = "USP_INSERT_CLIENTE";

            var parameters = new DynamicParameters();
            parameters.Add("ClienteId", DbType.Int32, direction: ParameterDirection.Output);

            parameters.Add("Nombre", request.Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("Documento", request.Documento, DbType.String, ParameterDirection.Input);
            parameters.Add("Telefono", request.Telefono, DbType.String, ParameterDirection.Input);
            parameters.Add("Email", request.Email, DbType.String, ParameterDirection.Input);

            var resultado = await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));
            var idGenerado = parameters.Get<int>("ClienteId");

            var clienteRegister = await _executor.ExecuteCommand(async con =>
            {
                var sql = "SELECT * FROM Cliente WHERE ClienteId = @ClienteId";
                return (await con.QueryFirstOrDefaultAsync<Cliente>(sql, new { ClienteId = idGenerado }));
            });

            return clienteRegister;
        }

        public async Task<string> DeleteClientes(int ClienteId)
        {
            var sp = "USP_DELETE_CLIENTE";
            var parameters = new DynamicParameters();
            parameters.Add("ClienteId", ClienteId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return "Se elimino el cliente";
        }

        public async Task<IEnumerable<ClienteDataResponse>> GetAllClientes()
        {
            var sp = "USP_GET_CLIENTES";
            var listado = await _executor.ExecuteCommand(conexion =>
            conexion.QueryAsync<ClienteDataResponse>(sp));

            return listado;
        }

        public async Task<ClienteOneResponse> GetOneClientes(int ClienteId)
        {
            var sp = "USP_GET_ONE_CLIENTE";
            var parameters = new DynamicParameters();
            parameters.Add("ClienteId", ClienteId, DbType.Int32, direction: ParameterDirection.Input);

            var result = await _executor.ExecuteCommand(conexion => conexion.QuerySingleAsync<ClienteOneResponse>(sp, parameters));
            return result;
        }

        public async Task<string> UpdateClientes(int ClienteId, ClienteRequest request)
        {
            var sp = "USP_UPDATE_CLIENTE";
            var parameters = new DynamicParameters();

            parameters.Add("ClienteId", ClienteId, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("Nombre", request.Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("Documento", request.Documento, DbType.String, ParameterDirection.Input);
            parameters.Add("Telefono", request.Telefono, DbType.String, ParameterDirection.Input);
            parameters.Add("Email", request.Email, DbType.String, ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            var mensaje = $"Se ha actualizado el Cliente con el ID: {ClienteId}";
            return mensaje;
        }
    }
}
