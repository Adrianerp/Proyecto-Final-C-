using System.ComponentModel.DataAnnotations;

namespace apiVideojuegos.Models
{
    public class Cliente
    {
        public int ClienteId { get; set; }
        public string? Nombre { get; set; }
        public string? Documento { get; set; }
        public string? Telefono { get; set; }
        public string? Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime FechaRegistro { get; set; }
    }
}
