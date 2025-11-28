<h2 align="center">
  <img width="300px" src="https://i.imgur.com/V862hpm.png" alt="Logo do Projeto">
</h2>

<h2 align="center">
   Software para Saúde
</h2>

<h3 align="center">
  <p align="center">
    <a href="README.md">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="Introdução.md">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="Especificação.md">Especificação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="TrabalhosRelacionados.md">TrabalhosRelacionados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="Conclusão.md">Conclusão</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  </p>
</h3>

# Especificações Técnicas e Requisitos

Este documento detalha os requisitos funcionais, não funcionais e as restrições que guiam o desenvolvimento e a implantação do sistema de **Automatização da Gestão de Instrumentos Hospitalares utilizando YOLO**.

---

## 1. Requisitos Funcionais (RF)

Estes requisitos definem as funções que o sistema deve ser capaz de executar para atender aos objetivos de gestão e validação de instrumentos hospitalares.

| ID | Requisito Funcional | Prioridade | Observações / Funcionalidades Chave | 
| :--- | :--- | :--- | :--- | 
| **RF01** | O sistema deve permitir a **identificação automática** de peças e produtos hospitalares por meio de visão computacional (modelo YOLO). | Alta | Base do projeto. |
| **RF02 / RF03** | O sistema deve **registrar a entrada e saída** de produtos e **manter um histórico completo de movimentações** (rastreabilidade total do item). | Alta | Vinculando data, hora, responsável e localização. |
| **RF04** | O sistema deve possibilitar o **cadastro de produtos e peças**, com dados como código interno, nome, categoria e validade. | Média |
| **RF06** | O sistema deve **emitir alertas automáticos** quando a quantidade estiver abaixo ou acima do estoque ideal. | Média | Essencial para evitar erros humanos. |
| **RF07** | O sistema deve permitir o **cadastro e autenticação de usuários** com diferentes níveis de acesso (operador, gestor, administrador). | Alta | Garantindo controle de acesso.  |
| **RF08** | O sistema deve permitir **consultas e relatórios** sobre consumo, validade e movimentação de produtos. | Média |
| **RF12** | O sistema deve gerar **identificadores únicos** (QR Code, RFID ou similar) para cada item rastreado. | Média | Alternativo ou complementar à visão computacional. |
| **RF11** | O sistema deve **registrar ocorrências e observações** dos usuários sobre produtos e processos. | Média |

---

## 2. Requisitos Não Funcionais (RNF)

Estes requisitos definem as características de qualidade do sistema, englobando desempenho, usabilidade, segurança e compatibilidade.

### A. Desempenho e Velocidade

| ID | Descrição | Categoria | Meta Técnica | 
| :--- | :--- | :--- | :--- | 
| **RNF03** | A identificação por visão computacional deve ocorrer em **tempo real**. | Desempenho | **≤ 2 segundos por item** (Meta técnica). | 
| **RNF04** | O sistema deve armazenar dados em **banco de dados seguro e estruturado**, com **backup automático**. | Integridade | Proteção contra perda de dados.|

### B. Usabilidade e Interface

| ID | Descrição | Categoria | Detalhes |
| :--- | :--- | :--- | :--- | 
| **RNF02** | O sistema deve ser **acessível via navegador web (responsivo)**. | Usabilidade | Permite utilização em dispositivos móveis. |
| **RNF06 / RNF10** | O sistema deve possuir **interface intuitiva e limpa** , adaptada a ambientes hospitalares. | Usabilidade | Sem excesso visual, rápida e de fácil leitura. |

### C. Compatibilidade e Tecnológico

| ID | Descrição | Categoria | Detalhes |
| :--- | :--- | :--- | :--- | 
| **RNF07** | O sistema deverá ser desenvolvido em **Python**, com uso da biblioteca **YOLOv8** ou superior, integrada ao *backend*. | Tecnológico | Padrão inicial do projeto . |
| **RNF05** | O sistema deve ser **compatível com dispositivos de câmera padrão** (CCTV, webcams, celulares). | Compatibilidade |
| **RNF08** | O sistema deve permitir **atualizações modulares** sem necessidade de reinstalação completa. | Manutenibilidade  |

---

## 3. Requisitos de Infraestrutura e Segurança (Hospedagem)

Estes requisitos são cruciais para a escolha do provedor de hospedagem (como a **AWS EC2**) e para garantir a operação contínua do aplicativo.

| ID | Requisito | Detalhes Técnicos e Expectativas |
| :--- | :--- | :--- | 
| **M.1** | **Uptime (Disponibilidade)** | O provedor de hospedagem deve garantir um tempo de atividade de **99,9% ou superior**. |
| **M.2** | **Escalabilidade** | Deve ser possível aumentar ou diminuir os recursos (**Escalabilidade vertical e horizontal**) de forma rápida e fácil (CPU, memória) para acompanhar picos de acesso e crescimento da demanda. |
| **M.3** | **Segurança (Criptografia)** | O serviço deve oferecer **Certificado SSL** para garantir a criptografia dos dados , além de **Firewall** e outras formas de criptografia. |
| **M.4** | **Proteção contra Ameaças** | O provedor deve implementar medidas robustas de segurança para proteger o aplicativo contra **ataques DDoS** (Negação de Serviço Distribuído). |
| **M.5** | **Suporte e Agilidade** | Buscar suporte técnico **24 horas por dia, 7 dias por semana** (24/7), com avaliação de eficiência e agilidade na solução de problemas. |
| **M.6** | **Integração e Deployment** | O serviço deve suportar **integração com provedores Git** (como GitHub), facilitando o processo de *deployment* (implantação) . | 
| **M.7** | **Performance e Latência** | Verificar a performance do servidor e a latência, sendo que a **proximidade dos servidores** com o público-alvo pode afetar a velocidade de carregamento. |
| **M.8** | **Custo Transparente** | Os preços devem ser competitivos e transparentes, compreendendo o modelo de cobrança (fixo, por uso ou combinado) e o custo de manutenção . | 
| **M.9** | **Tipos de Hospedagem** | Idealmente, utilizar um modelo de **Hospedagem em Nuvem (Cloud Computing)**, devido à grande escalabilidade e flexibilidade . |

---

## 4. Restrições do Projeto

Estas são as limitações e condições que precisam ser observadas na implementação:

| ID | Restrição | Detalhe | 
| :--- | :--- | :--- | 
| **RNF9** | **Resolução Mínima da Câmera** | Os dispositivos de captura (câmeras) devem possuir uma **resolução mínima de 640p** para garantir a qualidade de imagem necessária para a detecção precisa. |
| **RF13** | **Qualidade da Iluminação** | O sistema deve incluir mecanismos para **mitigar desafios relacionados à iluminação inadequada** do ambiente, que podem comprometer a precisão da detecção . |
| **RNF01** | **Segurança e Acesso** | O sistema deve garantir segurança e **controle de acesso com autenticação individual** e registro de ações. |
| **Legal** | **Conformidade** | É necessário implementar medidas de segurança para garantir a **conformidade com regulamentações de privacidade de dados médicos** (como LGPD e HIPAA). |

---

## 5. Histórias de Usuários (User Stories)

As histórias de usuários refletem as expectativas de uso e os benefícios práticos do sistema no ambiente hospitalar:

1.  Como **Profissional de Saúde**, eu quero que o sistema **identifique os instrumentos automaticamente e em tempo real** (RNF03), para que eu possa validar a maleta cirúrgica de forma **rápida e eficiente** .
2.  Como **Gestor de Estoque**, eu quero que o sistema **gere alertas automáticos** (RF06) sobre falta ou excesso de itens, para que eu possa **reduzir os erros humanos** na preparação das maletas.
3.  Como **Administrador de TI**, eu preciso que o sistema seja **altamente disponível (99,9%) e escalável** (M.1, M.2), para que ele suporte o crescimento da demanda e mantenha a operação sem interrupções.
4.  Como **Profissional de Saúde**, eu quero que o sistema seja **otimizado para dispositivos móveis** (RNF02), para que eu possa realizar a validação dos instrumentos **diretamente no local de trabalho** com flexibilidade.
5.  Como **Administrador**, eu preciso que o sistema tenha **backups automáticos** e **rastreabilidade total** (RF03, RNF04), para que eu possa garantir a integridade e segurança dos dados críticos.
