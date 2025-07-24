using System.ComponentModel.DataAnnotations;

namespace apiVideojuegos.Models.Request
{
    public class VideojuegosRequest
    {
        public string? Titulo { get; set; }
        public string? Genero { get; set; }
        public string? Plataforma { get; set; }
        public int Stock { get; set; }
        public decimal Precio { get; set; }
        [DataType(DataType.Date)]
        public DateTime? FechaLanzamiento { get; set; }
        public int CategoriaId { get; set; }
    }
}
