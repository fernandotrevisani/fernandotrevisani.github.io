let translations = {};

// Função para carregar traduções do arquivo JSON
async function loadTranslations() {
  try {
    const response = await fetch('.translations.json'); // Verifique o caminho do arquivo
    if (!response.ok) throw new Error(`Erro ao carregar translations.json: ${response.status}`);
    translations = await response.json();

    // Definir o idioma padrão ou recuperar do localStorage
    const defaultLanguage = localStorage.getItem('language') || 'pt';
    changeLanguage(defaultLanguage);
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  }
}

// Função para alterar o idioma na página
function changeLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`Idioma "${lang}" não encontrado nas traduções.`);
    return;
  }

  // Salvar a preferência de idioma no localStorage
  localStorage.setItem('language', lang);

  // Atualizar os textos de elementos com IDs específicos
  const elements = document.querySelectorAll('[id]');
  elements.forEach((el) => {
    const translationKey = el.id; // O ID é a chave no JSON
    if (translations[lang][translationKey]) {
      el.textContent = translations[lang][translationKey];
    } else {
      console.warn(`Chave de tradução não encontrada: ${translationKey} no idioma: ${lang}`);
    }
  });

  // Atualizar placeholders do formulário
  updatePlaceholders(lang);
}

// Função para atualizar placeholders do formulário
function updatePlaceholders(lang) {
  if (!translations[lang]) {
    console.warn(`Traduções para o idioma "${lang}" não encontradas.`);
    return;
  }

  // Definir os placeholders com base nas traduções
  const fields = ["name", "email", "subject", "message"];
  fields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (inputElement && translations[lang][field]) {
      inputElement.placeholder = translations[lang][field];
    } 
    else {
      console.warn(`Elemento ou tradução para "${field}" não encontrado.`);
    }
  });

  // Atualizar o idioma no campo oculto
  const languageInput = document.getElementById('language-input');
  if (languageInput) {
    languageInput.value = lang;
  }
}

// Evento para carregar as traduções ao carregar a página
document.addEventListener('DOMContentLoaded', loadTranslations);

