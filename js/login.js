// Se declaran los componentes del login
const formLogin = document.querySelector('#formLogin');
const inputTuMail = document.querySelector('#inputTuMail');
const inputTuPassword = document.querySelector('#inputTuPassword');

const navRegister = document.querySelector('#navRegister');
const textoRegistrate = document.querySelector('#textoRegistrate');

const navLogin = document.querySelector('#navLogin');

// Se crea un elemento "p" para mostrar el mensaje de error
const p = document.createElement('p');
p.textContent = 'Completa el campo.';
p.className = 'alertas';

// Verifica en el local storage
const usuariosGuardados = JSON.parse(localStorage.getItem('claveNuevoUsuario'));

if (usuariosGuardados !== null) {
    navRegister.style.display = 'none';
    textoRegistrate.innerHTML = 'Ya tenes cuenta, solo ingresa tus datos!';
} else {
    navRegister.style.display = 'block';
    textoRegistrate.innerHTML = 'No tenes cuenta? Hace <a href="./register.html">click aca</a> y registrate!';
}

// Se agrega la escucha del evento al formulario de login
formLogin.addEventListener('submit', (event) => {

    event.preventDefault();

    // Obtiene los valores ingresados por el usuario
    const mailIngresado = inputTuMail.value;
    const passwordIngresado = inputTuPassword.value;

    // localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('claveNuevoUsuario'));

    if (mailIngresado.trim() === '') {
        inputTuMail.parentNode.insertBefore(p, inputTuMail.nextSibling);

    } else if (passwordIngresado.trim() === '') {
        inputTuPassword.parentNode.insertBefore(p, inputTuPassword.nextSibling);

    } else {
        if (usuariosGuardados && usuariosGuardados.length > 0) {
            const usuarioEncontrado = usuariosGuardados.find((usuario) => {
                return usuario.mail === mailIngresado && usuario.password === passwordIngresado;
            });

            if (usuarioEncontrado) {
                window.location.href = '../index.html';
            } else {
                textoRegistrate.innerHTML = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
                textoRegistrate.className = 'alertas';
            }
        } else {
            if (p !== '') {
                p.remove();
            }
            textoRegistrate.innerHTML = 'Esa cuenta no existe aún, hace <a href="./register.html">click acá</a> y registrate!';
            textoRegistrate.className = 'alertas';
        }
    }
});




