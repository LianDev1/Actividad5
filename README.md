# Sistema de Administración y Captura de Usuarios

## 📄 Portada

**Institución:** Instituto Tecnológico de Oaxaca (ITO)  
**Proyecto:**  Proyecto Login  
**Materia/Módulo:**  
**Programación Web**  
**Integrantes del Equipo:**
*   Jimenez Mendoza Eduardo
*   Garcia Cisneros Jonathan Julian  
**Profesor:** Martinez Nieto Adelina  
**Grupo:** 7SC  

**Descripción del Proyecto:**
Este proyecto es una aplicación web de dos pantallas (`login.html` e `index.html`) que simula un entorno de administración. Permite iniciar sesión mediante credenciales validada realizar la captura y validación de datos de alumnos (incluyendo un número de control de 6 dígitos y evaluación de mayoría de edad).

---

## 🛠️ Explicación 

### Framework CSS Utilizado
Para el diseño de la interfaz y la responsividad se utilizó **Bootstrap 5.3.2** importado vía CDN. Se eligió este framework por su robusto sistema de cuadrículas (Grid System), utilidades de espaciado y componentes preconstruidos (Tarjetas, Modales, Menús desplegables), los cuales agilizaron el desarrollo de una interfaz limpia y corporativa sin mezclar otros frameworks incompatibles.

### Flujo del Sistema (Login a Index)
1. El usuario ingresa a `login.html`.
2. Completa los campos de correo y contraseña.
3. Se intercepta el evento de envío (submit) del formulario y se validan los datos utilizando las funciones de la librería `utileria.js`.
4. Si las credenciales cumplen el formato, el sistema simula el acceso redirigiendo al usuario a `index.html` mediante `window.location.href`.

### Transferencia de Sesión (Nombre de Usuario en Navbar)
Dado que el proyecto no cuenta con un backend (base de datos real), la persistencia del usuario se logró utilizando la API **Web Storage** de HTML5, específicamente `localStorage`.
* **Al iniciar sesión:** En `login.html`, justo antes de redirigir, se ejecuta `localStorage.setItem("usuarioLogueado", emailIngresado);`.
* **Al cargar el panel:** En `index.html`, un *Event Listener* (`DOMContentLoaded`) lee este dato usando `localStorage.getItem("usuarioLogueado")`.
* Si el dato existe, se inyecta en el elemento del DOM correspondiente a la Navbar. Si no existe (acceso no autorizado), el sistema expulsa al usuario de vuelta al login. Al cerrar sesión, se ejecuta `localStorage.removeItem()`.

### Métodos Principales Utilizados
**De `utileria.js` (Validaciones generales):**
* `Correo(correo)`: Evalúa mediante Expresiones Regulares (Regex) que el string tenga un formato de correo electrónico válido.
* `validarPassword(password)`: Verifica que la contraseña cumpla con criterios de seguridad estrictos (mínimo 8 caracteres, números, símbolos y mayúsculas).

**De `barra.js` (Lógica de interfaz y control):**
* `toggleSidebar()`: Alterna la clase CSS para expandir o contraer el menú lateral.
* `toggleSubmenu()`: Cambia la propiedad `display` del submenú de usuarios para mostrar/ocultar las opciones.
* `mostrarFormulario()`: Hace visible el contenedor del formulario principal en el área de trabajo.
* `validarFormulario()`: Extrae los valores de los inputs, valida campos vacíos y comprueba que el **número de control** contenga exactamente 6 dígitos usando la expresión regular `/^\d{6}$/`.
* `mostrarModal(edad)`: Evalúa numéricamente la edad capturada y despliega el Modal indicando si es mayor o menor de edad.

---

## ⚙️ Proceso de Creación 

### 1. Construcción del Login (`login.html`)
Se estructuró un contenedor centrado con Flexbox (`min-height: 100vh; align-items: center`). Se integró un formulario con campos de tipo `email` y `password`. Se vinculó un script local que detiene el comportamiento por defecto del formulario para realizar la validación mediante `utileria.js` antes de escribir en el `localStorage`.
/

### 2. Estructuración del Layout (`index.html`)
Se diseñó un layout compuesto por un contenedor `#wrapper` manejado con Flexbox. 
* **Sidebar:** Se configuró con un ancho fijo y una transición de margen izquierdo. El botón hamburguesa dispara la función `toggleSidebar()` que oculta este contenedor con un margen negativo.
* **Navbar:** Se colocó en la parte superior del contenido dinámico y se alineó a la derecha el botón de sesión del usuario.
img/

### 3. Integración de la Sesión en el Navbar
Se programó un bloque `<script>` al final de `index.html` que actúa como puente. Se asignó una función anónima que se dispara al cargar la página para extraer el correo del `localStorage` y sustituir el texto del botón del usuario en el Navbar.

### 4. Formulario de Captura y Validación de Número de Control
Oculto por defecto mediante `display: none`, este contenedor se revela con la función `mostrarFormulario()`. Al presionar el botón de guardar, la función `validarFormulario()` de `barra.js` entra en acción, comprobando cada campo y aplicando un `.test()` al número de control para asegurar la regla de los 6 dígitos.
*(Ver Captura 3 en la sección de Flujo Completo)*

### 5. Configuración del Modal de Edad
Se implementó la estructura de un Modal fijo en la pantalla (`position: fixed`, `z-index: 1050`), el cual permanece oculto hasta que las validaciones del formulario pasan con éxito. La función `mostrarModal(edad)` inyecta dinámicamente el mensaje de mayoría de edad en la etiqueta correspondiente y altera el `display` del contenedor a `block`.
*(Ver Captura 4 en la sección de Flujo Completo)*

---

## 📸 Capturas de Pantalla del Flujo Completo

**1. Pantalla de Acceso (Login)**
<img width="1363" height="683" alt="equ1" src="https://github.com/user-attachments/assets/01fc978e-91e1-4998-9f6b-a31f8c982e72" />

**2. Panel de Control (Dashboard Vacío y Menú Lateral)**
<img width="1365" height="569" alt="equ2" src="https://github.com/user-attachments/assets/8d67116e-5eb7-4f1d-9ef8-245293fe4e8b" />

**3. Despliegue del Formulario de Captura**
<img width="1361" height="682" alt="equ3" src="https://github.com/user-attachments/assets/9c084bf1-572a-4471-b79c-a260fe09b8a1" />

**4. Validación de Edad en el Modal**
<img width="1366" height="667" alt="equ4" src="https://github.com/user-attachments/assets/25fafc94-1a1c-4944-9028-ef9987a0ba12" />
