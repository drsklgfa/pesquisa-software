document.addEventListener("DOMContentLoaded", () => {
  const parametros = new URLSearchParams(window.location.search);
  const tipo = parametros.get("tipo");
  const pesquisa = obterPesquisa(tipo);

  const formulario = document.getElementById("formPesquisa");
  const mensagemErroPagina = document.getElementById("mensagemErroPagina");

  if (!pesquisa) {
    exibirErroPagina(
      "A pesquisa selecionada não foi encontrada. Volte à página inicial e escolha uma opção válida."
    );

    return;
  }

  inicializarPesquisa(tipo, pesquisa);
  configurarEventos(pesquisa);
  configurarContadores();
  configurarEnvio(tipo, pesquisa);

  formulario.classList.remove("oculto");

  function exibirErroPagina(mensagem) {
    if (mensagemErroPagina) {
      mensagemErroPagina.textContent = mensagem;
      mensagemErroPagina.classList.remove("oculto");
    }

    if (formulario) {
      formulario.classList.add("oculto");
    }
  }
});

function inicializarPesquisa(tipo, pesquisa) {
  document.title = pesquisa.titulo;

  preencherTexto("codigoPesquisa", pesquisa.codigo);
  preencherTexto("tituloPesquisa", pesquisa.titulo);
  preencherTexto("descricaoPesquisa", pesquisa.descricao);

  preencherValor("tipoPesquisa", tipo);
  preencherValor("tituloPesquisaCampo", pesquisa.titulo);
  preencherValor("codigoPesquisaCampo", pesquisa.codigo);

  preencherCargos(pesquisa.cargos);
  montarFuncionalidades(pesquisa);
  preencherPrioridades(pesquisa);
}

function preencherTexto(id, texto) {
  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.textContent = texto || "";
  }
}

function preencherValor(id, valor) {
  const elemento = document.getElementById(id);

  if (elemento) {
    elemento.value = valor || "";
  }
}

function preencherCargos(cargos) {
  const select = document.getElementById("cargo");

  if (!select || !Array.isArray(cargos)) {
    return;
  }

  cargos.forEach((cargo) => {
    const option = document.createElement("option");

    option.value = cargo;
    option.textContent = cargo;

    select.appendChild(option);
  });
}

function preencherPrioridades(pesquisa) {
  const select = document.getElementById("funcionalidadePrimeiro");

  if (!select) {
    return;
  }

  const opcoes = obterOpcoesPrioridade(pesquisa);

  opcoes.forEach((opcao) => {
    const option = document.createElement("option");

    option.value = opcao.valor;
    option.textContent = opcao.rotulo;

    select.appendChild(option);
  });

  const outro = document.createElement("option");

  outro.value = "Outra funcionalidade";
  outro.textContent = "Outra funcionalidade";

  select.appendChild(outro);
}

function montarFuncionalidades(pesquisa) {
  const container = document.getElementById("funcionalidadesContainer");

  if (!container || !Array.isArray(pesquisa.grupos)) {
    return;
  }

  container.innerHTML = "";

  pesquisa.grupos.forEach((grupo, indiceGrupo) => {
    const blocoGrupo = document.createElement("section");
    blocoGrupo.className = "grupo-funcionalidades";

    const cabecalho = document.createElement("div");
    cabecalho.className = "cabecalho-grupo-funcionalidades";

    const titulo = document.createElement("h3");
    titulo.textContent = grupo.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = grupo.descricao || "";

    cabecalho.appendChild(titulo);

    if (grupo.descricao) {
      cabecalho.appendChild(descricao);
    }

    blocoGrupo.appendChild(cabecalho);

    const tabela = document.createElement("div");
    tabela.className = "tabela-funcionalidades";

    const cabecalhoTabela = document.createElement("div");
    cabecalhoTabela.className =
      "linha-funcionalidade cabecalho-tabela-funcionalidades";

    const tituloRecurso = document.createElement("div");
    tituloRecurso.textContent = "Funcionalidade";

    const tituloAvaliacao = document.createElement("div");
    tituloAvaliacao.textContent = "Importância";

    cabecalhoTabela.appendChild(tituloRecurso);
    cabecalhoTabela.appendChild(tituloAvaliacao);

    tabela.appendChild(cabecalhoTabela);

    grupo.funcionalidades.forEach((funcionalidade, indiceFuncionalidade) => {
      const linha = document.createElement("div");
      linha.className = "linha-funcionalidade";

      const identificador = `${indiceGrupo + 1}.${indiceFuncionalidade + 1}`;

      const nomeContainer = document.createElement("div");
      nomeContainer.className = "nome-funcionalidade";

      const numero = document.createElement("span");
      numero.className = "numero-funcionalidade";
      numero.textContent = identificador;

      const nome = document.createElement("span");
      nome.textContent = funcionalidade.nome;

      nomeContainer.appendChild(numero);
      nomeContainer.appendChild(nome);

      const avaliacaoContainer = document.createElement("div");
      avaliacaoContainer.className = "avaliacao-funcionalidade";

      const select = document.createElement("select");

      select.id = funcionalidade.id;
      select.name = `funcionalidades[${funcionalidade.id}]`;
      select.dataset.nome = funcionalidade.nome;
      select.dataset.grupo = grupo.titulo;
      select.required = true;

      const opcaoInicial = document.createElement("option");
      opcaoInicial.value = "";
      opcaoInicial.textContent = "Selecione";

      select.appendChild(opcaoInicial);

      ESCALA_IMPORTANCIA.forEach((item) => {
        const option = document.createElement("option");

        option.value = item.valor;
        option.textContent = item.rotulo;

        select.appendChild(option);
      });

      const erro = document.createElement("small");
      erro.className = "erro-campo";

      avaliacaoContainer.appendChild(select);
      avaliacaoContainer.appendChild(erro);

      linha.appendChild(nomeContainer);
      linha.appendChild(avaliacaoContainer);

      tabela.appendChild(linha);
    });

    blocoGrupo.appendChild(tabela);
    container.appendChild(blocoGrupo);
  });
}

function configurarEventos() {
  configurarCargoOutro();
  configurarSistemaAtual();
  configurarMascaraWhatsApp();
  configurarLimpezaDeErros();
}

function configurarCargoOutro() {
  const cargo = document.getElementById("cargo");
  const campoCargoOutro = document.getElementById("campoCargoOutro");
  const cargoOutro = document.getElementById("cargoOutro");

  if (!cargo || !campoCargoOutro || !cargoOutro) {
    return;
  }

  cargo.addEventListener("change", () => {
    const mostrar = cargo.value === "Outro";

    campoCargoOutro.classList.toggle("oculto", !mostrar);
    cargoOutro.required = mostrar;

    if (!mostrar) {
      cargoOutro.value = "";
      limparErroCampo(cargoOutro);
    }
  });
}

function configurarSistemaAtual() {
  const radios = document.querySelectorAll(
    'input[name="utilizaSistema"]'
  );

  const camposSistemaAtual = document.getElementById("camposSistemaAtual");
  const sistemaAtual = document.getElementById("sistemaAtual");
  const tempoUsoSistema = document.getElementById("tempoUsoSistema");
  const valorAtual = document.getElementById("valorAtual");
  const satisfacaoSistema = document.getElementById("satisfacaoSistema");

  if (!radios.length || !camposSistemaAtual) {
    return;
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const valorSelecionado = document.querySelector(
        'input[name="utilizaSistema"]:checked'
      )?.value;

      const deveMostrar =
        valorSelecionado === "Sim" ||
        valorSelecionado ===
          "Utilizo planilhas ou ferramentas separadas";

      camposSistemaAtual.classList.toggle("oculto", !deveMostrar);

      if (!deveMostrar) {
        [sistemaAtual, tempoUsoSistema, valorAtual, satisfacaoSistema].forEach(
          (campo) => {
            if (campo) {
              campo.value = "";
              limparErroCampo(campo);
            }
          }
        );
      }
    });
  });
}

function configurarMascaraWhatsApp() {
  const campo = document.getElementById("whatsapp");

  if (!campo) {
    return;
  }

  campo.addEventListener("input", () => {
    let valor = campo.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length <= 2) {
      campo.value = valor;
      return;
    }

    if (valor.length <= 6) {
      campo.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
      return;
    }

    if (valor.length <= 10) {
      campo.value =
        `(${valor.slice(0, 2)}) ` +
        `${valor.slice(2, 6)}-${valor.slice(6)}`;
      return;
    }

    campo.value =
      `(${valor.slice(0, 2)}) ` +
      `${valor.slice(2, 7)}-${valor.slice(7)}`;
  });
}

function configurarContadores() {
  const contadores = document.querySelectorAll("[data-contador]");

  contadores.forEach((contador) => {
    const idCampo = contador.dataset.contador;
    const campo = document.getElementById(idCampo);

    if (!campo) {
      return;
    }

    const atualizar = () => {
      contador.textContent = String(campo.value.length);
    };

    campo.addEventListener("input", atualizar);
    atualizar();
  });
}

function configurarLimpezaDeErros() {
  const campos = document.querySelectorAll(
    "#formPesquisa input, #formPesquisa select, #formPesquisa textarea"
  );

  campos.forEach((campo) => {
    const evento =
      campo.type === "radio" || campo.type === "checkbox"
        ? "change"
        : "input";

    campo.addEventListener(evento, () => {
      limparErroCampo(campo);

      if (
        campo.name === "confirmacaoVeracidade" ||
        campo.name === "consentimentoPesquisa"
      ) {
        const erroConsentimentos =
          document.getElementById("erroConsentimentos");

        if (erroConsentimentos) {
          erroConsentimentos.textContent = "";
        }
      }
    });
  });
}

function configurarEnvio(tipo, pesquisa) {
  const formulario = document.getElementById("formPesquisa");

  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    limparMensagemFormulario();
    limparTodosErros();

    const valido = validarFormulario();

    if (!valido) {
      mostrarMensagemFormulario(
        "Revise os campos destacados antes de enviar.",
        "erro"
      );

      const primeiroErro = document.querySelector(
        ".campo-invalido, .erro-campo:not(:empty)"
      );

      if (primeiroErro) {
        primeiroErro.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }

      return;
    }

    const dados = coletarDadosFormulario(tipo, pesquisa);

    await enviarFormulario(dados);
  });
}

function validarFormulario() {
  const formulario = document.getElementById("formPesquisa");

  if (!formulario) {
    return false;
  }

  let valido = true;

  const obrigatorios = formulario.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  const nomesRadioVerificados = new Set();

  obrigatorios.forEach((campo) => {
    if (campo.type === "radio") {
      if (nomesRadioVerificados.has(campo.name)) {
        return;
      }

      nomesRadioVerificados.add(campo.name);

      const selecionado = formulario.querySelector(
        `input[name="${campo.name}"]:checked`
      );

      if (!selecionado) {
        valido = false;
        exibirErroCampo(campo, "Selecione uma opção.");
      }

      return;
    }

    if (campo.type === "checkbox") {
      if (!campo.checked) {
        valido = false;
        campo.classList.add("campo-invalido");
      }

      return;
    }

    if (!campo.value.trim()) {
      valido = false;
      exibirErroCampo(campo, "Este campo é obrigatório.");
      return;
    }

    if (campo.type === "email" && !validarEmail(campo.value)) {
      valido = false;
      exibirErroCampo(campo, "Informe um e-mail válido.");
    }
  });

  const confirmacao = document.getElementById("confirmacaoVeracidade");
  const consentimento = document.getElementById("consentimentoPesquisa");
  const erroConsentimentos = document.getElementById("erroConsentimentos");

  if (
    !confirmacao?.checked ||
    !consentimento?.checked
  ) {
    valido = false;

    if (erroConsentimentos) {
      erroConsentimentos.textContent =
        "É necessário aceitar as confirmações obrigatórias.";
    }
  }

  return valido;
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function exibirErroCampo(campo, mensagem) {
  campo.classList.add("campo-invalido");

  const grupo =
    campo.closest(".grupo-campo") ||
    campo.closest(".avaliacao-funcionalidade") ||
    campo.closest("fieldset");

  const erro = grupo?.querySelector(".erro-campo");

  if (erro) {
    erro.textContent = mensagem;
  }
}

function limparErroCampo(campo) {
  if (!campo) {
    return;
  }

  campo.classList.remove("campo-invalido");

  const grupo =
    campo.closest(".grupo-campo") ||
    campo.closest(".avaliacao-funcionalidade") ||
    campo.closest("fieldset");

  const erro = grupo?.querySelector(".erro-campo");

  if (erro) {
    erro.textContent = "";
  }
}

function limparTodosErros() {
  document.querySelectorAll(".campo-invalido").forEach((campo) => {
    campo.classList.remove("campo-invalido");
  });

  document.querySelectorAll(".erro-campo").forEach((erro) => {
    erro.textContent = "";
  });
}

function coletarDadosFormulario(tipo, pesquisa) {
  const formulario = document.getElementById("formPesquisa");
  const formData = new FormData(formulario);

  const dados = {
    tipoPesquisa: tipo,
    codigoPesquisa: pesquisa.codigo,
    tituloPesquisa: pesquisa.titulo,

    identificacao: {
      nome: obterTexto(formData, "nome"),
      email: obterTexto(formData, "email"),
      whatsapp: obterTexto(formData, "whatsapp"),
      cidade: obterTexto(formData, "cidade"),
      estado: obterTexto(formData, "estado"),
      empresa: obterTexto(formData, "empresa"),
      cargo: obterCargo(formData),
      tempoExperiencia: obterTexto(formData, "tempoExperiencia")
    },

    usoAtual: {
      utilizaSistema: obterTexto(formData, "utilizaSistema"),
      sistemaAtual: obterTexto(formData, "sistemaAtual"),
      tempoUsoSistema: obterTexto(formData, "tempoUsoSistema"),
      valorAtual: obterTexto(formData, "valorAtual"),
      satisfacaoSistema: obterTexto(formData, "satisfacaoSistema"),
      quantidadeUsuarios: obterTexto(formData, "quantidadeUsuarios"),
      pretensaoTroca: obterTexto(formData, "pretensaoTroca"),
      maiorDificuldadeAtual: obterTexto(
        formData,
        "maiorDificuldadeAtual"
      )
    },

    funcionalidades: coletarFuncionalidades(),

    prioridades: {
      tarefaMaisDemorada: obterTexto(
        formData,
        "tarefaMaisDemorada"
      ),
      recursoIndispensavel: obterTexto(
        formData,
        "recursoIndispensavel"
      ),
      motivoTroca: obterTexto(formData, "motivoTroca"),
      funcionalidadePrimeiro: obterTexto(
        formData,
        "funcionalidadePrimeiro"
      ),
      recursoNaoMencionado: obterTexto(
        formData,
        "recursoNaoMencionado"
      )
    },

    interesse: {
      faixaInvestimento: obterTexto(
        formData,
        "faixaInvestimento"
      ),
      modeloCobranca: obterTexto(formData, "modeloCobranca"),
      interesseTeste: obterTexto(formData, "interesseTeste"),
      usuarioPiloto: obterTexto(formData, "usuarioPiloto"),
      comentariosAdicionais: obterTexto(
        formData,
        "comentariosAdicionais"
      )
    },

    consentimentos: {
      confirmacaoVeracidade:
        formData.get("confirmacaoVeracidade") === "Sim",
      consentimentoPesquisa:
        formData.get("consentimentoPesquisa") === "Sim",
      autorizaContato:
        formData.get("autorizaContato") === "Sim"
    },

    website: obterTexto(formData, "website"),

    metadados: {
      pagina: window.location.href,
      userAgent: navigator.userAgent,
      dataCliente: new Date().toISOString()
    }
  };

  return dados;
}

function obterTexto(formData, nome) {
  const valor = formData.get(nome);

  if (typeof valor !== "string") {
    return "";
  }

  return valor.trim();
}

function obterCargo(formData) {
  const cargo = obterTexto(formData, "cargo");

  if (cargo !== "Outro") {
    return cargo;
  }

  const cargoOutro = obterTexto(formData, "cargoOutro");

  return cargoOutro || "Outro";
}

function coletarFuncionalidades() {
  const selects = document.querySelectorAll(
    '#funcionalidadesContainer select[data-nome]'
  );

  return Array.from(selects).map((select) => ({
    id: select.id,
    grupo: select.dataset.grupo || "",
    nome: select.dataset.nome || "",
    importancia: select.value
  }));
}

async function enviarFormulario(dados) {
  const botao = document.getElementById("botaoEnviar");
  const textoBotao = botao?.querySelector(".texto-botao");
  const carregandoBotao = botao?.querySelector(".carregando-botao");

  alterarEstadoEnvio(
    true,
    botao,
    textoBotao,
    carregandoBotao
  );

  try {
    const resposta = await fetch("/api/enviar", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(dados)
    });

    let resultado = {};

    try {
      resultado = await resposta.json();
    } catch {
      resultado = {};
    }

    if (!resposta.ok) {
      throw new Error(
        resultado.erro ||
          resultado.mensagem ||
          "Não foi possível enviar a pesquisa."
      );
    }

    const protocolo = resultado.protocolo || "";

    const parametros = new URLSearchParams();

    parametros.set("tipo", dados.tipoPesquisa);

    if (protocolo) {
      parametros.set("protocolo", protocolo);
    }

    window.location.href = `obrigado.html?${parametros.toString()}`;
  } catch (erro) {
    console.error("Erro ao enviar pesquisa:", erro);

    mostrarMensagemFormulario(
      erro.message ||
        "Ocorreu um erro ao enviar. Verifique sua conexão e tente novamente.",
      "erro"
    );

    alterarEstadoEnvio(
      false,
      botao,
      textoBotao,
      carregandoBotao
    );
  }
}

function alterarEstadoEnvio(
  enviando,
  botao,
  textoBotao,
  carregandoBotao
) {
  if (botao) {
    botao.disabled = enviando;
  }

  if (textoBotao) {
    textoBotao.classList.toggle("oculto", enviando);
  }

  if (carregandoBotao) {
    carregandoBotao.classList.toggle("oculto", !enviando);
  }
}

function mostrarMensagemFormulario(mensagem, tipo) {
  const elemento = document.getElementById("mensagemFormulario");

  if (!elemento) {
    return;
  }

  elemento.textContent = mensagem;

  elemento.classList.remove(
    "oculto",
    "mensagem-sucesso",
    "mensagem-erro"
  );

  elemento.classList.add(
    tipo === "sucesso"
      ? "mensagem-sucesso"
      : "mensagem-erro"
  );
}

function limparMensagemFormulario() {
  const elemento = document.getElementById("mensagemFormulario");

  if (!elemento) {
    return;
  }

  elemento.textContent = "";

  elemento.classList.add("oculto");

  elemento.classList.remove(
    "mensagem-sucesso",
    "mensagem-erro"
  );
}
