const btnProximo = document.querySelector(".btn-primario");


const nome = document.getElementById("nome");
const cargo = document.getElementById("cargo");

const pNome = document.getElementById("pNome");
const pCargo = document.getElementById("pCargo");

const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cidade = document.getElementById("cidade");
const linkedin = document.getElementById("linkedin");

const pEmail = document.getElementById("pEmail");
const pTelefone = document.getElementById("pTelefone");
const pCidade = document.getElementById("pCidade");
const pLinkedin = document.getElementById("pLinkedin");

const resumo = document.getElementById("resumo");
const pResumo = document.getElementById("pResumo");

const experiencia = document.getElementById("experiencia");
const educacao = document.getElementById("educacao");
const certificacoes = document.getElementById("certificacoes");
const resultados = document.getElementById("resultados");
const idiomas = document.getElementById("idiomas");

const pExperiencia = document.getElementById("pExperiencia");
const pEducacao = document.getElementById("pEducacao");
const pCertificacoes = document.getElementById("pCertificacoes");
const pResultados = document.getElementById("pResultados");
const pIdiomas = document.getElementById("pIdiomas");

const competencias = document.getElementById("competencias");
const habilidades = document.getElementById("habilidades");

const pCompetencias = document.getElementById("pCompetencias");
const pHabilidades = document.getElementById("pHabilidades");

const blocoCompetencias = document.getElementById("blocoCompetencias");
const blocoHabilidades = document.getElementById("blocoHabilidades");

const blocoExperiencia = document.getElementById("blocoExperiencia");
const blocoEducacao = document.getElementById("blocoEducacao");
const blocoCertificacoes = document.getElementById("blocoCertificacoes");
const blocoResultados = document.getElementById("blocoResultados");
const blocoIdiomas = document.getElementById("blocoIdiomas");


const campos = [
  "nome","cargo","email","telefone","cidade","linkedin","resumo",
  "experiencia","educacao","certificacoes","competencias",
  "resultados","habilidades","idiomas"
];

campos.forEach(id=>{
  document.getElementById(id).addEventListener("input", atualizarPreview);
});

function atualizarPreview(){

  pNome.textContent = nome.value || "Seu Nome";
  pCargo.textContent = cargo.value || "Cargo desejado";

  pEmail.textContent = email.value || "email@exemplo.com";
  pTelefone.textContent = telefone.value || "(00) 00000-0000";
  pCidade.textContent = cidade.value || "Cidade - Estado";

  pLinkedin.textContent = linkedin.value.trim();
  pLinkedin.style.display = linkedin.value.trim() === "" ? "none" : "block";

  pResumo.textContent = resumo.value || "Resumo profissional — escreva 1 a 3 linhas sobre você.";


  // Função geral para esconder se estiver vazio
 function renderList(inputEl, listEl, blockEl) {
  const lines = inputEl.value
    .split("\n")
    .map(l => l.trim())
    .filter(l => l !== "");

  if (lines.length === 0) {
    blockEl.style.display = "none";
    return;
  }

  blockEl.style.display = "block";
  listEl.innerHTML = lines.map(e => `<li>${e}</li>`).join("");
}

renderList(experiencia, pExperiencia, blocoExperiencia);
renderList(educacao, pEducacao, blocoEducacao);
renderList(certificacoes, pCertificacoes, blocoCertificacoes);
renderList(resultados, pResultados, blocoResultados);
renderList(idiomas, pIdiomas, blocoIdiomas);
  // Competências
  const comp = competencias.value.trim();
  if (comp === "") {
    blocoCompetencias.style.display = "none";
  } else {
    blocoCompetencias.style.display = "block";
    pCompetencias.textContent = comp;
  }

  // Habilidades
  const hab = habilidades.value.trim();
  if (hab === "") {
    blocoHabilidades.style.display = "none";
  } else {
    blocoHabilidades.style.display = "block";
    pHabilidades.textContent = hab;
  }

validarObrigatoriosVisual();



}
 
function gerarPDF(tipo) {

  if (!podeBaixarPDF()) {
    alert("Preencha todos os campos obrigatórios antes de baixar.");
    return;
  }

  const element = document.getElementById("curriculo");

  const configs = {
  normal: {
    filename: "curriculo.pdf",
    scale: 4,
    imageType: "png",
    quality: 1
  },
  compacto: {
    filename: "curriculo_compacto.pdf",
    scale: 3,
    imageType: "jpeg",
    quality: 0.85
  }
};

const c = configs[tipo];

const opt = {
  margin: 0,
  filename: c.filename,
  image: {
    type: c.imageType,
    quality: c.quality
  },
  html2canvas: {
    scale: c.scale,
    useCORS: true,
    backgroundColor: "#ffffff"
  },
  jsPDF: {
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compressPDF: true
  }
};


  html2pdf().set(opt).from(element).save();
}
 
function gerarResumoAuto() {
  const nome = document.getElementById("nome").value || "O candidato";
  const cargo = document.getElementById("cargo").value || "profissional";

  const habilidades = document.getElementById("habilidades").value
    .split(",")
    .map(h => h.trim())
    .filter(h => h !== "");

  const experiencias = document.getElementById("experiencia").value
    .split("\n")
    .map(e => e.trim())
    .filter(e => e !== "");

  const h1 = habilidades[0] || "habilidades técnicas relevantes";
  const h2 = habilidades[1] || "boa capacidade analítica";
  const h3 = habilidades[2] || "facilidade em trabalho em equipe";

  const exp = experiencias[0] || "atividades práticas e projetos aplicados";

  const resumo = `${nome} é um(a) ${cargo} com perfil proativo e foco em resultados. 
Possui experiência em ${exp}, com destaque para ${h1}. 
Demonstra ${h2}, ${h3} e forte compromisso com aprendizado contínuo e crescimento profissional.`;

  document.getElementById("resumo").value = resumo;
  atualizarPreview();
}

function limparTudo() {
  // Limpa todos os inputs e textareas
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });


  atualizarPreview();
}

function validarObrigatoriosVisual() {

  // Obrigatórios simples
  const obrigatorios = ["nome", "cargo", "resumo"];
  obrigatorios.forEach(id => {
    const el = document.getElementById(id);
    el.classList.toggle("input-obrigatorio", el.value.trim() === "");
  });

  // Contato: email OU telefone
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");

  const contatoVazio = email.value.trim() === "" && telefone.value.trim() === "";
  email.classList.toggle("input-obrigatorio", contatoVazio);
  telefone.classList.toggle("input-obrigatorio", contatoVazio);

  // Experiência OU Educação
  const experiencia = document.getElementById("experiencia");
  const educacao = document.getElementById("educacao");

  const ambosVazios =
    experiencia.value.trim() === "" && educacao.value.trim() === "";

  experiencia.classList.toggle("input-obrigatorio", ambosVazios);
  educacao.classList.toggle("input-obrigatorio", ambosVazios);
}
function podeBaixarPDF() {

  // Obrigatórios simples
  if (
    nome.value.trim() === "" ||
    cargo.value.trim() === "" ||
    resumo.value.trim() === ""
  ) return false;

  // Contato: email OU telefone
  if (
    email.value.trim() === "" &&
    telefone.value.trim() === ""
  ) return false;

  // Experiência OU Educação
  if (
    experiencia.value.trim() === "" &&
    educacao.value.trim() === ""
  ) return false;

  return true;
}
function gerarPNG() {

  if (!podeBaixarPDF()) {
    alert("Preencha todos os campos obrigatórios antes de baixar.");
    return;
  }

  const element = document.getElementById("curriculo");

  html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff"
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "curriculo.png";
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
  });
}


const steps = document.querySelectorAll(".step");
let stepAtual = 0;

function mostrarStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

function proximo() {
  const stepAtualEl = steps[stepAtual];
  const input = stepAtualEl.querySelector("input, textarea");

  // campos obrigatórios por ID
  const obrigatorios = ["nome", "cargo", "resumo"];

  if (input && obrigatorios.includes(input.id)) {
    if (input.value.trim() === "") {
      input.classList.add("input-obrigatorio");
      input.focus();
      return;
    }
  }

  // contato: email OU telefone
  if (input && (input.id === "email" || input.id === "telefone")) {
    if (
      email.value.trim() === "" &&
      telefone.value.trim() === ""
    ) {
      email.classList.add("input-obrigatorio");
      telefone.classList.add("input-obrigatorio");
      email.focus();
      return;
    }
  }

  // experiência OU educação
  if (input && (input.id === "experiencia" || input.id === "educacao")) {
    if (
      experiencia.value.trim() === "" &&
      educacao.value.trim() === ""
    ) {
      experiencia.classList.add("input-obrigatorio");
      educacao.classList.add("input-obrigatorio");
      experiencia.focus();
      return;
    }
  }

  // se passou nas validações → avança
  if (stepAtual < steps.length - 1) {
    stepAtual++;
    mostrarStep(stepAtual);
  }
}


function voltar() {
  if (stepAtual > 0) {
    stepAtual--;
    mostrarStep(stepAtual);
  }
}

// inicia mostrando o primeiro
mostrarStep(stepAtual);

const options = document.querySelectorAll(".option");

options.forEach(opt => {
  opt.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
    opt.querySelector("input").checked = true;
  });
});

function baixarSelecionado() {
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (tipo === "png") {
    gerarPNG();
  } else {
    gerarPDF(tipo);
  }
}

function selecionarModelo(modelo) {
  document.body.setAttribute("data-template", modelo);

  document.getElementById("templateOverlay").style.display = "none";

  // opcional: salvar escolha
  localStorage.setItem("template", modelo);
}

document.body.classList.add("no-scroll");


function selecionarModelo(modelo) {
  document.body.setAttribute("data-template", modelo);
  document.body.classList.remove("no-scroll");
  document.getElementById("templateOverlay").style.display = "none";
}

