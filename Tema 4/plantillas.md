
# Plantillas Base – Examen CSS (Tema 4)

Estas estructuras están pensadas para copiar y adaptar rápidamente en el examen.

---

# 1️⃣ Reset Base

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

# 2️⃣ Header con Menú Horizontal

## HTML

```html
<header class="header">
  <h1>Logo</h1>
  <ul class="nav">
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Servicios</a></li>
    <li><a href="#">Contacto</a></li>
  </ul>
</header>
```

## CSS

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.nav {
  display: flex;
  gap: 20px;
  list-style: none;
}
```

---

# 3️⃣ Sección Hero Base

## HTML

```html
<section class="hero">
  <h2>Título principal</h2>
  <p>Texto descriptivo</p>
  <button>Acción</button>
</section>
```

## CSS

```css
.hero {
  background-image: url("imagen.jpg");
  background-size: cover;
  background-position: center;
  min-height: 350px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

---

# 4️⃣ Tarjetas en Fila (Responsive con wrap + gap)

## HTML

```html
<section class="cards">
  <div class="card">Contenido</div>
  <div class="card">Contenido</div>
  <div class="card">Contenido</div>
</section>
```

## CSS

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 250px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
```

---

# 5️⃣ Footer Simple con Lista

## HTML

```html
<footer class="footer">
  <ul class="social">
    <li><a href="#">Instagram</a></li>
    <li><a href="#">Twitter</a></li>
  </ul>
</footer>
```

## CSS

```css
.footer {
  padding: 20px;
  text-align: center;
}

.social {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
}
```

---

# 6️⃣ Selectores Obligatorios (Plantilla Mental)

```css
.contenedor img { }        /* descendiente */
.contenedor > h3 { }       /* hijo directo */
img + h3 { }               /* hermano adyacente */
.elemento:hover { }        /* hover */
```

---

# 7️⃣ Botón Base con Hover

```css
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  transform: scale(1.05);
}
```