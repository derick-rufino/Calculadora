let entrada = document.getElementById("entrada");
let saida = document.getElementById("resultado");

// Modo Escuro Simples
let isDarkMode = false;

function toggleTheme() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("theme-icon").textContent = "light_mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.getElementById("theme-icon").textContent = "dark_mode";
  }
}

// Configurar botão de tema quando DOM carregar
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});

// Detectar preferência do sistema automaticamente
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  isDarkMode = true;
  document.documentElement.setAttribute("data-theme", "dark");
  document.addEventListener("DOMContentLoaded", function () {
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) themeIcon.textContent = "light_mode";
  });
}

// Funções da Calculadora
function adicionarNumero(numero) {
  entrada.value += numero;
}

function adicionarParenteses() {
  const input = entrada.value;
  const ultimoChar = input.slice(-1);

  // Contar parênteses abertos e fechados
  const parentesesAbertos = (input.match(/\(/g) || []).length;
  const parentesesFechados = (input.match(/\)/g) || []).length;

  // Se o input estiver vazio ou último caractere for um operador, adicionar (
  if (input === "" || ["+", "-", "*", "/", "("].includes(ultimoChar)) {
    entrada.value += "(";
  }
  // Se há parênteses abertos e último caractere é número ou ), adicionar )
  else if (
    parentesesAbertos > parentesesFechados &&
    (!isNaN(ultimoChar) || ultimoChar === ")")
  ) {
    entrada.value += ")";
  }
  // Caso contrário, adicionar (
  else {
    entrada.value += "(";
  }
}

function definirOperacao(operacao) {
  // Verifica se o último caractere é um operador
  if (entrada.value.length > 0 && !isNaN(entrada.value.slice(-1))) {
    entrada.value += operacao;
  }
}

function calcularResultado() {
  try {
    saida.innerHTML = eval(entrada.value);
  } catch (error) {
    saida.innerHTML = "Erro";
  }
}

function apagarUltimoDigito() {
  let input = entrada.value;
  entrada.value = input.substring(0, input.length - 1);
  saida.innerHTML = "";
}

function limparTudo() {
  entrada.value = "";
  saida.innerHTML = "";
}
