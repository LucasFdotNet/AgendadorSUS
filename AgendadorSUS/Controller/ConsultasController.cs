using Microsoft.AspNetCore.Mvc;
using AgendadorSUS;  
using AgendadorSUS.Models;  
using System.Linq;

namespace AgendadorSUS.Controllers
{
    [ApiController]
    [Route("api/consultas")]
    public class ConsultasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsultasController(AppDbContext context)
        {
            _context = context;
        }

        // Método para criar uma nova consulta
        [HttpPost("criar")]
        public IActionResult CriarConsulta([FromBody] Consulta consulta)
        {
            if (consulta == null)
                return BadRequest("Dados da consulta são obrigatórios.");

            // Verifica se o paciente, médico e posto de saúde existem
            var paciente = _context.Usuarios.Find(consulta.Paciente_ID);
            var medico = _context.Medicos.Find(consulta.Medico_ID);
            var posto = _context.PostosSaude.Find(consulta.Posto_ID);

            if (paciente == null || medico == null || posto == null)
                return NotFound("Paciente, Médico ou Posto de Saúde não encontrado.");

            consulta.Status = "Agendada";  // Status inicial da consulta
            _context.Consultas.Add(consulta);
            _context.SaveChanges();

            return Ok("Consulta criada com sucesso.");
        }

        // Método para alterar uma consulta existente
        [HttpPut("alterar/{id}")]
        public IActionResult AlterarConsulta(int id, [FromBody] Consulta novaConsulta)
        {
            if (novaConsulta == null)
                return BadRequest("Dados da consulta são obrigatórios.");

            var consulta = _context.Consultas.Find(id);
            if (consulta == null)
                return NotFound("Consulta não encontrada.");

            // Atualiza os dados da consulta
            consulta.DataHora = novaConsulta.DataHora;
            _context.SaveChanges();

            return Ok("Consulta alterada com sucesso.");
        }

        // Método para cancelar uma consulta
        [HttpPut("cancelar/{id}")]
        public IActionResult CancelarConsulta(int id)
        {
            var consulta = _context.Consultas.Find(id);
            if (consulta == null)
                return NotFound("Consulta não encontrada.");

            consulta.Status = "Cancelada";
            _context.SaveChanges();

            return Ok("Consulta cancelada com sucesso.");
        }
    }
}
