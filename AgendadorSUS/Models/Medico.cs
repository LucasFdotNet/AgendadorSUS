using System;

namespace AgendadorSUS.Models
{
    public class Medico
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string CRM { get; set; }
        public string Especialidade { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
    }
}
