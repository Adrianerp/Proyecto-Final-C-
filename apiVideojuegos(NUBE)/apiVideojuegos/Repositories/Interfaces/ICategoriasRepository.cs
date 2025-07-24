using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;

namespace apiVideojuegos.Repositories.Interfaces
{
    public interface ICategoriasRepository
    {

        Task<IEnumerable<CategoriasDataResponse>> GetAllCategorias();
        
        Task<CategoriasOneResponse> GetOneCategorias(int CategoriaId);

        Task<string> CreateCategorias(CategoriaRequest request);

        Task<string> UpdateCategorias(int CategoriaId, CategoriaRequest request);

        Task<string> DeleteCategorias(int CategoriaId);
    }
}
