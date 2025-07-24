namespace apiVideojuegos.Models.Request
{
    public class ReservaVideojuegoRequest
    {
        public int ReservaId { get; set; }
        public int VideojuegoId { get; set; }
        public int Cantidad { get; set; }

        public decimal Total { get; set; }
    }
}
