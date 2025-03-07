using Microsoft.AspNetCore.Mvc;
using AgendadorSUS;  // Importando o namespace onde o AppDbContext está
using AgendadorSUS.Models;  // Se os modelos como Usuario estiverem na pasta Models
using System.Linq;

namespace AgendadorSUS.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // Método para login
        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            if (usuario == null || string.IsNullOrEmpty(usuario.Email) || string.IsNullOrEmpty(usuario.Senha))
                return BadRequest("Email e senha são obrigatórios.");

            var user = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email);
            if (user == null || user.Senha != usuario.Senha) // Idealmente, use hash de senha aqui
                return Unauthorized("Usuário ou senha inválidos.");

            return Ok("Login bem-sucedido.");
        }

        // Método para registrar um novo usuário
        [HttpPost("registrar")]
        public IActionResult Registrar([FromBody] Usuario usuario)
        {
            if (usuario == null || string.IsNullOrEmpty(usuario.Email) || string.IsNullOrEmpty(usuario.CPF))
                return BadRequest("Email e CPF são obrigatórios.");

            if (_context.Usuarios.Any(u => u.Email == usuario.Email || u.CPF == usuario.CPF))
                return BadRequest("Usuário já cadastrado.");

            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
            return Ok("Usuário cadastrado com sucesso.");
        }
    }
}
