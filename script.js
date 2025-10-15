// --- script.js para o site CliniTech ---

document.addEventListener('DOMContentLoaded', function() {
    // VARIÁVEIS COMUNS
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const modal = document.getElementById('agendamento-modal');
    const btnAgendar = document.querySelector('.secao.inicio .botao-agendar');
    const spanFechar = document.getElementsByClassName("fechar-modal")[0];
    const horarioContainer = document.querySelector('.horarios');

    // 1. Funcionalidade do Menu Hamburger (Mobile)
    if (menuToggle && navbar && navLinks) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    navbar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }, 100); 
            });
        });
    }

    // FUNÇÃO DE GERAÇÃO DE CALENDÁRIO SIMULADO (Simula o avanço de anos)
    function gerarCalendarioSimulado(anoFinal) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const tituloModal = document.querySelector('#agendamento-modal h3');

        // Atualiza o título do modal para simular a disponibilidade futura
        if (tituloModal) {
            tituloModal.textContent = `Agendamento de Consulta (Disponível até ${anoFinal})`;
        }
        
        // Mantém a visualização do calendário estática em Outubro 2025 (como na imagem)
        // A complexidade de renderizar meses completos é ignorada, mantendo o visual simples para a apresentação.
    }
    
    // 2. Funcionalidade do Modal de Agendamento
    if (btnAgendar && modal && spanFechar) {
        btnAgendar.onclick = function() {
            modal.style.display = "block";
            // Chama a função para simular a disponibilidade até 2028
            gerarCalendarioSimulado(2028); 
        }

        spanFechar.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // 3. Funcionalidade de Seleção de Horário (Mudar Cor do Botão) 🎨
    if (horarioContainer) {
        horarioContainer.addEventListener('click', function(e) {
            const clickedButton = e.target;
            
            // Verifica se o elemento clicado é um botão de horário.
            // É crucial que todos os botões de horário no HTML tenham a classe 'horario-btn'.
            if (clickedButton.tagName === 'BUTTON' && clickedButton.parentElement === horarioContainer) {
                
                // 1. Remove a classe de seleção de todos os botões no contêiner
                const allButtons = horarioContainer.querySelectorAll('button');
                allButtons.forEach(btn => {
                    btn.classList.remove('hora-selecionada');
                    // Garante que o estado 'disponível' seja o padrão não-selecionado
                    btn.classList.add('hora-disponivel'); 
                });

                // 2. Adiciona a classe de seleção (muda a cor) ao botão clicado
                clickedButton.classList.remove('hora-disponivel');
                clickedButton.classList.add('hora-selecionada');
            }
        });
    }

    // 4. Funcionalidade de Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#login' || this.getAttribute('href') === '#cadastro') {
                return;
            }

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Executa a função inicial para configurar a simulação de ano
    gerarCalendarioSimulado(2028);
});