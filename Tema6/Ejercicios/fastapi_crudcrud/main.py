from __future__ import annotations

import copy
import os
import random
import socket
from contextlib import asynccontextmanager
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
from typing import Any

from fastapi import Body, FastAPI, HTTPException, Path, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(_: FastAPI):
    seed_database()
    yield


app = FastAPI(
    title="API estilo CrudCrud para prácticas",
    description=(
        "API en memoria con colecciones dinámicas, IDs automáticos, CORS abierto y "
        "documentación Swagger lista para usar en clase."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# CORS totalmente abierto para facilitar las prácticas desde navegador, apps o frontends locales.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Base de datos en memoria:
# {
#   "coleccion": {
#       "_id": {...documento...}
#   }
# }
DATABASE: dict[str, dict[str, dict[str, Any]]] = {}
RANDOM = random.Random(20260319)

VALID_COLLECTION_CHARS = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-")


# ---------- Utilidades ----------
def validate_collection_name(collection: str) -> str:
    collection = collection.strip()
    if not collection:
        raise HTTPException(status_code=400, detail="El nombre de la colección no puede estar vacío.")
    if any(ch not in VALID_COLLECTION_CHARS for ch in collection):
        raise HTTPException(
            status_code=400,
            detail="El nombre de la colección solo puede contener letras, números, guion y guion bajo.",
        )
    return collection


def ensure_object_payload(payload: Any) -> dict[str, Any]:
    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="El cuerpo debe ser un objeto JSON.")
    return payload


def generate_id() -> str:
    # 24 hex chars, parecido a Mongo/ObjectId para que resulte familiar en prácticas.
    return "".join(RANDOM.choice("0123456789abcdef") for _ in range(24))


def deep_clone(data: Any) -> Any:
    return copy.deepcopy(data)


def collection_store(name: str) -> dict[str, dict[str, Any]]:
    return DATABASE.setdefault(name, {})


def get_or_404(collection: str, item_id: str) -> dict[str, Any]:
    store = collection_store(collection)
    item = store.get(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Elemento no encontrado.")
    return item


# ---------- Datos de ejemplo ----------
def random_bool(p_true: float = 0.5) -> bool:
    return RANDOM.random() < p_true


FIRST_NAMES = [
    "Lucas", "Sofía", "Mateo", "Martina", "Leo", "Julia", "Hugo", "Valeria", "Daniel", "Paula",
    "Diego", "Carmen", "Álvaro", "Claudia", "Mario", "Noa", "Irene", "Pablo", "Elena", "Adrián",
    "Aitana", "Bruno", "Nora", "Gonzalo", "Laura", "Marcos", "Olivia", "Víctor", "Carla", "Raúl",
]
LAST_NAMES = [
    "García", "Rodríguez", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Fernández", "Ruiz",
    "Díaz", "Moreno", "Álvarez", "Romero", "Alonso", "Navarro", "Torres", "Domínguez", "Vázquez",
    "Ramos", "Gil",
]
CITIES = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga", "Zaragoza", "Alicante", "Vigo", "Granada"
]
COURSES = [
    "Python", "JavaScript", "Java", "C#", "SQL", "React", "Node.js", "FastAPI", "Docker", "Git"
]
TAGS = ["nuevo", "oferta", "top", "premium", "básico", "popular", "eco", "digital", "importado", "local"]
CATEGORIES = ["tecnología", "hogar", "deporte", "libros", "oficina", "gaming", "audio", "movilidad"]
PRODUCT_NAMES = [
    "Auriculares", "Teclado", "Ratón", "Monitor", "Mochila", "Webcam", "Micrófono", "Tablet", "Altavoz", "Portátil",
    "Silla", "Lámpara", "Cargador", "Hub USB", "Disco SSD", "Router", "Impresora", "Cable", "Batería", "Cámara"
]
ORDER_STATUSES = ["pendiente", "pagado", "enviado", "entregado", "cancelado"]
PAYMENT_METHODS = ["tarjeta", "bizum", "paypal", "transferencia"]


def generate_students(total: int = 250) -> dict[str, dict[str, Any]]:
    students: dict[str, dict[str, Any]] = {}
    base_date = date(1990, 1, 1)
    for i in range(1, total + 1):
        item_id = generate_id()
        first = RANDOM.choice(FIRST_NAMES)
        last = f"{RANDOM.choice(LAST_NAMES)} {RANDOM.choice(LAST_NAMES)}"
        birth = base_date + timedelta(days=RANDOM.randint(0, 12000))
        enrolled_count = RANDOM.randint(1, 4)
        enrolled_courses = RANDOM.sample(COURSES, k=enrolled_count)
        score_count = RANDOM.randint(3, 8)
        scores = [RANDOM.randint(50, 100) for _ in range(score_count)]
        students[item_id] = {
            "_id": item_id,
            "studentCode": f"ALU-{1000 + i}",
            "name": first,
            "surname": last,
            "email": f"{first.lower()}.{last.split()[0].lower()}.{i}@clase.local",
            "city": RANDOM.choice(CITIES),
            "birthDate": birth.isoformat(),
            "active": random_bool(0.9),
            "courses": enrolled_courses,
            "averageScore": round(sum(scores) / len(scores), 2),
            "scores": scores,
            "profile": {
                "level": RANDOM.choice(["beginner", "intermediate", "advanced"]),
                "remote": random_bool(0.6),
                "newsletter": random_bool(0.7),
            },
            "createdAt": datetime.now(timezone.utc).isoformat(),
        }
    return students


def generate_products(total: int = 320) -> dict[str, dict[str, Any]]:
    products: dict[str, dict[str, Any]] = {}
    for i in range(1, total + 1):
        item_id = generate_id()
        name = f"{RANDOM.choice(PRODUCT_NAMES)} {RANDOM.choice(['Pro', 'Air', 'Mini', 'Plus', 'Max', 'Lite'])} {i}"
        price = float(Decimal(RANDOM.uniform(5, 1500)).quantize(Decimal("0.01")))
        stock = RANDOM.randint(0, 500)
        products[item_id] = {
            "_id": item_id,
            "sku": f"SKU-{10000 + i}",
            "name": name,
            "category": RANDOM.choice(CATEGORIES),
            "price": price,
            "currency": "EUR",
            "stock": stock,
            "available": stock > 0,
            "rating": round(RANDOM.uniform(2.8, 5.0), 1),
            "tags": RANDOM.sample(TAGS, k=RANDOM.randint(1, 4)),
            "dimensions": {
                "width": RANDOM.randint(5, 80),
                "height": RANDOM.randint(5, 80),
                "depth": RANDOM.randint(1, 50),
                "unit": "cm",
            },
            "createdAt": datetime.now(timezone.utc).isoformat(),
        }
    return products


def generate_orders(
    students: dict[str, dict[str, Any]],
    products: dict[str, dict[str, Any]],
    total: int = 280,
) -> dict[str, dict[str, Any]]:
    orders: dict[str, dict[str, Any]] = {}
    student_ids = list(students.keys())
    product_ids = list(products.keys())
    for i in range(1, total + 1):
        item_id = generate_id()
        lines = []
        subtotal = 0.0
        for _ in range(RANDOM.randint(1, 5)):
            product_id = RANDOM.choice(product_ids)
            product = products[product_id]
            quantity = RANDOM.randint(1, 4)
            line_total = round(product["price"] * quantity, 2)
            subtotal += line_total
            lines.append(
                {
                    "productId": product_id,
                    "productName": product["name"],
                    "quantity": quantity,
                    "unitPrice": product["price"],
                    "lineTotal": line_total,
                }
            )
        created_at = datetime.now(timezone.utc) - timedelta(days=RANDOM.randint(0, 365), hours=RANDOM.randint(0, 23))
        orders[item_id] = {
            "_id": item_id,
            "orderNumber": f"PED-{50000 + i}",
            "customerId": RANDOM.choice(student_ids),
            "status": RANDOM.choice(ORDER_STATUSES),
            "paymentMethod": RANDOM.choice(PAYMENT_METHODS),
            "items": lines,
            "subtotal": round(subtotal, 2),
            "shipping": round(RANDOM.uniform(0, 20), 2),
            "notes": RANDOM.choice([
                "Entregar por la mañana",
                "Llamar antes de entregar",
                "Dejar en conserjería",
                "Sin observaciones",
            ]),
            "createdAt": created_at.isoformat(),
        }
        orders[item_id]["total"] = round(orders[item_id]["subtotal"] + orders[item_id]["shipping"], 2)
    return orders


def seed_database() -> None:
    if DATABASE:
        return
    students = generate_students()
    products = generate_products()
    orders = generate_orders(students, products)
    DATABASE["alumnos"] = students
    DATABASE["productos"] = products
    DATABASE["pedidos"] = orders


# ---------- Endpoints auxiliares ----------
@app.get("/", tags=["info"])
def root() -> dict[str, Any]:
    return {
        "message": "API de prácticas estilo CrudCrud en memoria.",
        "swagger": "/docs",
        "redoc": "/redoc",
        "basePath": "/api/{coleccion}",
        "sampleCollections": {
            name: len(items) for name, items in DATABASE.items()
        },
        "examples": {
            "list": "/api/alumnos",
            "getOne": "/api/alumnos/{id}",
            "create": "POST /api/mi_coleccion",
            "replace": "PUT /api/mi_coleccion/{id}",
            "delete": "DELETE /api/mi_coleccion/{id}",
        },
    }


@app.get("/meta/collections", tags=["info"])
def list_collections() -> list[dict[str, Any]]:
    return [
        {"name": name, "count": len(items)}
        for name, items in sorted(DATABASE.items())
    ]


# ---------- CRUD dinámico ----------
@app.get("/api/{collection}", tags=["crud"])
def list_items(
    collection: str = Path(..., description="Nombre de la colección"),
    limit: int | None = Query(None, ge=1, le=1000, description="Máximo de elementos a devolver"),
    offset: int = Query(0, ge=0, description="Desplazamiento inicial"),
) -> list[dict[str, Any]]:
    collection = validate_collection_name(collection)
    items = list(collection_store(collection).values())
    if offset:
        items = items[offset:]
    if limit is not None:
        items = items[:limit]
    return deep_clone(items)


@app.post("/api/{collection}", tags=["crud"], status_code=status.HTTP_201_CREATED)
def create_item(
    collection: str = Path(..., description="Nombre de la colección"),
    payload: dict[str, Any] = Body(..., description="Documento JSON a guardar"),
) -> dict[str, Any]:
    collection = validate_collection_name(collection)
    payload = ensure_object_payload(payload)
    clean_payload = deep_clone(payload)
    clean_payload.pop("_id", None)

    item_id = generate_id()
    clean_payload["_id"] = item_id

    store = collection_store(collection)
    store[item_id] = clean_payload
    return deep_clone(clean_payload)


@app.get("/api/{collection}/{item_id}", tags=["crud"])
def get_item(
    collection: str = Path(..., description="Nombre de la colección"),
    item_id: str = Path(..., description="ID del elemento"),
) -> dict[str, Any]:
    collection = validate_collection_name(collection)
    item = get_or_404(collection, item_id)
    return deep_clone(item)


@app.put("/api/{collection}/{item_id}", tags=["crud"])
def replace_item(
    collection: str = Path(..., description="Nombre de la colección"),
    item_id: str = Path(..., description="ID del elemento"),
    payload: dict[str, Any] = Body(..., description="Documento JSON completo de reemplazo"),
) -> dict[str, Any]:
    collection = validate_collection_name(collection)
    payload = ensure_object_payload(payload)
    store = collection_store(collection)
    if item_id not in store:
        raise HTTPException(status_code=404, detail="Elemento no encontrado.")

    new_payload = deep_clone(payload)
    new_payload.pop("_id", None)
    new_payload["_id"] = item_id
    store[item_id] = new_payload
    return deep_clone(new_payload)


@app.delete("/api/{collection}/{item_id}", tags=["crud"], status_code=status.HTTP_204_NO_CONTENT)
def delete_item(
    collection: str = Path(..., description="Nombre de la colección"),
    item_id: str = Path(..., description="ID del elemento"),
) -> Response:
    collection = validate_collection_name(collection)
    store = collection_store(collection)
    if item_id not in store:
        raise HTTPException(status_code=404, detail="Elemento no encontrado.")
    del store[item_id]
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.delete("/api/{collection}", tags=["crud"], status_code=status.HTTP_204_NO_CONTENT)
def delete_collection(
    collection: str = Path(..., description="Nombre de la colección"),
) -> Response:
    collection = validate_collection_name(collection)
    DATABASE.pop(collection, None)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# ---------- Ejecución directa ----------
def get_local_ip() -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        sock.close()


if __name__ == "__main__":
    import uvicorn

    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    local_ip = get_local_ip()

    print("\nAPI lista para arrancar")
    print(f"- Swagger local:    http://127.0.0.1:{port}/docs")
    print(f"- Swagger red local:http://{local_ip}:{port}/docs")
    print(f"- Base CRUD local:  http://127.0.0.1:{port}/api")
    print(f"- Base CRUD red:    http://{local_ip}:{port}/api\n")

    uvicorn.run("main:app", host=host, port=port, reload=False)
