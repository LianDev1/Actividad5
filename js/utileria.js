//FUNCIÓN 1: EN DONDE SE VALIDARA EL CORREO ELECTRONICO
//USANDO BOOLEAN
function Correo(correo){
    //Creacion de una constante que almacene una expresión usando el metodo .test()
    //El cual responde con un booleano, si el texto tiene el formato correcto enotonces 
    //se convierte en true y retorna la función.
    const regular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    return regular.test(correo);
}

//FUNCIÓN 2: EN DONDE SE VALIDARA QUE SOLO SE PUEDA INGRESAR LETRAS
function Letras(texto) {
    // Acepta letras mayúsculas, minúsculas, espacios y vocales acentuadas
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

//FUNCIÓN 3: EN DONDE SE VALIDA QUE SOLO SE INGRESE UNA CANTIDAD DE NUMEROS
function validarLongitud(numero, maxLongitud) {
    // Convertimos a string por si mandan un tipo number
    let textoNum = numero.toString();
    return textoNum.length <= maxLongitud;
}


//FUNCIÓN 4: CALCULO DE EDAD
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    // Si el mes actual es menor al mes de nacimiento, o si es el mismo mes pero el día de hoy es menor, restamos un año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}

//COMPROBAR SI LA PERSONA O USUARIO ES MYOR DE EDAD O NO

function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad >= 18;
}

// FUNCIÓN 5: VALIDACIÓN DE CONTRASEÑA TOMANDO EN CUENTA QUE SEA MINIMO DE 8 CARACTERES
// TENDRA LETRAS (MAYUSCULAS y minusculas), NUMEROS, CARACTER ESPECIAL

function validarPassword(password) {
     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-+=])[A-Za-z\d@$!%*?&.#_\-+=]{8,}$/;
    return regex.test(password);
}



 
//FUNCIÓN QUE CALCULA EL TOTAL A PAGAR DE UN SERVICIO DE LAVANDERIA
// ADICIONALMENTE SE LE APLICA UN DESCUENTO

function calcularTotalLavanderia(kilos, precioPorKilo) {
    let total = kilos * precioPorKilo;
    if (kilos > 10) {
        total = total * 0.90; // 10% de descuento
    }
    return total;
}

//FUNCIÓN QUE GENERA UN FOLIO PARA EL TICKET UTILIZANDO EL NOMBRE DEL USUARIO

function generarFolioTicket(nombreCliente) {
    let prefijo = "CLI";
    if (nombreCliente && nombreCliente.length >= 3) {
        prefijo = nombreCliente.substring(0, 3).toUpperCase();
    }
    const aleatorio = Math.floor(Math.random() * 9000) + 1000; 
    return `TKT-${prefijo}-${aleatorio}`;
}


// FUNCIÓN PRINCIPAL DE PROCESAMIENTO
function ProcesarFormulario() {
    
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const correo = document.getElementById('correo').value; // Nueva captura
    const contraseña = document.getElementById('contraseña').value;
    const kilos = document.getElementById('Kilos').value;

    // Validaciones básicas
    if (!Letras(nombre)) {
        alert("El nombre solo debe contener letras.");
        return;
    }

    if (!Letras(apellidos)) {
        alert("Los apellidos solo deben contener letras.");
        return;
    }

    if (!fechaNacimiento) {
        alert("Por favor, seleccione su fecha de nacimiento.");
        return;
    }

    // ¡Aquí entra en acción tu validación de correo!
    if (!Correo(correo)) {
        alert("El formato del correo no es válido. Ejemplo: ejemplo@gmail.com");
        return;
    }

    if (!validarPassword(contraseña)) {
        alert("La contraseña no es válida. Debe ingresar minimo 8 caracteres entre numeros, letras o simbolo especial.");
        return;
    }

    if (!kilos || kilos <= 0) {
        alert("Por favor, ingrese una cantidad válida de kilos.");
        return;
    }

    // Ejecución de la lógica
    const edad = calcularEdad(fechaNacimiento);
    const mayorEdad = esMayorDeEdad(fechaNacimiento) ? "Es mayor de edad." : "Es menor de edad.";
    const folio = generarFolioTicket(nombre);
    const total = calcularTotalLavanderia(kilos, 20);

    // Identificación de los Inputs sin ID
    const listaInputs = document.querySelectorAll('#Registro input');
    const inputFolio = listaInputs[3];
    const inputTotal = listaInputs[4];

    if (inputFolio) {
        inputFolio.value = folio;
    }
    if (inputTotal) {
        inputTotal.value = total.toFixed(2);
    }

    // Despliegue de los resultados incluyendo el correo validado
    const mensaje = `
        <strong>Folio generado:</strong> ${folio} <br><br>
        <strong>Correo registrado:</strong> ${correo} <br><br>
        <strong>Edad calculada:</strong> ${edad} años (${mayorEdad}) <br><br>
        <strong>Total del servicio:</strong> $${total.toFixed(2)}
    `;
    
    document.getElementById('mensajeModal').innerHTML = mensaje;
    document.getElementById('miModal').style.display = "block";
}

function cerrarModal() {
    document.getElementById('miModal').style.display = "none";
}


document.addEventListener('DOMContentLoaded', function() {
    const botonRegistrar = document.querySelector('#Registro button');
    if (botonRegistrar) {
        botonRegistrar.removeAttribute('onclick'); // Limpiamos el texto plano previo
        botonRegistrar.addEventListener('click', ProcesarFormulario); 
    }
});