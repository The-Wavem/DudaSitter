# 🐾 Duda Sitter - Portal & Painel Administrativo

Este documento contém o roadmap técnico e os próximos passos para evoluir o protótipo do site da Duda Sitter para a versão final de produção. O foco é entregar uma plataforma rápida, otimizada para atração de clientes (SEO) e com um CMS completo e intuitivo para a gestão diária.

## 🚀 Roadmap de Desenvolvimento (Próximos Passos)

- [ ] **1. Integração com Banco de Dados Real (Firebase Firestore)**
  - [ ] Configurar o projeto no Firebase Console e conectar com a aplicação Vite/React.
  - [ ] Criar as coleções no Firestore: `messages`, `appointments`, `gallery`, `testimonials`, `about`, `contact`.
  - [ ] Refatorar os métodos de CRUD (atualmente em `localStorage`) para fazer chamadas assíncronas ao Firestore.

- [ ] **2. Autenticação de Segurança (Firebase Auth)**
  - [ ] Remover a validação estática/mockada ("admin").
  - [ ] Implementar login seguro com E-mail e Senha usando o Firebase Authentication.
  - [ ] Proteger a rota `/admin` e seus componentes, garantindo que usuários não autenticados sejam barrados ou redirecionados.

- [ ] **3. Upload de Imagens (Firebase Storage)**
  - [ ] Alterar o formulário de "Adicionar Foto" no CMS da página Admin.
  - [ ] Substituir o input de URL por um input de arquivo (`<input type="file" accept="image/*" />`).
  - [ ] Criar a função que envia a imagem para o Firebase Storage, recupera a URL de download gerada e salva essa URL no documento do Firestore.

- [ ] **4. SEO, Meta Tags e Open Graph (Foco em Conversão)**
  - [ ] Instalar a biblioteca `react-helmet-async` (ou configurar via `index.html`).
  - [ ] Definir `title` e `meta description` otimizados para busca local (focando em palavras-chave como "Pet Sitter e Dog Walker em Curitiba").
  - [ ] Configurar as tags do Open Graph (`og:image`, `og:title`, `og:description`) para garantir a exibição de *cards* com imagem e formatação correta quando o link do site for compartilhado no WhatsApp e no Instagram.

- [ ] **5. Sistema de Alertas e Notificações (Contato)**
  - [ ] Desenvolver integração ou endpoint (possibilidade de usar API em PHP) para o envio de mensagens.
  - [ ] Fazer com que o envio do formulário dispare um alerta automático (E-mail ou Bot de WhatsApp/Telegram) para a cuidadora, informando imediatamente sobre novos pedidos de orçamento.

## 🛠️ Stack Tecnológica

* **Front-end:** React.js + Vite
* **Estilização:** CSS modules/Custom Scrollbars
* **Animações:** Framer Motion
* **Back-end / BaaS:** Firebase (Firestore, Auth, Storage)
* **Integrações de Produtividade:** Geração de eventos do Google Calendar via Template URLs

---
*Projeto arquitetado e desenvolvido por The Wavem Agency.*

Protótipo do Ai Studios: https://ai.studio/apps/04cd7b75-7460-4d01-8281-355dae65042c
