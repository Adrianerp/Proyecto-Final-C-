using apiVideojuegos.Models;
using apiVideojuegos.Models.Request;
using apiVideojuegos.Models.Response;
using apiVideojuegos.Repositories;
using apiVideojuegos.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace apiVideojuegos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaVideojuegoController : ControllerBase
    {
        private readonly IReservaVideojuegoRepository _reservaVideojuegoRepository;

        public ReservaVideojuegoController(IReservaVideojuegoRepository reservaVideojuegoRepository)
        {
            _reservaVideojuegoRepository = reservaVideojuegoRepository;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ReservaVideojuegoDataReponse>>> GetAllReservaVideojuego()
        {
            var response = await _reservaVideojuegoRepository.GetAllReservaVideojuego();
            return Ok(response);
        }

        [HttpGet("[action]/{ReservaVideojuegoId}")]
        public async Task<ActionResult<ReservaVideojuegoOneResponse>> GetOneReservaVideojuego(int ReservaVideojuegoId)
        {
            var response = await _reservaVideojuegoRepository.GetOneReservaVideojuego(ReservaVideojuegoId);
            return Ok(response);
        }

        [HttpPost("[action]")]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult<Reserva>> CreateReservas([FromBody] ReservaVideojuegoRequest request)
        {
            try
            {
                var response = await _reservaVideojuegoRepository.CreateReservaVideojuego(request);
                return Ok(response);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Error al registrar la venta: " + ex.Message);
            }
        }

        [HttpPut("[action]/{ReservaVideojuegoId}")]
        public async Task<ActionResult<string>> UpdateReservas(int ReservaVideojuegoId, ReservaVideojuegoRequest request)
        {
            var response = await _reservaVideojuegoRepository.UpdateReservaVideojuego(ReservaVideojuegoId, request);
            return Ok(response);
        }

        [HttpDelete("[action]/{ReservaVideojuegoId}")]
        public async Task<ActionResult<string>> DeleteReservaVideojuego(int ReservaVideojuegoId)
        {
            var response = await _reservaVideojuegoRepository.DeleteReservaVideojuego(ReservaVideojuegoId);
            return Ok(response);
        }


    }
}
