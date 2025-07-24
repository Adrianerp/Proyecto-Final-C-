using System.ComponentModel.DataAnnotations;

namespace apiVideojuegos.Models.Request
{
    public class ReservaRequest
    {
        public int ClienteId { get; set; }
        public int UsuarioId { get; set; }
        [DataType(DataType.Date)]
        public DateTime FechaLimite {  get; set; }
        [DataType(DataType.Date)]
        public DateTime FechaReal { get; set; }
        public string? Estado { get; set; }
        public decimal Total { get; set; }
    }
}
