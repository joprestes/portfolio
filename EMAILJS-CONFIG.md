# 📧 Configuração do EmailJS para Formulário de Contato

Este guia explica como configurar o EmailJS para que o formulário de contato funcione corretamente.

## 📋 Pré-requisitos

1. Conta no [EmailJS](https://www.emailjs.com/) (gratuita até 200 emails/mês)
2. Serviço de email configurado (Gmail, Outlook, etc.)

## 🚀 Passo a Passo

### 1. Criar Conta no EmailJS

1. Acesse https://www.emailjs.com/
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Configurar Serviço de Email

1. No dashboard, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. **Service ID já configurado:** `service_uje8ex5` ✅

### 3. Criar Template de Email

1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. **Subject:** `Nova mensagem do portfólio - {{name}}`
4. Cole o template HTML fornecido (veja `EMAILJS-TEMPLATE.md` para o template completo)
5. **Anote o Template ID** gerado

### 4. Obter Public Key

1. Vá em **Account** > **General**
2. Copie sua **Public Key**

### 5. Configurar no Código

Edite o arquivo `assets/js/script.js` e substitua:

```javascript
// Linha ~228 (aproximadamente)
const serviceId = 'service_uje8ex5'; // ✅ Já configurado
const templateId = 'template_twj6ftm'; // ✅ Já configurado
const publicKey = 'YOUR_PUBLIC_KEY'; // ← Substituir pela Public Key
```

E no arquivo `index.html`, descomente e configure:

```html
<!-- Linha ~290 (aproximadamente) -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="text/javascript">
  (function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // ← Substituir pela Public Key
  })();
</script>
```

## ✅ Teste

1. Preencha o formulário de contato
2. Clique em "Enviar"
3. Verifique se recebeu o email

## 🔒 Segurança

- **Nunca** commite as chaves no repositório público
- Use variáveis de ambiente ou arquivo de configuração local
- Considere usar um arquivo `.env` (não versionado) para desenvolvimento

## 📝 Alternativas

Se preferir não usar EmailJS, você pode:

1. **Formspree** - https://formspree.io/
2. **Netlify Forms** - Se hospedar no Netlify
3. **Backend próprio** - API REST personalizada

## 🐛 Troubleshooting

- **Erro 400**: Verifique se os IDs estão corretos
- **Erro 401**: Verifique a Public Key
- **Email não chega**: Verifique spam e configurações do serviço de email

---

**Última Atualização:** 2025-11-26

