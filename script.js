// script.js — MedLink Iteração 2 (compatível com README)
document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------
    // ELEMENTOS
    // ------------------------------
    const modalEspecialidades = document.getElementById("modal-especialidades");
    const modalMedicos        = document.getElementById("modal-medicos") || document.getElementById("modal-time");
    const modalAgendamento    = document.getElementById("agendamento-modal");
    const modalLogin          = document.getElementById("login-modal");

    const fecharEspecialidades = document.querySelector('.fechar-especialidades');
    const fecharMedicos        = document.querySelector('.fechar-medicos') || document.querySelector('.modal-time-close');
    const fecharAgendamento    = document.querySelector('.fechar-modal');
    const fecharLogin          = document.getElementById("fechar-login");

    const btnAgendar = document.querySelector('.botao-agendar');
    const btnLogin   = document.querySelector('.botao-login');

    // ------------------------------
    // LOGIN — credenciais por médico
    // ------------------------------
    const credenciais = [
        {
            email: "medico1@teste.com",
            senha: "1234",
            nome:  "Dr. João Silva",
            pacientes: [
                { nome: "Ana Lima",    data: "12/05/2025", hora: "09:00" },
                { nome: "Bruno Costa", data: "13/05/2025", hora: "10:30" }
            ]
        },
        {
            email: "medico2@teste.com",
            senha: "9999",
            nome:  "Dra. Isabela Costa",
            pacientes: [
                { nome: "Carla Nunes",   data: "14/05/2025", hora: "08:00" },
                { nome: "Diego Martins", data: "15/05/2025", hora: "11:00" }
            ]
        },
        {
            email: "medico3@teste.com",
            senha: "0000",
            nome:  "Dra. Carla Santos",
            pacientes: [
                { nome: "Eduarda Reis", data: "16/05/2025", hora: "14:00" },
                { nome: "Fábio Souza",  data: "17/05/2025", hora: "15:30" }
            ]
        }
    ];

    if (btnLogin && modalLogin) {
        btnLogin.addEventListener("click", () => modalLogin.style.display = "flex");
    }
    if (fecharLogin && modalLogin) {
        fecharLogin.addEventListener("click", () => modalLogin.style.display = "none");
    }

    const formLogin = modalLogin ? modalLogin.querySelector(".form-login") : null;
    if (formLogin) {
        formLogin.addEventListener("submit", e => {
            e.preventDefault();
            const email = document.getElementById("email-login").value.trim();
            const senha = document.getElementById("senha-login").value.trim();
            const medico = credenciais.find(m => m.email === email && m.senha === senha);

            if (medico) {
                modalLogin.style.display = "none";
                formLogin.reset();
                mostrarPopupSucesso(`Bem-vindo(a), ${medico.nome}!`);
                exibirPacientes(medico);
            } else {
                alert("E-mail ou senha incorretos!");
            }
        });
    }

    // Exibe modal com lista de pacientes do médico logado
    function exibirPacientes(medico) {
        let modal = document.getElementById("modal-pacientes");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "modal-pacientes";
            modal.style.cssText = `
                display:none; position:fixed; inset:0; background:rgba(0,0,0,.5);
                z-index:10000; align-items:center; justify-content:center;
            `;
            modal.innerHTML = `
                <div style="background:var(--bg,#fff); border-radius:12px; padding:32px; max-width:480px; width:90%; position:relative;">
                    <button id="fechar-pacientes" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:20px;cursor:pointer;">&times;</button>
                    <h2 id="titulo-pacientes" style="margin-bottom:16px;font-size:18px;"></h2>
                    <table id="tabela-pacientes" style="width:100%;border-collapse:collapse;font-size:14px;">
                        <thead>
                            <tr style="border-bottom:1px solid #ddd;">
                                <th style="text-align:left;padding:6px 8px;">Paciente</th>
                                <th style="text-align:left;padding:6px 8px;">Data</th>
                                <th style="text-align:left;padding:6px 8px;">Hora</th>
                            </tr>
                        </thead>
                        <tbody id="corpo-pacientes"></tbody>
                    </table>
                </div>`;
            document.body.appendChild(modal);
            document.getElementById("fechar-pacientes").addEventListener("click", () => {
                modal.style.display = "none";
            });
            window.addEventListener("click", ev => {
                if (ev.target === modal) modal.style.display = "none";
            });
        }

        document.getElementById("titulo-pacientes").textContent =
            `Agenda de ${medico.nome}`;

        const corpo = document.getElementById("corpo-pacientes");
        corpo.innerHTML = medico.pacientes.map(p => `
            <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:6px 8px;">${p.nome}</td>
                <td style="padding:6px 8px;">${p.data}</td>
                <td style="padding:6px 8px;">${p.hora}</td>
            </tr>`).join("");

        modal.style.display = "flex";
    }

    // ------------------------------
    // Dados dos médicos
    // ------------------------------
    const medicosPorEspecialidade = {
        Cardiologista: [
            { nome: "Dr. João Silva",  img: "ASSETS/medico-cardiologista.jpg" },
            { nome: "Dr. Pedro Moura", img: "ASSETS/foto-cardiologista.jpg" }
        ],
        Ginecologista: [
            { nome: "Dra. Isabela Costa",  img: "ASSETS/Gemini_Generated_Image_bbydlibbydlibbyd.png" },
            { nome: "Dra. Clarissa Prado", img: "ASSETS/medica-ginecolista.jpg" }
        ],
        Pediatra: [
            { nome: "Dra. Carla Santos", img: "ASSETS/medica-pediatra.png" },
            { nome: "Dr. Felipe Ramos",  img: "ASSETS/medica-pediatra.png" }
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
    let medicoSelecionado        = null;
    let diaSelecionado           = null;
    let horaSelecionada          = null;

    // ------------------------------
    // Botões "ver todos" (abre modal de médicos sem filtro)
    // ------------------------------
    const botoesVerTodos = document.querySelectorAll(
        ".botao-ver-mais, .botao-ver-todos, .ver-mais-especialistas"
    );
    botoesVerTodos.forEach(b => {
        b.addEventListener("click", () => {
            if (modalMedicos) {
                renderizarMedicos(null); // exibe todos
                modalMedicos.style.display = "flex";
            }
        });
    });

    if (fecharMedicos && modalMedicos) {
        fecharMedicos.addEventListener("click", () => modalMedicos.style.display = "none");
    }
    window.addEventListener("click", e => {
        if (modalMedicos && e.target === modalMedicos) modalMedicos.style.display = "none";
    });

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
    // Selecionar especialidade → filtra médicos
    // ------------------------------
    if (modalEspecialidades) {
        modalEspecialidades.addEventListener("click", e => {
            const btn = e.target.closest(".btn-especialidade");
            if (!btn) return;

            especialidadeSelecionada = btn.dataset.espec;
            renderizarMedicos(especialidadeSelecionada);

            if (modalMedicos) {
                modalMedicos.style.display = "flex";
                modalMedicos.style.zIndex  = "9999";
            }

            modalEspecialidades.style.display = "none";
            document.body.style.overflow = "";
        });
    }

    // ------------------------------
    // Renderizar lista de médicos filtrada
    // ------------------------------
    function renderizarMedicos(especialidade) {
        // Tenta encontrar o container dentro do modal
        const container =
            (modalMedicos && (
                modalMedicos.querySelector(".modal-time-grid") ||
                modalMedicos.querySelector(".lista-medicos-grid") ||
                modalMedicos.querySelector("#lista-medicos")
            )) ||
            document.getElementById("lista-medicos");

        if (!container) return;

        let lista = [];
        if (especialidade && medicosPorEspecialidade[especialidade]) {
            lista = medicosPorEspecialidade[especialidade];
        } else {
            // Sem filtro: mostra todos
            Object.values(medicosPorEspecialidade).forEach(arr => lista.push(...arr));
        }

        const titulo =
            (modalMedicos && modalMedicos.querySelector(".modal-time-titulo, .modal-medicos-titulo, h2, h3")) ||
            null;
        if (titulo) {
            titulo.textContent = especialidade
                ? `${especialidade}s disponíveis`
                : "Todos os especialistas";
        }

        container.innerHTML = lista.map(m => `
            <div class="modal-time-card medico-card-selecao" style="cursor:pointer;">
                <img src="${m.img}" alt="${m.nome}"
                     style="width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 8px;">
                <h4 style="text-align:center;margin:0;font-size:14px;">${m.nome}</h4>
            </div>`).join("");
    }

    // ------------------------------
    // Selecionar médico → abrir agendamento
    // ------------------------------
    const handleMedicoClick = e => {
        const card =
            e.target.closest(".modal-time-card") ||
            e.target.closest(".medico-card-selecao");
        if (!card) return;

        medicoSelecionado = card.querySelector("h4")?.textContent || null;
        const imgSrc      = card.querySelector("img")?.getAttribute("src") || null;

        if (modalMedicos) modalMedicos.style.display = "none";

        if (modalAgendamento) {
            const agNome = modalAgendamento.querySelector(".agendamento-medico-nome");
            const agImg  = modalAgendamento.querySelector(".agendamento-medico-img");
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
    const mesAnoDisplay    = document.getElementById("mes-ano-display");
    const prevMesBtn       = document.getElementById("prev-mes");
    const nextMesBtn       = document.getElementById("next-mes");

    const nomesMeses = [
        "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
        "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
    ];
    let dataAtual = new Date();

    function gerarCalendario() {
        if (!diasMesContainer || !mesAnoDisplay) return;
        const ano       = dataAtual.getFullYear();
        const mes       = dataAtual.getMonth();
        const primDia   = new Date(ano, mes, 1).getDay();
        const diasMes   = new Date(ano, mes + 1, 0).getDate();
        const hoje      = new Date();
        const dataHoje  = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

        mesAnoDisplay.textContent = `${nomesMeses[mes]} ${ano}`;
        diasMesContainer.innerHTML = "";

        for (let i = 0; i < primDia; i++) {
            diasMesContainer.innerHTML += `<span class="dia-inativo"></span>`;
        }
        for (let d = 1; d <= diasMes; d++) {
            const dataBotao = new Date(ano, mes, d);
            if (dataBotao < dataHoje) {
                diasMesContainer.innerHTML += `<span class="dia dia-desabilitado">${d}</span>`;
            } else {
                diasMesContainer.innerHTML += `<span class="dia dia-disponivel" data-dia="${d}">${d}</span>`;
            }
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

    prevMesBtn?.addEventListener("click", () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        gerarCalendario();
    });
    nextMesBtn?.addEventListener("click", () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        gerarCalendario();
    });

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
    const botaoConfirmar =
        document.querySelector(".botao-confirmarpais") ||
        document.querySelector(".botao-confirmar-agendamento");

    if (botaoConfirmar) {
        botaoConfirmar.addEventListener("click", () => {
            if (!diaSelecionado)                         return alert("Selecione uma data.");
            if (!horaSelecionada)                        return alert("Selecione um horário.");
            if (!especialidadeSelecionada || !medicoSelecionado)
                return alert("Selecione especialidade e médico.");

            const mes = dataAtual.getMonth();
            const ano = dataAtual.getFullYear();
            const agendamento = {
                especialidade: especialidadeSelecionada,
                medico:        medicoSelecionado,
                dia:           diaSelecionado,
                mes:           nomesMeses[mes],
                ano,
                hora:          horaSelecionada
            };
            localStorage.setItem("agendamentoCliniTech", JSON.stringify(agendamento));
            alert(
                `Consulta agendada com sucesso!\n` +
                `${especialidadeSelecionada} — ${medicoSelecionado}\n` +
                `Dia: ${diaSelecionado}/${nomesMeses[mes]}/${ano}\n` +
                `Hora: ${horaSelecionada}`
            );
            if (modalAgendamento) modalAgendamento.style.display = "none";
        });
    }

    // ------------------------------
    // Fechar modal agendamento
    // ------------------------------
    if (fecharAgendamento && modalAgendamento) {
        fecharAgendamento.addEventListener("click", () => {
            modalAgendamento.style.display = "none";
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
                border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,.2);
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
