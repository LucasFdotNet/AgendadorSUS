-- BD SCHEMES
- Tabela de Usuários (Pacientes)
CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    CPF VARCHAR(14) UNIQUE NOT NULL,
    DataNascimento DATE NOT NULL,
    Telefone VARCHAR(15),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL
);

-- Tabela de Médicos
CREATE TABLE Medicos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    CRM VARCHAR(15) UNIQUE NOT NULL,
    Especialidade VARCHAR(255),
    Telefone VARCHAR(15),
    Email VARCHAR(255) UNIQUE NOT NULL
);

-- Tabela de Postos de Saúde
CREATE TABLE PostosSaude (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Endereco VARCHAR(255),
    Telefone VARCHAR(15),
    CapacidadeMaxima INT NOT NULL
);

-- Tabela de Consultas
CREATE TABLE Consultas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Paciente_ID INT NOT NULL,
    Medico_ID INT NOT NULL,
    Posto_ID INT NOT NULL,
    DataHora DATETIME NOT NULL,
    Status ENUM('Agendada', 'Cancelada', 'Realizada') NOT NULL,
    FOREIGN KEY (Paciente_ID) REFERENCES Usuarios(ID),
    FOREIGN KEY (Medico_ID) REFERENCES Medicos(ID),
    FOREIGN KEY (Posto_ID) REFERENCES PostosSaude(ID)
);

-- Tabela de Horários Disponíveis
CREATE TABLE HorariosDisponiveis (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Medico_ID INT NOT NULL,
    Posto_ID INT NOT NULL,
    DataHora DATETIME NOT NULL,
    FOREIGN KEY (Medico_ID) REFERENCES Medicos(ID),
    FOREIGN KEY (Posto_ID) REFERENCES PostosSaude(ID)
);

-- Tabela de Lembretes
CREATE TABLE Lembretes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Consulta_ID INT NOT NULL,
    DataEnvio DATETIME NOT NULL,
    Status ENUM('Enviado', 'Pendente') NOT NULL,
    FOREIGN KEY (Consulta_ID) REFERENCES Consultas(ID)
);