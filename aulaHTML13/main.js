
function setErro(campoId, erroId, texto) {
  var campo = document.getElementById(campoId);
  document.getElementById(erroId).textContent = texto;
  if (campo) campo.classList.toggle("is-invalid", texto !== "");
  return texto === "";
}

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function mostrarResultado(msgId, ok, texto) {
  var msg = document.getElementById(msgId);
  msg.textContent = ok ? texto : "";
  msg.className = ok ? "text-center fw-semibold text-success mt-3" : "mt-3";
}


function iniciarLogin() {
  var form = document.getElementById("formLogin");
  var senha = document.getElementById("senha");


  document.getElementById("toggleSenha").addEventListener("click", function () {
    var oculta = senha.type === "password";
    senha.type = oculta ? "text" : "password";
    this.textContent = oculta ? "Ocultar" : "Mostrar";
  });


  ["linkCadastro", "linkRecuperar"].forEach(function (id) {
    document.getElementById(id).addEventListener("click", function (e) {
      e.preventDefault();
    });
  });


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("email").value.trim();
    var ok = true;

    ok = setErro("email", "erroEmail",
      email === "" ? "Informe o e-mail." :
      !emailValido(email) ? "E-mail inválido." : "") && ok;

    ok = setErro("senha", "erroSenha",
      senha.value === "" ? "Informe a senha." :
      senha.value.length < 6 ? "A senha deve ter ao menos 6 caracteres." : "") && ok;

    mostrarResultado("msgLogin", ok, "Login validado com sucesso!");
  });
}



function iniciarCadastro() {
  var form = document.getElementById("formCadastro");
  var bio = document.getElementById("bio");

  bio.addEventListener("input", function () {
    document.getElementById("contador").textContent = bio.value.length + "/200";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;

    var nome = document.getElementById("nome").value.trim();
    var email = document.getElementById("emailCad").value.trim();
    var senha = document.getElementById("senhaCad").value;

    ok = setErro("nome", "erroNome", nome.split(" ").length < 2 ? "Informe nome e sobrenome." : "") && ok;
    ok = setErro("emailCad", "erroEmailCad", !emailValido(email) ? "E-mail inválido." : "") && ok;
    ok = setErro("senhaCad", "erroSenhaCad", senha.length < 6 ? "Mínimo de 6 caracteres." : "") && ok;


    var genero = form.querySelector('input[name="genero"]:checked');
    document.getElementById("erroGenero").textContent = genero ? "" : "Selecione uma opção.";
    ok = !!genero && ok;


    ok = setErro("curso", "erroCurso",
      document.getElementById("curso").value === "" ? "Escolha um curso." : "") && ok;

 
    var marcados = form.querySelectorAll('input[name="interesses"]:checked').length;
    document.getElementById("erroInteresses").textContent = marcados === 0 ? "Marque ao menos um interesse." : "";
    ok = marcados > 0 && ok;


    ok = setErro("bio", "erroBio",
      bio.value.trim().length < 10 ? "Escreva ao menos 10 caracteres." : "") && ok;


    var termos = document.getElementById("termos").checked;
    document.getElementById("erroTermos").textContent = termos ? "" : "Você precisa aceitar os termos.";
    ok = termos && ok;

    mostrarResultado("msgCadastro", ok, "Cadastro validado com sucesso!");
  });
}



if (document.getElementById("formLogin")) iniciarLogin();
if (document.getElementById("formCadastro")) iniciarCadastro();
