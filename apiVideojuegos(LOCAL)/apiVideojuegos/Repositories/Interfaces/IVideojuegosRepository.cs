using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;

namespace apiVideojuegos.Repositories.Interfaces
{
    public interface IVideojuegosRepository
    {

        Task<IEnumerable<VideojuegosDataResponse>> GetAllVideojuegos();

        Task<VideojuegosOneResponse> GetOneVideojuegos(int VideojuegoId);

        Task<string> CreateVideojuegos(VideojuegosRequest request);

        Task<string> UpdateVideojuegos(int VideojuegoId, VideojuegosRequest request);

        Task<string> DeleteVideojuegos(int VideojuegoId);

    }
}
