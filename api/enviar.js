const PDFDocument = require("pdfkit");
const { Resend } = require("resend");
const crypto = require("crypto");

const resend = new Resend(process.env.RESEND_API_KEY);

const TIPOS_VALIDOS = {
  juridico: {
    codigo: "JUR",
    titulo: "Sistema Jurídico"
  },

  saude: {
    codigo: "SAU",
    titulo: "Saúde, Farmácia e Laboratório"
  },

  medico: {
    codigo: "MED",
    titulo: "Sistema Médico e Clínica"
  },

  nutricao: {
    codigo: "NUT",
    titulo: "Nutrição, Academia, Dieta e Treino"
  },

  sst: {
    codigo: "SST",
    titulo: "Perícias, SST e Clínica Ocupacional"
  }
};

module.exports = async function handler(req, res) {
  configurarCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido."
    });
  }

  try {
    validarConfiguracao();

    const dados = normalizarDados(req.body);

    /*
     * Campo oculto usado como proteção básica contra bots.
     * Caso esteja preenchido, a API encerra sem enviar nada.
     */
    if (dados.website) {
      return res.status(200).json({
        sucesso: true
      });
    }

    validarDados(dados);

    const categoria = TIPOS_VALIDOS[dados.tipoPesquisa];
    const protocolo = gerarProtocolo(categoria.codigo);
    const dataEnvio = new Date();

    const pdf = await gerarPDF({
      dados,
      categoria,
      protocolo,
      dataEnvio
    });

    const assunto =
      `[${protocolo}] Nova pesquisa — ${categoria.titulo}`;

    const nomeParticipante =
      dados.identificacao.nome || "Participante";

    const emailParticipante =
      dados.identificacao.email || "";

    const html = montarEmailHTML({
      dados,
      categoria,
      protocolo,
      dataEnvio
    });

    const nomeArquivo =
      `${protocolo}-${sanitizarNomeArquivo(nomeParticipante)}.pdf`;

    const destinatarios = obterDestinatarios(
      process.env.EMAIL_DESTINO
    );

    const remetente =
      process.env.EMAIL_REMETENTE ||
      "Pesquisa de Sistemas <onboarding@resend.dev>";

    const configuracaoEmail = {
      from: remetente,
      to: destinatarios,
      subject: assunto,
      html,

      attachments: [
        {
          filename: nomeArquivo,
          content: pdf.toString("base64")
        }
      ]
    };

    if (validarEmail(emailParticipante)) {
      configuracaoEmail.replyTo = emailParticipante;
    }

    const resultado = await resend.emails.send(
      configuracaoEmail
    );

    if (resultado.error) {
      console.error(
        "Erro retornado pelo Resend:",
        resultado.error
      );

      throw new Error(
        resultado.error.message ||
          "O serviço de e-mail recusou o envio."
      );
    }

    return res.status(200).json({
      sucesso: true,
      protocolo
    });
  } catch (erro) {
    console.error(
      "Erro no envio da pesquisa:",
      erro
    );

    return res.status(500).json({
      erro:
        erro.message ||
        "Não foi possível enviar a pesquisa."
    });
  }
};

/* =========================================================
   CONFIGURAÇÃO DA API
========================================================= */

function configurarCors(res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );
}

function validarConfiguracao() {
  const faltantes = [];

  if (!process.env.RESEND_API_KEY) {
    faltantes.push("RESEND_API_KEY");
  }

  if (!process.env.EMAIL_DESTINO) {
    faltantes.push("EMAIL_DESTINO");
  }

  if (faltantes.length) {
    throw new Error(
      `Variáveis de ambiente ausentes: ${faltantes.join(", ")}.`
    );
  }
}

/* =========================================================
   NORMALIZAÇÃO DOS DADOS
========================================================= */

function normalizarDados(corpo) {
  let dados = corpo;

  if (typeof corpo === "string") {
    try {
      dados = JSON.parse(corpo);
    } catch {
      dados = {};
    }
  }

  if (
    !dados ||
    typeof dados !== "object" ||
    Array.isArray(dados)
  ) {
    dados = {};
  }

  return {
    tipoPesquisa: limparTexto(
      dados.tipoPesquisa
    ),

    codigoPesquisa: limparTexto(
      dados.codigoPesquisa
    ),

    tituloPesquisa: limparTexto(
      dados.tituloPesquisa
    ),

    identificacao: normalizarObjeto(
      dados.identificacao
    ),

    usoAtual: normalizarObjeto(
      dados.usoAtual
    ),

    funcionalidades: Array.isArray(
      dados.funcionalidades
    )
      ? dados.funcionalidades.map(
          normalizarFuncionalidade
        )
      : [],

    prioridades: normalizarObjeto(
      dados.prioridades
    ),

    interesse: normalizarObjeto(
      dados.interesse
    ),

    consentimentos: {
      confirmacaoVeracidade: Boolean(
        dados.consentimentos
          ?.confirmacaoVeracidade
      ),

      consentimentoPesquisa: Boolean(
        dados.consentimentos
          ?.consentimentoPesquisa
      ),

      autorizaContato: Boolean(
        dados.consentimentos
          ?.autorizaContato
      )
    },

    website: limparTexto(
      dados.website
    ),

    metadados: normalizarObjeto(
      dados.metadados
    )
  };
}

function normalizarObjeto(objeto) {
  if (
    !objeto ||
    typeof objeto !== "object" ||
    Array.isArray(objeto)
  ) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(objeto).map(
      ([chave, valor]) => {
        if (typeof valor === "string") {
          return [
            chave,
            limparTexto(valor)
          ];
        }

        if (
          typeof valor === "number" ||
          typeof valor === "boolean"
        ) {
          return [
            chave,
            valor
          ];
        }

        if (Array.isArray(valor)) {
          return [
            chave,
            valor.map((item) =>
              typeof item === "string"
                ? limparTexto(item)
                : item
            )
          ];
        }

        return [
          chave,
          valor
        ];
      }
    )
  );
}

function normalizarFuncionalidade(item) {
  return {
    id: limparTexto(item?.id),
    grupo: limparTexto(item?.grupo),
    nome: limparTexto(item?.nome),
    importancia: limparTexto(
      item?.importancia
    )
  };
}

function limparTexto(valor) {
  if (typeof valor !== "string") {
    return "";
  }

  return valor
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, 12000);
}

/* =========================================================
   VALIDAÇÃO
========================================================= */

function validarDados(dados) {
  const categoria =
    TIPOS_VALIDOS[dados.tipoPesquisa];

  if (!categoria) {
    throw new Error(
      "Categoria da pesquisa inválida."
    );
  }

  const identificacao =
    dados.identificacao;

  if (!identificacao.nome) {
    throw new Error(
      "O nome do participante é obrigatório."
    );
  }

  if (
    !identificacao.email ||
    !validarEmail(
      identificacao.email
    )
  ) {
    throw new Error(
      "Informe um e-mail válido."
    );
  }

  if (!identificacao.cargo) {
    throw new Error(
      "O cargo ou função é obrigatório."
    );
  }

  if (
    !dados.consentimentos
      .confirmacaoVeracidade ||
    !dados.consentimentos
      .consentimentoPesquisa
  ) {
    throw new Error(
      "Os consentimentos obrigatórios não foram aceitos."
    );
  }

  if (!dados.funcionalidades.length) {
    throw new Error(
      "Nenhuma funcionalidade foi avaliada."
    );
  }

  const funcionalidadeIncompleta =
    dados.funcionalidades.some(
      (item) =>
        !item.nome ||
        !item.importancia
    );

  if (funcionalidadeIncompleta) {
    throw new Error(
      "Todas as funcionalidades devem ser avaliadas."
    );
  }
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email || "").trim()
  );
}

/* =========================================================
   PROTOCOLO
========================================================= */

function gerarProtocolo(codigo) {
  const agora = new Date();

  const data =
    `${agora.getFullYear()}` +
    `${String(
      agora.getMonth() + 1
    ).padStart(2, "0")}` +
    `${String(
      agora.getDate()
    ).padStart(2, "0")}`;

  const aleatorio = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()
    .slice(0, 6);

  return `${codigo}-${data}-${aleatorio}`;
}

/* =========================================================
   DESTINATÁRIOS
========================================================= */

function obterDestinatarios(valor) {
  const emails = String(valor || "")
    .split(",")
    .map((email) => email.trim())
    .filter(validarEmail);

  if (!emails.length) {
    throw new Error(
      "EMAIL_DESTINO não contém um endereço válido."
    );
  }

  return emails;
}

/* =========================================================
   GERAÇÃO DO PDF
========================================================= */

async function gerarPDF({
  dados,
  categoria,
  protocolo,
  dataEnvio
}) {
  return new Promise(
    (resolve, reject) => {
      try {
const doc = new PDFDocument({
  size: "A4",

  margins: {
    top: 46,
    left: 46,
    right: 46,
    bottom: 64
  },

  bufferPages: true,

          info: {
            Title:
              `Pesquisa de validação — ${categoria.titulo}`,

            Author:
              "Pesquisa de Sistemas Profissionais",

            Subject: protocolo
          }
        });

        const partes = [];

        doc.on(
          "data",
          (parte) => partes.push(parte)
        );

        doc.on(
          "end",
          () =>
            resolve(
              Buffer.concat(partes)
            )
        );

        doc.on(
          "error",
          reject
        );

        desenharCabecalhoPDF(
          doc,
          categoria,
          protocolo,
          dataEnvio
        );

        /* IDENTIFICAÇÃO */

        adicionarSecao(
          doc,
          "1. Identificação"
        );

        adicionarCampo(
          doc,
          "Nome",
          dados.identificacao.nome
        );

        adicionarCampo(
          doc,
          "E-mail",
          dados.identificacao.email
        );

        adicionarCampo(
          doc,
          "WhatsApp",
          dados.identificacao.whatsapp
        );

        adicionarCampo(
          doc,
          "Cidade",
          dados.identificacao.cidade
        );

        adicionarCampo(
          doc,
          "Estado",
          dados.identificacao.estado
        );

        adicionarCampo(
          doc,
          "Empresa ou organização",
          dados.identificacao.empresa
        );

        adicionarCampo(
          doc,
          "Cargo ou função",
          dados.identificacao.cargo
        );

        adicionarCampo(
          doc,
          "Tempo de experiência",
          dados.identificacao
            .tempoExperiencia
        );

        /* USO ATUAL */

        adicionarSecao(
          doc,
          "2. Uso atual de sistemas"
        );

        adicionarCampo(
          doc,
          "Utiliza sistema atualmente",
          dados.usoAtual.utilizaSistema
        );

        adicionarCampo(
          doc,
          "Sistema utilizado",
          dados.usoAtual.sistemaAtual
        );

        adicionarCampo(
          doc,
          "Tempo de uso",
          dados.usoAtual.tempoUsoSistema
        );

        adicionarCampo(
          doc,
          "Valor pago atualmente",
          dados.usoAtual.valorAtual
        );

        adicionarCampo(
          doc,
          "Satisfação com o sistema",
          dados.usoAtual.satisfacaoSistema
        );

        adicionarCampo(
          doc,
          "Quantidade de usuários",
          dados.usoAtual.quantidadeUsuarios
        );

        adicionarCampo(
          doc,
          "Pretensão de troca",
          dados.usoAtual.pretensaoTroca
        );

        adicionarCampo(
          doc,
          "Maior dificuldade atual",
          dados.usoAtual
            .maiorDificuldadeAtual
        );

        /* FUNCIONALIDADES */

        adicionarSecao(
          doc,
          "3. Avaliação das funcionalidades"
        );

        adicionarFuncionalidades(
          doc,
          dados.funcionalidades
        );

        /* PRIORIDADES */

        adicionarSecao(
          doc,
          "4. Prioridades e necessidades"
        );

        adicionarCampo(
          doc,
          "Tarefa mais demorada",
          dados.prioridades
            .tarefaMaisDemorada
        );

        adicionarCampo(
          doc,
          "Recurso indispensável",
          dados.prioridades
            .recursoIndispensavel
        );

        adicionarCampo(
          doc,
          "Principal motivo para trocar",
          dados.prioridades.motivoTroca
        );

        adicionarCampo(
          doc,
          "Funcionalidade prioritária",
          dados.prioridades
            .funcionalidadePrimeiro
        );

        adicionarCampo(
          doc,
          "Recurso não mencionado",
          dados.prioridades
            .recursoNaoMencionado
        );

        /* INTERESSE */

        adicionarSecao(
          doc,
          "5. Interesse comercial"
        );

        adicionarCampo(
          doc,
          "Faixa de investimento",
          dados.interesse
            .faixaInvestimento
        );

        adicionarCampo(
          doc,
          "Modelo de cobrança preferido",
          dados.interesse
            .modeloCobranca
        );

        adicionarCampo(
          doc,
          "Interesse em testar versão beta",
          dados.interesse
            .interesseTeste
        );

        adicionarCampo(
          doc,
          "Interesse como usuário piloto",
          dados.interesse
            .usuarioPiloto
        );

        adicionarCampo(
          doc,
          "Comentários adicionais",
          dados.interesse
            .comentariosAdicionais
        );

        /* CONSENTIMENTOS */

        adicionarSecao(
          doc,
          "6. Consentimentos"
        );

        adicionarCampo(
          doc,
          "Confirmação de veracidade",
          formatarBooleano(
            dados.consentimentos
              .confirmacaoVeracidade
          )
        );

        adicionarCampo(
          doc,
          "Consentimento para uso na pesquisa",
          formatarBooleano(
            dados.consentimentos
              .consentimentoPesquisa
          )
        );

        adicionarCampo(
          doc,
          "Autoriza contato",
          formatarBooleano(
            dados.consentimentos
              .autorizaContato
          )
        );

        adicionarRodapePDF(
          doc,
          protocolo
        );

        doc.end();
      } catch (erro) {
        reject(erro);
      }
    }
  );
}

/* =========================================================
   CABEÇALHO DO PDF
========================================================= */

function desenharCabecalhoPDF(
  doc,
  categoria,
  protocolo,
  dataEnvio
) {
  const margemEsquerda = 46;
  const larguraPagina = 503;

  doc.x = margemEsquerda;
  doc.y = 46;

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#173B6B")
    .text(
      "PESQUISA DE VALIDAÇÃO DE SISTEMA PROFISSIONAL",
      margemEsquerda,
      46,
      {
        width: larguraPagina,
        align: "center"
      }
    );

  doc.moveDown(0.5);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#475467")
    .text(
      categoria.titulo,
      margemEsquerda,
      doc.y,
      {
        width: larguraPagina,
        align: "center"
      }
    );

  doc.moveDown(1);

  const inicioY = doc.y;

  doc
    .roundedRect(
      margemEsquerda,
      inicioY,
      larguraPagina,
      64,
      7
    )
    .fillAndStroke(
      "#F8FAFC",
      "#DCE3EC"
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor("#667085")
    .text(
      "PROTOCOLO",
      60,
      inicioY + 13,
      {
        width: 220,
        align: "left"
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#1F4F8F")
    .text(
      protocolo,
      60,
      inicioY + 28,
      {
        width: 220,
        align: "left"
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor("#667085")
    .text(
      "DATA DE ENVIO",
      345,
      inicioY + 13,
      {
        width: 190,
        align: "left"
      }
    );

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#344054")
    .text(
      formatarDataHora(dataEnvio),
      345,
      inicioY + 28,
      {
        width: 190,
        align: "left"
      }
    );

  doc.x = margemEsquerda;
  doc.y = inicioY + 82;
}

/* =========================================================
   SEÇÕES DO PDF
========================================================= */

function adicionarSecao(
  doc,
  titulo
) {
  const margemEsquerda = 46;
  const larguraPagina = 503;

  garantirEspaco(
    doc,
    62
  );

  doc.x = margemEsquerda;
  doc.moveDown(0.45);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#173B6B")
    .text(
      titulo,
      margemEsquerda,
      doc.y,
      {
        width: larguraPagina,
        align: "left"
      }
    );

  doc.moveDown(0.3);

  const linhaY = doc.y;

  doc
    .moveTo(
      margemEsquerda,
      linhaY
    )
    .lineTo(
      margemEsquerda + larguraPagina,
      linhaY
    )
    .strokeColor("#DCE3EC")
    .lineWidth(1)
    .stroke();

  doc.x = margemEsquerda;
  doc.y = linhaY + 12;
}

/* =========================================================
   CAMPOS DO PDF
========================================================= */

function adicionarCampo(
  doc,
  rotulo,
  valor
) {
  const margemEsquerda = 46;
  const larguraPagina = 503;

  const texto =
    formatarValor(valor);

  doc
    .font("Helvetica")
    .fontSize(10);

  const alturaValor =
    doc.heightOfString(
      texto,
      {
        width: larguraPagina,
        lineGap: 2
      }
    );

  garantirEspaco(
    doc,
    alturaValor + 34
  );

  doc.x = margemEsquerda;

  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor("#667085")
    .text(
      rotulo.toUpperCase(),
      margemEsquerda,
      doc.y,
      {
        width: larguraPagina,
        align: "left"
      }
    );

  doc.moveDown(0.12);

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#1F2937")
    .text(
      texto,
      margemEsquerda,
      doc.y,
      {
        width: larguraPagina,
        align: "left",
        lineGap: 2
      }
    );

  doc.moveDown(0.55);
  doc.x = margemEsquerda;
}

/* =========================================================
   FUNCIONALIDADES DO PDF
========================================================= */

function adicionarFuncionalidades(
  doc,
  funcionalidades
) {
  const margemEsquerda = 46;
  const inicioTexto = 58;
  const larguraNome = 340;
  const inicioImportancia = 410;
  const larguraImportancia = 125;

  let grupoAtual = "";

  funcionalidades.forEach(
    (funcionalidade) => {
      if (
        funcionalidade.grupo &&
        funcionalidade.grupo !== grupoAtual
      ) {
        grupoAtual =
          funcionalidade.grupo;

        garantirEspaco(
          doc,
          48
        );

        doc.x = margemEsquerda;
        doc.moveDown(0.35);

        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#344054")
          .text(
            grupoAtual,
            margemEsquerda,
            doc.y,
            {
              width: 489,
              align: "left",
              lineGap: 1
            }
          );

        doc.moveDown(0.3);
        doc.x = margemEsquerda;
      }

      const nome =
        funcionalidade.nome ||
        "Não informado";

      const importancia =
        funcionalidade.importancia ||
        "Não informado";

      doc
        .font("Helvetica")
        .fontSize(9);

      const alturaNome =
        doc.heightOfString(
          nome,
          {
            width: larguraNome,
            lineGap: 1
          }
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(8.5);

      const alturaImportancia =
        doc.heightOfString(
          importancia,
          {
            width: larguraImportancia,
            align: "right",
            lineGap: 1
          }
        );

      const alturaLinha =
        Math.max(
          alturaNome,
          alturaImportancia,
          13
        );

      garantirEspaco(
        doc,
        alturaLinha + 24
      );

      const y = doc.y;

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#344054")
        .text(
          nome,
          inicioTexto,
          y,
          {
            width: larguraNome,
            align: "left",
            lineGap: 1
          }
        );

      doc
        .font("Helvetica-Bold")
        .fontSize(8.5)
        .fillColor(
          obterCorImportancia(
            importancia
          )
        )
        .text(
          importancia,
          inicioImportancia,
          y,
          {
            width: larguraImportancia,
            align: "right",
            lineGap: 1
          }
        );

      const linhaY =
        y + alturaLinha + 8;

      doc
        .moveTo(
          inicioTexto,
          linhaY
        )
        .lineTo(
          535,
          linhaY
        )
        .strokeColor("#EDF1F6")
        .lineWidth(0.7)
        .stroke();

      doc.x = margemEsquerda;
      doc.y = linhaY + 6;
    }
  );

  doc.x = margemEsquerda;
}

/* =========================================================
   CORES DAS AVALIAÇÕES
========================================================= */

function obterCorImportancia(
  importancia
) {
  const cores = {
    "Indispensável": "#166534",
    "Importante": "#1F4F8F",
    "Pouco importante": "#9A6700",
    "Não utilizaria": "#B42318",
    "Não sei avaliar": "#667085"
  };

  return (
    cores[importancia] ||
    "#344054"
  );
}

/* =========================================================
   QUEBRA DE PÁGINA
========================================================= */

function garantirEspaco(doc, altura) {
  const limiteInferior =
    doc.page.height -
    doc.page.margins.bottom;

  if (doc.y + altura > limiteInferior) {
    doc.addPage();

    doc.x = doc.page.margins.left;
    doc.y = doc.page.margins.top;
  }
}

/* =========================================================
   RODAPÉ DO PDF
========================================================= */

function adicionarRodapePDF(doc, protocolo) {
  const paginas = doc.bufferedPageRange();

  const margemEsquerda = 46;
  const margemDireita = 549;

  for (
    let indice = paginas.start;
    indice < paginas.start + paginas.count;
    indice += 1
  ) {
    doc.switchToPage(indice);

    const alturaPagina = doc.page.height;

    const linhaY = alturaPagina - 48;
    const textoY = alturaPagina - 38;

    doc.save();

    doc
      .moveTo(margemEsquerda, linhaY)
      .lineTo(margemDireita, linhaY)
      .strokeColor("#E4E7EC")
      .lineWidth(0.7)
      .stroke();

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor("#98A2B3");

    doc.text(
      "Documento gerado automaticamente.",
      margemEsquerda,
      textoY,
      {
        width: 260,
        height: 10,
        align: "left",
        lineBreak: false
      }
    );

    doc.text(
      `${protocolo} • Página ${indice + 1} de ${paginas.count}`,
      306,
      textoY,
      {
        width: 243,
        height: 10,
        align: "right",
        lineBreak: false
      }
    );

    doc.restore();
  }
}

/* =========================================================
   E-MAIL EM HTML
========================================================= */

function montarEmailHTML({
  dados,
  categoria,
  protocolo,
  dataEnvio
}) {
  const identificacao =
    dados.identificacao;

  const resumoFuncionalidades =
    resumirFuncionalidades(
      dados.funcionalidades
    );

  return `
    <!DOCTYPE html>

    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
      </head>

      <body
        style="
          margin: 0;
          padding: 24px;
          background: #f4f7fb;
          font-family: Arial, sans-serif;
          color: #1f2937;
        "
      >
        <div
          style="
            max-width: 720px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #dbe3ee;
            border-radius: 16px;
            overflow: hidden;
          "
        >
          <div
            style="
              padding: 26px;
              background: #173b6b;
              color: #ffffff;
            "
          >
            <div
              style="
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                opacity: 0.85;
              "
            >
              Nova resposta recebida
            </div>

            <h1
              style="
                margin: 10px 0 0;
                font-size: 23px;
                line-height: 1.3;
              "
            >
              ${escaparHTML(
                categoria.titulo
              )}
            </h1>
          </div>

          <div style="padding: 26px;">
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                margin-bottom: 24px;
                border-collapse: collapse;
              "
            >
              ${linhaEmail(
                "Protocolo",
                protocolo
              )}

              ${linhaEmail(
                "Data",
                formatarDataHora(dataEnvio)
              )}

              ${linhaEmail(
                "Participante",
                identificacao.nome
              )}

              ${linhaEmail(
                "E-mail",
                identificacao.email
              )}

              ${linhaEmail(
                "WhatsApp",
                identificacao.whatsapp
              )}

              ${linhaEmail(
                "Empresa",
                identificacao.empresa
              )}

              ${linhaEmail(
                "Cargo",
                identificacao.cargo
              )}
            </table>

            <h2
              style="
                margin: 0 0 12px;
                font-size: 17px;
                color: #173b6b;
              "
            >
              Resumo das avaliações
            </h2>

            <table
              width="100%"
              cellpadding="8"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border: 1px solid #dbe3ee;
                font-size: 14px;
              "
            >
              ${linhaResumo(
                "Indispensáveis",
                resumoFuncionalidades[
                  "Indispensável"
                ] || 0
              )}

              ${linhaResumo(
                "Importantes",
                resumoFuncionalidades[
                  "Importante"
                ] || 0
              )}

              ${linhaResumo(
                "Pouco importantes",
                resumoFuncionalidades[
                  "Pouco importante"
                ] || 0
              )}

              ${linhaResumo(
                "Não utilizaria",
                resumoFuncionalidades[
                  "Não utilizaria"
                ] || 0
              )}

              ${linhaResumo(
                "Não soube avaliar",
                resumoFuncionalidades[
                  "Não sei avaliar"
                ] || 0
              )}
            </table>

            <div
              style="
                margin-top: 22px;
                padding: 16px;
                border-radius: 10px;
                background: #f8fafc;
                color: #475467;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              A resposta completa está disponível no
              arquivo PDF anexado a este e-mail.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function linhaEmail(
  rotulo,
  valor
) {
  return `
    <tr>
      <td
        style="
          width: 160px;
          padding: 8px 12px 8px 0;
          border-bottom: 1px solid #edf1f6;
          color: #667085;
          font-size: 13px;
          font-weight: bold;
        "
      >
        ${escaparHTML(rotulo)}
      </td>

      <td
        style="
          padding: 8px 0;
          border-bottom: 1px solid #edf1f6;
          color: #1f2937;
          font-size: 14px;
        "
      >
        ${escaparHTML(
          formatarValor(valor)
        )}
      </td>
    </tr>
  `;
}

function linhaResumo(
  rotulo,
  quantidade
) {
  return `
    <tr>
      <td
        style="
          border-bottom: 1px solid #edf1f6;
          color: #344054;
        "
      >
        ${escaparHTML(rotulo)}
      </td>

      <td
        align="right"
        style="
          width: 80px;
          border-bottom: 1px solid #edf1f6;
          color: #173b6b;
          font-weight: bold;
        "
      >
        ${Number(quantidade) || 0}
      </td>
    </tr>
  `;
}

/* =========================================================
   RESUMO DAS FUNCIONALIDADES
========================================================= */

function resumirFuncionalidades(
  funcionalidades
) {
  return funcionalidades.reduce(
    (resumo, item) => {
      const chave =
        item.importancia ||
        "Não informado";

      resumo[chave] =
        (resumo[chave] || 0) + 1;

      return resumo;
    },
    {}
  );
}

/* =========================================================
   FORMATAÇÕES
========================================================= */

function formatarValor(valor) {
  if (
    valor === undefined ||
    valor === null ||
    valor === ""
  ) {
    return "Não informado";
  }

  if (Array.isArray(valor)) {
    if (!valor.length) {
      return "Não informado";
    }

    return valor
      .map((item) => String(item))
      .join(", ");
  }

  if (
    typeof valor === "object"
  ) {
    try {
      return JSON.stringify(valor);
    } catch {
      return "Não informado";
    }
  }

  return String(valor);
}

function formatarBooleano(valor) {
  return valor
    ? "Sim"
    : "Não";
}

function formatarDataHora(data) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      timeZone:
        "America/Sao_Paulo",

      dateStyle: "short",
      timeStyle: "short"
    }
  ).format(data);
}

function sanitizarNomeArquivo(
  texto
) {
  const nome = String(
    texto || "participante"
  )
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-zA-Z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    )
    .toLowerCase();

  return nome || "participante";
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
