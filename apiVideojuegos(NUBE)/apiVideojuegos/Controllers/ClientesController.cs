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
    public class ClientesController : ControllerBase
    {
        private readonly IClienteRepository _clienteRepository;

        public ClientesController(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ClienteDataResponse>>> GetAllClientes()
        {
            var response = await _clienteRepository.GetAllClientes();
            return Ok(response);
        }

        [HttpGet("[action]/{ClienteId}")]
        public async Task<ActionResult<ClienteOneResponse>> GetOneClientes(int ClienteId)
        {
            var response = await _clienteRepository.GetOneClientes(ClienteId);
            return Ok(response);
        }

        [HttpPost("[action]")]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult<string>> CreateClientes([FromBody] ClienteRequest request)
        {
            var response = await _clienteRepository.CreateClientes(request);
            return Ok(response);
        }

        [HttpPut("[action]/{ClienteId}")]
        public async Task<ActionResult<string>> UpdateClientes(int ClienteId, ClienteRequest request)
        {
            var response = await _clienteRepository.UpdateClientes(ClienteId, request);
            return Ok(response);
        }

        [HttpDelete("[action]/{ClienteId}")]
        public async Task<ActionResult<string>> DeleteClientes(int ClienteId)
        {
            var response = await _clienteRepository.DeleteClientes(ClienteId);
            return Ok(response);
        }



    }
}
