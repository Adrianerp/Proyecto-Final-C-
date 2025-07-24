using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;

namespace apiVideojuegos.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<UsuarioDataResponse>> GetAllUsuarios();

        Task<UsuarioOneResponse> GetOneUsuarios(int UsuarioId);

        Task<string> CreateUsuarios(UsuariosRequest request);

        Task<string> UpdateUsuarios(int UsuarioId, UsuariosRequest request);

        Task<string> DeleteUsuarios(int UsuarioId);

        Task<UsuarioLog> LoginUsuario(string nombre, string clave);

    }
}
