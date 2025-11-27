# 🌐 Configuração para GitHub Pages

## ❓ Como o GitHub Pages vai saber as credenciais?

### ✅ Solução Implementada

Criamos uma solução **híbrida** que funciona tanto localmente quanto no GitHub Pages:

1. **GitHub Pages (Produção):**
   - As credenciais estão **inline no código** (`index.html` e `script.js`)
   - Isso é **SEGURO** porque a Public Key do EmailJS é feita para ser pública
   - O código funciona automaticamente no GitHub Pages

2. **Desenvolvimento Local:**
   - Você pode usar `config.emailjs.js` (não versionado) para sobrescrever
   - Se o arquivo existir, ele será usado
   - Se não existir, usa a configuração inline

## 🔒 Por que é seguro?

### Public Key do EmailJS

A **Public Key** (`Ga1azCFa-pZGuqrt6`) é **SEGURA para ser pública** porque:

✅ **Limitada:** Apenas permite enviar emails através dos templates configurados  
✅ **Sem acesso à conta:** Não permite modificar templates, serviços ou configurações  
✅ **Recomendado pela EmailJS:** É a forma oficial de usar no frontend  
✅ **Não é uma senha:** É uma chave pública, não privada  

### Service ID e Template ID

- **Service ID** e **Template ID** também são seguros para serem públicos
- Eles apenas identificam qual serviço e template usar
- Não permitem acesso ou modificação

## 📁 Estrutura de Arquivos

```
portfolio/
├── index.html                  # ✅ Contém credenciais inline (para GitHub Pages)
├── assets/js/script.js         # ✅ Contém credenciais inline (para GitHub Pages)
├── config.emailjs.js           # ⚠️ Opcional (não versionado, para desenvolvimento)
└── config.emailjs.example.js  # ✅ Template de exemplo (versionado)
```

## 🚀 Como Funciona

### No GitHub Pages (Produção):
```javascript
// index.html - linha ~333
emailjs.init("Ga1azCFa-pZGuqrt6"); // ✅ Funciona automaticamente

// script.js - linha ~227
const serviceId = 'service_uje8ex5'; // ✅ Funciona automaticamente
const templateId = 'template_twj6ftm'; // ✅ Funciona automaticamente
```

### No Desenvolvimento Local (Opcional):
```javascript
// Se config.emailjs.js existir, ele será usado
// Se não existir, usa a configuração inline
```

## ✅ Vantagens desta Abordagem

1. **Funciona no GitHub Pages:** Credenciais estão no código
2. **Funciona localmente:** Pode usar arquivo de config se quiser
3. **Seguro:** Public Key é feita para ser pública
4. **Simples:** Não precisa de variáveis de ambiente ou build complexo
5. **Documentado:** Está claro que é seguro

## 📝 Alternativas (se quiser mais segurança)

Se você quiser uma camada extra de segurança, pode:

1. **Usar GitHub Secrets + Actions:**
   - Criar um workflow que injeta as credenciais no build
   - Mais complexo, mas mais seguro

2. **Usar um backend:**
   - Criar uma API que recebe os dados do formulário
   - Backend envia o email
   - Mais seguro, mas requer servidor

3. **Manter como está:**
   - ✅ **Recomendado** - Public Key é segura para ser pública
   - ✅ Funciona perfeitamente no GitHub Pages
   - ✅ Simples e direto

## 🔗 Referências

- [EmailJS Security](https://www.emailjs.com/docs/security/)
- [Public vs Private Keys](https://www.emailjs.com/docs/sdk/send/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Conclusão:** Suas credenciais estão no código e isso é **SEGURO** para o EmailJS. O GitHub Pages funcionará perfeitamente! 🚀

---

**Última Atualização:** 2025-11-26

