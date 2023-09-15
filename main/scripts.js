const displayValorAnterior = document.getElementById("valor-anterior");
const displayValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");
const mostrarHistorialBtn = document.getElementById("mostrarHistorial");
const historial = document.getElementById("historial");
const descargaHistorial = document.getElementById("descarga");
let historialVisible = false;
const operacionesRealizadas = [];

botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    const botonPresionado = boton.textContent;

    if (
      displayValorActual.textContent === "0" ||
      displayValorActual.textContent === "SyntaxError"
    ) {
      displayValorActual.textContent = botonPresionado;
    } else {
      displayValorActual.textContent += botonPresionado;
    }
  });
});

botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => {
    const botonPresionado = boton.textContent;

    if (boton.id === "botonC") {
      displayValorActual.textContent = "0";
      displayValorAnterior.textContent = "";
      return;
    }

    if (boton.id === "borrar") {
      if (
        displayValorActual.textContent.length === 1 ||
        displayValorActual.textContent === "SyntaxError"
      ) {
        displayValorActual.textContent = "0";
      } else {
        displayValorActual.textContent = displayValorActual.textContent.slice(
          0,
          -1
        );
      }
      return;
    }

    if (boton.id === "igual") {
      try {
        const resultado = eval(displayValorActual.textContent);
        if (!isNaN(resultado)) {
          // Solo agrega operaciones válidas al historial
          agregarOperacionAlHistorial(
            ` ${displayValorActual.textContent} = ${resultado}`
          );
          displayValorAnterior.textContent = resultado;
        } else {
          displayValorAnterior.textContent = "Error";
        }
        displayValorActual.textContent = resultado;
        return;
      } catch {
        displayValorActual.textContent = "SyntaxError";
        return;
      }
    }

    if (
      displayValorActual.textContent === "0" ||
      displayValorActual.textContent === "SyntaxError"
    ) {
      displayValorActual.textContent = botonPresionado;
    } else {
      displayValorActual.textContent += botonPresionado;
    }
  });
});

mostrarHistorialBtn.addEventListener("click", () => {
  historialVisible = !historialVisible;

  if (historialVisible) {
    mostrarHistorialBtn.textContent = "Ocultar Historial";
    historial.style.display = "block"; // Mostrar el historial
  } else {
    mostrarHistorialBtn.textContent = "Mostrar Historial";
    historial.style.display = "none"; // Ocultar el historial
  }
});

function agregarOperacionAlHistorial(operacion) {
  operacionesRealizadas.push(operacion);
  // Actualiza la lista en el historial
  const itemHistorial = document.createElement("li");
  itemHistorial.textContent = operacion;
  historial.appendChild(itemHistorial);
}

  

  descargaHistorial.addEventListener("click",() => {
    const operaciones = operacionesRealizadas;
    if(operaciones.length === 0){
      alert("No tienes operaciones para descargar")
      return;

    }
    const contenido= operaciones.join("\n");
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
            
    // Crear un enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'operaciones.txt'; // Nombre del archivo
    a.style.display = 'none';
    
    // Agregar el enlace al documento
    document.body.appendChild(a);
    
    // Simular un clic en el enlace de descarga
    a.click();
    
    // Limpiar y revocar la URL del Blob
    window.URL.revokeObjectURL(url);





  })

  Limpiar.addEventListener("click", () => {
    // Verifica si hay más de un elemento en el historial antes de intentar eliminarlos
    if (operacionesRealizadas.length > 0) {
      // Elimina todos los elementos del historial excepto el primero
      operacionesRealizadas.splice(0);
      // Elimina los elementos del historial en el DOM, excepto el primero
      while (historial.children.length > 0) {
        historial.removeChild(historial.lastChild);
      }
    }
  });