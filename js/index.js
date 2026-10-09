// index.js
document.addEventListener("DOMContentLoaded", function() {

    // 1. GESTIÓN DE SESIÓN
    const usuarioActual = localStorage.getItem("usuarioLogueado");
    
    // Si no hay usuario (alguien intentó entrar directo a index.html), lo regresamos al login
    if (!usuarioActual) {
        window.location.href = "login.html";
    } else {
        // Mostrar el correo en la Navbar
        document.getElementById("nombreUsuarioNavbar").innerText = usuarioActual;
    }

    // 2. CERRAR SESIÓN
    document.getElementById("btnCerrarSesion").addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "login.html";
    });

    // 3. TOGGLE DEL SIDEBAR (Botón Hamburguesa)
    document.getElementById("sidebarToggle").addEventListener("click", function() {
        document.getElementById("sidebar").classList.toggle("collapsed");
    });

    // 4. VALIDACIÓN DE NUEVO USUARIO
    document.getElementById("formUsuarioNuevo").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const correo = document.getElementById("nuevoCorreo").value;
        const pass = document.getElementById("nuevaPassword").value;

        // Se utilizan las funciones del archivo utileria.js
        if (validarCorreo(correo) && validarPassword(pass)) {
            alert("✅ Usuario registrado exitosamente.");
            this.reset();
        } else {
            alert("❌ Error: Correo inválido o contraseña menor a 6 caracteres.");
        }
    });

    // 5. VALIDACIÓN DE ALUMNO Y MODAL
    document.getElementById("formAlumno").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const numControl = document.getElementById("numControl").value;
        const edad = parseInt(document.getElementById("edadAlumno").value);
        
        // Validación de 6 dígitos numéricos
        if (!/^\d{6}$/.test(numControl)) {
            alert("El número de control debe ser estrictamente de 6 números.");
            return;
        }

        // Determinar mensaje y color
        const mensajeObj = document.getElementById("mensajeResultado");
        if (edad >= 18) {
            mensajeObj.innerText = "Es MAYOR de edad";
            mensajeObj.className = "text-success fw-bold";
        } else {
            mensajeObj.innerText = "Es MENOR de edad";
            mensajeObj.className = "text-danger fw-bold";
        }

        // Mostrar el Modal de Bootstrap
        const miModal = new bootstrap.Modal(document.getElementById('modalEdad'));
        miModal.show();
        
        this.reset();
    });
});