using System;

namespace AgendadorSUS.Models
{
    public class Lembrete
    {
        public int ID { get; set; }
        public int Consulta_ID { get; set; }
        public DateTime DataEnvio { get; set; }
        public string Status { get; set; } // 'Enviado', 'Pendente'

        // Relacionamento
        public Consulta Consulta { get; set; }
    }
}
