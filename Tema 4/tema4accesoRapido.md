
# Tema 4 – CSS (Acceso Rápido para Examen)

## RESET BÁSICO
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

# SELECTORES CLAVE

Selector de clase
```css
.clase { }
```

Selector de id
```css
#id { }
```

Descendiente
```css
.contenedor img { }
```

Hijo directo
```css
.contenedor > h3 { }
```

Hermano adyacente
```css
img + h3 { }
```

Hover
```css
button:hover { }
```

---

# BOX MODEL

```css
width
height
padding
border
margin
```

Tamaño total =
width + padding + border (+ margin)

Extras frecuentes:
```css
min-height: 300px;
border-radius: 10px;
box-shadow: 0 4px 10px rgba(0,0,0,0.3);
```

Imagen adaptable:
```css
img {
  max-width: 100%;
  display: block;
}
```

---

# FONDOS

Imagen completa:
```css
background-image: url("img.jpg");
background-size: cover;
background-position: center;
```

Imagen + oscurecido:
```css
background:
  linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
  url("img.jpg");
```

---

# TIPOGRAFÍA

```css
font-family
font-size
font-weight
text-transform: uppercase;
letter-spacing: 2px;
text-shadow: 2px 2px 5px gray;
```

---

# FLEXBOX

Activar:
```css
display: flex;
```

## EJE PRINCIPAL
Depende de:
```css
flex-direction: row | column;
```

## DISTRIBUIR EN EJE PRINCIPAL
```css
justify-content: center | space-between | space-around | space-evenly;
```

## ALINEAR EN EJE TRANSVERSAL
```css
align-items: center;
align-self: flex-start;
```

## VARIAS LÍNEAS
```css
flex-wrap: wrap;
gap: 20px;
```

## CRECIMIENTO Y TAMAÑO
```css
flex-grow: 1;
flex-shrink: 0;
flex-basis: 200px;
flex: 1 1 200px;
```

## ORDEN
```css
order: -1;
```

---

# SITUACIONES TÍPICAS

Header con menú horizontal:
```css
display: flex;
justify-content: space-between;
align-items: center;
```

Tarjetas en fila que bajen si no caben:
```css
display: flex;
flex-wrap: wrap;
gap: 20px;
```

Elemento que ocupa toda la fila:
```css
flex-basis: 100%;
```

Quitar viñetas:
```css
list-style: none;
```

Efecto al pasar el ratón:
```css
:hover
transition
transform
```