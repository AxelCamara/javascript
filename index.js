
function calcularResultado(num1, num2, operacion) {
switch (operacion) {
    case "+":
    return num1 + num2;
    case "-":
    return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
    return num2 !== 0 ? num1 / num2 : "Error: división por cero";
    default:
    return "Operación inválida";
    }
}

// Función para validar si el valor ingresado es un número
function esNumero(valor) {
return !isNaN(parseFloat(valor)) && isFinite(valor);
}

// Array para guardar el historial de operaciones
const historialOperaciones = [];

let continuar = true;

while (continuar) {
const input1 = prompt("Ingresá el primer número:");
const input2 = prompt("Ingresá el segundo número:");
  const operacion = prompt("Ingresá la operación (+, -, *, /):");

  // Validación
if (!esNumero(input1) || !esNumero(input2)) {
    alert("Por favor, ingresá números válidos.");
    continue;
}

const numero1 = parseFloat(input1);
const numero2 = parseFloat(input2);
const resultado = calcularResultado(numero1, numero2, operacion);

alert("El resultado es: " + resultado);

  // Guardar en historial si el resultado es válido
if (typeof resultado === "number") {
    const operacionRealizada = `${numero1} ${operacion} ${numero2} = ${resultado}`;
    historialOperaciones.push(operacionRealizada);
}

const seguir = confirm("¿Querés hacer otra operación?");
continuar = seguir;
}

// Mostrar historial si hubo operaciones
if (historialOperaciones.length > 0)  {
console.log("Historial de operaciones:");
for (let i = 0; i < historialOperaciones.length; i++) {
    console.log(historialOperaciones[i]);
    }
} else {
console.log("No se realizaron operaciones válidas.");
}