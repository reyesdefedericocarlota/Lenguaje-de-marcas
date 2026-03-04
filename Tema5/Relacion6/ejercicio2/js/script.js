const productos = document.querySelectorAll(".producto");
const tecla = document.getElementById("busqueda")

productos.forEach(producto => {
  producto.addEventListener("mouseover", () => {
    producto.style.backgroundColor = "#f0e68c"; // color amarillo claro
  });

  producto.addEventListener("mouseout", () => {
    producto.style.backgroundColor = ""; // restaurar color original
  });

  // Opcional: mostrar la descripción al hacer click
  producto.addEventListener("click", () => {
    const descripcion = document.getElementById("descripcion");
    descripcion.textContent = `Has seleccionado: ${producto.dataset.nombre}`;
  });
});


tecla.addEventListener("keydown", function (event) {
  console.log("Tecla presionada: " + event.key);
})

document.getElementById("busqueda").addEventListener("keyup", function() {
    let filtro = this.value.toLowerCase();
    let productos = document.querySelectorAll(".producto");
    
    productos.forEach(function(producto) {
        let nombre = producto.getAttribute("data-nombre").toLowerCase();
        
           if (nombre.includes(filtro)) {
            producto.style.display = "block"; 
        } else {
            producto.style.display = "none";
        }
    });
});