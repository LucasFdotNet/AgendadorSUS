using System;

namespace AgendadorSUS.Models
{
    public class Consulta
    {
        public int ID { get; set; }
        public int Paciente_ID { get; set; }
        public int Medico_ID { get; set; }
        public int Posto_ID { get; set; }
        public DateTime DataHora { get; set; }
        public string Status { get; set; } // 'Agendada', 'Cancelada', 'Realizada'

        // Relacionamentos
        public Usuario Paciente { get; set; }
        public Medico Medico { get; set; }
        public PostoSaude Posto { get; set; }
    }
}
