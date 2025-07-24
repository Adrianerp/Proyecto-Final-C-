namespace apiVideojuegos.Models.Response
{
    public class ReservaVideojuegoOneResponse
    {
        public int ReservaVideojuegoId { get; set; }
        public int ReservaId { get; set; }
        public int VideojuegoId { get; set; }
        public string? Titulo { get; set; }

        public decimal Precio { get; set; }
        public int Cantidad { get; set; }

        public decimal Total { get; set; }
    }
}
