# 🔒 Segurança de Credenciais - EmailJS

## ⚠️ Importante: Credenciais no Repositório Público

### ✅ SIM, as credenciais ficarão visíveis no repositório público

**Mas isso é SEGURO e INTENCIONAL!**

A **Public Key** do EmailJS é projetada para ser pública e pode ser usada no frontend sem problemas. Ela é limitada e não permite acesso total à sua conta.

### 📖 Leia mais em: `SEGURANCA-PUBLIC-KEY.md`

### ⚠️ Boas Práticas:

Mesmo assim, seguimos boas práticas e movemos as credenciais para um arquivo **não versionado**.

## 📁 Estrutura de Arquivos

```
portfolio/
├── config.emailjs.js          # ✅ Arquivo REAL (não versionado, no .gitignore)
├── config.emailjs.example.js  # ✅ Arquivo de EXEMPLO (versionado, sem credenciais)
└── .gitignore                 # ✅ Ignora config.emailjs.js
```

## 🔧 Como Funciona

1. **`config.emailjs.example.js`** - Arquivo de exemplo (versionado)
   - Contém placeholders: `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, etc.
   - Serve como template para outros desenvolvedores

2. **`config.emailjs.js`** - Arquivo real (NÃO versionado)
   - Contém as credenciais reais
   - Está no `.gitignore` e **NÃO será commitado**
   - Você precisa criar este arquivo localmente

3. **`.gitignore`** - Protege o arquivo real
   - Lista `config.emailjs.js` para não ser commitado

## 🚀 Para Usar em Outro Ambiente

### Passo 1: Copiar o arquivo de exemplo

```bash
cp config.emailjs.example.js config.emailjs.js
```

### Passo 2: Preencher com suas credenciais

Edite `config.emailjs.js` e substitua:
- `YOUR_SERVICE_ID` → Seu Service ID
- `YOUR_TEMPLATE_ID` → Seu Template ID  
- `YOUR_PUBLIC_KEY` → Sua Public Key

### Passo 3: Pronto!

O arquivo `config.emailjs.js` não será commitado e suas credenciais estarão seguras.

## 📝 Nota sobre Public Key

A Public Key do EmailJS (`Ga1azCFa-pZGuqrt6`) é **segura para ser pública** porque:
- É limitada apenas ao envio de emails
- Não permite acesso à sua conta
- Não permite modificar templates ou serviços
- É a forma recomendada pela EmailJS para uso no frontend

Mas mesmo assim, seguimos a boa prática de não expor todas as credenciais diretamente no código.

## ✅ Checklist de Segurança

- [x] Credenciais movidas para arquivo separado
- [x] Arquivo real adicionado ao `.gitignore`
- [x] Arquivo de exemplo criado para outros desenvolvedores
- [x] Código atualizado para carregar do arquivo de config
- [x] Documentação criada

## 🔗 Referências

- [EmailJS Security](https://www.emailjs.com/docs/security/)
- [Public Key vs Private Key](https://www.emailjs.com/docs/sdk/send/)

---

**Última Atualização:** 2025-11-26

