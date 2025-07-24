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
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriasRepository _categoriasRepository;

        public CategoriasController(ICategoriasRepository categoriasRepository)
        {
            _categoriasRepository = categoriasRepository;
        }

        //Endpoint de SelectCategorias
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<CategoriasDataResponse>>> GetAllCategorias()
        { 
            var response = await _categoriasRepository.GetAllCategorias();
            return Ok(response);
        }

        //Endpoint de SelectCategoriasOne
        [HttpGet("[action]/{CategoriaId}")]
        public async Task<ActionResult<CategoriasOneResponse>> GetOneCategorias(int CategoriaId)
        {
            var response = await _categoriasRepository.GetOneCategorias(CategoriaId);
            return Ok(response);
        }

        //Endpoint de CreateCategorias
        [HttpPost("[action]")]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult<string>> CreateCategorias([FromBody] CategoriaRequest request)
        {
            var response = await _categoriasRepository.CreateCategorias(request);
            return Ok(response);
        }

        //Endpoint de UpdateCategorias
        [HttpPut("[action]/{CategoriaId}")]
        public async Task<ActionResult<string>> UpdateCategorias(int CategoriaId, CategoriaRequest request)
        {
            var response = await _categoriasRepository.UpdateCategorias(CategoriaId, request);
            return Ok(response);
        }


        [HttpDelete("[action]/{CategoriaId}")]
        public async Task<ActionResult<string>> DeleteCategorias(int CategoriaId)
        {
            var response = await _categoriasRepository.DeleteCategorias(CategoriaId);
            return Ok(response);
        }
        
    }
}
