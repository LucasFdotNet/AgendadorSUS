-- Inserir Postos de Saúde
INSERT INTO PostosSaude (Nome, Endereco, Telefone, CapacidadeMaxima)
VALUES
('Posto de Saúde Central', 'Rua Central, 123', '(11) 3030-3030', 50),
('Posto de Saúde Zona Sul', 'Avenida Sul, 456', '(21) 3030-4040', 60),
('Posto de Saúde Oeste', 'Rua Oeste, 789', '(31) 3030-5050', 40);

-- Inserir Médicos
INSERT INTO Medicos (Nome, CRM, Especialidade, Telefone, Email)
VALUES
('Dr. João Silva', '12345', 'Cardiologia', '(11) 91234-5678', 'joao.silva@medico.com'),
('Dr. Maria Santos', '67890', 'Pediatria', '(21) 99876-5432', 'maria.santos@medico.com'),
('Dr. Lucas Pereira', '11223', 'Dermatologia', '(31) 92345-6789', 'lucas.pereira@medico.com');
