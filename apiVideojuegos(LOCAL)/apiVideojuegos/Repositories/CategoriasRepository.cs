using apiVideojuegos.Helpers;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace apiVideojuegos.Repositories
{
    public class CategoriasRepository : ICategoriasRepository
    {
        private readonly IDatabaseExecutor _executor;

        public CategoriasRepository(IDatabaseExecutor executor)
        { 
            _executor = executor;
        }

        public async Task<string> CreateCategorias(CategoriaRequest request)
        {
            var sp = "USP_INSERT_CATEGORIA";

            var parameters = new DynamicParameters();

            parameters.Add("NombreCategoria", request.NombreCategoria, DbType.String, ParameterDirection.Input);
            parameters.Add("Descripcion", request.Descripcion, DbType.String, ParameterDirection.Input);


            var resultado = await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return $"Se ha insertado un nuevo Usuario con el nombre: {request.NombreCategoria}";
        }

        public async Task<string> DeleteCategorias(int CategoriaId)
        {
            var sp = "USP_DELETE_CATEGORIA";
            var parameters = new DynamicParameters();
            parameters.Add("CategoriaId", CategoriaId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            return "Se elimino la categoria";
        }

        public async Task<IEnumerable<CategoriasDataResponse>> GetAllCategorias()
        {
            var sp = "USP_GET_CATEGORIAS";
            var listado = await _executor.ExecuteCommand(conexion =>
            conexion.QueryAsync<CategoriasDataResponse>(sp));

            return listado;
        }

        public async Task<CategoriasOneResponse> GetOneCategorias(int CategoriaId)
        {
            var sp = "USP_GET_ONE_CATEGORIA";
            var parameters = new DynamicParameters();
            parameters.Add("CategoriaId", CategoriaId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);

            var result = await _executor.ExecuteCommand(conexion => conexion.QuerySingleAsync<CategoriasOneResponse>(sp, parameters));
            return result;
        }

        public async Task<string> UpdateCategorias(int CategoriaId, CategoriaRequest request)
        {
            var sp = "USP_UPDATE_CATEGORIA";
            var parameters = new DynamicParameters();

            parameters.Add("CategoriaId", CategoriaId, System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Input);
            parameters.Add("NombreCategoria", request.NombreCategoria, System.Data.DbType.String, direction: System.Data.ParameterDirection.Input);
            parameters.Add("Descripcion", request.Descripcion, System.Data.DbType.String, direction: System.Data.ParameterDirection.Input);

            await _executor.ExecuteCommand(conexion => conexion.ExecuteAsync(sp, parameters));

            var mensaje = $"Se ha actualizado la Categoria con el ID: {CategoriaId}";
            return mensaje;
        }
    }
}
