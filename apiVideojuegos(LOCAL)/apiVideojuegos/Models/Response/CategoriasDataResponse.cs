using System.ComponentModel;

namespace apiVideojuegos.Models.Response
{
    public class CategoriasDataResponse
    {
        public int CategoriaId { get; set; }
        public string? NombreCategoria { get; set; }
        public string? Descripcion { get; set; }
    }
}
