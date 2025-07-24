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
    public class VideojuegosController : ControllerBase
    {
        private readonly IVideojuegosRepository _videojuegosRepository;

        public VideojuegosController(IVideojuegosRepository videojuegosRepository)
        {
            _videojuegosRepository = videojuegosRepository;
        }

        //Endpoint de GetAllVideojuegos
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<VideojuegosDataResponse>>> GetAllVideojuegos()
        { 
            var response = await _videojuegosRepository.GetAllVideojuegos();
            return Ok(response);
        }

        //Endpoint de GetOneVideojuegos
        [HttpGet("[action]/{VideojuegoId}")]
        public async Task<ActionResult<VideojuegosOneResponse>> GetOneVideojuegos(int VideojuegoId)
        {
            var response = await _videojuegosRepository.GetOneVideojuegos(VideojuegoId);
            return Ok(response);
        }

        //Endpoint de CreateVideojuegos
        [HttpPost("[action]")]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult<string>> CreateVideojuegos([FromBody] VideojuegosRequest request)
        {
            var response = await _videojuegosRepository.CreateVideojuegos(request);
            return Ok(response);
        }

        //Endpoint de UpdateVideojuego
        [HttpPut("[action]/{VideojuegoId}")]
        public async Task<ActionResult<string>> UpdateVideojuegos(int VideojuegoId, VideojuegosRequest request)
        {
            var response = await _videojuegosRepository.UpdateVideojuegos(VideojuegoId, request);
            return Ok(response);
        }

        [HttpDelete("[action]/{VideojuegoId}")]
        public async Task<ActionResult<string>> DeleteVideojuegos(int VideojuegoId)
        {
            var response = await _videojuegosRepository.DeleteVideojuegos(VideojuegoId);
            return Ok(response);
        }
    }
}
