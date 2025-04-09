// Se crea la clase para el constructor de divisas.
class Divisas {
    constructor(nombre, valor) {
        this.nombre = nombre;
        this.valor = valor;
    }
}

// Se crean los arrays con las divisas.
const dolares = [
    new Divisas('Oficial', 1095),
    new Divisas('Blue', 1310),
    new Divisas('Tarjeta', 1425),
    new Divisas('CCL', 1362),
    new Divisas('MEP', 1337),
    new Divisas('Mayorista', 1093),
]

const divisas = [
    new Divisas('ARS', null),
    new Divisas('BRL', null),
    new Divisas('CNY', null),
    new Divisas('GBP', null),
    new Divisas('CHF', null),
    new Divisas('JPY', null),
];

// NAV.
const navLogin = document.querySelector('#navLogin')

// FORM
const form = document.querySelector('#formConversor')
const inputCantidad = document.querySelector('#inputCantidad')
const alertaCompleta = document.querySelector('#alertaCompleta')

// SUBMIT
const submitDolar = document.querySelector('#submitDolar')
const submitDivisas = document.querySelector('#submitDivisas')
const submitPeso = document.querySelector('#submitPeso')

// H5 
const paridad = document.querySelector('#paridad')

// DIVISAS
const divisaDolarOficial = document.querySelector('#divisaDolarOficial')
const divisaDolarBlue = document.querySelector('#divisaDolarBlue')
const divisaDolarTarjeta = document.querySelector('#divisaDolarTarjeta')
const divisaDolarCCL = document.querySelector('#divisaDolarCCL')
const divisaDolarMEP = document.querySelector('#divisaDolarMEP')
const divisaDolarMayorista = document.querySelector('#divisaDolarMayorista')

// VALORES
const valorDolarOficial = document.querySelector('#valorDolarOficial')
const valorDolarBlue = document.querySelector('#valorDolarBlue')
const valorDolarTarjeta = document.querySelector('#valorDolarTarjeta')
const valorDolarCCL = document.querySelector('#valorDolarCCL')
const valorDolarMEP = document.querySelector('#valorDolarMEP')
const valorDolarMayorista = document.querySelector('#valorDolarMayorista')

// LA API SOLAMENTE PERMITIA LLAMADAS CON PROTOCOLO HTTP, POR ESO NO SE UTILIZO HTTPS. SE DEBE EJECUTAR DE MANERA LOCAL.
// Se declara una funcion para obtener las tasas de cambio de la API.
async function obtenerTasasDeCambio() {
    const apiKey = '768e5add5e1ae0d8f01f7c7741f1ad51';
    const baseCurrency = 'EUR'; 
    const divisasNombres = divisas.map(divisa => divisa.nombre);

    const apiUrl = `https://data.fixer.io/api/latest?base=${baseCurrency}&symbols=${divisasNombres.join(',')}&access_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 

        const rates = data.rates;
        for (const divisa of divisas) {
            if (rates.hasOwnProperty(divisa.nombre)) {
                divisa.paridad = rates[divisa.nombre];
            }
        }
    } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
    }
}

// Se llama a la función para obtener las tasas de cambio.
obtenerTasasDeCambio();

// Se declara una funcion para darle el formato requerido a los resultados.
function formatearNumero(numero) {
    const partes = numero.toFixed(2).toString().split('.');
    const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const parteDecimal = partes[1];
    return parteEntera + ',' + parteDecimal;
}

// Verifica si hay datos de usuarios almacenados en el localStorage.
const usuariosGuardados = JSON.parse(localStorage.getItem('claveNuevoUsuario'));

// Se establece una respuesta en base a si hay datos almacenados o no.
if (usuariosGuardados !== null) {
    navLogin.removeAttribute('href');
    navLogin.innerHTML = 'Sesion Iniciada';
} else {
    navLogin.setAttribute('href', './pages/login.html');
    navLogin.innerHTML = 'Iniciar Sesion';
}

//                                                           Dolares a pesos 

const resultadosDolares = {};

// Se agrega la escucha del evento al formulario.
submitDolar.addEventListener('click', (event) => {

    event.preventDefault();

    // Se reemplaza la aclaracion de paridad.
    paridad.innerHTML = 'USD - ARS'

    // Se reemplazan las nuevas divisas.
    divisaDolarOficial.innerHTML = 'Oficial'
    divisaDolarBlue.innerHTML = 'Blue'
    divisaDolarTarjeta.innerHTML = 'Tarjeta'
    divisaDolarCCL.innerHTML = 'CCL'
    divisaDolarMEP.innerHTML = 'MEP'
    divisaDolarMayorista.innerHTML = 'Mayorista'

    // Se toma el valor ingresado en "inputCantidad" y se convierte en un número.
    const cantidad = parseFloat(inputCantidad.value);

    // Se recorre el array de los dolares y se realiza el calculo.
    if (!isNaN(cantidad)) {
        if (cantidad !== 0) {
            for (const dolar of dolares) {
                resultadosDolares[dolar.nombre] = cantidad * dolar.valor;
                alertaCompleta.innerHTML = '';
            }
            Toastify({
                text: "Conversion Exitosa",
                className: "info",
                gravity: "bottom",
                position: "right",
                close: true,
                style: {
                    background: "linear-gradient(to right, #090979, #00d4ff)",
                }
            }).showToast();
        } else {
            alertaCompleta.innerHTML = 'El valor no puede ser 0.';

            for (const dolar of dolares) {
                resultadosDolares[dolar.nombre] = 0;
            }
        }
    } else {
        alertaCompleta.innerHTML = 'Completa el campo con un valor numérico.';

        for (const dolar of dolares) {
            resultadosDolares[dolar.nombre] = 0;
        }
    }

    // Se formatean los resultados con puntos como separadores de miles.
    valorDolarOficial.innerHTML = '$' + formatearNumero(resultadosDolares['Oficial']);
    valorDolarBlue.innerHTML = '$' + formatearNumero(resultadosDolares['Blue']);
    valorDolarTarjeta.innerHTML = '$' + formatearNumero(resultadosDolares['Tarjeta']);
    valorDolarCCL.innerHTML = '$' + formatearNumero(resultadosDolares['CCL']);
    valorDolarMEP.innerHTML = '$' + formatearNumero(resultadosDolares['MEP']);
    valorDolarMayorista.innerHTML = '$' + formatearNumero(resultadosDolares['Mayorista']);
})

//                                                        Euros a divisas 

const resultadosDivisas = {};

// Se agrega la escucha del evento al formulario.
submitDivisas.addEventListener('click', (event) => {
    event.preventDefault();

    // Se reemplaza la aclaracion de paridad.
    paridad.innerHTML = 'EUR - DVS'

    // Se reemplazan las nuevas divisas.
    divisaDolarOficial.innerHTML = 'Pesos'
    divisaDolarBlue.innerHTML = 'Real'
    divisaDolarTarjeta.innerHTML = 'Yuan'
    divisaDolarCCL.innerHTML = 'Libra'
    divisaDolarMEP.innerHTML = 'Franco'
    divisaDolarMayorista.innerHTML = 'Yen'

    // Se toma el valor ingresado en "inputCantidad" y se convierte en un número
    const cantidad = parseFloat(inputCantidad.value);

    // Se recorre el array de las divisas y se realiza el calculo
    if (!isNaN(cantidad)) {
        if (cantidad !== 0) {
            for (const divisa of divisas) {
                resultadosDivisas[divisa.nombre] = cantidad * divisa.paridad;
                alertaCompleta.innerHTML = '';
            }
            Toastify({
                text: "Conversion Exitosa",
                className: "info",
                gravity: "bottom",
                position: "right",
                close: true,
                style: {
                    background: "linear-gradient(to right, #090979, #00d4ff)",
                }
            }).showToast();
        } else {
            alertaCompleta.innerHTML = 'El valor no puede ser 0.';

            for (const divisa of divisas) {
                resultadosDivisas[divisa.nombre] = 0;
            }
        }
    } else {
        alertaCompleta.innerHTML = 'Completa el campo con un valor numérico.';

        for (const divisa of divisas) {
            resultadosDivisas[divisa.nombre] = 0;
        }
    }

    // Se formatean los resultados con puntos como separadores de miles
    valorDolarOficial.innerHTML = '$' + formatearNumero(resultadosDivisas['ARS']);
    valorDolarBlue.innerHTML = '$' + formatearNumero(resultadosDivisas['BRL']);
    valorDolarTarjeta.innerHTML = '$' + formatearNumero(resultadosDivisas['CNY']);
    valorDolarCCL.innerHTML = '$' + formatearNumero(resultadosDivisas['GBP']);
    valorDolarMEP.innerHTML = '$' + formatearNumero(resultadosDivisas['CHF']);
    valorDolarMayorista.innerHTML = '$' + formatearNumero(resultadosDivisas['JPY']);
})

//                                              Pesos a dolares

const resultadosPesos = {};

// Se agrega la escucha del evento al formulario
submitPeso.addEventListener('click', (event) => {
    
    event.preventDefault();

    // Se reemplaza la aclaracion de paridad
    paridad.innerHTML = 'ARS - USD'

    // Se reemplazan las nuevas divisas
    divisaDolarOficial.innerHTML = 'Oficial'
    divisaDolarBlue.innerHTML = 'Blue'
    divisaDolarTarjeta.innerHTML = 'Tarjeta'
    divisaDolarCCL.innerHTML = 'CCL'
    divisaDolarMEP.innerHTML = 'MEP'
    divisaDolarMayorista.innerHTML = 'Mayorista'

    // Se toma el valor ingresado en "inputCantidad" y se convierte en un número
    const cantidad = parseFloat(inputCantidad.value);

    // Se recorre el array de los dolares y se realiza el calculo
    if (!isNaN(cantidad)) {
        if (cantidad !== 0) {
            for (const dolar of dolares) {
                resultadosPesos[dolar.nombre] = cantidad / dolar.valor;
                alertaCompleta.innerHTML = '';
            }
            Toastify({
                text: "Conversion Exitosa",
                className: "info",
                gravity: "bottom",
                position: "right",
                close: true,
                style: {
                    background: "linear-gradient(to right, #090979, #00d4ff)",
                }
            }).showToast();
        } else {
            alertaCompleta.innerHTML = 'El valor no puede ser 0.';

            for (const dolar of dolares) {
                resultadosPesos[dolar.nombre] = 0;
            }
        }
    } else {
        alertaCompleta.innerHTML = 'Completa el campo con un valor numérico.';

        for (const dolar of dolares) {
            resultadosPesos[dolar.nombre] = 0;
        }
    }

    // Se formatean los resultados con puntos como separadores de miles
    valorDolarOficial.innerHTML = '$' + formatearNumero(resultadosPesos['Oficial']);
    valorDolarBlue.innerHTML = '$' + formatearNumero(resultadosPesos['Blue']);
    valorDolarTarjeta.innerHTML = '$' + formatearNumero(resultadosPesos['Tarjeta']);
    valorDolarCCL.innerHTML = '$' + formatearNumero(resultadosPesos['CCL']);
    valorDolarMEP.innerHTML = '$' + formatearNumero(resultadosPesos['MEP']);
    valorDolarMayorista.innerHTML = '$' + formatearNumero(resultadosPesos['Mayorista']);
})



