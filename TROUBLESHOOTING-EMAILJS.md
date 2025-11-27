# 🔧 Troubleshooting EmailJS - Erro 400

## ❌ Problema: Erro 400 (Bad Request)

O erro 400 geralmente indica que há um problema com os parâmetros da requisição ou com a configuração do template.

## 🔍 Possíveis Causas e Soluções

### 1. Verificar Template no EmailJS Dashboard

1. Acesse https://www.emailjs.com/
2. Vá em **Email Templates**
3. Verifique se o template `template_twj6ftm` existe
4. Verifique se as variáveis do template correspondem:
   - `{{name}}`
   - `{{email}}`
   - `{{message}}`
   - `{{time}}`

### 2. Verificar Service ID

1. No EmailJS, vá em **Email Services**
2. Verifique se o service `service_uje8ex5` está ativo
3. Verifique se o serviço de email está conectado corretamente

### 3. Verificar Public Key

1. No EmailJS, vá em **Account** > **General**
2. Verifique se a Public Key `Ga1azCFa-pZGuqrt6` está correta
3. Verifique se a Public Key está inicializada no `index.html`

### 4. Verificar Formato dos Parâmetros

O código foi ajustado para usar a sintaxe correta do EmailJS v4:

```javascript
// ✅ Correto (EmailJS v4)
await emailjs.send(serviceId, templateId, templateParams);

// ❌ Incorreto (versão antiga)
await emailjs.send(serviceId, templateId, templateParams, publicKey);
```

### 5. Verificar Console do Navegador

Abra o console do navegador (F12) e verifique:
- Se há erros de JavaScript
- Se o EmailJS está carregado corretamente
- Se há mensagens de erro específicas

### 6. Verificar Template Variables

Certifique-se de que o template no EmailJS usa exatamente estas variáveis:
- `{{name}}` (não `{{from_name}}` ou `{{nome}}`)
- `{{email}}` (não `{{from_email}}`)
- `{{message}}`
- `{{time}}`

## 🧪 Teste Manual

Você pode testar diretamente no console do navegador:

```javascript
emailjs.send('service_uje8ex5', 'template_twj6ftm', {
  name: 'Teste',
  email: 'teste@email.com',
  message: 'Mensagem de teste',
  time: new Date().toLocaleString('pt-BR')
})
.then(function(response) {
  console.log('SUCCESS!', response.status, response.text);
}, function(error) {
  console.log('FAILED...', error);
});
```

## 📋 Checklist de Verificação

- [ ] Template existe no EmailJS dashboard
- [ ] Service ID está correto e ativo
- [ ] Public Key está correta e inicializada
- [ ] Variáveis do template correspondem aos parâmetros enviados
- [ ] EmailJS está carregado (verificar console)
- [ ] Não há erros no console do navegador
- [ ] Service de email está conectado no EmailJS

## 🔗 Links Úteis

- [Documentação EmailJS](https://www.emailjs.com/docs/)
- [Dashboard EmailJS](https://dashboard.emailjs.com/)
- [Troubleshooting EmailJS](https://www.emailjs.com/docs/sdk/send/)

---

**Última Atualização:** 2025-11-26

