const PESQUISAS = {
  juridico: {
    codigo: "JUR",

    titulo: "Pesquisa — Sistema Jurídico",

    descricao:
      "Pesquisa voltada a advogados, escritórios e departamentos jurídicos.",

    cargos: [
      "Advogado autônomo",
      "Sócio de escritório de advocacia",
      "Advogado associado",
      "Advogado empregado",
      "Gestor jurídico",
      "Coordenador jurídico",
      "Analista jurídico",
      "Assistente jurídico",
      "Departamento jurídico de empresa",
      "Paralegal",
      "Estagiário de Direito",
      "Outro"
    ],

    grupos: [
      {
        titulo: "Gestão de clientes e processos",

        descricao:
          "Recursos para organizar clientes, casos, processos e relacionamentos.",

        funcionalidades: [
          {
            id: "jur_clientes",
            nome: "Cadastro completo de clientes e contatos"
          },
          {
            id: "jur_crm",
            nome: "CRM jurídico, leads e oportunidades"
          },
          {
            id: "jur_conflito",
            nome: "Verificação de conflitos de interesses"
          },
          {
            id: "jur_processos",
            nome: "Cadastro e gestão de processos judiciais"
          },
          {
            id: "jur_casos",
            nome: "Gestão de casos consultivos e administrativos"
          },
          {
            id: "jur_timeline",
            nome: "Linha do tempo completa de cada processo"
          },
          {
            id: "jur_partes",
            nome: "Cadastro de partes, advogados e envolvidos"
          },
          {
            id: "jur_portal_cliente",
            nome: "Portal para acompanhamento pelo cliente"
          }
        ]
      },

      {
        titulo: "Prazos, publicações e agenda",

        descricao:
          "Controle das atividades que exigem acompanhamento diário.",

        funcionalidades: [
          {
            id: "jur_publicacoes",
            nome: "Captura e organização de publicações"
          },
          {
            id: "jur_intimacoes",
            nome: "Central de intimações"
          },
          {
            id: "jur_prazos",
            nome: "Controle de prazos processuais"
          },
          {
            id: "jur_calculo_prazos",
            nome: "Cálculo assistido de prazos"
          },
          {
            id: "jur_alertas",
            nome: "Alertas de vencimentos e pendências"
          },
          {
            id: "jur_audiencias",
            nome: "Agenda de audiências"
          },
          {
            id: "jur_compromissos",
            nome: "Agenda geral de compromissos"
          },
          {
            id: "jur_calendario",
            nome: "Integração com calendários externos"
          }
        ]
      },

      {
        titulo: "Tarefas, equipe e produtividade",

        descricao:
          "Organização do trabalho, responsabilidades e acompanhamento da equipe.",

        funcionalidades: [
          {
            id: "jur_tarefas",
            nome: "Criação e distribuição de tarefas"
          },
          {
            id: "jur_fluxos",
            nome: "Fluxos de trabalho e etapas configuráveis"
          },
          {
            id: "jur_checklists",
            nome: "Checklists por tipo de processo"
          },
          {
            id: "jur_responsaveis",
            nome: "Definição de responsáveis e substitutos"
          },
          {
            id: "jur_timesheet",
            nome: "Controle de horas e produtividade"
          },
          {
            id: "jur_aprovacoes",
            nome: "Fluxo de revisão e aprovação"
          },
          {
            id: "jur_dashboard",
            nome: "Dashboard de atividades e riscos"
          },
          {
            id: "jur_indicadores",
            nome: "Relatórios e indicadores de desempenho"
          }
        ]
      },

      {
        titulo: "Documentos, peças e contratos",

        descricao:
          "Produção, armazenamento, pesquisa e controle de documentos jurídicos.",

        funcionalidades: [
          {
            id: "jur_ged",
            nome: "Gestão eletrônica de documentos"
          },
          {
            id: "jur_ocr",
            nome: "OCR para leitura de PDFs e documentos digitalizados"
          },
          {
            id: "jur_modelos",
            nome: "Biblioteca de modelos de peças"
          },
          {
            id: "jur_geracao_pecas",
            nome: "Geração assistida de peças jurídicas"
          },
          {
            id: "jur_versionamento",
            nome: "Versionamento e histórico de alterações"
          },
          {
            id: "jur_assinatura",
            nome: "Assinatura digital de documentos"
          },
          {
            id: "jur_contratos",
            nome: "Gestão de contratos"
          },
          {
            id: "jur_comparacao",
            nome: "Comparação automática entre documentos"
          }
        ]
      },

      {
        titulo: "Financeiro jurídico",

        descricao:
          "Controle de honorários, cobranças, despesas e resultados.",

        funcionalidades: [
          {
            id: "jur_honorarios",
            nome: "Contratos e controle de honorários"
          },
          {
            id: "jur_cobrancas",
            nome: "Cobranças e parcelas"
          },
          {
            id: "jur_recebimentos",
            nome: "Controle de recebimentos"
          },
          {
            id: "jur_despesas",
            nome: "Controle de despesas por processo"
          },
          {
            id: "jur_repasses",
            nome: "Repasses e divisão de honorários"
          },
          {
            id: "jur_inadimplencia",
            nome: "Controle de inadimplência"
          },
          {
            id: "jur_fluxo_caixa",
            nome: "Fluxo de caixa"
          },
          {
            id: "jur_rentabilidade",
            nome: "Rentabilidade por cliente e processo"
          }
        ]
      },

      {
        titulo: "Integrações, IA e segurança",

        descricao:
          "Automação, inteligência artificial, integrações e proteção de dados.",

        funcionalidades: [
          {
            id: "jur_pje",
            nome: "Integração com PJe"
          },
          {
            id: "jur_datajud",
            nome: "Integração com DataJud"
          },
          {
            id: "jur_djen",
            nome: "Integração com DJEN"
          },
          {
            id: "jur_sistemas_judiciais",
            nome: "Integração com sistemas judiciais"
          },
          {
            id: "jur_ia_resumos",
            nome: "IA para resumir processos e documentos"
          },
          {
            id: "jur_ia_pecas",
            nome: "IA para gerar rascunhos de peças"
          },
          {
            id: "jur_busca_semantica",
            nome: "Busca inteligente em documentos"
          },
          {
            id: "jur_automacoes",
            nome: "Automações e regras configuráveis"
          },
          {
            id: "jur_permissoes",
            nome: "Permissões por usuário e equipe"
          },
          {
            id: "jur_auditoria",
            nome: "Logs, auditoria e rastreabilidade"
          },
          {
            id: "jur_lgpd",
            nome: "Recursos de LGPD e sigilo profissional"
          }
        ]
      }
    ]
  },

  saude: {
    codigo: "SAU",

    titulo: "Pesquisa — Saúde, Farmácia e Laboratório",

    descricao:
      "Pesquisa voltada a serviços de saúde, farmácias e laboratórios.",

    cargos: [
      "Farmacêutico",
      "Responsável técnico de farmácia",
      "Atendente de farmácia",
      "Gestor de farmácia",
      "Biomédico",
      "Bioquímico",
      "Técnico de laboratório",
      "Gestor de laboratório",
      "Profissional de saúde",
      "Gestor de clínica",
      "Responsável por compras e estoque",
      "Responsável administrativo",
      "Proprietário ou sócio",
      "Outro"
    ],

    grupos: [
      {
        titulo: "Pacientes, atendimentos e prontuários",

        descricao:
          "Recursos para atendimento e organização de informações clínicas.",

        funcionalidades: [
          {
            id: "sau_pacientes",
            nome: "Cadastro completo de pacientes"
          },
          {
            id: "sau_profissionais",
            nome: "Cadastro de profissionais e especialidades"
          },
          {
            id: "sau_agenda",
            nome: "Agenda de atendimentos"
          },
          {
            id: "sau_recepcao",
            nome: "Recepção, check-in e fila"
          },
          {
            id: "sau_prontuario",
            nome: "Prontuário eletrônico"
          },
          {
            id: "sau_documentos",
            nome: "Documentos clínicos"
          },
          {
            id: "sau_portal_paciente",
            nome: "Portal do paciente"
          },
          {
            id: "sau_convenios",
            nome: "Convênios e faturamento"
          }
        ]
      },

      {
        titulo: "Medicamentos e produtos",

        descricao:
          "Gestão de medicamentos, produtos, compras e fornecedores.",

        funcionalidades: [
          {
            id: "sau_medicamentos",
            nome: "Cadastro de medicamentos e produtos"
          },
          {
            id: "sau_fornecedores",
            nome: "Cadastro e gestão de fornecedores"
          },
          {
            id: "sau_compras",
            nome: "Pedidos de compra"
          },
          {
            id: "sau_cotacoes",
            nome: "Cotações e comparação de fornecedores"
          },
          {
            id: "sau_estoque",
            nome: "Controle de estoque"
          },
          {
            id: "sau_lotes",
            nome: "Controle por lote"
          },
          {
            id: "sau_validade",
            nome: "Controle de validade"
          },
          {
            id: "sau_codigo_barras",
            nome: "Leitura e impressão de códigos de barras"
          },
          {
            id: "sau_inventario",
            nome: "Inventário de estoque"
          },
          {
            id: "sau_transferencias",
            nome: "Transferência entre unidades"
          }
        ]
      },

      {
        titulo: "Dispensação e serviços farmacêuticos",

        descricao:
          "Recursos para dispensação, receitas e acompanhamento farmacêutico.",

        funcionalidades: [
          {
            id: "sau_dispensacao",
            nome: "Registro de dispensação"
          },
          {
            id: "sau_receitas",
            nome: "Cadastro e conferência de receitas"
          },
          {
            id: "sau_antimicrobianos",
            nome: "Controle de antimicrobianos"
          },
          {
            id: "sau_controlados",
            nome: "Controle de medicamentos sujeitos a controle especial"
          },
          {
            id: "sau_servicos_farmaceuticos",
            nome: "Registro de serviços farmacêuticos"
          },
          {
            id: "sau_farmacoterapia",
            nome: "Acompanhamento farmacoterapêutico"
          },
          {
            id: "sau_interacoes",
            nome: "Alertas de interações medicamentosas"
          },
          {
            id: "sau_atencao_farmaceutica",
            nome: "Plano de cuidado farmacêutico"
          },
          {
            id: "sau_perdas",
            nome: "Controle de perdas e avarias"
          },
          {
            id: "sau_devolucoes",
            nome: "Devoluções e recolhimentos"
          }
        ]
      },

      {
        titulo: "Regulação farmacêutica",

        descricao:
          "Registros e integrações relacionados às obrigações regulatórias.",

        funcionalidades: [
          {
            id: "sau_sngpc",
            nome: "Integração e controle do SNGPC"
          },
          {
            id: "sau_sncr",
            nome: "Integração e controle do SNCR"
          },
          {
            id: "sau_livros",
            nome: "Livros e registros obrigatórios"
          },
          {
            id: "sau_balancos",
            nome: "Balanços regulatórios"
          },
          {
            id: "sau_rastreabilidade",
            nome: "Rastreabilidade de medicamentos"
          },
          {
            id: "sau_documentacao_rt",
            nome: "Documentação do responsável técnico"
          },
          {
            id: "sau_alertas_regulatorios",
            nome: "Alertas de pendências regulatórias"
          },
          {
            id: "sau_auditoria",
            nome: "Auditoria de movimentações"
          }
        ]
      },

      {
        titulo: "Coleta e amostras laboratoriais",

        descricao:
          "Organização das etapas pré-analíticas do laboratório.",

        funcionalidades: [
          {
            id: "sau_pedidos_exames",
            nome: "Pedidos de exames"
          },
          {
            id: "sau_agendamento_coleta",
            nome: "Agendamento de coleta"
          },
          {
            id: "sau_coleta",
            nome: "Registro de coleta"
          },
          {
            id: "sau_tubos",
            nome: "Controle de tubos e recipientes"
          },
          {
            id: "sau_amostras",
            nome: "Rastreabilidade de amostras"
          },
          {
            id: "sau_etiquetas",
            nome: "Etiquetas e códigos de barras"
          },
          {
            id: "sau_triagem",
            nome: "Triagem de amostras"
          },
          {
            id: "sau_rejeicao",
            nome: "Registro de rejeição de amostras"
          },
          {
            id: "sau_transporte_amostras",
            nome: "Controle de transporte de amostras"
          },
          {
            id: "sau_cadeia_custodia",
            nome: "Cadeia de custódia"
          }
        ]
      },

      {
        titulo: "Processamento, qualidade e resultados",

        descricao:
          "Recursos para as fases analítica e pós-analítica.",

        funcionalidades: [
          {
            id: "sau_processamento",
            nome: "Controle do processamento dos exames"
          },
          {
            id: "sau_equipamentos",
            nome: "Integração com equipamentos"
          },
          {
            id: "sau_reagentes",
            nome: "Controle de reagentes"
          },
          {
            id: "sau_controle_qualidade",
            nome: "Controle interno de qualidade"
          },
          {
            id: "sau_qualidade_externa",
            nome: "Controle externo de qualidade"
          },
          {
            id: "sau_resultados",
            nome: "Digitação e importação de resultados"
          },
          {
            id: "sau_valores_criticos",
            nome: "Alertas de valores críticos"
          },
          {
            id: "sau_validacao",
            nome: "Validação técnica dos resultados"
          },
          {
            id: "sau_laudos",
            nome: "Emissão de laudos"
          },
          {
            id: "sau_assinatura",
            nome: "Assinatura digital de laudos"
          },
          {
            id: "sau_laboratorio_apoio",
            nome: "Integração com laboratórios de apoio"
          },
          {
            id: "sau_portal_resultados",
            nome: "Portal de resultados"
          },
          {
            id: "sau_lis",
            nome: "LIS e integrações laboratoriais"
          }
        ]
      },

      {
        titulo: "Gestão, IA e segurança",

        descricao:
          "Recursos administrativos, analíticos e de proteção de informações.",

        funcionalidades: [
          {
            id: "sau_financeiro",
            nome: "Financeiro e faturamento"
          },
          {
            id: "sau_multunidades",
            nome: "Gestão de múltiplas unidades"
          },
          {
            id: "sau_dashboard",
            nome: "Dashboards e indicadores"
          },
          {
            id: "sau_ia",
            nome: "Inteligência artificial para apoio operacional"
          },
          {
            id: "sau_automacoes",
            nome: "Automações e fluxos de trabalho"
          },
          {
            id: "sau_permissoes",
            nome: "Usuários e permissões"
          },
          {
            id: "sau_lgpd",
            nome: "LGPD e privacidade"
          },
          {
            id: "sau_logs",
            nome: "Logs e rastreabilidade"
          },
          {
            id: "sau_backup",
            nome: "Backups e recuperação de dados"
          }
        ]
      }
    ]
  },

  medico: {
    codigo: "MED",

    titulo: "Pesquisa — Sistema Médico e Clínica",

    descricao:
      "Pesquisa voltada a médicos, consultórios, clínicas e centros médicos.",

    cargos: [
      "Médico",
      "Médico responsável técnico",
      "Diretor clínico",
      "Gestor de clínica",
      "Coordenador médico",
      "Enfermeiro",
      "Técnico ou auxiliar de enfermagem",
      "Recepcionista",
      "Secretário",
      "Faturista",
      "Responsável administrativo",
      "Proprietário ou sócio",
      "Profissional de TI ou implantação",
      "Outro"
    ],

    grupos: [
      {
        titulo: "Pacientes, agenda e recepção",

        descricao:
          "Organização do atendimento desde o agendamento até a consulta.",

        funcionalidades: [
          {
            id: "med_pacientes",
            nome: "Cadastro completo de pacientes"
          },
          {
            id: "med_agenda_medico",
            nome: "Agenda por médico"
          },
          {
            id: "med_agenda_unidade",
            nome: "Agenda por unidade"
          },
          {
            id: "med_agenda_sala",
            nome: "Agenda por sala"
          },
          {
            id: "med_agenda_especialidade",
            nome: "Agenda por especialidade"
          },
          {
            id: "med_confirmacao",
            nome: "Confirmação automática de consultas"
          },
          {
            id: "med_checkin",
            nome: "Check-in do paciente"
          },
          {
            id: "med_fila",
            nome: "Fila e painel de atendimento"
          },
          {
            id: "med_encaixes",
            nome: "Controle de encaixes e faltas"
          },
          {
            id: "med_retorno",
            nome: "Controle de retornos"
          }
        ]
      },

      {
        titulo: "Prontuário eletrônico",

        descricao:
          "Registro estruturado das informações clínicas do paciente.",

        funcionalidades: [
          {
            id: "med_prontuario",
            nome: "Prontuário eletrônico"
          },
          {
            id: "med_anamnese",
            nome: "Anamnese estruturada"
          },
          {
            id: "med_exame_fisico",
            nome: "Registro de exame físico"
          },
          {
            id: "med_evolucao",
            nome: "Evolução médica"
          },
          {
            id: "med_diagnosticos",
            nome: "Diagnósticos e hipóteses diagnósticas"
          },
          {
            id: "med_condutas",
            nome: "Condutas e plano terapêutico"
          },
          {
            id: "med_alergias",
            nome: "Alertas de alergias"
          },
          {
            id: "med_medicamentos_uso",
            nome: "Medicamentos em uso"
          },
          {
            id: "med_historico",
            nome: "Histórico clínico consolidado"
          },
          {
            id: "med_modelos_especialidade",
            nome: "Modelos personalizados por especialidade"
          }
        ]
      },

      {
        titulo: "Prescrições e documentos",

        descricao:
          "Emissão e organização de documentos médicos.",

        funcionalidades: [
          {
            id: "med_prescricoes",
            nome: "Prescrições médicas"
          },
          {
            id: "med_receitas",
            nome: "Receitas simples e controladas"
          },
          {
            id: "med_atestados",
            nome: "Atestados"
          },
          {
            id: "med_relatorios",
            nome: "Relatórios médicos"
          },
          {
            id: "med_laudos",
            nome: "Laudos médicos"
          },
          {
            id: "med_declaracoes",
            nome: "Declarações"
          },
          {
            id: "med_solicitacao_exames",
            nome: "Solicitação de exames"
          },
          {
            id: "med_encaminhamentos",
            nome: "Encaminhamentos"
          },
          {
            id: "med_assinatura",
            nome: "Assinatura digital"
          },
          {
            id: "med_modelos_documentos",
            nome: "Modelos de documentos personalizados"
          }
        ]
      },

      {
        titulo: "Exames, imagens e telemedicina",

        descricao:
          "Integração do prontuário com exames e atendimento remoto.",

        funcionalidades: [
          {
            id: "med_resultados_exames",
            nome: "Recebimento de resultados de exames"
          },
          {
            id: "med_imagens",
            nome: "Visualização de imagens e documentos"
          },
          {
            id: "med_integracao_laboratorio",
            nome: "Integração com laboratórios"
          },
          {
            id: "med_integracao_imagem",
            nome: "Integração com serviços de imagem"
          },
          {
            id: "med_telemedicina",
            nome: "Telemedicina"
          },
          {
            id: "med_video",
            nome: "Videoconsulta integrada"
          },
          {
            id: "med_documentos_tele",
            nome: "Documentos emitidos em teleatendimento"
          },
          {
            id: "med_portal",
            nome: "Portal do paciente"
          }
        ]
      },

      {
        titulo: "Convênios, faturamento e financeiro",

        descricao:
          "Recursos para cobrança, convênios e gestão financeira da clínica.",

        funcionalidades: [
          {
            id: "med_convenios",
            nome: "Cadastro e gestão de convênios"
          },
          {
            id: "med_autorizacoes",
            nome: "Solicitação e controle de autorizações"
          },
          {
            id: "med_tiss",
            nome: "Padrão TISS"
          },
          {
            id: "med_tuss",
            nome: "Tabela TUSS"
          },
          {
            id: "med_guias",
            nome: "Emissão de guias"
          },
          {
            id: "med_faturamento",
            nome: "Faturamento de convênios e particulares"
          },
          {
            id: "med_glosas",
            nome: "Controle de glosas"
          },
          {
            id: "med_caixa",
            nome: "Caixa e recebimentos"
          },
          {
            id: "med_repasses",
            nome: "Repasses médicos"
          },
          {
            id: "med_resultado_financeiro",
            nome: "Indicadores financeiros"
          }
        ]
      },

      {
        titulo: "Gestão clínica e unidades",

        descricao:
          "Administração das equipes, unidades e processos da clínica.",

        funcionalidades: [
          {
            id: "med_unidades",
            nome: "Gestão de múltiplas unidades"
          },
          {
            id: "med_profissionais",
            nome: "Cadastro de profissionais"
          },
          {
            id: "med_especialidades",
            nome: "Especialidades e procedimentos"
          },
          {
            id: "med_salas",
            nome: "Salas e recursos"
          },
          {
            id: "med_estoque",
            nome: "Estoque de materiais e medicamentos"
          },
          {
            id: "med_indicadores",
            nome: "Dashboards e indicadores"
          },
          {
            id: "med_pesquisa_satisfacao",
            nome: "Pesquisa de satisfação do paciente"
          },
          {
            id: "med_comunicacao",
            nome: "Comunicação com pacientes"
          },
          {
            id: "med_permissoes",
            nome: "Permissões por perfil"
          }
        ]
      },

      {
        titulo: "Integrações, IA e segurança",

        descricao:
          "Interoperabilidade, inteligência artificial e proteção de dados clínicos.",

        funcionalidades: [
          {
            id: "med_rnds",
            nome: "Integração com RNDS"
          },
          {
            id: "med_fhir",
            nome: "Interoperabilidade com FHIR"
          },
          {
            id: "med_api",
            nome: "APIs e integrações externas"
          },
          {
            id: "med_ia_documentacao",
            nome: "IA para organizar e resumir documentação clínica"
          },
          {
            id: "med_ia_rascunhos",
            nome: "IA para gerar rascunhos de documentos"
          },
          {
            id: "med_ia_transcricao",
            nome: "Transcrição assistida da consulta"
          },
          {
            id: "med_alertas_clinicos",
            nome: "Alertas de segurança clínica"
          },
          {
            id: "med_auditoria",
            nome: "Auditoria de acessos e alterações"
          },
          {
            id: "med_lgpd",
            nome: "LGPD e consentimentos"
          },
          {
            id: "med_backup",
            nome: "Backups e recuperação"
          }
        ]
      }
    ]
  },

  nutricao: {
    codigo: "NUT",

    titulo: "Pesquisa — Nutrição, Academia, Dieta e Treino",

    descricao:
      "Pesquisa voltada a nutricionistas, academias e profissionais de treinamento.",

    cargos: [
      "Nutricionista",
      "Nutricionista esportivo",
      "Profissional de Educação Física",
      "Personal trainer",
      "Avaliador físico",
      "Fisioterapeuta",
      "Gestor de academia",
      "Gestor de studio",
      "Coordenador técnico",
      "Recepcionista",
      "Responsável administrativo",
      "Proprietário ou sócio",
      "Outro"
    ],

    grupos: [
      {
        titulo: "Cadastro e anamnese",

        descricao:
          "Informações necessárias para compreender o aluno ou paciente.",

        funcionalidades: [
          {
            id: "nut_cadastro",
            nome: "Cadastro completo do aluno ou paciente"
          },
          {
            id: "nut_anamnese",
            nome: "Anamnese de saúde"
          },
          {
            id: "nut_historico",
            nome: "Histórico clínico e familiar"
          },
          {
            id: "nut_rotina",
            nome: "Rotina diária e profissional"
          },
          {
            id: "nut_sono",
            nome: "Avaliação do sono"
          },
          {
            id: "nut_habitos",
            nome: "Hábitos e estilo de vida"
          },
          {
            id: "nut_medicamentos",
            nome: "Medicamentos e suplementos"
          },
          {
            id: "nut_objetivos",
            nome: "Definição de objetivos"
          },
          {
            id: "nut_limitacoes",
            nome: "Lesões, dores e limitações"
          }
        ]
      },

      {
        titulo: "Alimentação e preferências",

        descricao:
          "Levantamento detalhado dos hábitos e condições alimentares.",

        funcionalidades: [
          {
            id: "nut_alimentacao_atual",
            nome: "Registro da alimentação atual"
          },
          {
            id: "nut_recordatorio",
            nome: "Recordatório alimentar"
          },
          {
            id: "nut_frequencia",
            nome: "Questionário de frequência alimentar"
          },
          {
            id: "nut_alergias",
            nome: "Alergias e intolerâncias"
          },
          {
            id: "nut_restricoes",
            nome: "Restrições alimentares"
          },
          {
            id: "nut_preferencias",
            nome: "Preferências e alimentos rejeitados"
          },
          {
            id: "nut_orcamento",
            nome: "Orçamento disponível para alimentação"
          },
          {
            id: "nut_disponibilidade",
            nome: "Alimentos disponíveis na rotina"
          },
          {
            id: "nut_refeicoes",
            nome: "Horários e quantidade de refeições"
          }
        ]
      },

      {
        titulo: "Avaliação física",

        descricao:
          "Registro de medidas, composição corporal e evolução.",

        funcionalidades: [
          {
            id: "nut_peso",
            nome: "Controle de peso"
          },
          {
            id: "nut_medidas",
            nome: "Medidas corporais"
          },
          {
            id: "nut_dobras",
            nome: "Dobras cutâneas"
          },
          {
            id: "nut_bioimpedancia",
            nome: "Dados de bioimpedância"
          },
          {
            id: "nut_composicao",
            nome: "Composição corporal"
          },
          {
            id: "nut_fotos",
            nome: "Fotos de evolução"
          },
          {
            id: "nut_postura",
            nome: "Avaliação postural"
          },
          {
            id: "nut_testes",
            nome: "Testes físicos e funcionais"
          },
          {
            id: "nut_mobilidade",
            nome: "Avaliação de mobilidade"
          },
          {
            id: "nut_evolucao",
            nome: "Gráficos de evolução"
          }
        ]
      },

      {
        titulo: "Planejamento alimentar",

        descricao:
          "Criação, entrega e acompanhamento de planos alimentares.",

        funcionalidades: [
          {
            id: "nut_plano_alimentar",
            nome: "Elaboração de plano alimentar"
          },
          {
            id: "nut_calculo_nutricional",
            nome: "Cálculos nutricionais"
          },
          {
            id: "nut_macros",
            nome: "Distribuição de macronutrientes"
          },
          {
            id: "nut_micronutrientes",
            nome: "Avaliação de micronutrientes"
          },
          {
            id: "nut_substituicoes",
            nome: "Lista de substituições"
          },
          {
            id: "nut_receitas",
            nome: "Receitas personalizadas"
          },
          {
            id: "nut_lista_compras",
            nome: "Lista de compras"
          },
          {
            id: "nut_cardapios",
            nome: "Modelos de cardápios"
          },
          {
            id: "nut_refeicao_livre",
            nome: "Planejamento de refeições livres"
          },
          {
            id: "nut_exportacao",
            nome: "Exportação do plano em PDF ou aplicativo"
          }
        ]
      },

      {
        titulo: "Planejamento de treino",

        descricao:
          "Montagem de treinos de acordo com objetivos, limitações e recursos disponíveis.",

        funcionalidades: [
          {
            id: "nut_treino_musculacao",
            nome: "Treino de musculação"
          },
          {
            id: "nut_treino_funcional",
            nome: "Treino funcional"
          },
          {
            id: "nut_treino_domiciliar",
            nome: "Treino domiciliar"
          },
          {
            id: "nut_aerobico",
            nome: "Planejamento aeróbico"
          },
          {
            id: "nut_mobilidade_treino",
            nome: "Rotinas de mobilidade"
          },
          {
            id: "nut_alongamento",
            nome: "Rotinas de alongamento"
          },
          {
            id: "nut_exercicios_preferidos",
            nome: "Seleção por exercícios preferidos"
          },
          {
            id: "nut_equipamentos",
            nome: "Seleção conforme equipamentos disponíveis"
          },
          {
            id: "nut_progressao",
            nome: "Progressões de exercícios"
          },
          {
            id: "nut_regressao",
            nome: "Regressões e adaptações"
          },
          {
            id: "nut_series_repeticoes",
            nome: "Séries, repetições, cargas e intervalos"
          },
          {
            id: "nut_periodizacao",
            nome: "Periodização do treinamento"
          }
        ]
      },

      {
        titulo: "Acompanhamento e aplicativo",

        descricao:
          "Comunicação, adesão e acompanhamento da evolução.",

        funcionalidades: [
          {
            id: "nut_app_aluno",
            nome: "Aplicativo do aluno ou paciente"
          },
          {
            id: "nut_registro_refeicoes",
            nome: "Registro de refeições"
          },
          {
            id: "nut_registro_treinos",
            nome: "Registro de treinos realizados"
          },
          {
            id: "nut_cargas",
            nome: "Acompanhamento de cargas e desempenho"
          },
          {
            id: "nut_dor",
            nome: "Registro de dor"
          },
          {
            id: "nut_fadiga",
            nome: "Registro de fadiga"
          },
          {
            id: "nut_recuperacao",
            nome: "Avaliação de recuperação"
          },
          {
            id: "nut_adesao",
            nome: "Controle de adesão ao plano"
          },
          {
            id: "nut_mensagens",
            nome: "Mensagens entre profissional e aluno"
          },
          {
            id: "nut_lembretes",
            nome: "Lembretes e notificações"
          }
        ]
      },

      {
        titulo: "Gestão, IA e segurança",

        descricao:
          "Administração do atendimento e recursos inteligentes.",

        funcionalidades: [
          {
            id: "nut_agenda",
            nome: "Agenda de consultas e avaliações"
          },
          {
            id: "nut_planos",
            nome: "Planos, mensalidades e contratos"
          },
          {
            id: "nut_financeiro",
            nome: "Controle financeiro"
          },
          {
            id: "nut_unidades",
            nome: "Gestão de academias, studios e unidades"
          },
          {
            id: "nut_profissionais",
            nome: "Gestão de profissionais"
          },
          {
            id: "nut_ia_dieta",
            nome: "IA para gerar rascunhos de planos alimentares"
          },
          {
            id: "nut_ia_treino",
            nome: "IA para gerar rascunhos de treinos"
          },
          {
            id: "nut_validacao",
            nome: "Validação obrigatória pelo profissional"
          },
          {
            id: "nut_permissoes",
            nome: "Usuários e permissões"
          },
          {
            id: "nut_lgpd",
            nome: "LGPD, consentimentos e privacidade"
          },
          {
            id: "nut_auditoria",
            nome: "Histórico e auditoria de alterações"
          }
        ]
      }
    ]
  },

  sst: {
    codigo: "SST",

    titulo: "Pesquisa — Perícias, SST e Clínica Ocupacional",

    descricao:
      "Pesquisa voltada a perícias, segurança do trabalho e saúde ocupacional.",

    cargos: [
      "Perito judicial",
      "Assistente técnico",
      "Engenheiro de Segurança do Trabalho",
      "Técnico de Segurança do Trabalho",
      "Médico do Trabalho",
      "Enfermeiro do Trabalho",
      "Técnico ou auxiliar de enfermagem do trabalho",
      "Higienista ocupacional",
      "Ergonomista",
      "Responsável por clínica ocupacional",
      "Gestor de SST",
      "Consultor de SST",
      "Profissional de Recursos Humanos",
      "Responsável por eSocial",
      "Responsável administrativo",
      "Proprietário ou sócio",
      "Advogado",
      "Outro"
    ],

    grupos: [
      {
        titulo: "Perícias judiciais",

        descricao:
          "Gestão completa dos trabalhos realizados como perito judicial.",

        funcionalidades: [
          {
            id: "sst_processos",
            nome: "Cadastro de processos judiciais"
          },
          {
            id: "sst_nomeacoes",
            nome: "Controle de nomeações"
          },
          {
            id: "sst_impedimentos",
            nome: "Controle de conflitos e impedimentos"
          },
          {
            id: "sst_prazos",
            nome: "Controle de prazos periciais"
          },
          {
            id: "sst_partes",
            nome: "Cadastro de partes e advogados"
          },
          {
            id: "sst_quesitos",
            nome: "Organização de quesitos"
          },
          {
            id: "sst_diligencias",
            nome: "Agendamento de diligências"
          },
          {
            id: "sst_inspecoes",
            nome: "Registro de inspeções"
          },
          {
            id: "sst_evidencias",
            nome: "Organização de evidências"
          },
          {
            id: "sst_fotografias",
            nome: "Relatório fotográfico"
          },
          {
            id: "sst_medicoes",
            nome: "Registro de medições"
          },
          {
            id: "sst_laudos_periciais",
            nome: "Elaboração de laudos periciais"
          },
          {
            id: "sst_esclarecimentos",
            nome: "Controle de esclarecimentos"
          },
          {
            id: "sst_honorarios",
            nome: "Controle de honorários periciais"
          }
        ]
      },

      {
        titulo: "Assistência técnica judicial",

        descricao:
          "Recursos para acompanhamento de perícias e defesa técnica das partes.",

        funcionalidades: [
          {
            id: "sst_assistencia_processos",
            nome: "Gestão de processos acompanhados"
          },
          {
            id: "sst_analise_documentos",
            nome: "Análise de documentos do processo"
          },
          {
            id: "sst_quesitos_assistente",
            nome: "Elaboração de quesitos"
          },
          {
            id: "sst_acompanhamento_diligencia",
            nome: "Acompanhamento de diligências"
          },
          {
            id: "sst_pareceres",
            nome: "Elaboração de pareceres técnicos"
          },
          {
            id: "sst_manifestacoes",
            nome: "Manifestações sobre laudos"
          },
          {
            id: "sst_impugnacoes",
            nome: "Elaboração de impugnações"
          },
          {
            id: "sst_assistencia_esclarecimentos",
            nome: "Resposta a esclarecimentos"
          },
          {
            id: "sst_audiencias",
            nome: "Preparação para audiências"
          },
          {
            id: "sst_cadeia_custodia",
            nome: "Cadeia de custódia das evidências"
          }
        ]
      },

      {
        titulo: "Empresas, trabalhadores e estrutura",

        descricao:
          "Cadastro central das organizações atendidas e suas estruturas.",

        funcionalidades: [
          {
            id: "sst_empresas",
            nome: "Cadastro de empresas"
          },
          {
            id: "sst_estabelecimentos",
            nome: "Cadastro de estabelecimentos"
          },
          {
            id: "sst_setores",
            nome: "Cadastro de setores"
          },
          {
            id: "sst_cargos",
            nome: "Cadastro de cargos e funções"
          },
          {
            id: "sst_ghe",
            nome: "Grupos de exposição"
          },
          {
            id: "sst_trabalhadores",
            nome: "Cadastro de trabalhadores"
          },
          {
            id: "sst_historico_laboral",
            nome: "Histórico laboral"
          },
          {
            id: "sst_responsaveis",
            nome: "Responsáveis técnicos e administrativos"
          },
          {
            id: "sst_documentos_empresa",
            nome: "Documentos e contratos por empresa"
          },
          {
            id: "sst_portal_empresa",
            nome: "Portal da empresa cliente"
          }
        ]
      },

      {
        titulo: "GRO, PGR e avaliações de riscos",

        descricao:
          "Identificação, avaliação e controle dos riscos ocupacionais.",

        funcionalidades: [
          {
            id: "sst_gro",
            nome: "Gerenciamento de Riscos Ocupacionais"
          },
          {
            id: "sst_pgr",
            nome: "Elaboração e gestão do PGR"
          },
          {
            id: "sst_inventario",
            nome: "Inventário de riscos"
          },
          {
            id: "sst_plano_acao",
            nome: "Plano de ação"
          },
          {
            id: "sst_agentes_fisicos",
            nome: "Agentes físicos"
          },
          {
            id: "sst_agentes_quimicos",
            nome: "Agentes químicos"
          },
          {
            id: "sst_agentes_biologicos",
            nome: "Agentes biológicos"
          },
          {
            id: "sst_riscos_acidentes",
            nome: "Riscos de acidentes"
          },
          {
            id: "sst_riscos_ergonomicos",
            nome: "Riscos ergonômicos"
          },
          {
            id: "sst_psicossociais",
            nome: "Fatores de riscos psicossociais"
          },
          {
            id: "sst_matriz_risco",
            nome: "Matriz de classificação de riscos"
          },
          {
            id: "sst_medidas_controle",
            nome: "Medidas de prevenção e controle"
          }
        ]
      },

      {
        titulo: "Higiene ocupacional e avaliações ambientais",

        descricao:
          "Gestão das avaliações quantitativas e qualitativas.",

        funcionalidades: [
          {
            id: "sst_ruido",
            nome: "Avaliação de ruído"
          },
          {
            id: "sst_calor",
            nome: "Avaliação de calor"
          },
          {
            id: "sst_vibracao",
            nome: "Avaliação de vibração"
          },
          {
            id: "sst_quimicos",
            nome: "Avaliação de agentes químicos"
          },
          {
            id: "sst_biologicos",
            nome: "Avaliação de agentes biológicos"
          },
          {
            id: "sst_iluminamento",
            nome: "Avaliação de iluminamento"
          },
          {
            id: "sst_equipamentos_medicao",
            nome: "Controle de equipamentos de medição"
          },
          {
            id: "sst_calibracoes",
            nome: "Controle de calibrações"
          },
          {
            id: "sst_estrategia_amostragem",
            nome: "Estratégia de amostragem"
          },
          {
            id: "sst_relatorios_avaliacao",
            nome: "Relatórios de avaliações ambientais"
          }
        ]
      },

      {
        titulo: "Ergonomia",

        descricao:
          "Avaliações ergonômicas e acompanhamento de medidas corretivas.",

        funcionalidades: [
          {
            id: "sst_aep",
            nome: "Avaliação Ergonômica Preliminar"
          },
          {
            id: "sst_aet",
            nome: "Análise Ergonômica do Trabalho"
          },
          {
            id: "sst_postos_trabalho",
            nome: "Cadastro de postos de trabalho"
          },
          {
            id: "sst_analise_tarefas",
            nome: "Análise de tarefas"
          },
          {
            id: "sst_metodos_ergonomicos",
            nome: "Ferramentas e métodos ergonômicos"
          },
          {
            id: "sst_questionarios",
            nome: "Questionários ergonômicos"
          },
          {
            id: "sst_psicossocial",
            nome: "Avaliação psicossocial"
          },
          {
            id: "sst_recomendacoes",
            nome: "Recomendações ergonômicas"
          },
          {
            id: "sst_cronogramas",
            nome: "Cronogramas de adequação"
          },
          {
            id: "sst_acompanhamento_ergonomia",
            nome: "Acompanhamento das medidas"
          }
        ]
      },

      {
        titulo: "Programas, laudos e documentos",

        descricao:
          "Elaboração, controle e atualização dos principais documentos de SST.",

        funcionalidades: [
          {
            id: "sst_ltcat",
            nome: "LTCAT"
          },
          {
            id: "sst_insalubridade",
            nome: "Laudo de insalubridade"
          },
          {
            id: "sst_periculosidade",
            nome: "Laudo de periculosidade"
          },
          {
            id: "sst_pca",
            nome: "Programa de Conservação Auditiva"
          },
          {
            id: "sst_ppr",
            nome: "Programa de Proteção Respiratória"
          },
          {
            id: "sst_apr",
            nome: "Análise Preliminar de Riscos"
          },
          {
            id: "sst_ordens_servico",
            nome: "Ordens de serviço"
          },
          {
            id: "sst_pop",
            nome: "Procedimentos operacionais"
          },
          {
            id: "sst_checklists",
            nome: "Checklists de inspeção"
          },
          {
            id: "sst_assinaturas",
            nome: "Assinatura digital de documentos"
          },
          {
            id: "sst_revisoes",
            nome: "Controle de versões e revisões"
          }
        ]
      },

      {
        titulo: "EPIs, treinamentos e gestão preventiva",

        descricao:
          "Controle das ações preventivas e obrigações operacionais.",

        funcionalidades: [
          {
            id: "sst_epis",
            nome: "Cadastro e controle de EPIs"
          },
          {
            id: "sst_entrega_epi",
            nome: "Registro de entrega de EPI"
          },
          {
            id: "sst_ca_epi",
            nome: "Controle de Certificado de Aprovação"
          },
          {
            id: "sst_treinamentos",
            nome: "Gestão de treinamentos"
          },
          {
            id: "sst_certificados",
            nome: "Certificados de treinamentos"
          },
          {
            id: "sst_vencimentos",
            nome: "Alertas de vencimentos"
          },
          {
            id: "sst_cipa",
            nome: "Gestão da CIPA"
          },
          {
            id: "sst_sesmt",
            nome: "Gestão do SESMT"
          },
          {
            id: "sst_emergencias",
            nome: "Plano e gestão de emergências"
          },
          {
            id: "sst_brigada",
            nome: "Gestão de brigada"
          }
        ]
      },

      {
        titulo: "Acidentes e incidentes",

        descricao:
          "Registro, investigação e acompanhamento de eventos ocupacionais.",

        funcionalidades: [
          {
            id: "sst_acidentes",
            nome: "Registro de acidentes"
          },
          {
            id: "sst_incidentes",
            nome: "Registro de incidentes"
          },
          {
            id: "sst_quase_acidentes",
            nome: "Registro de quase acidentes"
          },
          {
            id: "sst_investigacao",
            nome: "Investigação de causas"
          },
          {
            id: "sst_arvore_causas",
            nome: "Árvore de causas"
          },
          {
            id: "sst_planos_corretivos",
            nome: "Planos de ação corretivos"
          },
          {
            id: "sst_estatisticas",
            nome: "Estatísticas de acidentes"
          },
          {
            id: "sst_cat",
            nome: "Emissão e controle de CAT"
          }
        ]
      },

      {
        titulo: "Clínica ocupacional e PCMSO",

        descricao:
          "Gestão dos atendimentos e exames relacionados à saúde ocupacional.",

        funcionalidades: [
          {
            id: "sst_pcmso",
            nome: "Elaboração e gestão do PCMSO"
          },
          {
            id: "sst_prontuario",
            nome: "Prontuário ocupacional"
          },
          {
            id: "sst_admissional",
            nome: "Exame admissional"
          },
          {
            id: "sst_periodico",
            nome: "Exame periódico"
          },
          {
            id: "sst_retorno",
            nome: "Exame de retorno ao trabalho"
          },
          {
            id: "sst_mudanca_risco",
            nome: "Exame de mudança de risco ocupacional"
          },
          {
            id: "sst_demissional",
            nome: "Exame demissional"
          },
          {
            id: "sst_complementares",
            nome: "Exames complementares"
          },
          {
            id: "sst_aso",
            nome: "Emissão de ASO"
          },
          {
            id: "sst_aptidao",
            nome: "Controle de aptidão"
          },
          {
            id: "sst_encaminhamentos",
            nome: "Encaminhamentos médicos"
          },
          {
            id: "sst_restricoes",
            nome: "Restrições ocupacionais"
          }
        ]
      },

      {
        titulo: "Agenda e gestão da clínica ocupacional",

        descricao:
          "Organização administrativa e operacional dos atendimentos.",

        funcionalidades: [
          {
            id: "sst_agenda_clinica",
            nome: "Agenda da clínica"
          },
          {
            id: "sst_convocacoes",
            nome: "Convocação de trabalhadores"
          },
          {
            id: "sst_lembretes_exames",
            nome: "Lembretes de exames"
          },
          {
            id: "sst_prestadores",
            nome: "Gestão de prestadores"
          },
          {
            id: "sst_rede_credenciada",
            nome: "Rede credenciada"
          },
          {
            id: "sst_faturamento_clinica",
            nome: "Faturamento da clínica"
          },
          {
            id: "sst_tabelas_preco",
            nome: "Tabelas de preços"
          },
          {
            id: "sst_portal_trabalhador",
            nome: "Portal do trabalhador"
          },
          {
            id: "sst_portal_empresa_clinica",
            nome: "Portal da empresa contratante"
          }
        ]
      },

      {
        titulo: "eSocial, previdenciário e rastreabilidade",

        descricao:
          "Obrigações digitais e histórico das exposições ocupacionais.",

        funcionalidades: [
          {
            id: "sst_esocial",
            nome: "Gestão do eSocial SST"
          },
          {
            id: "sst_s2210",
            nome: "Evento S-2210"
          },
          {
            id: "sst_s2220",
            nome: "Evento S-2220"
          },
          {
            id: "sst_s2221",
            nome: "Evento S-2221"
          },
          {
            id: "sst_s2240",
            nome: "Evento S-2240"
          },
          {
            id: "sst_ppp",
            nome: "PPP eletrônico"
          },
          {
            id: "sst_exposicoes",
            nome: "Histórico de exposições"
          },
          {
            id: "sst_inconsistencias",
            nome: "Validação de inconsistências"
          },
          {
            id: "sst_recibos",
            nome: "Recibos e retornos do eSocial"
          },
          {
            id: "sst_auditoria_digital",
            nome: "Auditoria e rastreabilidade"
          }
        ]
      },

      {
        titulo: "IA, gestão e segurança",

        descricao:
          "Recursos para automação, análise, proteção e administração da plataforma.",

        funcionalidades: [
          {
            id: "sst_ia_documentos",
            nome: "IA para gerar rascunhos de documentos"
          },
          {
            id: "sst_ia_analise",
            nome: "IA para analisar documentos e riscos"
          },
          {
            id: "sst_ia_comparacao",
            nome: "IA para comparar versões e documentos"
          },
          {
            id: "sst_ocr",
            nome: "OCR de documentos"
          },
          {
            id: "sst_automacoes",
            nome: "Automações e fluxos de trabalho"
          },
          {
            id: "sst_dashboard",
            nome: "Dashboards e indicadores"
          },
          {
            id: "sst_multempresas",
            nome: "Gestão de múltiplas empresas"
          },
          {
            id: "sst_permissoes",
            nome: "Usuários, equipes e permissões"
          },
          {
            id: "sst_lgpd",
            nome: "LGPD e proteção de dados"
          },
          {
            id: "sst_logs",
            nome: "Logs e auditoria"
          },
          {
            id: "sst_backup",
            nome: "Backups e recuperação"
          }
        ]
      }
    ]
  }
};

const ESCALA_IMPORTANCIA = [
  {
    valor: "Indispensável",
    rotulo: "Indispensável"
  },
  {
    valor: "Importante",
    rotulo: "Importante"
  },
  {
    valor: "Pouco importante",
    rotulo: "Pouco importante"
  },
  {
    valor: "Não utilizaria",
    rotulo: "Não utilizaria"
  },
  {
    valor: "Não sei avaliar",
    rotulo: "Não sei avaliar"
  }
];

function obterPesquisa(tipo) {
  if (!tipo || typeof tipo !== "string") {
    return null;
  }

  return PESQUISAS[tipo.toLowerCase()] || null;
}

function obterTodasFuncionalidades(pesquisa) {
  if (!pesquisa || !Array.isArray(pesquisa.grupos)) {
    return [];
  }

  return pesquisa.grupos.flatMap((grupo) =>
    grupo.funcionalidades.map((funcionalidade) => ({
      ...funcionalidade,
      grupo: grupo.titulo
    }))
  );
}

function obterOpcoesPrioridade(pesquisa) {
  return obterTodasFuncionalidades(pesquisa).map((funcionalidade) => ({
    valor: funcionalidade.nome,
    rotulo: funcionalidade.nome
  }));
}
