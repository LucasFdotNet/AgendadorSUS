using System;

namespace AgendadorSUS.Models
{
    public class PostoSaude
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
        public int CapacidadeMaxima { get; set; }
    }
}
