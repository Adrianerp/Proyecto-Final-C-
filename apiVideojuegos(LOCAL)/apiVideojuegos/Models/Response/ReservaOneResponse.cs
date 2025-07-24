using System.ComponentModel.DataAnnotations;

namespace apiVideojuegos.Models.Response
{
    public class ReservaOneResponse
    {
        public int ReservaId { get; set; }
        public int ClienteId { get; set; }
        public string? NombreCliente { get; set; }
        public int UsuarioId { get; set; }
        public string? NombreUsuario { get; set; }

        [DataType(DataType.Date)]
        public DateTime FechaReserva { get; set; }

        [DataType(DataType.Date)]
        public DateTime FechaLimite { get; set; }

        [DataType(DataType.Date)]
        public DateTime FechaReal { get; set; }
        public string? Estado { get; set; }

        public decimal Total { get; set; }
    }
}
