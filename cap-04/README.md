# Cap 04 - Llamémosla superficie de dibujado

## Adentrándose

HTML5 define al elemento `<canvas>` como "un lienzo bitmap dependiente de resolución que puede ser usado para renderizar gráficas, gráficas de juego, u otros elementos visuales". Un lienzo, (al que nos referiremos como canvas) es un rectángulo en la página en donde se puede utilizar JavaScript para dibujar lo que se desee.

### Soporte básico para `<canvas>`

* Internet Explorer: 9.0+*
* Firefox: 3.0+
* Safari: 3.0+
* Chrome: 3.0+
* Opera: 10.0+
* iPhone: 1.0+
* Android: 1.0+

##### Internet Explorer 7 y 8 soportan el elemento, pero requieren de la librería _explorecanvas_.

El marcado del canvas luce de la siguiente forma:

    <canvas width="300" height="225"></canvas>

En la página, el canvas luce invisible; por sí solo no tiene contenido ni bordes. [Ver ejemplo del resultado en el canvas a](src/index.html#a)

Se puede tener más de un elemento `<canvas>` en la misma página, cada canvas se mostrará en el DOM con un estado propio. Una buena forma de identificarlos es agregarles un atributo `id` al elemento:

    <canvas id="a" width="300" height="225"></canvas>

De esta forma, se puede encontrar fácilmente el elemento `<canvas>` en el DOM.

    var a_canvas = document.getElementById("a");

## Formas simples

Los canvas empiezan en blanco, para dibujar algo podemos utilizar la siguiente función llamada por un handler `onclick`:

    function draw_b(){
    	var b_canvas = document.getElementById("b");
    	var b_context = b_canvas.getContext("2d");
    	b_context.fillRect(50, 25, 150, 100);
    }

Al haber encontrado el elemento `<canvas>` en el DOM utilizando el método `document.getElementById()`, se llama después a su método `getContext()`  y se le pasa como argumento una cadena de carácteres, siendo esta, "2d".

El _drawing context_ (o contexto de dibujado), (obtenido del método `getContext()`) es donde todo ocurre; donde las propiedades y los métodos de dibujado son definidos. Hay un buen grupo de propiedades y métodos para dibujar rectángulos:

* La propiedad `fillStyle`, que puede ser un color de CSS, un patrón, un gradiente...
* El método `fillRect(x, y, width, height)`.
* La propiedad `strokeStyle`, similar a la propiedad fillStyle.
* El método `strokeRect(x, y, width, heights)`, el cual dibuja el rectángulo dependiendo del estilo de la propiedad `strokeStyle`. Este método no rellena el rectángulo, solamente los bordes.
* El método `clearRect(x, y, width, height)`, que limpia los pixeles del rectángulo especificado.

En este caso, utilizamos el método `fillRect()` en el que se dibuja un rectángulo y se rellena con el estilo `fillStyle` actual (que por defecto es negro). El rectángulo se une por por la esquina superior izquierda (50,25), su ancho (150), y su altura (100). [Ver ejemplo del resultado en el canvas b](src/index.html#b)

Es posible "resetear" un canvas reajustando el alto o ancho del elemento `<canvas>`. Esto borrará los contenidos y restaurará las propiedades de su drawing context. No es necesario cambiar la escala, ajustarlo con sus valores actuales es suficiente:

    var b_canvas = document.getElementById("b");
    b_canvas.width = b_canvas.width;

## Coordenadas del Canvas

El canvas es una cuadrícula bidimensional. La coordenada (0,0) se encuentra en la esquina superior izquierda del canvas. En el axis X, los valores incrementan hacia el borde derecho del canvas. En el axis Y, los valores incrementan hacia el borde inferior del canvas.

Como habíamos visto anteriormente, al definir el elemento `<canvas>` se define también su alto y su ancho (`width` y `height`), así como su `id` para poder identificarlo en el DOM.

    <canvas id="c" width="500" height="375"></canvas>

Posteriormente, utilizamos un script para encontrar el `<canvas>` en el DOM.

    var c_canvas = document.getElementbyId("c");
    var context = c_canvas.getContext("2d");

Así pues, podemos empezar a dibujar

## Paths

Los canvas tienen un _path_ (o trazado), definirlo es como dibujar con un lápiz, pues no será parte del producto final.

Para dibujar líneas rectas con lápiz se puede usar uno de los siguientes métodos:

1. `moveTo(x, y)`: este mueve el lápiz a un punto de partida especificado.
2. `lineTo(x, y)`: dibuja la línea hacia el punto final especificado.

Mientras más se llamen los métodos, mayor se hace el trazado, estos son los métodos "_pencil_" (o métodos lápiz), aunque no se verá nada hasta que se llamen a los métodos "_ink_" (o métodos tinta).

Empezaremos dibujando la cuadrícula en blanco.

#### Dibujar las líneas verticales
    for (var x = 0.5; x < 500; x+= 10){
    	context.moveTo(x, 0);
    	context.lineTo(x, 375);
    }

##### Dibujar las líneas horizontales
    for (var y = 0.5; y < 375; y += 10){
 		context.moveTo(x, 0);
 		context.lineTo(x, 375)
    }

Estos fueron los métodos "pencil", usaremos un método "ink" para hacerlo permanente.

    context.strokeStyle = "#eee";
    context.stroke();

`stroke()` es uno de los métodos "ink", este toma los path definidos con los métodos `moveTo()` y `lineTo()` y lo dibuja.

Empezaremos por dibjar una flecha horizontal de color negro. Las líneas y curvas en un path se dibujan de un mismo color o gradiente.

    context.beginPath();
    context.moveto(0, 40);
    context.lineTo(240, 40);
	context.moveTo(260, 40);
	context.lineTo(500, 40);
	context.moveTo(495, 35);
	context.lineTo(500, 40);
	context.lineTo(495, 45);

Ahora bien, dado que la flecha vertical es del mismo color que la flecha horizontal, no se necesita hacer un nuevo path, las dos flechas serán parte de este path.

    context.moveTo(60, 0);
	context.lineTo(60, 153);
	context.moveTo(60, 173);
	context.lineTo(60, 375);
	context.moveTo(65, 370);
	context.lineTo(60, 375);
	context.lineTo(55, 370);

Para pintar las flechas de negro ajustaremos el estilo del `strokeStyle` a negro.

    context.strokeStyle = "#000";
    context.stroke();
 [Ver ejemplo del resultado en el canvas c](src/index.html#c)

## Texto

También se puede dibujar texto en el canvas, que a diferencia del texto común de una página web, no existen técnicas de disposición CSS, aunque hay algunos atributos de fuente disponibles en el drawing context:

* `font` puede ser cualquier regla CSS para el estilo de la fuente, como el tamaño, variante, familia, etc.
* `textAlign` controla la alineación del texto, esto es similar a la regla de CSS `text-align`. Los valores posibles son `start`, `end`, `left`, `right` , y `center`.
* `textBaseline` controla el lugar en donde el texto es dibujado relativo al punto de partida. Los valores posibles son `top`, `hanging`, `middle`, `alphabetic`, `ideographic`, y `bottom`. Este, puede dibujar cualquier carácter _Unicode_, para alfabetos de carácteres simples como el Inglés se puede usar sin problema `top`, `middle`, o `bottom`.

Dibujaremos ahora algo de texto, el texto dibujado en un canvas hereda el tamaño de fuente y su estilo del elemento `<canvas>`, esto se puede sobreescribir ajustando la propiedad `font` en el drawing context.

    context.font = "bold 12px sans-serif";
    context.fillText("x", 248, 43);
    context.fillText("y", 58,  165);

Aquí el método `fillText()` es el que se encarga de dibujar el texto.

Para dibujar texto en las esquinas, en este caso, en la esquina superior izquierda, supongamos que queremos que la parte superior del texto sea `y=5`, pero, para no medir la altura del texto y calcular el baseline podemos ajustar el `textBaseline` a `top` y pasar después la coordenada superior izquierda de los extremos de la caja del texto.

    context.textBaseline = "top";
    context.fillText("( 0, 0 )", 8, 5);

Y ahora, para el texto de la esquina inferior derecha, supongamos que queremos que esta esquina esté en las coordenadas (492, 370), para no medir el ancho y el alto del texto podemos ajustar `textAlign` a `right` y `textBaseline` a `bottom`, después llamar al método `fillText()`.

    corner.textAlign = "right";
    cornet.textBaseline = "bottom";
    context.fillText("( 500 , 375 )", 492, 370);

Posteriormente podemos agregar algunos puntos en las esquinas (como rectángulos)

    context.fillRect(0, 0, 3, 3);
    context.fillRect(497, 372, 3, 3);

[Ver ejemplo del resultado en el canvas c](src/index.html#c1)

## Gradientes

Se pueden agregar rectángulos con colores gradientes, primero haremos un canvas nuevo:

    <canvas id="d" width="300" height="225"></canvas>

Ahora obtendremos su drawing context:

    var d_canvas = document.getElementById("d");
    var context = d_canvas.getContext("2d");

Una vez obtenido, definimos el gradiente, el cual es una transición suave entre dos o más colores, dos tipos de gradientes son soportados:

1. `createLinearGradient(x0, y0, x1, y1)`, que dibuja una línea desde las cordenadas (x0, y0) hasta (x1, y1).
2. `createRadialGradient(x0, y0, r0 x1, y1, r1)`dibuja un cono entre dos círculos, los primeros tres parámetros representan el círculo inicial.

Haremos un gradiente lineal del tamaño del canvas.

    var my_gradient = context.createLinearGradient(0, 0, 300, 0);

Dado que los valores `y` (que son el segundo y cuarto argumento) son igual a 0, el gradiente generará su sombra de forma simétrica de izquierda a derecha.

Una vez tenemos nuestro objeto gradiente, podremos definir sus colores. Un gradiente tiene 2 o más _color stops_ (o paradas de color), estos pueden estar en cualquier parte del gradiente. Para añadir uno, se necesita especificar su posición junto en el gradiente. Pueden ser desde 0 a 1.

Su sombreado será de negro a blanco, por lo que lo escribiremos de la siguiente forma:

    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");

Definir un gradiente no dibuja nada en el canvas, para esto ajustaremos el `fillStyle` al nombre del gradiente y dibujaremos una forma.

    context.fillStyle = my_gradient;
    context.fillRect(0, 0, 300, 225);

Si por ejemplo, queremos que el gradiente se sombree de arriba a abajo, al crear el objeto gradiente, conservaremos los valores `x` (que son el primer y tercer argumento), y haremos que los valores `y` (el segundo y cuarto argumento) vayan desde 0 a la altura del canvas.

    var my_gradient = context.createLinearGradient(0, 0, 0, 225);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    context.fillStyle = my_gradient;
    context.fillRect(0, 0, 300, 225);

También los podemos hacer diagonales

    var my_gradient = context.createLinearGradient(0, 0, 300, 225);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    context.fillStyle = my_gradient;
    context.fillRect(0, 0, 300, 225);

 [Ver ejemplo del resultado en el canvas d](src/index.html#d).

## Imágenes

El canvas define el método `drawImagae()` para dibujar una imagen en el canvas, a este se le pueden pasar ya sea 3, 5 o 9 argumentos.

* `drawImage(image, dx, dy)` toma una imagen y la dibuja en el canvas. Las coordenadas `(dx, dy)` serán la esquina superior izquierda de la imagen.
* `drawImage(image, dx, dy, dw, dh)` toma una imagen, la escala dados los valores `dw` y `dh` y la dibuja.
* `drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)` toma una imagen, la recorta al rectángulo dado por `(sx, sy, sw, sh)`, la escala a las dimensiones `(dw, dh)` y la dibuja en el canvas.

Necesitamos una imagen, la cual puede ser un elemento `<img>` existente o se puede crear un objeto `Image()` con JavaScript.

Para usar un elemento `<img>`, se le puede dibujar con el evento `window.onload`.

    <img id="cat" src="images/cat.png" alt="sleeping cat" width="177" height="113">
	<canvas id="e" width="177" height="113"></canvas>
	<script>
		window.onload = function() {
	  		var canvas = document.getElementById("e");
  			var context = canvas.getContext("2d");
  			var cat = document.getElementById("cat");
  			context.drawImage(cat, 0, 0);
	};
	</script>

Para crear el objeto de la imagen en JavaScript, se puede dibujar con el evento `Image.onload`.

    <canvas id="e" width="177" height="113"></canvas>
	<script>
  		var canvas = document.getElementById("e");
  		var context = canvas.getContext("2d");
  		var cat = new Image();
  		cat.src = "images/cat.png";
  		cat.onload = function() {
    		context.drawImage(cat, 0, 0);
  		};
	</script>

Los argumentos opcionales (el tercero y el cuarto) para el método `drawImage()` controlan el escalado de la imagen.

    cat.onload = function(){
    	for (var x = 0, y = 0;
    		x < 500 & y < 375;
    		x += 50, y += 37){
    			context.drawImage(cat, x, y, 88, 56);
    		}
    };

El script anterior dibuja varias imagenes con la misma escala, una puesta después de la otra en orden descendente diagonal. [Ver ejemplo del resultado en el canvas e](src/index.html#canvas-e)

Colocar imágenes en un canvas puede facilitar el trabajo de combinar texto y sobreponerlo en imágenes junto a otros elementos.