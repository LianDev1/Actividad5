function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

function toggleSubmenu() {
    let sub = document.getElementById("submenu");
    sub.style.display = sub.style.display === "none" ? "block" : "none";
}

function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
}

function validarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;
    let control = document.getElementById("control").value;
    let edad = document.getElementById("edad").value;
    
    // Contenedor de la alerta de Bootstrap
    let alertContainer = document.getElementById("loginError");

    // Se limpia y se oculta la alerta antes de validar de nuevo
    alertContainer.classList.add("d-none");
    alertContainer.innerText = "";

    if (nombre === "") {
        mostrarAlerta("Nombre requerido");
        return;
    }
    if (!validarCorreo(correo)) {
        mostrarAlerta("Correo inválido");
        return;
    }
    if (!validarPassword(password)) {
        mostrarAlerta("Password inválido");
        return;
    }
    if (!/^\d{9}$/.test(control)) {
        mostrarAlerta("Número de control debe tener 9 dígitos");
        return;
    }

    
    localStorage.setItem('sesionIniciada', 'true');
    mostrarModal(edad);
}

//  inyectar el texto y mostrar el recuadro de Bootstrap
function mostrarAlerta(mensaje) {
    let alertContainer = document.getElementById("loginError");
    alertContainer.innerText = mensaje;
    alertContainer.classList.remove("d-none"); // Quita la clase que lo oculta
}

function mostrarModal(edad) {
    let texto = edad >= 18 ? "Es mayor de edad" : "Es menor de edad";
    document.getElementById("resultadoEdad").innerText = texto;
    document.getElementById("modal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}
