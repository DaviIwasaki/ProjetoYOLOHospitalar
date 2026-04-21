<h2 align="center">
  <img width="300px" src="https://i.imgur.com/V862hpm.png" alt="Logo do Projeto">
</h2>

<h2 align="center">
   Software para Saúde
</h2>
<h4 align="center">
  Sistema de Detecção de Objetos com Aprendizado de Máquina para Validação de Maletas Cirúrgicas em Tempo Real
</h4>


<h3 align="center">
  <p align="center">
    <a href="README.md">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="Introdução.md">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="Especificação.md">Especificação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="TrabalhosRelacionados.md">TrabalhosRelacionados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="Conclusão.md">Conclusão</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  </p>
</h3>

# Introdução

---

## Definição do Projeto 

O projeto é intitulado **Automatização da Gestão de Instrumentos Hospitalares Utilizando YOLO: Detecção de Objetos com Aprendizado de Máquina**.

Este estudo apresenta uma **solução tecnológica baseada em aprendizado de máquina** para auxiliar na gestão de inventário e na validação de instrumentos hospitalares. O sistema utiliza o reconhecimento de objetos por meio do modelo **YOLOv8n (You Only Look Once)** .

A abordagem do YOLO:
*   Divide a imagem em uma grade e prevê as caixas delimitadoras e as probabilidades de classe.
*   Processa a imagem em uma **única passagem** pela rede neural, o que o torna **extremamente rápido e eficiente** para **aplicações em tempo real**.

Este trabalho constitui um **projeto de extensão** do **curso de Engenharia de Software** e dá **continuidade** a um estudo anterior. A base do projeto foi desenvolvida originalmente como um **trabalho de conclusão de curso (TCC) em Sistemas de Informação na PUC Minas**, em parceria com o **Hospital São Francisco de Assis**, no contexto do **projeto de extensão "Software para saúde"**.

## Finalidade 

A finalidade principal do projeto é **reduzir erros humanos e aumentar a eficiência** na organização de maletas cirúrgicas.

O que se espera da aplicação:
*   Disponibilizar um **sistema WEB** capaz de **reconhecer, classificar e validar instrumentos hospitalares**.
*   Permitir a detecção em tempo real por meio de **câmeras de dispositivos móveis**.
*   Aprimorar a eficiência dos procedimentos médicos e **reduzir o tempo de resposta** em situações críticas.

## Justificativa 

A gestão de inventário dos instrumentos cirúrgicos é realizada por **profissionais de enfermagem**, utilizando registros fotográficos em apostilas. Este procedimento é suscetível a **erros humanos**, como falta de atenção e **cansaço físico ou mental**.

Ao adicionar a etapa de **detecção de objetos**, o processo se torna **menos suscetível a erros humanos**, pois o reconhecimento e a classificação dos itens passam a ser **responsabilidade do algoritmo**. Isso é crucial, visto que a organização das maletas cirúrgicas é um **processo crítico** em ambientes hospitalares.

## Stakeholders
As partes interessadas (Stakeholders) do projeto incluem:

| Categoria | Partes Envolvidas | Papel no Projeto |
| :--- | :--- | :--- |
| **Time do Projeto** | Davi Iwasaki Silva, Julia Marques Fialho, Nalanda Luiza dos Santos, Luiz Fernado Batista Moreira e Cleia Marcia Gomes Amaral (Orientadora). | Desenvolvedores/Autores . |
| **Cliente/Beneficiário** | Hospital São Francisco de Assis e PUC Minas. | Parceiros no projeto de extensão "Software para saúde" . |
| **Usuários Finais** | Profissionais da área de enfermagem (Operadores, Gestores e Administradores). | Responsáveis por assegurar a organização das maletas cirúrgicas. |

## Escopo Geral do Projeto

O escopo do projeto abrange o desenvolvimento de um sistema que:

1.  **Coleta e Preparação de Dados:** Utilizou "" imagens iniciais, aplicando aumentação de dados (rotações, brilho, sombras).
2.  **Treinamento do Modelo:** Treinou e validou o modelo **YOLOv8n**, analisando métricas quantitativas como **mAP, Precision, Recall e F1-score**.
3.  **Desenvolvimento da Aplicação WEB:** Integrar o modelo em uma arquitetura cliente-servidor usando **Flask** e **Socket.IO** para processamento em tempo real.
4.  **Implantação:** 

## Ferramentas Utilizadas

| **Categoria** | **Ferramentas / Tecnologias** | **Propósito Principal** |
| :--- | :--- | :--- |
| **Plataforma** | **Web e Mobile (Responsiva)** | Acesso via navegador em computadores e dispositivos móveis, dispensando instalação local. |
| **Visão Computacional** | **YOLOv8n**, **Ultralytics** | Algoritmo de detecção de objetos em tempo real, leve e otimizado para aplicações rápidas. |
| **Linguagem** | **Python** | Linguagem principal utilizada para o desenvolvimento do modelo de IA e do *backend*. |
| **Back-end / Framework** | **Flask**, **Socket.IO** | Flask para estrutura da aplicação e Socket.IO para comunicação bidirecional em tempo real entre cliente e servidor. |
| **Front-end / Interface** | **React Native**, **Vite**, **HTML5**, **CSS3** | Criação de uma interface interativa, moderna e responsiva, com renderização eficiente. |
| **Banco de Dados** | **MySQL** | Armazenamento estruturado e seguro de usuários, registros e metadados. |
| **Hospedagem / Deploy** | **AWS EC2**, **Docker**, **GitHub** | Hospedagem em nuvem com containerização para facilitar a entrega e garantir estabilidade e escalabilidade. |
| **Bibliotecas de Apoio** | **PyTorch**, **NumPy**, **OpenCV** | Treinamento do modelo, processamento de imagem e manipulação numérica. |
| **Tratamento de Dados** | **Roboflow**, **Designify** | Anotação, limpeza e aumentação das imagens do dataset. |
| **Ferramentas de Desenvolvimento** | **Visual Studio Code**, **Postman**, **Docker Compose** | Ambiente de codificação, teste de APIs e orquestração dos serviços da aplicação. |
| **Diferenciais do Projeto** | **Multiplataforma**, **Reconhecimento de Imagens**, **Baixo Custo** | Sistema acessível via web, baseado em código aberto e com detecção automatizada de instrumentos hospitalares. |
