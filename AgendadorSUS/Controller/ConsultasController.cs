using Microsoft.AspNetCore.Mvc;
using AgendadorSUS;
using AgendadorSUS.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;  // Adicionado para trabalhar com as claims

namespace AgendadorSUS.Controllers
{
    [ApiController]
    [Route("api/consultas")]
    [Authorize]  // Exige autenticação em todas as rotas deste controller
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

            // Não precisa adicionar novamente as entidades, pois já foram verificadas acima
            consulta.Paciente = paciente;
            consulta.Medico = medico;
            consulta.Posto = posto;

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

        // Método GET para listar todas as consultas do usuário logado
        [HttpGet("todas")]
        public IActionResult ConsultasDeUsuario()
        {
            // Pega o ID do usuário logado a partir da claim 'sub' (ID do usuário)
            var usuarioId = User.FindFirstValue(ClaimTypes.NameIdentifier);  // Usado para pegar o 'sub' do JWT, que é o ID do usuário

            if (string.IsNullOrEmpty(usuarioId))
                return Unauthorized("Usuário não autenticado.");

            // Converte o ID do usuário para inteiro (assumindo que o ID seja um número)
            if (!int.TryParse(usuarioId, out int pacienteId))
                return BadRequest("ID do usuário inválido.");

            // Buscar as consultas do usuário logado
            var consultas = _context.Consultas
                .Where(c => c.Paciente_ID == pacienteId)  // Filtra pela ID do paciente
                .Include(c => c.Paciente)                  // Inclui os dados do paciente
                .Include(c => c.Medico)                    // Inclui os dados do médico
                .Include(c => c.Posto)                     // Inclui os dados do posto de saúde
                .ToList();

            if (consultas == null || !consultas.Any())
                return NotFound("Nenhuma consulta encontrada para o usuário.");

            // Retorna as consultas encontradas
            return Ok(consultas);
        }
    }
}
