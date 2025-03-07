using Microsoft.AspNetCore.Mvc;
using AgendadorSUS.Models;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration; // Para ler do appsettings.json
using System;

namespace AgendadorSUS.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;  // Injeção de dependência para acessar o appsettings.json
        }

        // Método para login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Senha))
                return BadRequest("Email e senha são obrigatórios.");

            var user = _context.Usuarios.FirstOrDefault(u => u.Email == loginRequest.Email);
            if (user == null || user.Senha != loginRequest.Senha)  // Verificando a senha diretamente
                return Unauthorized("Usuário ou senha inválidos.");

            // Gerar o token JWT
            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
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

        // Método para gerar o JWT
        private string GenerateJwtToken(Usuario user)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, "User"),
                new Claim(JwtRegisteredClaimNames.Iss, _configuration["Jwt:Issuer"]),
                new Claim(JwtRegisteredClaimNames.Aud, _configuration["Jwt:Audience"]),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())  // Definido como DateTime.UtcNow
            };

            // Garantir que a chave secreta tem 32 caracteres (256 bits)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],  // Obtendo do appsettings.json
                audience: _configuration["Jwt:Audience"],  // Obtendo do appsettings.json
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
