using apiVideojuegos.Helpers;
using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace apiVideojuegos.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IDatabaseExecutor _executor;

        public UsuarioRepository(IDatabaseExecutor executor)
        {
            _executor = executor;
        }

        public async Task<string> CreateUsuarios(UsuariosRequest request)
        {
            var sp = "USP_INSERT_USUARIO";

            var parameters = new DynamicParameters();

            parameters.Add("Nombre", request.Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("Usuario", request.Usuario, DbType.String, ParameterDirection.Input);
            parameters.Add("Clave", request.Clave, DbType.String, ParameterDirection.Input);
            parameters.Add("Rol", request.Rol, DbType.String, ParameterDirection.Input);
            

            var resultado = await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return $"Se ha insertado un nuevo Usuario: {request.Nombre}";
        }

        public async Task<string> DeleteUsuarios(int UsuarioId)
        {
            var sp = "USP_DELETE_USUARIO";
            var parameters = new DynamicParameters();
            parameters.Add("UsuarioId", UsuarioId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return "Se elimino el usuario";
        }

        public async Task<IEnumerable<UsuarioDataResponse>> GetAllUsuarios()
        {
            var sp = "USP_GET_USUARIOS";
            var listado = await _executor.ExecuteCommand(conexion =>
            conexion.QueryAsync<UsuarioDataResponse>(sp));

            return listado;
        }

        public async Task<UsuarioOneResponse> GetOneUsuarios(int UsuarioId)
        {
            var sp = "USP_GET_ONE_USUARIO";
            var parameters = new DynamicParameters();
            parameters.Add("UsuarioId", UsuarioId, DbType.Int32, direction: ParameterDirection.Input);

            var result = await _executor.ExecuteCommand(conexion => conexion.QuerySingleAsync<UsuarioOneResponse>(sp, parameters));
            return result;
        }

        public async Task<string> UpdateUsuarios(int UsuarioId, UsuariosRequest request)
        {
            var sp = "USP_UPDATE_USUARIO";
            var parameters = new DynamicParameters();

            parameters.Add("UsuarioId", UsuarioId, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("Nombre", request.Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("Usuario", request.Usuario, DbType.String, ParameterDirection.Input);
            parameters.Add("Clave", request.Clave, DbType.String, ParameterDirection.Input);
            parameters.Add("Rol", request.Rol, DbType.String, ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            var mensaje = $"Se ha actualizado el Usuario con el ID: {UsuarioId}";
            return mensaje;
        }

        public async Task<UsuarioLog?> LoginUsuario(string nombre, string clave)
        {
            var sp = "INICIAR_SESION";
            var parameters = new DynamicParameters();
            parameters.Add("@Nombre", nombre);
            parameters.Add("@Clave", clave);

            var usuario = await _executor.ExecuteCommand(conexion =>
                conexion.QueryFirstOrDefaultAsync<UsuarioLog>(
                    sp,
                    parameters,
                    commandType: CommandType.StoredProcedure
                )
            );

            return usuario;
        }
    }
}
