# 🩺 MedLink — Plataforma de Telemedicina  
**Projeto acadêmico – Iteração 2**  
**Deploy:** https://gabrielagles.github.io/MedLink/

---

## 📘 Sobre o Projeto
O **MedLink** é uma plataforma de telemedicina desenvolvida como parte da disciplina *Prática Profissional em Análise e Desenvolvimento de Sistemas*.  
O sistema permite que pacientes:

- Visualizem especialidades disponíveis  
- Consultem a lista de médicos  
- Realizem login  
- Agendem consultas escolhendo **especialidade, médico, data e horário**  

---

## 🚀 Funcionalidades Implementadas na Iteração 2

### ✔ Sistema de Agendamento
- Seleção da **especialidade**
**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado

- Listagem dinâmica dos médicos de acordo com a especialidade
**Resultado**
( ) Sucesso
( ) Não executado
( ) Falha 
( X ) Cancelado
 
- Seleção de médico
**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado
 
- Calendário funcional
**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado
  
- Seleção de horário
**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado
  
- Confirmação de agendamento
**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado
  
- Armazenamento no `localStorage`
**Resultado**
( ) Sucesso
( X ) Não executado (Guardado tudo no JS)
( ) Falha 
( ) Cancelado
  
- Exibição de mensagem:  
  **"Consulta agendada com sucesso"**
**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado
  

---

✔ Sistema de Login

O sistema possui autenticação funcional com validação de credenciais específicas para cada médico.
Cada médico, ao realizar login, tem acesso à sua própria lista de pacientes agendados.

Credenciais dos Médicos
🩺 Médico 1 — Dr. João Silva

E-mail: medico1@teste.com

Senha: 1234

Acesso: Lista personalizada de pacientes do Dr. João.

**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado


🩺 Médico 2 — Dra. Isabela Costa

E-mail: medico2@teste.com

Senha: 9999

Acesso: Pacientes específicos da especialidade da Dra. Isabela.

**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado

🩺 Médico 3 — Dra. Carla Santos

E-mail: medico3@teste.com

Senha: 0000

Acesso: Agenda exclusiva com seus próprios pacientes.

Mensagens de retorno

Erro:
→ “E-mail ou senha incorretos”

Sucesso:
→ “Logado com sucesso!”

**Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado

---

### ✔ Lista de Especialistas
- Exibição de todas as especialidades
  **Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado

- Separação por categoria (Cardiologia, Ginecologia etc.)
  **Resultado**
( X ) Sucesso
( ) Não executado
( ) Falha 
( ) Cancelado
  
- Modal organizado por especialidade
  **Resultado**
( ) Sucesso
( ) Não executado
( ) Falha 
( X ) Cancelado
  
- Filtragem funcionando corretamente
  **Resultado**
( ) Sucesso
( ) Não executado
( ) Falha 
( X ) Cancelado
---

## 🧩 Requisitos para Rodar o Projeto

Esse projeto é totalmente front-end.  
Você **não precisa instalar nada**, apenas:

### ✔ Navegador atualizado (Chrome, Edge, Firefox etc.)  
### ✔ Servidor local (opcional)  
Se quiser rodar localmente com Live Server:  
1. Instale a extensão **Live Server** no VS Code  
2. Abra a pasta do projeto  
3. Clique com botão direito no `index.html`  
4. Clique **Open with Live Server**

---

## 🛠 Como Executar no Computador

### 🔹 1. Baixe o projeto

git clone https://github.com/gabrielagles/MedLink.git

### 🔹 2. Acesse a pasta

cd MedLink

### 🔹 3. Execute

Abra o arquivo


Ou utilize Live Server.

---

## 🔖 Tag de Versão – Iteração 2

O código da Iteração 2 está identificado com a tag:

v2

Para criar a tag manualmente:

git tag v2
git push origin v2


---

## 🌐 Deploy (GitHub Pages)

O sistema está disponível em:

➡ **https://gabrielagles.github.io/MedLink/**

---

## 👨‍💻 Desenvolvedor

**Gabriel Agles Gomes**  
Aluno de Análise e Desenvolvimento de Sistemas  
Faculdade Presbiteriana Mackenzie

---






