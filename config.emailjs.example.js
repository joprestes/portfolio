// ============================================================
// CONFIGURAÇÃO EMAILJS - ARQUIVO DE EXEMPLO
// ============================================================
// 
// INSTRUÇÕES:
// 1. Copie este arquivo para config.emailjs.js
// 2. Preencha com suas credenciais reais
// 3. O arquivo config.emailjs.js está no .gitignore e NÃO será commitado
//
// ============================================================

const emailjsConfig = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
};

// Para uso em módulos ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = emailjsConfig;
}

