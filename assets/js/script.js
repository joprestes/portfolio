/* ===================================================================
   PORTFÓLIO JOELMA FERREIRA - SCRIPT PRINCIPAL E UNIFICADO
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Objeto principal para organizar a lógica da aplicação
  const app = {
    // Seletores e Estado
    themeToggleButton: document.getElementById('toggle-dark'),
    languageToggleButton: document.getElementById('language-toggle'),
    htmlElement: document.documentElement,
    themeAnnouncer: document.getElementById('theme-announcer'),
    
    translations: {}, // Armazenará os textos carregados
    currentLanguage: 'pt', // Idioma padrão

    /**
     * Inicializa todas as funcionalidades da aplicação.
     */
    async init() {
      await this.loadTranslations(); 
      this.applyLanguage(localStorage.getItem('language') || 'pt'); 
      this.applyTheme(localStorage.getItem('theme') || 'light', false); 
      
      this.initThemeToggle();
      this.initLanguageSwitcher();
      this.initScrollAnimations();
      
      // Inicializadores específicos de página/componente
      this.initFormValidation();
      this.initNavbarAccessibility();
      this.initEstanteMenu(); 
      this.initFloristPage(); 
      this.initMarioGame(); 
      this.initBusinessCard();
      this.initMultiMindQA();
    },

    // =======================================
    // 00. LÓGICA DE TRADUÇÃO E IDIOMA
    // =======================================
    async loadTranslations() {
      const pathPrefix = window.location.pathname.includes('/projetos/') ? '../../' : '';
      try {
        const response = await fetch(`${pathPrefix}translations.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.translations = await response.json();
      } catch (error) {
        console.error("Could not load translations:", error);
      }
    },

    initLanguageSwitcher() {
      if (!this.languageToggleButton) return;

      this.languageToggleButton.addEventListener('click', () => {
        const newLang = this.currentLanguage === 'pt' ? 'en' : 'pt';
        this.applyLanguage(newLang);
      });
    },

    applyLanguage(lang) {
      this.currentLanguage = lang;
      this.htmlElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
      localStorage.setItem('language', lang);

      // 1. Traduz todos os elementos com a chave `data-translate-key`
      document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.dataset.translateKey;
        const translation = this.translations[lang]?.[key];

        if (translation) {
            if (element.tagName === 'META' && element.name === 'description') {
                element.content = translation;
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translation);
            } else {
                element.textContent = translation;
            }
        }
      });
      
      // 2. Atualiza o botão de idioma
      if (this.languageToggleButton) {
        this.languageToggleButton.textContent = lang === 'pt' ? 'EN' : 'PT';
        this.languageToggleButton.setAttribute('aria-label', lang === 'pt' ? 'Change language to English' : 'Mudar idioma para Português');
      }

      // 3. Renderiza a tabela de produtos, se existir (agora fora do loop)
      if (document.getElementById('lista-produtos')) {
        this.renderProductTable(lang);
      }
    },

    // =======================================
    // 01. LÓGICA DO MODO ESCURO (TEMA)
    // =======================================
    initThemeToggle() {
      if (!this.themeToggleButton) return;

      this.themeToggleButton.addEventListener('click', () => {
        const newTheme = this.htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme, true);
      });
    },

    applyTheme(theme, announce) {
      this.htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      const isDark = theme === 'dark';
      if (this.themeToggleButton) {
        this.themeToggleButton.setAttribute('aria-pressed', String(isDark));
        this.themeToggleButton.textContent = isDark ? '☀️' : '🌙';
        const key = isDark ? 'toggle_light_mode_label' : 'toggle_dark_mode_label';
        const label = this.translations[this.currentLanguage]?.[key];
        if (label) this.themeToggleButton.setAttribute('aria-label', label);
      }

      if (announce && this.themeAnnouncer) {
        const key = `theme_announce_${theme}`;
        this.themeAnnouncer.textContent = this.translations[this.currentLanguage]?.[key] || `Theme changed to ${theme}`;
        setTimeout(() => { this.themeAnnouncer.textContent = ''; }, 2000);
      }
    },

    // =======================================
    // 02. LÓGICA DA ANIMAÇÃO AO ROLAR
    // =======================================
    initScrollAnimations() {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      if (animatedElements.length === 0 || !('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      animatedElements.forEach(element => observer.observe(element));
    },

    // =======================================
    // 03. LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    // =======================================
    initFormValidation() {
      const form = document.querySelector('[data-testid="contato-formulario"]');
      if (!form) return;

      const statusDiv = document.getElementById('form-status');
      const fields = {
        nome: { input: document.getElementById('nome'), errorDiv: document.getElementById('nome-error'), key: 'form_error_name' },
        email: { input: document.getElementById('email'), errorDiv: document.getElementById('email-error'), key: 'form_error_email', validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
        mensagem: { input: document.getElementById('mensagem'), errorDiv: document.getElementById('mensagem-error'), key: 'form_error_message' }
      };

      const validateField = (field) => {
        if (!field.input) return true;
        const value = field.input.value.trim();
        const isValid = field.validate ? field.validate(value) : value !== '';
        
        field.input.setAttribute('aria-invalid', String(!isValid));
        field.errorDiv.textContent = isValid ? '' : (this.translations[this.currentLanguage]?.[field.key] || 'Invalid field.');
        return isValid;
      };

      Object.values(fields).forEach(field => {
        if(field.input) field.input.addEventListener('blur', () => validateField(field));
      });
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;
        let firstInvalidField = null;

        Object.values(fields).forEach(field => {
          if (!validateField(field) && isFormValid) {
            isFormValid = false;
            firstInvalidField = field.input;
          }
        });

        if (isFormValid) {
          statusDiv.textContent = this.translations[this.currentLanguage]?.form_success;
          statusDiv.className = 'mt-3 text-center success';
          statusDiv.focus();
          form.reset();
          Object.values(fields).forEach(field => field.input?.setAttribute('aria-invalid', 'false'));
        } else {
          statusDiv.textContent = this.translations[this.currentLanguage]?.form_error;
          statusDiv.className = 'mt-3 text-center error';
          firstInvalidField?.focus();
        }
      });
    },

    // ========================================================
    // 04. ACESSIBILIDADE DO MENU DE NAVEGAÇÃO (FOCUS TRAP)
    // ========================================================
    initNavbarAccessibility() {
      const menuContainer = document.querySelector('#menuNav');
      const menuToggler = document.querySelector('.navbar-toggler');
      if (!menuContainer || !menuToggler) return;
      
      const focusableElements = Array.from(menuContainer.querySelectorAll('a[href], button:not([disabled])'));
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      menuContainer.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !menuContainer.classList.contains('show')) return;
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      });
    },

    // ========================================================
    // 05. LÓGICA DO PROJETO 'ESTANTE'
    // ========================================================
    initEstanteMenu() {
        const menuContainer = document.getElementById('estante-menu');
        if (!menuContainer) return;

        const menuToggle = document.getElementById('menu-toggle');
        const menuLista = document.getElementById('menu-lista');

        const toggleMenu = (open) => {
            menuContainer.classList.toggle('menu-aberto', open);
            menuToggle.setAttribute('aria-expanded', String(open));
        };

        menuToggle.addEventListener('click', () => toggleMenu(!menuContainer.classList.contains('menu-aberto')));
        menuLista.addEventListener('click', (e) => (e.target.tagName === 'A') && toggleMenu(false));
        document.addEventListener('keydown', (e) => (e.key === 'Escape' && menuContainer.classList.contains('menu-aberto')) && toggleMenu(false));
    },

    // ========================================================
    // 06. LÓGICA DA PÁGINA 'FLORICULTURA'
    // ========================================================
    initFloristPage() {
      if (document.getElementById('form-cadastro')) {
        this.initFloristForm();
      }
    },

    renderProductTable(lang) {
        const tableBody = document.getElementById('lista-produtos');
        const products = this.translations[lang]?.products;
        if (!tableBody || !products) return;

        tableBody.innerHTML = '';
        let currentCategory = '';

        products.forEach(product => {
            if (product.category !== currentCategory) {
                currentCategory = product.category;
                const categoryKey = `florist_cat_${currentCategory}`;
                const categoryName = this.translations[lang]?.[categoryKey] || currentCategory;
                const categoryRow = tableBody.insertRow();
                categoryRow.className = 'table-group-divider';
                categoryRow.innerHTML = `<th class="text-center table-primary" colspan="6">${categoryName}</th>`;
            }
            
            const productRow = tableBody.insertRow();
            productRow.innerHTML = `<th scope="row">${product.id}</th><td>${product.name}</td><td>${product.description}</td><td>${product.price}</td><td>${product.qty}</td><td>${product.extra}</td>`;
        });
    },
    
    initFloristForm() {
      const form = document.getElementById('form-cadastro');
      const tableBody = document.getElementById('lista-produtos');
      const formStatus = document.getElementById('form-status');
      const fields = {
        codigo: form.querySelector('#codProd'),
        preco: form.querySelector('#precoProd'),
        nome: form.querySelector('#nomeProd'),
        descricao: form.querySelector('#descricaoProd'),
        qtd: form.querySelector('#qtdFlores'),
        adicionais: form.querySelector('#itensAd'),
      };

      const validateField = (field) => {
        const value = field.value.trim();
        let isValid = value !== '';
        if (field.type === 'number' && !/^\d+(\.\d+)?$/.test(value)) isValid = false;
        field.classList.toggle('is-invalid', !isValid);
        return isValid;
      };

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isFormValid = Object.values(fields).reduce((valid, field) => validateField(field) && valid, true);

        if (isFormValid) {
            const lastRow = tableBody.querySelector('tr:last-child');
            const newId = lastRow ? parseInt(lastRow.cells[0].textContent) + 1 : 1;
            const formattedPrice = parseFloat(fields.preco.value).toLocaleString(this.currentLanguage === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: this.currentLanguage === 'pt' ? 'BRL' : 'USD' });
            
            const newProduct = {
                id: newId,
                name: fields.nome.value,
                description: fields.descricao.value,
                price: formattedPrice,
                qty: fields.qtd.value,
                extra: fields.adicionais.value
            };
            
            const newRow = tableBody.insertRow();
            newRow.classList.add('table-success');
            newRow.innerHTML = `<th scope="row">${newProduct.id}</th><td>${newProduct.name}</td><td>${newProduct.description}</td><td>${newProduct.price}</td><td>${newProduct.qty}</td><td>${newProduct.extra}</td>`;

            form.reset();
            Object.values(fields).forEach(field => field.classList.remove('is-invalid'));
            formStatus.textContent = this.translations[this.currentLanguage]?.florist_status_success;
            formStatus.className = 'success';
            fields.codigo.focus();
        } else {
            formStatus.textContent = this.translations[this.currentLanguage]?.florist_status_error;
            formStatus.className = 'error';
            form.querySelector('.is-invalid')?.focus();
        }
      });

      Object.values(fields).forEach(field => {
          field.addEventListener('blur', () => validateField(field));
      });
    },
     // ========================================================
    // 07. LÓGICA DO PROJETO 'MARIO JUMP' 
    // ========================================================
   
       initMarioGame() {
        const gameBoard = document.getElementById('mario-game-section');
        if (!gameBoard) return;

        const elements = {
            mario: gameBoard.querySelector('[data-testid="mario-character"]'),
            pipe: gameBoard.querySelector('[data-testid="pipe-obstacle"]'),
            statusText: gameBoard.querySelector('[data-testid="game-status"]'),
            instructionsText: gameBoard.querySelector('.game-instructions'),
        };

        let state = {
            phase: 'ready',
            gameLoopInterval: null,
            speedUpInterval: null,
            currentPipeDuration: 2.0,
        };
        
        const config = {
            jumpTimeout: 500, loopInterval: 10,
            pipeCollisionPosition: 120, marioCollisionHeight: 80,
            minPipeDuration: 0.8, speedIncrement: 0.1, speedUpFrequency: 5000,
        };

        const cleanUpTimers = () => {
            clearInterval(state.gameLoopInterval);
            clearInterval(state.speedUpInterval);
        };

        const updateUI = () => {
            if (state.phase === 'ready') {
                elements.instructionsText.style.display = 'block';
                elements.statusText.style.display = 'none';
                elements.instructionsText.dataset.translateKey = 'marioStartInstructions';
            } else if (state.phase === 'playing') {
                elements.instructionsText.style.display = 'block';
                elements.statusText.style.display = 'none';
                elements.instructionsText.dataset.translateKey = 'marioJumpInstructions';
            } else if (state.phase === 'over') {
                elements.instructionsText.style.display = 'none';
                elements.statusText.style.display = 'block';
                elements.statusText.dataset.translateKey = 'marioGameOver';
            }
            this.applyLanguage(this.currentLanguage);
        };

        const jump = () => {
            if (!elements.mario.classList.contains('jump')) {
                elements.mario.classList.add('jump');
                setTimeout(() => elements.mario.classList.remove('jump'), config.jumpTimeout);
            }
        };

        const gameOver = () => {
            state.phase = 'over';
            cleanUpTimers();

            const pipePosition = elements.pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(elements.mario).bottom.replace('px', '');
            
            elements.pipe.classList.remove('is-moving'); 
            elements.pipe.style.left = `${pipePosition}px`;
            
            elements.mario.style.animation = 'none';
            elements.mario.style.bottom = `${marioPosition}px`;
            elements.mario.src = '../../assets/img/mario-jump/game-over.png';
            elements.mario.style.width = '75px';
            elements.mario.style.marginLeft = '50px';

            updateUI();
        };

        const resetGame = () => {
            state.phase = 'ready';
            state.currentPipeDuration = 2.0;
            
            elements.mario.style = '';
            elements.pipe.style = '';
            elements.pipe.classList.remove('is-moving'); 
            elements.mario.src = '../../assets/img/mario-jump/mario.gif';

            
            elements.pipe.classList.add('hidden');

            cleanUpTimers();
            updateUI();
        };
        
        const startGame = () => {
            state.phase = 'playing';
            updateUI();
            
            
            elements.pipe.classList.remove('hidden');

            elements.pipe.classList.remove('is-moving');
            void elements.pipe.offsetWidth;
            elements.pipe.classList.add('is-moving');

            elements.pipe.style.animationDuration = `${state.currentPipeDuration}s`;

            state.gameLoopInterval = setInterval(() => {
                const pipePosition = elements.pipe.offsetLeft;
                const marioPosition = +window.getComputedStyle(elements.mario).bottom.replace('px', '');
                if (pipePosition <= config.pipeCollisionPosition && pipePosition > 0 && marioPosition < config.marioCollisionHeight) {
                    gameOver();
                }
            }, config.loopInterval);

            state.speedUpInterval = setInterval(() => {
                if (state.currentPipeDuration > config.minPipeDuration) {
                    state.currentPipeDuration -= config.speedIncrement;
                    elements.pipe.style.animationDuration = `${state.currentPipeDuration}s`;
                }
            }, config.speedUpFrequency);
        };

        const handleKeyPress = (event) => {
            if (event.code !== 'Space' && event.key.toLowerCase() !== 'r') return;
            event.preventDefault();

            if (event.code === 'Space') {
                if (state.phase === 'ready') startGame();
                else if (state.phase === 'playing') jump();
            }
            if (event.key.toLowerCase() === 'r' && state.phase === 'over') {
                resetGame();
            }
        };
        
        document.addEventListener('keydown', handleKeyPress);
        resetGame();
    },


    // ========================================================
    // 08. LÓGICA DO PROJETO 'CARTÃO DE VISITAS' 
    // ========================================================
    initBusinessCard() {
        const businessCard = document.querySelector('#business-card-project .card');
        if (!businessCard) return;

        const flipCard = () => {
            businessCard.classList.toggle('is-flipped');
        };

        businessCard.addEventListener('click', flipCard);

        businessCard.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                flipCard();
            }
        });
    },
 // ===========================================================
    //  09. LÓGICA PROJETO MULTIMIND QA 
    // ===========================================================
    initMultiMindQA() {
        
        if (!document.querySelector('#multimind-project')) {
            return;
        }
    }

  };


  app.init();
});