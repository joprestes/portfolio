# 📧 Configuração Completa do EmailJS

## ✅ Status Atual

- ✅ **Service ID configurado:** `service_uje8ex5`
- ✅ **Template ID configurado:** `template_twj6ftm`
- ✅ **Public Key configurada:** `Ga1azCFa-pZGuqrt6`
- ✅ **Configuração completa!** 🎉
- ✅ **Teste realizado com sucesso!** ✨
- ✅ **Email funcionando perfeitamente!** 🚀

---

## 🚀 Passo a Passo Rápido

### 1. Criar o Template no EmailJS

1. Acesse https://www.emailjs.com/ e faça login
2. Vá em **Email Templates** → **Create New Template**
3. Configure:
   - **Template Name:** `Formulário de Contato - Portfólio`
   - **Subject:** `Nova mensagem do portfólio - {{name}}`
4. Cole o template HTML abaixo no editor
5. Clique em **Save**
6. **Copie o Template ID** gerado (ex: `template_abc123`)

### 2. Template HTML para Copiar

Cole este código no editor do template:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px;">

<div>A message by {{name}} has been received. Kindly respond at your earliest convenience.</div>

<div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: lightgrey;">

<table role="presentation">

<tbody>

<tr>

<td style="vertical-align: top;">

<div style="padding: 6px 10px; margin: 0 10px; background-color: aliceblue; border-radius: 5px; font-size: 26px;" role="img">👤</div>

</td>

<td style="vertical-align: top;">

<div style="color: #2c3e50; font-size: 16px;"><strong>{{name}}</strong></div>

<div style="color: #cccccc; font-size: 13px;">{{time}}</div>

<p style="font-size: 16px;">{{message}}</p>

</td>

</tr>

</tbody>

</table>

<div>

<div>Mensagem:</div>

<div>{{message}}</div>

<br>

<div>---</div>

<div>Enviado através do formulário de contato do portfólio.</div>

</div>

</div>

</div>
```

### 3. Obter Public Key

1. No EmailJS, vá em **Account** → **General**
2. Copie sua **Public Key** (ex: `abc123xyz`)

### 4. Configurar no Código

#### Arquivo: `assets/js/script.js`

✅ **Já configurado:**
```javascript
const serviceId = 'service_uje8ex5'; // ✅
const templateId = 'template_twj6ftm'; // ✅
const publicKey = 'Ga1azCFa-pZGuqrt6'; // ✅
```

#### Arquivo: `index.html`

✅ **Já configurado:**
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="text/javascript">
  (function(){
    emailjs.init("Ga1azCFa-pZGuqrt6"); // ✅
  })();
</script>
```

---

## 📋 Variáveis do Template

O template usa estas variáveis (já configuradas no código):

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `{{name}}` | Nome do remetente | "João Silva" |
| `{{email}}` | Email do remetente | "joao@email.com" |
| `{{message}}` | Mensagem enviada | "Olá, gostaria de..." |
| `{{time}}` | Data e hora do envio | "26/11/2025, 14:30" |

---

## ✅ Checklist Final

- [x] Service ID configurado: `service_uje8ex5`
- [x] Template criado no EmailJS
- [x] Template ID copiado: `template_twj6ftm`
- [x] Template ID adicionado em `assets/js/script.js`
- [x] Public Key obtida: `Ga1azCFa-pZGuqrt6`
- [x] Public Key adicionada em `assets/js/script.js`
- [x] Public Key adicionada em `index.html`
- [x] Script EmailJS descomentado em `index.html`
- [x] Teste de envio realizado ✅
- [x] Email recebido com sucesso ✅

---

## 🧪 Testar

1. Abra o site no navegador
2. Preencha o formulário de contato
3. Clique em "Enviar"
4. Verifique se recebeu o email
5. Verifique o console do navegador (F12) se houver erros

---

## 🐛 Troubleshooting

### Erro: "Service not found"
- Verifique se o Service ID está correto: `service_uje8ex5`

### Erro: "Template not found"
- Verifique se o Template ID está correto
- Verifique se o template está salvo no EmailJS

### Erro: "Invalid public key"
- Verifique se a Public Key está correta
- Verifique se está configurada em ambos os lugares (script.js e index.html)

### Email não chega
- Verifique a pasta de spam
- Verifique as configurações do serviço de email no EmailJS
- Verifique os logs no dashboard do EmailJS

---

**Última Atualização:** 2025-11-26

