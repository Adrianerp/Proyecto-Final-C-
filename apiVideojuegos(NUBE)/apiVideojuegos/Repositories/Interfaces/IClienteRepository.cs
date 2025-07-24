using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;

namespace apiVideojuegos.Repositories.Interfaces
{
    public interface IClienteRepository
    {
        Task<IEnumerable<ClienteDataResponse>> GetAllClientes();

        Task<ClienteOneResponse> GetOneClientes(int ClienteId);

        Task<Cliente> CreateClientes(ClienteRequest request);

        Task<string> UpdateClientes(int ClienteId, ClienteRequest request);

        Task<string> DeleteClientes(int ClienteId);
    }
}
