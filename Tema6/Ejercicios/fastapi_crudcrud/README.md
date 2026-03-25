# API estilo CrudCrud con FastAPI

API en memoria pensada para prácticas de consumo de APIs con alumnos.

## Qué incluye

- FastAPI
- Documentación Swagger automática en `/docs`
- ReDoc en `/redoc`
- CORS totalmente abierto
- Base de datos en memoria usando diccionarios
- Colecciones dinámicas: puedes crear cualquier colección sobre la marcha
- `_id` automático en todos los elementos
- 3 colecciones de prueba con cientos de registros:
  - `alumnos`
  - `productos`
  - `pedidos`

## Requisitos

```bash
pip install -r requirements.txt
```

## Arranque

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python main.py
```

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Después abre:

- Swagger local: `http://127.0.0.1:8000/docs`
- Swagger en red local: `http://IP_DE_TU_ORDENADOR:8000/docs`

La API escucha en `0.0.0.0`, así que tus alumnos podrán conectarse **mientras tu ordenador esté encendido y dentro de la misma red**.

## Endpoints principales

### Listar elementos de una colección

```http
GET /api/{coleccion}
```

Ejemplo:

```http
GET /api/alumnos
GET /api/productos?limit=20&offset=40
```

### Obtener un elemento

```http
GET /api/{coleccion}/{id}
```

### Crear un elemento

```http
POST /api/{coleccion}
Content-Type: application/json
```

Ejemplo de body:

```json
{
  "nombre": "Ana",
  "curso": "FastAPI",
  "activo": true
}
```

Respuesta:

```json
{
  "nombre": "Ana",
  "curso": "FastAPI",
  "activo": true,
  "_id": "a1b2c3d4e5f6789012345678"
}
```

### Reemplazar un elemento

```http
PUT /api/{coleccion}/{id}
Content-Type: application/json
```

### Borrar un elemento

```http
DELETE /api/{coleccion}/{id}
```

### Borrar una colección completa

```http
DELETE /api/{coleccion}
```

## Endpoints extra útiles para clase

- `GET /` → información general y ejemplos
- `GET /meta/collections` → listado de colecciones y cantidad de elementos

## Notas importantes

- Los datos se guardan **solo en memoria**.
- Al apagar el proceso, todo lo creado por los alumnos se pierde.
- El campo `_id` lo genera la API automáticamente.
- Si un alumno envía `_id` en el body, la API lo ignora y genera uno nuevo.
- Los nombres de colección admiten letras, números, `-` y `_`.

## Ejemplos con fetch

### Crear

```js
fetch('http://IP_DEL_PROFE:8000/api/tareas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ titulo: 'Practicar fetch', hecha: false })
})
  .then(r => r.json())
  .then(console.log)
```

### Listar

```js
fetch('http://IP_DEL_PROFE:8000/api/tareas')
  .then(r => r.json())
  .then(console.log)
```

### Borrar

```js
fetch('http://IP_DEL_PROFE:8000/api/tareas/ID_AQUI', {
  method: 'DELETE'
})
```

## Sugerencia para usar en clase

Pide a tus alumnos que trabajen contra colecciones diferentes, por ejemplo:

- `tareas_grupo_a`
- `tareas_grupo_b`
- `peliculas_equipo_1`
- `usuarios_demo`

Así no se pisan los datos entre ellos.
