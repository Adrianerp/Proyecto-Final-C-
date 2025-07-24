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
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuariosRepository;

        public UsuariosController(IUsuarioRepository usuariosRepository)
        {
            _usuariosRepository = usuariosRepository;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<UsuarioDataResponse>>> GetAllUsuarios()
        { 
            var response = await _usuariosRepository.GetAllUsuarios();
            return Ok(response);
        }

        [HttpGet("[action]/{UsuarioId}")]
        public async Task<ActionResult<UsuarioOneResponse>> GetOneUsuarios(int UsuarioId)
        {
            var response = await _usuariosRepository.GetOneUsuarios(UsuarioId);
            return Ok(response);
        }

        [HttpPost("[action]")]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult<string>> CreateUsuarios([FromBody] UsuariosRequest request)
        { 
            var response = await _usuariosRepository.CreateUsuarios(request);
            return Ok(response);
        }

        [HttpPut("[action]/{UsuarioId}")]
        public async Task<ActionResult<string>> UpdateUsuarios(int UsuarioId, UsuariosRequest request)
        { 
            var response = await _usuariosRepository.UpdateUsuarios(UsuarioId, request);
            return Ok(response);
        }

        [HttpDelete("[action]/{UsuarioId}")]
        public async Task<ActionResult<string>> DeleteUsuarios(int UsuarioId)
        {
            var response = await _usuariosRepository.DeleteUsuarios(UsuarioId);
            return Ok(response);
        }


        //Login - Inicio de sesion
        [HttpPost("[action]")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var usuario = await _usuariosRepository.LoginUsuario(request.Nombre, request.Clave);

            if (usuario == null)
                return Unauthorized("Nombre o contraseña incorrectos");

            return Ok(usuario);
        }

    }
}
