#### **Estructura básica de un documento XML:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<raiz>
    <elemento atributo="valor">Contenido del elemento</elemento>
    <elementoVacio atributo="valor"/>
</raiz>
```

#### **Ejemplo de DTD Interna:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE libro [
<!ELEMENT libro (titulo, autor, editorial)>
<!ELEMENT titulo (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
<!ELEMENT editorial (#PCDATA)>
]>
<libro>
    <titulo>Aprendiendo XML</titulo>
    <autor>Juan Pérez</autor>
    <editorial>Editorial Ejemplo</editorial>
</libro>
```

**Ejemplo de DTD Externa:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE libro SYSTEM "libro.dtd">
<libro>
    <titulo>Aprendiendo XML</titulo>
    <autor>Juan Pérez</autor>
    <editorial>Editorial Ejemplo</editorial>
</libro>
```

El archivo `libro.dtd` contendría las definiciones:

```xml
<!ELEMENT libro (titulo, autor, editorial)>
<!ELEMENT titulo (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
<!ELEMENT editorial (#PCDATA)>
```

- **Cantidad de ocurrencias:** El número de veces que un elemento puede aparecer se define mediante los operadores `+`, `*`, `?`:

  - `+` indica que el elemento debe aparecer al menos una vez.
  - `*` indica que el elemento puede aparecer cero o más veces.
  - `?` indica que el elemento es opcional y puede aparecer una o ninguna vez.

- **<!ATTLIST>:** Define los atributos que un elemento puede tener, los tipos de datos permitidos para los atributos, y si estos son opcionales u obligatorios. DTD admite tipos de datos muy básicos como `CDATA` (para cualquier tipo de texto) y valores enumerados (una lista de valores permitidos).

  **Ejemplo de la definición de una lista de atributos:**

```xml
<!ELEMENT libro (#PCDATA)>
<!ATTLIST libro
    categoria CDATA #IMPLIED
    id ID #REQUIRED>
```

##### **Estructura básica de un esquema XSD:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="persona">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="nombre" type="xs:string"/>
        <xs:element name="edad" type="xs:integer"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
```

- **Tipos de datos predefinidos**: XSD ofrece un conjunto robusto de tipos de datos predefinidos, que incluyen:
  - **`xs:string`**: Representa texto.
  - **`xs:integer`**: Representa un número entero.
  - **`xs:date`**: Representa una fecha en formato ISO (`YYYY-MM-DD`).
  - **`xs:boolean`**: Representa valores booleanos (`true` o `false`).
  - **`xs:decimal`**: Representa números decimales con precisión arbitraria.

##### **Restricciones y validación en XSD:**

1. **Restricciones de longitud:**

   ```xml
   <xs:element name="NombreLimitado">
    <xs:simpleType>
      <xs:restriction base="xs:string">
        <xs:maxLength value="50"/>
      </xs:restriction>
    </xs:simpleType>
   </xs:element>
   ```

2. **Valores mínimos y máximos para números:**

   ```xml
    <xs:element name="EdadLimitada">
      <xs:simpleType>
        <xs:restriction base="xs:integer">
          <xs:minInclusive value="0"/>
          <xs:maxInclusive value="120"/>
        </xs:restriction>
      </xs:simpleType>
    </xs:element>

   ```

3. **Patrones (expresiones regulares):**
   ```xml
    <xs:element name="Telefono">
      <xs:simpleType >
        <xs:restriction base="xs:string">
          <xs:pattern value="\d{3}-\d{3}-\d{4}"/>
        </xs:restriction>
      </xs:simpleType>
    </xs:element>
   ```

```xml
   <xs:element name="email">
     <xs:simpleType >
       <xs:restriction base="xs:string">
         <xs:pattern value="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"/>
       </xs:restriction>
     </xs:simpleType>
   </xs:element>
```

```xml
 <xs:element name="nombre">
    <xs:simpleType>
      <xs:restriction base="xs:string">
        <xs:pattern value="[A-Z][A-Za-z| ]+" />
      </xs:restriction>
    </xs:simpleType>
  </xs:element>
```

```xml
  <xs:element name="dni">
    <xs:simpleType>
      <xs:restriction base="xs:string">
       <xs:pattern value="\d{8}[A-Z]" />
      </xs:restriction>
    </xs:simpleType>
  </xs:element>
```

```xml
<xs:element name="edad">
  <xs:simpleType>
    <xs:restriction base="xs:integer">
      <xs:minInclusive value="0" />
      <xs:maxInclusive value="120" />
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

4. **Cardinalidad (número de ocurrencias):**

   ```xml
   <xs:element name="telefono" type="xs:string" minOccurs="0" maxOccurs="3"/>
   ```

   Esto permite que el elemento `telefono` aparezca hasta tres veces en el documento XML, pero puede no aparecer (`minOccurs="0"`).

5. **Restricción por enumeración:**

```xml
<xs:element name="estado">
    <xs:simpleType>
        <xs:restriction base="xs:string">
            <xs:enumeration value="Pendiente"/>
            <xs:enumeration value="Enviado"/>
            <xs:enumeration value="Entregado"/>
            <xs:enumeration value="Cancelado"/>
        </xs:restriction>
    </xs:simpleType>
</xs:element>
```
