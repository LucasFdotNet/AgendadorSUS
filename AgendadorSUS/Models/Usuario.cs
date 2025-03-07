namespace AgendadorSUS.Models
{
    public class Usuario
    {
        // Certifique-se de que a classe tenha a propriedade 'Id' como chave primária
        public int Id { get; set; }  // Isso será usado para identificar o usuário

        public string Nome { get; set; }
        public string CPF { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
