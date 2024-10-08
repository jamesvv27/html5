# Cap 02 - Detectando características de HTML5

## Adentrandose

Dado que HTML5 no es solo una cosa, sino una colección de características individuales, no es posible "detectar soporte para HTML5" pero sí que se puede detectar soporte para características individuales.

## Técnicas de detección

Cuando un navegador muestra una página web, construye un _Documento de Modelo de Objeto_ (Document Object Model o DOM por sus siglas), esto se refiere a una colección de objetos que representan a los elementos HTML en la página. Todo elemento, etiqueta, o estilo, es representado en el DOM por un objeto diferente.

Todos los objetos DOM comparten una serie de propiedades comunes, aunque algunos objetos tienen más que otros. Los navegadores que soportan características de HTML5 tendrán objetos con propiedades únicas, visualizando el DOM es posible identificar qué características son soportadas.

Existen 4 técnicas básicas para detectar el soporte de alguna característica por el navegador:

1. **Revisar si una propiedad existe en el objeto global**
2. **Crear un elemento y después revisar si una propiedad existe en dicho elemento**
3. **Crear un elemento, revisar si un método existe en dicho elemento, después mandar llamar al método y verificar el valor que retorne.**
4. **Crear un elemento, ajustar una propiedad a un valor determinado, y después verificar si la propiedad conserva su valor.**

## Modernizr, una biblioteca de detección de HTML5

_Modernizr_ es una biblioteca de JavaScript de código abierto con licencia de MIT. Se encarga de detectar soporte para características de HTML5 y CSS3, para utilizarla, se incluye un elemento `<script>` en la cabeza de la página.

     <!DOCTYPE html>
     <html>
     	<head>
     		<meta charset="UTF-8">
     		<title>Titulo</title>
     		<script src = "modernizr.min.js"></script> // Elemento <script> a colocar
     	</head>
     	<body> ...
     	</body>
     </html>

Modernizr corre automáticamente, y al hacerlo, crea un objeto global llamado `Modernizr`, que contiene una serie de propiedades Bool para cada característica que pueda detectar. Por ejemplo, si el navegador soporta la _API canvas_, el valor de la propiedad `Modernizr.canvas` será `true`, de lo contrario, será `false`.

## Canvas

HTML5 define el elemento `<canvas>` como "un canvas bitmap dependiente de resolución que puede ser usado para mostrar gráficas, gráficos de juego, u otras imágenes visuales". Un _canvas_ es un rectángulo en la página en el que se puede usar JavaScript para dibujar lo que sea. HTML5 define una serie de funciones para dibujar formas, crear gradientes, y aplicar transformaciones.

Si el navegador soporta el API canvas, el objeto DOM que cree para representar la etiqueta `<canvas>` tendrá el método `getContext()`. Si el navegador no lo soporta, el objeto DOM que cree para la etiqueta solo tendrá una serie de propiedades comunes, pero nada del canvas.

     function supports_canvas(){
     	return !!document.createElement('canvas').getContext;
     }

La función comienza creando un elemento `<canvas>` de prueba que no esté relacionado con la página, de este modo nadie lo podrá ver.

     return !!document. createElement('canvas') .getContext;

Al crear el elemento `<canvas>` de prueba, se verifica la existencia del método `getContext()`, y este solo existirá si el navegador soporta el API canvas.

     return !!document.createElement('canvas'). getContext ;

Se utiliza el truco de la doble negación al retornar el valor para forzar el resultado a un valor Bool

     return !! document.createElement('canvas').getContext;

Así pues, la función detectará el soporte para la mayoría de las características del API canvas.

Todo esto se puede omitir, utilizando una función de Modernizr para detectar el soporte del API canvas.

     if(Modernizr.canvas){
     	// Mostrar algo para verificar que funcione
     } else{
     	// Hacer otra cosa si no sirve
     }

## Texto Canvas

Aunque el navegador soporte el API canvas, puede que no soporte el _API canvas text_. Esto es debido a que las funciones de texto se añadieron después de que algunos navegadores hayan sido lanzados con soporte para canvas.

Al igual que con el API canvas, detectar el soporte para el API canvas text se realiza verificando que el objeto DOM que cree para un elemento `<canvas>` incluya el método `getContext()`.

     function supports_canvas_text(){
     	if(!supports_canvas()){ return false; }
     	var dummy_canvas = document.createElement('canvas');
     	var context = dummy_canvas.getContext('2d');
     	return typeof context.fillText == 'function';
     }

Se detecta en primer lugar el soporte para el API canvas, si no existe, se retorna un falso para toda la función.

    if ( !supports_canvas() ) {return false;}

Posteriormente se crea un elemento `<canvas>`de prueba y se obtiene su _drawing context_.

     var dummy_canvas = document.createElement('canvas');
     var context = dummy_canvas.getContext('2d');

Por último, se revisa si el drawing context contiene la función `fillText()`, si la contiene, el API canvas text estará disponible.

     return typeof context.fillText == 'function';

De igual forma, todo esto se puede omitir, y utilizar Modernizr.

     if (Modernizr.canvastext) {
     	// Hacer algo para verificar que hay soporte
     } else {
     	// Hacer otra cosa
     }

## Vídeo

HTML5 introduce un nuevo elemento llamado `<video>`, que sirve para incluir vídeos en las páginas web.

Está diseñado para ser utilizable sin ningún script de detección, se pueden introducir varios archivos de vídeo y los navegadores elegirán uno basado en el formato que soporten.

Los navegadores que no soporten el vídeo de HTML5 ignorarán el elemento `<video>`, aunque se les puede programar para que reproduzcan un vídeo mediante un plugin de terceros.

Para agregar más funcionalidades a los vídeos se puede usar JavaScript, y la forma de detectar su soporte es con la segunda técnica de detección mencionada. Si el navegador lo soporta, el objeto DOM que cree para representar al elemento tendrá un método llamado `canPlayType()`, de lo contrario solo tendrá la serie de propiedades comunes.

    function supports_video(){
    	return !!document.createElement('video').canPlayType;
    }

Se puede usar Modernizr para detectar el soporte de vídeo en lugar de la función anterior.

    if (Modernizr.video){
    	// Hacer algo
    } else {
    	// Hacer otra cosa
    }

## Formatos de vídeo

Los formatos de vídeo tienen un "lenguaje", al cual se le conoce como códec, este es un algoritmo usado para codificar al vídeo en una transmisión de bits. Los navegadores no utilizan un sólo códec, y algunos suelen optar por códecs propios,u otros utilizan códecs gratuitos.

Para detectar qué formato de video se soporta, se utiliza la tercera técnica de detección mencionada. Si el navegador soporta vídeo de HTML5, el objeto DOM que cree para representar un elemento `<video>` contendrá el método `canPlayType()`, y este método verificará si el navegador soporta un cierto formato de vídeo.

En el siguiente ejemplo, la función comprobará el soporte para el formato con patente de Apple empleado por Macs y iPhones.

    function supports_h624_baseline_video(){
    	if (!supports_video()) {return false;}
    	var v = document.createElement("video");
    	return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    }

Lo primero que hace la función es verificar si el navegador soporta vídeo, si esto no se cumple, toda la función retornará el valor `false`.

    if( !supportsvideo() ) {return false;}

Si la función anterior se cumple, crea un elemento `<video>` de prueba.

    var v = document.createElement("video");

Posteriormente se llama al método `canPlayType()` , en el que se manda como valor el formato del vídeo. En este ejemplo se le está preguntando al navegador si puede reproducir un vídeo de base H264 con audio AAC LC en un container MPEG-4

    return v.canPlayType(' video/mp4; codecs="avc1.42E01E, mp4a.40.2" ');

Dado que el formato de un vídeo es una serie de varios valores y no solo una cosa, el método `canPlayType()` retornará una de las siguientes cadenas de carácteres para notificar qué tan reproducible o soportado es el formato de vídeo:

* `"probably"` si el navegador está seguro de poder reproducir el formato
* `"maybe"` si el navegador cree que tal vez pueda reproducir el formato
* `""` una cadena vacía si el navegador no puede reproducir el formato.

En el ejemplo anterior vimos una función para verificar el soporte para vídeo H264, sin embargo, la cadena que se envía al método se puede modificar para verificar otros formatos de vídeo, como un vídeo Theora, o WebM, con audio Vorbis en un container Ogg, entre varios otros.

Lo anterior se puede omitir y utilizar Modernizr para detectar soporte para distintos formatos de vídeo.

    if(Modernizr.viedo){
    	if(Modernizr.video.webm){
    	
    	} else if(Modernizr.video.ogg){
    	
    	} else if(Modernizr.video.h264){
    	
    	}
    }

## Almacenamiento local

El almacenamiento de HTML5 provee a los sitios web una forma de almacenar información y utilizarla después. Similar a las _Cookies_, solo que en lugar de ser devueltas al servidor web y ser de tamaño limitado, el almacenamiento de HTML5 se queda en la computadora del cliente y el sitio web puede acceder a sus archivos con JavaScript una vez que se haya cargado la página.

Para detectar el soporte para almacenamiento local, se utiliza la primer técnica de detección mencionada. Si el navegador soporta almacenamiento HTML5, habrá una propiedad llamada `localStorage` dentro del objeto `window` global, de lo contrario, la propiedad `localStorage` será indefinida.

    function supports_local_storage(){
    	try{
    		return 'localStorage' in window && window['localStorage'] !== null;
    	} catch(e){
    		return false;
    	}
    }

En esta ocasión encontramos una sentencia `try..catch` debido a un error en versiones antiguas de Firefox en el que la función arrojaba una excepción en caso de que las cookies estuvieran deshabilitadas.

En lugar de escribir esta función, se puede utilizar Modernizr para detectar el soporte de esta característica.

    if(Modernizr.localstorage){
    	// Almacenamiento local disponible
    } else{
    	// No disponible
    }

## Web Workers

Los _Web Workers_ proporcionan una forma para que los navegadores corran código JavaScript de fondo.

Revisar el soporte para los web workers requiere de la primer técnica de detección mencionada. Si el navegador soporta la _API Web Worker_, habrá una propiedad `Worker` en el objeto `window` global. De lo contrario, la propiedad `Worker` será indefinida.

    function supports_web_workers(){
    	return !!window.Worker;
    }

Se puede utilizar Modernizr para detectar el soporte para web workers.

    if(Modernizr.webworkers){
    	// Disponible
    } else{
    	// No disponible
    }

## Aplicaciones web offline

Las aplicaciones web offline empiezan de forma en línea la primera vez que son visitadas. El servidor web le notifica al navegador cuáles archivos son necesarios para trabajar sin conexión. Una vez quqe el cliente descarga los archivos necesarios, es posible volver a visitar el sitio web aunque no se esté conectado a Internet. Una vez que se reconecte a Internet, los cambios realizados se subirán al servidor web remoto.

Para revisar el soporte de aplicaciones sin conexión se emplea la primer técnica de detección mencionada. Si el navegador las soporta, le propiedad `applicationCache` se encontrará en el objeto `window` global. De lo contrario la propiedad será indefinida. Se comprobar su soporte con la siguiente función:

    function supports_offline(){
    	return !!window.applicationCache:
    }

Esta función puede ser omitida y se puede usar Modernizr en su lugar.

    if (Modernizr.applicationcache) {
    	// Disponible
    } else {
    	// No disponible
    }

## Geolocalización

Esta característica permite obtener tu dirección IP y la información que esta puede revelar.

Para conocer si el navegador soporta esta función se emplea la primer técnica de detección. Si el navegador soporta la API geolocation, existirá una propiedad llamada `geolocation` en el objeto `navigator` global. De lo contrario, la propiedad `geolocation` será indefinida. La función para detectar su soporte es la siguiente:

    function supports_geolocation(){
    	return !!navigator.geolocation;
    }

También se puede optar por usar Modernizr para comprobar el soporte de la API geolocation.

    if (Modernizr.geolocation){
    	// Disponible
    } else {
    	// No disponible
    }

## Tipos de entrada (Input types)

Bien es sabido que los elementos `<input type>` son utilizados para el llenado y envío de datos en los formularios, una lista más detallada de estos sería la siguiente:

* `<input type="search">`
* `<input type="number">`
* `<input type="range">`
* `<input type="color">`
* `<input type="tel">`
* `<input type="url">`
* `<input type="email">`
* `<input type="date">`
* `<input type="month">`
* `<input type="week">`
* `<input type="time">`
* `<input type="datetime">`
* `<input type="datetime-local">`

Para verificar el soporte de un tipo de entrada individual, se utiliza el cuarto método de detección. Primero se crea un elemento `<input>` de prueba.

    var i = document.createElement("input");

Luego se coloca el tipo del elemento `<input>`.

    i.setAttribute("type", "color");

Si el navegador soporta ese tipo de entrada particular, la propiedad `type` conservará el valor que se haya colocado, de lo contrario, lo ignorará y la propiedad `type` será igual a `"text"`.

    return i.type !== "text";

Modernizr puede detectar soporte para los 13 distintos tipos de entrada con un objeto llamado `Modernizr.inputtypes` el  cual contiene los 13 valores Bool que se pueden identificar individualmente.

    if (!Modernizr.inputtypes.date){
    	// No está disponible el elemento <input type="date">
    }

## Texto placeholder

Comprobar soporte para el texto que se muestra en las cajas de texto vacías se hace con la segunda técnica de detección. Si el navegador soporta texto placeholder en los input fields, el objeto DOM que cree para representar un elemento `<input>` tendrá la propiedad `placeholder`, de lo contrario no la tendrá.

    function supports_input_placeholder() {
    	var i = document.createElement('input');
    	return 'placeholder' in i;
    }

En lugar de escribir esta función, se puede usar Modernizr para detectar el soporte del texto placeholder.

    if (Modernizr.input.placeholder){
    	// Placeholder disponible
    } else {
    	//Placeholder no disponible
    }

## Autofocus en formularios

Es posible hacer que un `<input>` en un formulario sea el enfocado automáticamente sin tener que posicionar el cursor en su lugar.

La siguiente función coloca el enfoque al elemento:

    function supports_input_autofocus(){
 		var i = document.createElement('input');
 		return 'autofocus' in i;   
    }

La función de Modernizr es la siguiente:

    if (Modernizr.input.autofocus) {
     // autofocus funciona
    } else {
      // no existe soporte
    }

## Micro Data

Sirve para documentar algunas cosas hacia el sitio web, como señalamientos o comentarios del autor.

Cuentan con el objeto DOM `getText()`, en caso de que el navegador no lo soporte, será indefinido.

    function supports_microdata_api(){
    	return !!document.getItems;
    }

Modernizr no soporta la revisión del soporte para el API microdata.

## API del historial

El _API del historial HTML5_ es un método para manipular el historial del navegadr con scripts.

Habrá una función `pushState()` en el objeto global `history` si el navegador soporta esta característica, de lo contrario la función será indefinida.

    function supports_history_api(){
    	return !!(window.history && history.pushState);
    }

En lugar de escribir esta función se puede emplear Modernizr.

    if (Modernizr.history){
    	// Soportado
    } else{
    	// No soportado
    }