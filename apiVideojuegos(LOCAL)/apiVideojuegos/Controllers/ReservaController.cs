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
    public class ReservaController : ControllerBase
    {
        private readonly IReservaRepository _reservaRepository;

        public ReservaController(IReservaRepository reservaRepository)
        { 
            _reservaRepository = reservaRepository;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ReservaDataResponse>>> GetAllReservas()
        {
            var response = await _reservaRepository.GetAllReservas();
            return Ok(response);
        }

        [HttpGet("[action]/{ReservaId}")]
        public async Task<ActionResult<ReservaOneResponse>> GetOneReservas(int ReservaId)
        {
            var response = await _reservaRepository.GetOneReservas(ReservaId);
            return Ok(response);
        }

        [HttpPost("[action]")]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult<string>> CreateReservas([FromBody] ReservaRequest request)
        {
            var response = await _reservaRepository.CreateReservas(request);
            return Ok(response);
        }

        [HttpPut("[action]/{ReservaId}")]
        public async Task<ActionResult<string>> UpdateReservas(int ReservaId, ReservaRequest request)
        {
            var response = await _reservaRepository.UpdateReservas(ReservaId, request);
            return Ok(response);
        }

        [HttpDelete("[action]/{ReservaId}")]
        public async Task<ActionResult<string>> DeleteReservas(int ReservaId)
        {
            var response = await _reservaRepository.DeleteReservas(ReservaId);
            return Ok(response);
        }

    }
}
