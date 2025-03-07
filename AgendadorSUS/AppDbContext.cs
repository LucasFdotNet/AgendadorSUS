using AgendadorSUS.Models;

using Microsoft.EntityFrameworkCore;

namespace AgendadorSUS
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets para as tabelas no banco de dados
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Medico> Medicos { get; set; }
        public DbSet<PostoSaude> PostosSaude { get; set; }
        public DbSet<Consulta> Consultas { get; set; }
        public DbSet<HorarioDisponivel> HorariosDisponiveis { get; set; }
        public DbSet<Lembrete> Lembretes { get; set; }

        // Configurações adicionais, como relações e chaves primárias, podem ser feitas aqui se necessário
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Exemplo: Configurar relacionamento e chaves
            modelBuilder.Entity<Consulta>()
                .HasOne(c => c.Paciente)
                .WithMany()
                .HasForeignKey(c => c.Paciente_ID);

            modelBuilder.Entity<Consulta>()
                .HasOne(c => c.Medico)
                .WithMany()
                .HasForeignKey(c => c.Medico_ID);

            modelBuilder.Entity<Consulta>()
                .HasOne(c => c.Posto)
                .WithMany()
                .HasForeignKey(c => c.Posto_ID);

            modelBuilder.Entity<HorarioDisponivel>()
                .HasOne(h => h.Medico)
                .WithMany()
                .HasForeignKey(h => h.Medico_ID);

            modelBuilder.Entity<HorarioDisponivel>()
                .HasOne(h => h.Posto)
                .WithMany()
                .HasForeignKey(h => h.Posto_ID);

            modelBuilder.Entity<Lembrete>()
                .HasOne(l => l.Consulta)
                .WithMany()
                .HasForeignKey(l => l.Consulta_ID);
        }
    }
}
