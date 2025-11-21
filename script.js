document.addEventListener('DOMContentLoaded', function () {

    // ====== CAPTURA DE ELEMENTOS ======
    const modalAgendamento = document.getElementById('agendamento-modal');
    const modalTime = document.getElementById('time-modal');
    const modalLogin = document.getElementById('login-modal');

    const btnAgendar = document.querySelector('.botao-agendar');
    const btnVerMais = document.querySelector('.botao-ver-mais');
    const btnLogin = document.querySelector('.botao-login');

    const fecharAgendamento = document.querySelector('.fechar-modal');
    const fecharTime = document.querySelector('.fechar-time');
    const fecharLogin = document.getElementById('fechar-login');

    const horarioContainer = document.querySelector('.horarios');
    const confirmarBtn = document.querySelector('.botao-confirmar-agendamento');

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.querySelector(".navbar");

    let cardsEspecialistas = document.querySelectorAll('.card-especialista');
    let cardsEspecialistasModal = document.querySelectorAll('.card-especialista-modal');

    // ===== VARIÁVEIS DO CALENDÁRIO =====
    const diasMesContainer = document.getElementById('dias-mes-container');
    const mesAnoDisplay = document.getElementById('mes-ano-display');
    const prevMesBtn = document.getElementById('prev-mes');
    const nextMesBtn = document.getElementById('next-mes');
    const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let dataAtualCalendario = new Date();
    let diaSelecionado = null;
    let horaSelecionada = null;
    let medicoSelecionado = null;
    let especialidadeSelecionada = null;

    // ===== FUNÇÃO: QUANTIDADE DE DIAS NO MÊS =====
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // ===== FUNÇÃO: GERAR CALENDÁRIO =====
    function gerarCalendario() {

        if (!diasMesContainer) return;

        const ano = dataAtualCalendario.getFullYear();
        const mes = dataAtualCalendario.getMonth();
        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        const diasNoMes = getDaysInMonth(ano, mes);

        mesAnoDisplay.textContent = `${nomesMeses[mes]} ${ano}`;

        let htmlDias = '';

        for (let i = 0; i < primeiroDiaSemana; i++) {
            htmlDias += `<span class="dia-inativo"></span>`;
        }

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const classe = (dia === diaSelecionado) ? 'dia dia-selecionado' : 'dia dia-disponivel';
            htmlDias += `<span class="${classe}" data-dia="${dia}">${dia}</span>`;
        }

        diasMesContainer.innerHTML = htmlDias;
    }

    // ===== CLICANDO NOS DIAS DO CALENDÁRIO =====
    if (diasMesContainer) {
        diasMesContainer.addEventListener('click', e => {
            if (e.target.classList.contains('dia-disponivel')) {
                diasMesContainer.querySelectorAll('.dia').forEach(d => d.classList.remove('dia-selecionado'));
                e.target.classList.add('dia-selecionado');
                diaSelecionado = e.target.dataset.dia;
            }
        });
    }

    if (prevMesBtn) {
        prevMesBtn.addEventListener('click', () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() - 1);
            gerarCalendario();
        });
    }

    if (nextMesBtn) {
        nextMesBtn.addEventListener('click', () => {
            dataAtualCalendario.setMonth(dataAtualCalendario.getMonth() + 1);
            gerarCalendario();
        });
    }

    // ===== SELEÇÃO DE HORÁRIO =====
    if (horarioContainer) {
        horarioContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                horarioContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('hora-selecionada'));
                e.target.classList.add('hora-selecionada');
                horaSelecionada = e.target.textContent;
            }
        });
    }

    // ===== CONFIRMAR AGENDAMENTO =====
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', () => {
            if (!diaSelecionado || !horaSelecionada || !medicoSelecionado) {
                alert('Por favor, selecione um especialista, uma data e um horário.');
                return;
            }

            const mes = nomesMeses[dataAtualCalendario.getMonth()];
            const ano = dataAtualCalendario.getFullYear();

            const agendamento = {
                medico: medicoSelecionado,
                especialidade: especialidadeSelecionada,
                dia: diaSelecionado,
                mes,
                ano,
                hora: horaSelecionada
            };

            localStorage.setItem('agendamentoCliniTech', JSON.stringify(agendamento));

            alert(`✓ Consulta agendada com sucesso!\n\nMédico: ${agendamento.medico}\nEspecialidade: ${agendamento.especialidade}\nData: ${agendamento.dia} de ${agendamento.mes} de ${agendamento.ano}\nHorário: ${agendamento.hora}`);

            modalAgendamento.style.display = "none";
        });
    }

    // ===== ABRIR MODAL DE AGENDAMENTO =====
    if (btnAgendar && modalAgendamento) {
        btnAgendar.addEventListener('click', () => {
            gerarCalendario();
            modalAgendamento.style.display = "flex";
        });
    }

    // ===== FECHAR AGENDAMENTO =====
    if (fecharAgendamento) {
        fecharAgendamento.addEventListener('click', () => {
            modalAgendamento.style.display = "none";
        });
    }

    // ===== MODAL TIME COMPLETO =====
    if (btnVerMais && modalTime) {
        btnVerMais.addEventListener('click', () => {
            modalTime.style.display = "flex";
        });
    }

    if (fecharTime) {
        fecharTime.addEventListener('click', () => {
            modalTime.style.display = "none";
        });
    }

    // ===== ABRIR MODAL DE LOGIN =====
    if (btnLogin && modalLogin) {
        btnLogin.addEventListener('click', () => {
            modalLogin.style.display = "flex";
        });
    }

    // ===== FECHAR LOGIN =====
    if (fecharLogin) {
        fecharLogin.addEventListener('click', () => {
            modalLogin.style.display = "none";
        });
    }

    // ===== FECHAR MODAIS CLICANDO FORA =====
    window.addEventListener('click', (e) => {
        if (e.target === modalAgendamento) modalAgendamento.style.display = "none";
        if (e.target === modalTime) modalTime.style.display = "none";
        if (e.target === modalLogin) modalLogin.style.display = "none";
    });

    // ===== MENU MOBILE =====
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle("active");
        });
    }

});
