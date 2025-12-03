// script.js (completo, filtragem correta + login funcional)
document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------
    // ELEMENTOS
    // ------------------------------
    const modalEspecialidades = document.getElementById("modal-especialidades");
    const modalMedicos = document.getElementById("modal-medicos") || document.getElementById("modal-time");
    const modalAgendamento = document.getElementById("agendamento-modal");
    const modalLogin = document.getElementById("login-modal");

    const fecharEspecialidades = document.querySelector('.fechar-especialidades');
    const fecharMedicos = document.querySelector('.fechar-medicos') || document.querySelector('.modal-time-close');
    const fecharAgendamento = document.querySelector('.fechar-modal');
    const fecharLogin = document.getElementById("fechar-login");

    const btnAgendar = document.querySelector('.botao-agendar');
    const btnLogin = document.querySelector('.botao-login');

    // ------------------------------
    // Botões "ver todos"
    // ------------------------------
    const botoesVerTodos = document.querySelectorAll(".botao-ver-mais, .botao-ver-todos, .ver-mais-especialistas");
    botoesVerTodos.forEach(b => {
        b.addEventListener("click", () => {
            if (modalMedicos) modalMedicos.style.display = "flex";
        });
    });

    if (fecharMedicos && modalMedicos) {
        fecharMedicos.addEventListener("click", () => modalMedicos.style.display = "none");
    }
    window.addEventListener("click", e => {
        if (modalMedicos && e.target === modalMedicos) modalMedicos.style.display = "none";
    });

    // ------------------------------
    // Dados dos médicos
    // ------------------------------
    const medicosPorEspecialidade = {
        Cardiologista: [
            { nome: "Dr. João Silva", img: "ASSETS/medico-cardiologista.jpg" },
            { nome: "Dr. Pedro Moura", img: "ASSETS/foto-cardiologista.jpg" }
        ],
        Ginecologista: [
            { nome: "Dra. Isabela Costa", img: "ASSETS/Gemini_Generated_Image_bbydlibbydlibbyd.png" },
            { nome: "Dra. Clarissa Prado", img: "ASSETS/medica-ginecolista.jpg" }
        ],
        Pediatra: [
            { nome: "Dra. Carla Santos", img: "ASSETS/medica-pediatra.png" },
            { nome: "Dr. Felipe Ramos", img: "ASSETS/medica-pediatra.png" }
        ],
        Psiquiatra: [
            { nome: "Dr. Ricardo Lima", img: "ASSETS/medico-psiquiatra.jpg" }
        ],
        Dermatologista: [
            { nome: "Dra. Beatriz Rocha", img: "ASSETS/medica-dermatologista.jpg" }
        ]
    };

    // ------------------------------
    // Estado do fluxo
    // ------------------------------
    let especialidadeSelecionada = null;
    let medicoSelecionado = null;
    let diaSelecionado = null;
    let horaSelecionada = null;

    // ------------------------------
    // Abrir modal especialidades
    // ------------------------------
    if (btnAgendar && modalEspecialidades) {
        btnAgendar.addEventListener("click", () => {
            modalEspecialidades.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    }

    if (fecharEspecialidades && modalEspecialidades) {
        fecharEspecialidades.addEventListener("click", () => {
            modalEspecialidades.style.display = "none";
            document.body.style.overflow = "";
        });
    }

    window.addEventListener("click", e => {
        if (modalEspecialidades && e.target === modalEspecialidades) {
            modalEspecialidades.style.display = "none";
            document.body.style.overflow = "";
        }
    });

    // ------------------------------
    // Selecionar especialidade
    // ------------------------------
    if (modalEspecialidades) {
        modalEspecialidades.addEventListener("click", e => {
            const btn = e.target.closest(".btn-especialidade");
            if (!btn) return;

            especialidadeSelecionada = btn.dataset.espec;
            const lista = medicosPorEspecialidade[especialidadeSelecionada] || [];

            if (modalMedicos) {
                // Selecionar especialidade
                if (modalEspecialidades) {
                    modalEspecialidades.addEventListener("click", e => {
                        const btn = e.target.closest(".btn-especialidade");
                        if (!btn) return;

                        especialidadeSelecionada = btn.dataset.espec;

                        // Apenas abre o modal dos médicos — sem criar nada dinamicamente
                        if (modalMedicos) {
                            modalMedicos.style.display = "flex";
                            modalMedicos.style.zIndex = 9999;
                        }

                        modalEspecialidades.style.display = "none";
                        document.body.style.overflow = "";
                    });
                }


                modalMedicos.style.display = "flex";
                modalMedicos.style.zIndex = 9999;
            }

            modalEspecialidades.style.display = "none";
            document.body.style.overflow = "";
        });
    }

    // ------------------------------
    // Selecionar médico
    // ------------------------------
    const handleMedicoClick = e => {
        const card = e.target.closest(".modal-time-card") || e.target.closest(".medico-card-selecao");
        if (!card) return;

        medicoSelecionado = card.querySelector("h4")?.textContent || null;
        const imgSrc = card.querySelector("img")?.getAttribute("src") || null;

        if (modalMedicos) modalMedicos.style.display = "none";

        if (modalAgendamento) {
            const agNome = modalAgendamento.querySelector(".agendamento-medico-nome");
            const agImg = modalAgendamento.querySelector(".agendamento-medico-img");
            if (agNome) agNome.textContent = medicoSelecionado;
            if (agImg && imgSrc) agImg.setAttribute("src", imgSrc);

            modalAgendamento.style.display = "flex";
            gerarCalendario();
        }
    };

    if (modalMedicos) modalMedicos.addEventListener("click", handleMedicoClick);
    const listaMedicosDiv = document.getElementById("lista-medicos");
    if (listaMedicosDiv) listaMedicosDiv.addEventListener("click", handleMedicoClick);

    // ------------------------------
    // Calendário
    // ------------------------------
    const diasMesContainer = document.getElementById("dias-mes-container");
    const mesAnoDisplay = document.getElementById("mes-ano-display");
    const prevMesBtn = document.getElementById("prev-mes");
    const nextMesBtn = document.getElementById("next-mes");

    const nomesMeses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    let dataAtual = new Date();

    function gerarCalendario() {
        if (!diasMesContainer || !mesAnoDisplay) return;
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        const primeiroDia = new Date(ano, mes, 1).getDay();
        const diasMes = new Date(ano, mes + 1, 0).getDate();

        mesAnoDisplay.textContent = `${nomesMeses[mes]} ${ano}`;
        diasMesContainer.innerHTML = "";

        const hoje = new Date();
        for (let i = 0; i < primeiroDia; i++) diasMesContainer.innerHTML += `<span class="dia-inativo"></span>`;
        for (let d = 1; d <= diasMes; d++) {
            const dataBotao = new Date(ano, mes, d);
            const dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
            if (dataBotao < dataHoje) diasMesContainer.innerHTML += `<span class="dia dia-desabilitado">${d}</span>`;
            else diasMesContainer.innerHTML += `<span class="dia dia-disponivel" data-dia="${d}">${d}</span>`;
        }
    }

    if (diasMesContainer) {
        diasMesContainer.addEventListener("click", e => {
            if (!e.target.classList.contains("dia-disponivel")) return;
            diasMesContainer.querySelectorAll(".dia").forEach(d => d.classList.remove("dia-selecionado"));
            e.target.classList.add("dia-selecionado");
            diaSelecionado = e.target.dataset.dia;
        });
    }

    prevMesBtn?.addEventListener("click", () => { dataAtual.setMonth(dataAtual.getMonth() - 1); gerarCalendario(); });
    nextMesBtn?.addEventListener("click", () => { dataAtual.setMonth(dataAtual.getMonth() + 1); gerarCalendario(); });

    // ------------------------------
    // Horários
    // ------------------------------
    const horariosContainer = document.querySelector(".horarios");
    if (horariosContainer) {
        horariosContainer.addEventListener("click", e => {
            if (e.target.tagName !== "BUTTON") return;
            horariosContainer.querySelectorAll("button").forEach(b => b.classList.remove("hora-selecionada"));
            e.target.classList.add("hora-selecionada");
            horaSelecionada = e.target.textContent;
        });
    }

    // ------------------------------
    // Confirmar agendamento
    // ------------------------------
    const botaoConfirmar = document.querySelector(".botao-confirmarpais") || document.querySelector(".botao-confirmar-agendamento");
    if (botaoConfirmar) {
        botaoConfirmar.addEventListener("click", () => {
            if (!diaSelecionado) return alert("Selecione uma data.");
            if (!horaSelecionada) return alert("Selecione um horário.");
            if (!especialidadeSelecionada || !medicoSelecionado) return alert("Selecione especialidade e médico.");

            const mes = dataAtual.getMonth();
            const ano = dataAtual.getFullYear();
            const agendamento = {
                especialidade: especialidadeSelecionada,
                medico: medicoSelecionado,
                dia: diaSelecionado,
                mes: nomesMeses[mes],
                ano: ano,
                hora: horaSelecionada
            };
            localStorage.setItem("agendamentoCliniTech", JSON.stringify(agendamento));
            alert(`Consulta agendada com sucesso!\n${especialidadeSelecionada} - ${medicoSelecionado}\nDia: ${diaSelecionado}/${nomesMeses[mes]}/${ano}\nHora: ${horaSelecionada}`);
            if (modalAgendamento) modalAgendamento.style.display = "none";
        });
    }

    // ------------------------------
    // LOGIN FUNCIONAL
    // ------------------------------
    if (btnLogin && modalLogin) btnLogin.addEventListener("click", () => modalLogin.style.display = "flex");
    if (fecharLogin && modalLogin) fecharLogin.addEventListener("click", () => modalLogin.style.display = "none");

    const formLogin = modalLogin.querySelector(".form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", e => {
            e.preventDefault();
            const email = document.getElementById("email-login").value.trim();
            const senha = document.getElementById("senha-login").value.trim();

            // validação simulada
            if (email === "admin@teste.com" && senha === "1234") {
                modalLogin.style.display = "none";
                mostrarPopupSucesso("Logado com sucesso!");
                formLogin.reset();
            } else {
                alert("E-mail ou senha incorretos!");
            }
        });
    }

    // ------------------------------
    // POPUP DE SUCESSO
    // ------------------------------
    function mostrarPopupSucesso(mensagem = "Logado com sucesso!", tempo = 3000) {
        let popup = document.getElementById("popup-sucesso");
        if (!popup) {
            popup = document.createElement("div");
            popup.id = "popup-sucesso";
            popup.style.cssText = `
                display:none; position:fixed; top:20px; right:20px;
                background:#4caf50; color:white; padding:15px 25px;
                border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.2);
                z-index:10000; font-size:16px;
            `;
            document.body.appendChild(popup);
        }
        popup.textContent = mensagem;
        popup.style.display = "block";
        setTimeout(() => { popup.style.display = "none"; }, tempo);
    }

    gerarCalendario();
});
