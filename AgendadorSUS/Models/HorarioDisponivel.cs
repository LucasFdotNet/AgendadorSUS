using System;

namespace AgendadorSUS.Models
{
    public class HorarioDisponivel
    {
        public int ID { get; set; }
        public int Medico_ID { get; set; }
        public int Posto_ID { get; set; }
        public DateTime DataHora { get; set; }

        // Relacionamentos
        public Medico Medico { get; set; }
        public PostoSaude Posto { get; set; }
    }
}
