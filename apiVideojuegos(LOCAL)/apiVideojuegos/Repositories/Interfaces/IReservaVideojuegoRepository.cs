using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;

namespace apiVideojuegos.Repositories.Interfaces
{
    public interface IReservaVideojuegoRepository
    {
        Task<IEnumerable<ReservaVideojuegoDataReponse>> GetAllReservaVideojuego();

        Task<ReservaVideojuegoOneResponse> GetOneReservaVideojuego(int ReservaVideojuegoId);

        Task<string> CreateReservaVideojuego(ReservaVideojuegoRequest request);

        Task<string> UpdateReservaVideojuego(int ReservaVideojuegoId, ReservaVideojuegoRequest request);

        Task<string> DeleteReservaVideojuego(int ReservaVideojuegoId);
    }
}
