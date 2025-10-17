// --- script.js para o site CliniTech (FINAL) ---

document.addEventListener('DOMContentLoaded', function() {
    // VARIÁVEIS COMUNS
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const modal = document.getElementById('agendamento-modal');
    const btnAgendar = document.querySelector('.secao.inicio .botao-agendar');
    const spanFechar = document.getElementsByClassName("fechar-modal")[0];
    const horarioContainer = document.querySelector('.horarios');
    
    // VARIÁVEIS DO CALENDÁRIO
    const diasMesContainer = document.getElementById('dias-mes-container');
    const mesAnoDisplay = document.getElementById('mes-ano-display');
    const prevMesBtn = document.getElementById('prev-mes');
    const nextMesBtn = document.getElementById('next-mes');
    const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    // Inicia a data no mês atual para navegação (Ou use um mês fixo como 2025, 9 (Outubro) para demonstração)
    let dataAtualCalendario = new Date(2025, 9, 1); 

    // FUNÇÕES DO CALENDÁRIO
    function getDaysInMonth(year, month) {
        // Retorna o número de dias no mês
        return new Date(year, month + 1, 0).getDate();
    }

    function gerarCalendario() {
        if (!diasMesContainer || !mesAnoDisplay) return;

        const ano = dataAtualCalendario.getFullYear();
        const mes = dataAtualCalendario.getMonth();
        const primeiroDiaSemana = dataAtualCalendario.getDay(); // 0 = Dom, 6 = Sáb
        const diasNoMes = getDaysInMonth(ano, mes);
        
        // Limites de Agendamento
        const dataMinima = new Date(); // Mês atual
        dataMinima.setDate(1); 
        const limiteAno = 2028; 
        const limiteMes = 11; // Dezembro 2028
        let dataLimite = new Date(limiteAno, limiteMes, getDaysInMonth(limiteAno, limiteMes));
        
        // Atualiza a exibição do Mês/Ano
        mesAnoDisplay.textContent = `${nomesMeses[mes]} ${ano}`;
        
        // Habilita/Desabilita setas com base nos limites
        prevMesBtn.style.visibility = (dataAtualCalendario.getTime() <= dataMinima.getTime()) ? 'hidden' : 'visible';
        nextMesBtn.style.visibility = (dataAtualCalendario.getTime() >= dataLimite.getTime()) ? 'hidden' : 'visible';

        let htmlDias = '';
        
        // 1. Cria espaços vazios (dias do mês anterior)
        for (let i = 0; i < primeiroDiaSemana; i++) {
            htmlDias += `<span class="dia-inativo"></span>`;
        }

        // 2. Cria os dias do mês
        for (let dia = 1; dia <= diasNoMes; dia++) {
            let classe = 'dia';
            let dataDia = new Date(ano, mes, dia);

            // Verifica se o dia é anterior ao dia de hoje (apenas para o mês atual)
            if (dataDia.getTime() < new Date().setHours(0,0,0,0)) {
                classe += ' dia-inativo';
            } else if (dia === 7 && mes === 9 && ano === 2025) {
                // Seleção inicial de demonstração (Dia 7 de Outubro 2025)
                classe += ' dia-selecionado';
            } else {
                classe += ' dia-disponivel';
            }
            
            htmlDias += `<span class="${classe}" data-dia="${dia}">${dia}</span>`;
        }

        diasMesContainer.innerHTML = htmlDias;
    }
    
    // LÓGICA DE NAVEGAÇÃO DE MÊS
    if (prevMesBtn && nextMesBtn) {
        prevMesBtn.addEventListener('click', () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() - 1);
            gerarCalendario();
        });

        nextMesBtn.addEventListener('click', () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() + 1);
            gerarCalendario();
        });
    }

    // LÓGICA DE SELEÇÃO DE DIA NO CALENDÁRIO 📅
    if (diasMesContainer) {
        diasMesContainer.addEventListener('click', function(e) {
            const clickedDay = e.target;
            
            // Verifica se é um dia disponível
            if (clickedDay.classList.contains('dia-disponivel')) {
                // 1. Remove a seleção de todos os dias
                const allDays = diasMesContainer.querySelectorAll('.dia');
                allDays.forEach(day => {
                    day.classList.remove('dia-selecionado');
                    // Garante que só os disponíveis possam ser clicados
                    if (!day.classList.contains('dia-inativo')) {
                        day.classList.add('dia-disponivel');
                    }
                });
                
                // 2. Adiciona a seleção ao dia clicado
                clickedDay.classList.remove('dia-disponivel');
                clickedDay.classList.add('dia-selecionado');
            }
        });
    }

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

    // 2. Funcionalidade do Modal de Agendamento
    if (btnAgendar && modal && spanFechar) {
        btnAgendar.onclick = function() {
            // Define o calendário para Outubro 2025 ao abrir (mês inicial da demonstração)
            dataAtualCalendario = new Date(2025, 9, 1); 
            gerarCalendario(); 
            modal.style.display = "block";
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

    // 3. Funcionalidade de Seleção de Horário (Mudar Cor do Botão) 
    if (horarioContainer) {
        horarioContainer.addEventListener('click', function(e) {
            const clickedButton = e.target;
            
            if (clickedButton.tagName === 'BUTTON' && clickedButton.parentElement === horarioContainer) {
                
                // 1. Remove a classe de seleção de todos os botões de horário
                const allButtons = horarioContainer.querySelectorAll('button');
                allButtons.forEach(btn => {
                    btn.classList.remove('hora-selecionada');
                    // Assume que todos os botões são disponíveis se não estiverem selecionados
                    btn.classList.add('hora-disponivel'); 
                });

                // 2. Adiciona a classe de seleção (muda a cor azul) ao botão clicado
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
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

        // ===== MODAL DE LOGIN =====
    const loginBtn = document.querySelector('.botao-login');
    const modalLogin = document.getElementById('login-modal');
    const fecharLogin = document.getElementById('fechar-login');

    // Abrir modal
    loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalLogin.style.display = 'flex';
    });

    // Fechar ao clicar no X
    fecharLogin.addEventListener('click', () => {
    modalLogin.style.display = 'none';
    });

    // Fechar ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === modalLogin) {
            modalLogin.style.display = 'none';
        }
    });

    
});