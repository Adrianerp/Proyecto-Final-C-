using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;

namespace apiVideojuegos.Repositories.Interfaces
{
    public interface IReservaRepository
    {
        Task<IEnumerable<ReservaDataResponse>> GetAllReservas();

        Task<ReservaOneResponse> GetOneReservas(int ReservaId);

        Task<Reserva> CreateReservas(ReservaRequest request);

        Task<string> UpdateReservas(int ReservaId, ReservaRequest request);

        Task<string> DeleteReservas(int ReservaId);

    }
}
