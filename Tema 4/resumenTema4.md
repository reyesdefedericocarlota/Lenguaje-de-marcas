# Unidad Didáctica 4: CSS (Cascading Style Sheets)

## ¿Qué es CSS?

CSS (Cascading Style Sheets) es un lenguaje de hojas de estilo que controla la presentación visual de documentos HTML.

Permite separar el contenido (HTML) de la apariencia (estilos), facilitando el mantenimiento y la reutilización.

Los estilos pueden aplicarse:

· En línea (style="")

· En el documento < style >

· En archivos externos (.css)

CSS funciona mediante reglas formadas por:

· Selector

· Propiedades

· Valores

## Selectores en CSS

### Selectores básicos

· Selector de etiqueta → p, div, h1

· Selector de clase → .clase (reutilizable)

· Selector de id → #id (único)

### Selectores avanzados

#### Selector descendiente

.contenedor img → selecciona imágenes dentro del contenedor.

#### Selector de hijo directo

.tarjeta > h3 → solo hijos directos.

#### Selector de hermano adyacente

img + h3 → el primer h3 justo después de la imagen.

#### Selector múltiple

h1, h2, p → varios elementos a la vez.

## Pseudo-clases

· :hover → al pasar el ratón

Se usa mucho junto con:

· cambio de color

· transform: scale()

· transition → suaviza los cambios visuales (color, tamaño, etc.).

## Reset y modelo de caja

Los navegadores aplican márgenes y paddings por defecto. Para evitarlo se suele usar un reset:

· Selector universal *:

· margin: 0;

· padding: 0;

· box-sizing: border-box; hace que width y height incluyan padding y border.

### Modelo de Caja (Box Model)

Cada elemento es una caja formada por:

· Content (contenido)

· Padding (espacio interno)

· Border (borde)

· Margin (espacio exterior)

· min-height: define la altura mínima que debe tener un elemento. Aunque el contenido sea pequeño, el elemento no será más bajo que ese valor. Se usa mucho en secciones tipo hero para asegurar una altura visual mínima.

· border-radius: permite redondear las esquinas de un elemento. Se usa mucho en tarjetas y botones para un diseño más moderno.

· box-shadow: añade una sombra alrededor de un elemento. Se utiliza en tarjetas y botones para dar sensación de profundidad.

Cálculo típico:

· Ancho total = width + padding + border (+ margin si se cuenta espacio ocupado).

· max-width: 100%; permite que una imagen no supere el ancho de su contenedor. Se usa junto con display: block para hacer imágenes responsivas.

## Unidades de medida

### Unidades absolutas

· px → la más usada

· pt, cm, mm, in → poco usadas en web

### Unidades relativas

· % → respecto al contenedor padre

· em → respecto a la fuente del elemento padre

· rem → respecto a la fuente raíz (html)

· vw → porcentaje del ancho de la ventana

· vh → porcentaje del alto de la ventana

## Colores y fondos

· color → color del texto

· background-color → color de fondo

· background-image → imagen de fondo

· background-size: cover; → cubre todo el contenedor

· background-position: center; → centra la imagen

· Múltiples fondos: Se pueden combinar varias capas en la propiedad background, por ejemplo un gradiente y una imagen. Se usa mucho para oscurecer una imagen de fondo y mejorar la legibilidad del texto.

Se usa: .hero {
  background: 
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url("imagen.jpg");
  background-size: cover;
  background-position: center;
}

La primera capa es un linear-gradient semitransparente. La segunda capa es la imagen. El gradiente se coloca encima de la imagen. Esto oscurece la imagen y permite que el texto se lea mejor.

## Tipografía

· font-family → tipo de letra

· font-size → tamaño

· font-weight → grosor (normal, bold, valores numéricos)

· font-style → estilo (normal, italic)

· Google Fonts

· text-transform: permite transformar el texto en mayúsculas, minúsculas o capitalizado. Ejemplo: uppercase convierte todo el texto en mayúsculas.

· letter-spacing: controla el espacio entre las letras. Se usa para mejorar la legibilidad o dar un estilo más visual a títulos.

· text-shadow: añade una sombra al texto. Se utiliza para destacar títulos o crear efectos visuales.

## Flexbox

Flexbox organiza elementos en una sola dimensión (fila o columna). Para activarlo:

· display: flex; en el contenedor.

### Ejes en Flexbox

· Eje principal: depende de flex-direction

· Eje transversal: perpendicular al principal

Por defecto:

· flex-direction: row;

· Eje principal = horizontal

### Propiedades del contenedor Flex

#### flex-direction: define la dirección en la que se colocan los elementos dentro del contenedor

· row: Valor por defecto, coloca los elementos en fila horizontal, en la misma dirección del texto, de izquierda a derecha.

· row-reverse: Coloca los elementos en fila horizontal, en la dirección opuesta al texto, de derecha a izquierda en orden inverso.

· column: Coloca los elementos en columna, de arriba hacia abajo.

· column-reverse: Coloca los elementos en columna, pero en orden inverso, de abajo hacia arriba.

#### flex-wrap: define si los elementos deben mantenerse en una sola línea o pueden saltar a varias líneas cuando no hay suficiente espacio

· nowrap: Valor por defecto, los elementos intentan mantenerse en una sola línea, aunque no quepan.

· wrap: Permite que los elementos bajen a una nueva línea (flex-direction: row) si no caben. En columnas (flex-direction: column) crea nuevas columnas hacia la derecha.

· wrap-reverse: Permite que los elementos suban a una nueva línea si no caben. En columnas crea nuevas columnas hacia la izquierda.

#### flex-flow: combina flex-direction y flex-wrap

Permite definir en una sola línea la dirección de los elementos y si pueden saltar a varias líneas.

En vez de escribir: .contenedor {display: flex; flex-direction: row; flex-wrap: wrap;}

Se puede escribir: .contenedor {display: flex; flex-flow: row wrap;}

#### justify-content: distribuye y alinea los elementos en el eje principal

· flex-start: Coloca los elementos al inicio del contenedor, a la izquierda.

· flex-end: Alinea los elementos al final del contenedor, a la derecha.

· center: Centra los elementos en el centro del contenedor.

· space-between: Distribuye los elementos dejando el mismo espacio entre ellos, sin espacio en los extremos.

· space-around: Distribuye los elementos con la misma separación alrededor de ellos, hay espacio en los extremos.

· space-evenly: Distribuye los elementos con el mismo espacio entre ellos y los bordes del contenedor.

#### align-items: alinea los elementos verticalmente, más arriba o más abajo

· flex-start: Alinea los elementos a la parte superior del contenedor.

· flex-end: Alinea los elementos a la parte inferior del contenedor.

· center: Centra los elemento verticalmente dentro del contenedor.

· baseline: Alinea los elementos en la línea base del contenedor.

· stretch: Los elementos se estiran para ajustarse al contenedor, para ocupar todo el espacio disponible.

#### align-self: alinea UN solo elemento verticalmente, más arriba o más abajo

Reemplaza el valor de align-items para un elemento concreto. Si el límite transversal de alguno de los elementos está definido como auto, el valor de align-self es ignorado.

· flex-start: Alinea el elemento en la parte superior del contenedor.

· flex-end: Alinea el elemento en la parte inferior del contenedor.

· center: Centra el elemento verticalmente dentro del contenedor.

· baseline: Alinea el elementos en la línea base del contenedor.

· stretch: Estira el elemento para que ocupe todo el espacio disponible verticalmente.

#### align-content: controla cómo se distribuyen las líneas dentro de un contenedor cuando hay varias líneas

Solo funciona si flex-wrap: wrap; o wrap-reverse; y hay más de una línea. Align-items: alinea los elementos individuales mientras que align-content: distribuye las líneas completas.

· flex-start: Las líneas se posicionan en la parte superior del contenedor.

· flex-end: Las líneas se posicionan en la parte inferior del contenedor.

· center: Las líneas se posicionan en el centro, verticalmente hablando, del contenedor.

· space-between: Las líneas se muestran con la misma distancia entre ellas.

· space-around: Las líneas se muestran con la misma separación alrededor de ellas.

· space-evenly: Las líneas tienen el mismo espacio entre ellas y los bordes.

· stretch: Valor por defecto, las líneas se estiran para ajustarse al contenedor.

#### gap: define el espacio entre los elementos del contenedor

Se aplica al contenedor flex y crea separación entre los elementos sin usar margin. Funciona tanto horizontal como verticalmente cuando hay varias líneas (flex-wrap). No añade espacio en los bordes exteriores, solo entre elementos.

· row-gap

· column-gap

### Propiedades de los elementos Flex

#### flex-grow: Indica cuánto puede crecer un elemento respecto a los demás cuando sobra espacio en el contenedor

· flex-grow: 1 El elemento crece de forma normal y comparte el espacio sobrante con otros que tengan el mismo valor.

· flex-grow: 2 El elemento crece el doble que uno con flex-grow: 1;.

#### flex-shrink: define cuánto puede reducirse un elemento cuando no hay suficiente espacio en el contenedor

· flex-shrink: 1 El elemento se reduce de forma normal si falta espacio (valor por defecto).

· flex-shrink: 0 El elemento no se reduce, aunque no haya espacio suficiente.

#### flex-basis: Establece el tamaño inicial del elemento antes de aplicar el crecimiento o la reducción

· flex-basis: auto El tamaño inicial depende del contenido del elemento.

· flex-basis: 200px El elemento empieza midiendo 200 píxeles.

· flex-basis: 100% hace que un elemento ocupe toda la línea dentro de un contenedor flex.

#### La propiedad abreviada flex

flex es una propiedad abreviada que combina flex-grow, flex-shrink y flex-basis.

Sintaxis:

· flex: grow shrink basis

Ejemplos:

· flex: 1 1 auto El elemento puede crecer, reducirse y su tamaño inicial depende del contenido.

· flex: 2 1 300px El elemento empieza en 300px, puede crecer más que los demás y también reducirse.

· flex: 1 0 200px El elemento empieza en 200px, puede crecer pero no se reduce nunca.

#### order: especifica el orden

La propiedad order permite modificar el orden visual en el que aparecen los elementos dentro de un contenedor flexible (display: flex). order se aplica a los elementos hijos (flex items), no al contenedor.

Funcionamiento:

El valor por defecto es order: 0. Los elementos se organizan en orden ascendente según el valor asignado. Si varios elementos tienen el mismo valor de order, mantienen el orden original en el HTML.

Relación con flex-direction:

order actúa siempre sobre el eje principal, que depende de flex-direction. Si flex-direction: row; → cambia el orden horizontal. Si flex-direction: column; → cambia el orden vertical.

Relación con otras propiedades:

No sustituye a justify-content. order cambia la posición relativa; justify-content distribuye el espacio.

No afecta directamente a align-items, ya que esta propiedad actúa en el eje transversal.

order solo modifica el orden visual. No cambia el orden real en el DOM (estructura HTML).

## Patrones típicos de examen

· Header con logo + menú → Flexbox.

· Sección hero con imagen de fondo.

· Tarjetas en fila → Flexbox + padding + border.

· Dos elementos iguales y uno distinto → clases comunes + específicas.

Uso obligatorio de:

· descendiente

· hijo directo

· hermano adyacente

· :hover

· Footer con lista sin viñetas.

## Cómo interpretar los enunciados

· “No quiero márgenes” → eliminar márgenes por defecto usando margin: 0; (y normalmente padding: 0;).

· “Que no haya viñetas” → list-style: none; + ajustar padding del ul.

· “Alinea en una fila” → display: flex; en el contenedor.

· “Que se reparta el espacio” → usar justify-content o flex-grow.

· “Efecto al pasar el ratón” → pseudo-clase :hover.

· “Usa selectores avanzados” → descendiente, hijo directo o hermano adyacente con clases.