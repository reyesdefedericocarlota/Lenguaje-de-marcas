# Relación 6 - Empresa de Fajalauza Granadina

## Ejercicio 1: Formulario de Pedido de Cerámica

### Objetivo
Crear un formulario para realizar pedidos de cerámica en la empresa Fajalauza Granadina. Se deberán manejar eventos del formulario para mejorar la experiencia del usuario.

### Requisitos
- El código JavaScript estará en un archivo externo llamado `js/script.js`.
- Se deben manejar los siguientes eventos:
  - **focus**: Cambiar el color del borde del campo cuando el usuario haga clic en él.
  - **blur**: Restaurar el color del borde cuando el usuario abandone el campo.
  - **change**: Mostrar un mensaje en la consola con el producto seleccionado.
  - **submit**: Mostrar un mensaje en consola y evitar el envío del formulario si hay errores.

### Campos del formulario
El formulario debe incluir los siguientes campos:
1. **Nombre** (campo de texto, obligatorio)
2. **Correo Electrónico** (campo de email, obligatorio)
3. **Producto** (selección de producto entre "Plato decorativo", "Jarra artesanal" y "Azulejo pintado")
4. **Cantidad** (campo numérico, mínimo 1, obligatorio)
5. **Botón de envío**

### Estructura del HTML

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Pedido de Cerámica</title>
    <script src="js/script.js" defer></script>
</head>

<body>
    <h1>Realizar Pedido</h1>
    <div id="formulario-container"></div>
</body>

</html>
```

### Pista sobre el manejo de errores en `submit`
Para evitar el envío del formulario si hay errores y manejarlo correctamente, puedes usar:

```javascript
document.getElementById("pedidoForm").addEventListener("submit", function(event) {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let cantidad = document.getElementById("cantidad").value;
    
    if (nombre === "" || email === "" || cantidad <= 0) {
        console.log("Error: Todos los campos son obligatorios y la cantidad debe ser mayor a 0");
        event.preventDefault(); // Evita el envío del formulario
    } else {
        console.log("Formulario enviado correctamente");
    }
});
```

---

## Ejercicio 2: Interacción con la Tienda Online

### Objetivo
Crear una página interactiva donde los usuarios puedan ver y manipular productos de la empresa Fajalauza Granadina utilizando eventos del DOM.

### Requisitos
- El código JavaScript estará en un archivo externo llamado `js/script.js`.
- Se deben manejar los siguientes eventos:
  - **mouseover**: Cambiar el color de fondo del producto cuando el usuario pase el mouse sobre él.
  - **mouseout**: Restaurar el color de fondo cuando el mouse salga del producto.
  - **keydown**: Mostrar en la consola qué tecla ha sido presionada en la barra de búsqueda.
  - **keyup**: Filtrar los productos en pantalla según lo escrito en la barra de búsqueda.

### Estructura del HTML

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Tienda de Cerámica</title>
    <script src="js/script.js" defer></script>
</head>

<body>
    <h1>Catálogo de Productos</h1>
    <div id="productos">
        <div class="producto" data-nombre="Plato Decorativo">Plato Decorativo</div>
        <div class="producto" data-nombre="Jarra Artesanal">Jarra Artesanal</div>
        <div class="producto" data-nombre="Azulejo Pintado">Azulejo Pintado</div>
    </div>
    
    <h2>Descripción del Producto</h2>
    <p id="descripcion"></p>
    
    <label for="busqueda">Buscar producto:</label>
    <input id="busqueda" type="text">
</body>

</html>
```

### Pista sobre `keyup` para filtrar productos
Para filtrar los productos a medida que el usuario escribe en la barra de búsqueda, puedes usar lo siguiente:

```javascript
document.getElementById("busqueda").addEventListener("keyup", function() {
    let filtro = this.value.toLowerCase();
    let productos = document.querySelectorAll(".producto");
    
    productos.forEach(function(producto) {
        let nombre = producto.getAttribute("data-nombre").toLowerCase();
        
        // Completa la lógica de filtrado
        if (/* condición aquí */) {
            // <elemento>.style.display = "block"; 
        } else {
            // <elemento>.style.display = "none";
        }
    });
});
```

