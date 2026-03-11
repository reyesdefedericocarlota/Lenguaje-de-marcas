// 1) Carga inicial: leer `dataset` y mostrar resumen
// Al cargar la página:
// 1. Selecciona el **primer jugador** (la primera tarjeta `.jugador`).
// 2. **Lee** sus datos desde `dataset` (nombre, dorsal, posición y goles).
// 3. Muestra ese resumen en el panel `#panelDetalles`:
//    - Nombre y dorsal en `#detalleNombre`
//    - Posición en `#detallePosicion`
//    - Goles en `#detalleGoles`

const primerJugador = document.querySelector(".jugador");

if (primerJugador) {
  seleccionarJugador(primerJugador);
} else {
  actualizarPanel(null);
}

function seleccionarJugador(jugador) {
  if (jugador) {
    quitarSeleccionATodos();
    jugador.classList.add("seleccionado");
    jugadorSeleccionado = jugador;
    actualizarPanel(jugador);
  }
}

function quitarSeleccionATodos() {
  const tarjetas = document.querySelectorAll(".jugador");
  tarjetas.forEach((j) => j.classList.remove("seleccionado"));
}

function actualizarPanel(jugador) {
  if (jugador != null) {
    const nombre = jugador.querySelector(".nombre").textContent;
    const posicion = jugador.dataset.posicion;
    const goles = jugador.dataset.goles;

    detalleNombre.textContent = `${nombre} (#${jugador.dataset.dorsal})`;
    detallePosicion.textContent = posicion;
    detalleGoles.textContent = goles;
  } else {
    detalleNombre.textContent = "—";
    detallePosicion.textContent = "—";
    detalleGoles.textContent = "—";
  }
}

// ### 2) Click en tarjeta: seleccionar jugador y actualizar panel
// Cuando el usuario haga click en una tarjeta `.jugador`:
// 1. Marca visualmente la tarjeta seleccionada (clase `.seleccionado`).
// 2. Quita `.seleccionado` al resto de tarjetas.
// 3. Actualiza el panel de detalles (`#panelDetalles`) usando el `dataset` del jugador clicado.
function engancharClicksJugadoresExistentes() {
  const tarjetas = document.querySelectorAll(".jugador");
  tarjetas.forEach((tarjeta) => engancharClickTarjeta(tarjeta));
}

function engancharClickTarjeta(tarjeta) {
  tarjeta.addEventListener("click", function () {
    seleccionarJugador(this);
  });
}

// ### 3) Botón “+1 gol”: modificar `dataset` y el texto visible
// Al pulsar el botón `#btnSumarGol`:
// 1. Suma **1** al valor `data-goles` del jugador seleccionado.
// 2. Actualiza:
//    - El `dataset` del jugador (`data-goles`)
//    - El texto del panel `#detalleGoles`
//    - El pequeño contador dentro de la tarjeta (span `.goles`)
const btnSumarGol = document.getElementById("btnSumarGol");

btnSumarGol.addEventListener("click", function () {
  sumarGolSeleccionado();
});

function sumarGolSeleccionado() {
  if (jugadorSeleccionado) {
    const golesActuales = Number(jugadorSeleccionado.dataset.goles);
    const nuevosGoles = golesActuales + 1;

    // Modificar dataset
    jugadorSeleccionado.dataset.goles = String(nuevosGoles);

    // Actualizar texto visible
    jugadorSeleccionado.querySelector(".goles").textContent =
      String(nuevosGoles);
    detalleGoles.textContent = String(nuevosGoles);
  }
}

// ### 4) Filtrado por posición usando `dataset`
// Con el `<select id="filtroPosicion">`:
// 1. En el evento `change`, recorre todas las tarjetas `.jugador`.
// 2. Muestra solo las que cumplan:
//    - Si el filtro es `"todas"` → se ven todas.
//    - Si no → se ven solo las cuyo `dataset.posicion` coincide con el valor del select.
// 3. Las que no cumplan deben ocultarse (por ejemplo, `style.display = "none"`).

const filtroPosicion = document.getElementById("filtroPosicion");

filtroPosicion.addEventListener("change", function () {
  filtrarPorPosicion(this.value);
});

function filtrarPorPosicion(valorFiltro) {
  const tarjetas = document.querySelectorAll(".jugador");

  tarjetas.forEach((jugador) => {
    const posicion = jugador.dataset.posicion;
    const cumpleFiltro = valorFiltro === "todas" || posicion === valorFiltro;

    jugador.style.display = cumpleFiltro ? "block" : "none";
  });
}

// ### 5) Añadir jugador (crear nodos + dataset)
// En el formulario `#formNuevoJugador`:
// 1. Al enviar, evita recarga.
// 2. Valida que:
//    - Nombre no esté vacío
//    - Dorsal sea >= 1
//    - Goles sea >= 0
// 3. Crea una nueva tarjeta `.jugador` con la misma estructura que las existentes.
// 4. Asigna correctamente los `data-*` (dorsal, goles, posición).
// 5. Inserta la tarjeta al final de `#listaJugadores` y deja el formulario limpio.

const formNuevoJugador = document.getElementById("formNuevoJugador");

formNuevoJugador.addEventListener("submit", function (event) {
  event.preventDefault();
  anadirJugadorDesdeFormulario();
});

function anadirJugadorDesdeFormulario() {
  const nombre = document.getElementById("nuevoNombre").value.trim();
  const dorsal = Number(document.getElementById("nuevoDorsal").value);
  const posicion = document.getElementById("nuevaPosicion").value;
  const goles = Number(document.getElementById("nuevosGoles").value);

  let datosCorrectos = validarNuevoJugador(nombre, dorsal, goles);

  if (datosCorrectos) {
    const tarjeta = crearTarjetaJugador(nombre, dorsal, posicion, goles);
    listaJugadores.appendChild(tarjeta);

    formNuevoJugador.reset();
    mostrarMensajeFormulario("Jugador añadido correctamente ✅");
  } else {
    mostrarMensajeFormulario(
      "Error: revisa nombre, dorsal (>=1) y goles (>=0).",
    );
  }
}

function validarNuevoJugador(nombre, dorsal, goles) {
  if (nombre === "") return false;
  if (isNaN(dorsal) || dorsal < 1) return false;
  if (isNaN(goles) || goles < 0) return false;
  return true;
}

function crearTarjetaJugador(nombre, dorsal, posicion, goles) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("jugador");
  tarjeta.tabIndex = 0;

  tarjeta.dataset.dorsal = String(dorsal);
  tarjeta.dataset.posicion = posicion;
  tarjeta.dataset.goles = String(goles);

  tarjeta.innerHTML = `
    <h3 class="nombre">${nombre}</h3>
    <p class="meta">Dorsal <strong class="dorsal">${dorsal}</strong> · <span class="posicion">${posicion}</span></p>
    <p class="stats">Goles: <strong class="goles">${goles}</strong></p>
  `;

  engancharClickTarjeta(tarjeta);

  return tarjeta;
}

// ### 6) Borrar jugador seleccionado
// Al pulsar `#btnBorrar`:
// 1. Si hay un jugador seleccionado, elimínalo del DOM.
// 2. Tras borrar, selecciona automáticamente el **primer jugador** que quede (si existe) y actualiza el panel.

const btnBorrar = document.getElementById("btnBorrar");

btnBorrar.addEventListener("click", function () {
  borrarSeleccionado();
});

function borrarSeleccionado() {
  if (jugadorSeleccionado) {
    const aBorrar = jugadorSeleccionado;

    // Quitamos la referencia antes de borrar
    jugadorSeleccionado = null;

    // Eliminar del DOM
    aBorrar.remove();

    // Seleccionar el primero que quede (si existe)
    const primero = document.querySelector(".jugador");
    if (primero) {
      seleccionarJugador(primero);
    } else {
      actualizarPanel(null);
    }
  } else {
    alert("Ningún jugador seleccionado");
  }
}
