# 📧 Template EmailJS - ADA Assistente de Acessibilidade

## 📋 Informações do Template

**Service ID:** `service_uje8ex5`  
**Template Name:** Formulário de Contato - Portfólio

## 🔧 Passo a Passo para Criar o Template

### 1. Acessar EmailJS Dashboard

1. Faça login em https://www.emailjs.com/
2. Vá em **Email Templates**
3. Clique em **Create New Template**

### 2. Configurar o Template

#### Informações Básicas:
- **Template Name:** `Formulário de Contato - Portfólio`
- **Subject:** `Nova mensagem do portfólio - {{name}}`

#### Conteúdo do Template:

Cole o seguinte código HTML no editor do template:

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

### 3. Variáveis do Template

O template usa as seguintes variáveis:
- `{{name}}` - Nome do remetente
- `{{email}}` - Email do remetente (disponível mas não exibido no template)
- `{{message}}` - Mensagem enviada
- `{{time}}` - Data e hora do envio

### 4. Salvar e Obter Template ID

1. Clique em **Save**
2. **Anote o Template ID** gerado (ex: `template_abc123`)
3. Você precisará deste ID para configurar no código

### 5. Obter Public Key

1. Vá em **Account** > **General**
2. Copie sua **Public Key** (ex: `abc123xyz`)

### 6. Configurar no Código

Após obter o Template ID e Public Key, edite:

**Arquivo:** `assets/js/script.js` (linha ~220)

Substitua:
```javascript
const templateId = 'YOUR_TEMPLATE_ID'; // ← Coloque o Template ID aqui
const publicKey = 'YOUR_PUBLIC_KEY'; // ← Coloque a Public Key aqui
```

**Arquivo:** `index.html` (linha ~290)

Descomente e configure:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="text/javascript">
  (function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // ← Coloque a Public Key aqui
  })();
</script>
```

## ✅ Checklist de Configuração

- [ ] Service ID configurado: `service_uje8ex5` ✅
- [ ] Template criado no EmailJS
- [ ] Template ID obtido
- [ ] Public Key obtida
- [ ] Template ID adicionado em `assets/js/script.js`
- [ ] Public Key adicionada em `assets/js/script.js`
- [ ] Public Key adicionada em `index.html`
- [ ] Script EmailJS descomentado em `index.html`
- [ ] Teste de envio realizado

## 🧪 Teste

1. Preencha o formulário de contato
2. Clique em "Enviar"
3. Verifique se recebeu o email
4. Verifique se todas as variáveis foram preenchidas corretamente

## 📝 Notas

- O Service ID já está configurado no código: `service_uje8ex5`
- O código já está preparado para usar as variáveis corretas
- A data/hora é gerada automaticamente no formato local

---

**Última Atualização:** 2025-11-26

