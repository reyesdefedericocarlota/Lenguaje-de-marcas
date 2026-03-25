# Ejercicio 1 — Consulta de Países con la API REST Countries

Explicación detallada del código JavaScript que busca información de un país por nombre y la muestra en pantalla.

---

## Índice

- [Ejercicio 1 — Consulta de Países con la API REST Countries](#ejercicio-1--consulta-de-países-con-la-api-rest-countries)
  - [Índice](#índice)
  - [Visión general](#visión-general)
  - [Función `obtenerPais`](#función-obtenerpais)
    - [Paso a paso](#paso-a-paso)
  - [Función `mostrarPais`](#función-mostrarpais)
    - [Paso a paso](#paso-a-paso-1)
  - [Función `mostrarError`](#función-mostrarerror)
  - [Captura del evento submit](#captura-del-evento-submit)
    - [Paso a paso](#paso-a-paso-2)
  - [Flujo completo](#flujo-completo)

---

## Visión general

El código se divide en **tres funciones** y un **listener de evento**:

| Pieza | Qué hace |
|---|---|
| `obtenerPais(nombre)` | Llama a la API y recibe los datos del país |
| `mostrarPais(pais)` | Construye el HTML con la información recibida |
| `mostrarError(mensaje)` | Muestra un mensaje si algo falla |
| Listener `submit` | Escucha el formulario y lanza el proceso |

---

## Función `obtenerPais`

```javascript
async function obtenerPais(nombre) {
  const apiUrl = `https://restcountries.com/v3.1/name/${nombre}`;
  try {
    const respuesta = await fetch(apiUrl);
    if (!respuesta.ok) {
      throw new Error("No se encontró el país");
    }
    const datos = await respuesta.json();
    mostrarPais(datos[0]);
  } catch (error) {
    mostrarError("No se encontró el país o hubo un error");
  }
}
```

### Paso a paso

**1. `async function`**

La palabra clave `async` convierte la función en **asíncrona**. Esto permite usar `await` dentro de ella para esperar operaciones lentas (como llamadas a una API) sin bloquear el resto del programa.

**2. Construcción de la URL**

```javascript
const apiUrl = `https://restcountries.com/v3.1/name/${nombre}`;
```

Se construye la URL de la API usando un **template literal** (las comillas invertidas `` ` ``). El parámetro `nombre` que recibe la función se inserta directamente en la URL.

> Ejemplo: si `nombre` es `"spain"`, la URL resultante será `https://restcountries.com/v3.1/name/spain`.

**3. `try / catch`**

```javascript
try {
  // código que puede fallar
} catch (error) {
  // qué hacer si falla
}
```

El bloque `try` intenta ejecutar el código. Si en cualquier punto ocurre un error (red caída, país no encontrado, etc.), el control salta automáticamente al bloque `catch`.

**4. `fetch` y `await`**

```javascript
const respuesta = await fetch(apiUrl);
```

- `fetch(apiUrl)` lanza una petición HTTP GET a la API.
- `await` pausa la ejecución **solo de esta función** hasta que la API responda, sin congelar el navegador.
- El resultado se guarda en `respuesta`, que es un objeto `Response`.

**5. Comprobación de errores HTTP**

```javascript
if (!respuesta.ok) {
  throw new Error("No se encontró el país");
}
```

`respuesta.ok` es `true` si el servidor devolvió un código de estado entre 200 y 299 (éxito). Si no, lanzamos un error manualmente con `throw`, lo que provoca que el `catch` se active.

> Esto es importante porque `fetch` **no lanza error automáticamente** cuando la API devuelve un 404. Sin esta comprobación, el código seguiría ejecutándose con datos vacíos.

**6. Conversión a JSON**

```javascript
const datos = await respuesta.json();
```

La respuesta llega como texto plano. Con `.json()` la convertimos a un **array de objetos JavaScript** que podemos manejar con comodidad. Volvemos a usar `await` porque esta operación también es asíncrona.

**7. Llamada a `mostrarPais`**

```javascript
mostrarPais(datos[0]);
```

La API devuelve un **array** (puede haber varios países con nombres similares). Usamos `datos[0]` para coger siempre el primer resultado, que suele ser el más relevante.

**8. Gestión del error**

```javascript
} catch (error) {
  mostrarError("No se encontró el país o hubo un error");
}
```

Si algo salió mal en el `try`, se llama a `mostrarError` con un mensaje descriptivo.

---

## Función `mostrarPais`

```javascript
function mostrarPais(pais) {
  const contenedor = document.getElementById("resultado-nombre");

  const idiomas = Object.values(pais.languages).join(", ");
  const monedas = Object.values(pais.currencies)
    .map((moneda) => moneda.name)
    .join(", ");

  contenedor.innerHTML = `
    <img src="${pais.flags.png}" alt="bandera">
    <h2>${pais.name.common}</h2>
    <p><strong>Nombre oficial:</strong> ${pais.name.official}</p>
    <p><strong>Capital:</strong> ${pais.capital?.join(", ") || "No disponible"}</p>
    <p><strong>Región:</strong> ${pais.region}</p>
    <p><strong>Subregión:</strong> ${pais.subregion}</p>
    <p><strong>Población:</strong> ${pais.population}</p>
    <p><strong>Idiomas:</strong> ${idiomas}</p>
    <p><strong>Monedas:</strong> ${monedas}</p>
  `;
}
```

### Paso a paso

**1. Selección del contenedor**

```javascript
const contenedor = document.getElementById("resultado-nombre");
```

Buscamos en el HTML el elemento con `id="resultado-nombre"`. Aquí es donde se va a inyectar la información del país.

**2. Procesado de los idiomas**

```javascript
const idiomas = Object.values(pais.languages).join(", ");
```

En la API, `pais.languages` no es un array sino un **objeto**. Por ejemplo:

```json
{ "spa": "Spanish", "cat": "Catalan" }
```

- `Object.values(...)` extrae solo los valores: `["Spanish", "Catalan"]`.
- `.join(", ")` los une en un string: `"Spanish, Catalan"`.

**3. Procesado de las monedas**

```javascript
const monedas = Object.values(pais.currencies)
  .map((moneda) => moneda.name)
  .join(", ");
```

`pais.currencies` también es un objeto. Cada valor tiene a su vez una propiedad `name`. Por ejemplo:

```json
{ "EUR": { "name": "Euro", "symbol": "€" } }
```

- `Object.values(...)` extrae los objetos de cada moneda: `[{ name: "Euro", symbol: "€" }]`.
- `.map((moneda) => moneda.name)` transforma cada objeto en solo su nombre: `["Euro"]`.
- `.join(", ")` lo une en un string.

**4. Construcción del HTML**

```javascript
contenedor.innerHTML = `...`;
```

Se usa `innerHTML` para inyectar directamente HTML en el contenedor. El **template literal** permite mezclar texto fijo con las variables del objeto `pais` de forma muy legible.

Cada propiedad del objeto se inserta con la sintaxis `${...}`:

| Propiedad usada | Qué contiene |
|---|---|
| `pais.flags.png` | URL de la imagen de la bandera |
| `pais.name.common` | Nombre común del país (ej: "Spain") |
| `pais.name.official` | Nombre oficial (ej: "Kingdom of Spain") |
| `pais.capital?.join(", ") \|\| "No existe"` | Capital(es). Usa optional chaining por si el campo no existe, y `.join()` porque es un array. Devuelve `"No existe"` si está vacío. |
| `pais.region` | Región (ej: "Europe") |
| `pais.subregion` | Subregión (ej: "Southern Europe") |
| `pais.population` | Número de habitantes |

---

## Función `mostrarError`

```javascript
function mostrarError(mensaje) {
  const contenedor = document.getElementById("resultado-nombre");
  contenedor.innerHTML = `<p class="error">${mensaje}</p>`;
}
```

Esta función es muy sencilla. Selecciona el mismo contenedor y reemplaza su contenido con un párrafo que tiene la clase CSS `error`, lo que permite aplicarle estilos de color rojo o similares desde la hoja de estilos.

---

## Captura del evento submit

```javascript
const form = document.getElementById("form-nombre");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("input-nombre").value.trim();
  if (input) {
    obtenerPais(input);
  }
});
```

### Paso a paso

**1. Selección del formulario**

```javascript
const form = document.getElementById("form-nombre");
```

Se obtiene el formulario del HTML por su `id`.

**2. Escucha del evento `submit`**

```javascript
form.addEventListener("submit", function (event) { ... });
```

Se registra una función que se ejecutará cada vez que el usuario envíe el formulario (pulsando Enter o un botón de tipo `submit`).

**3. Prevenir el comportamiento por defecto**

```javascript
event.preventDefault();
```

Por defecto, al hacer submit un formulario HTML recarga la página. Con `preventDefault()` cancelamos esa recarga y gestionamos el envío nosotros mismos con JavaScript.

**4. Lectura y limpieza del input**

```javascript
const input = document.getElementById("input-nombre").value.trim();
```

- `.value` obtiene el texto escrito por el usuario.
- `.trim()` elimina espacios en blanco al principio y al final para evitar búsquedas incorrectas (ej: `"  spain  "` se convierte en `"spain"`).

**5. Comprobación y llamada**

```javascript
if (input) {
  obtenerPais(input);
}
```

Solo se llama a `obtenerPais` si el campo no está vacío. Es una validación mínima para evitar peticiones innecesarias a la API.

---

## Flujo completo

```
Usuario escribe un país y pulsa Enter
          │
          ▼
   Listener "submit"
   └─ event.preventDefault()
   └─ Lee y limpia el input
   └─ Si no está vacío → obtenerPais(nombre)
                               │
                               ▼
                    Construye la URL de la API
                               │
                               ▼
                    fetch(apiUrl)  ──► API REST Countries
                               │
                    ┌──────────┴──────────┐
                 respuesta.ok           error / 404
                    │                      │
                    ▼                      ▼
              datos = .json()       mostrarError(mensaje)
                    │
                    ▼
            mostrarPais(datos[0])
                    │
                    ▼
          Procesa idiomas y monedas
                    │
                    ▼
        Inyecta HTML en el contenedor
```