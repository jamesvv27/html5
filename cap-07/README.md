# Cap 07 - El pasado, presente y el futuro del almacenamiento local para aplicaciones web

## Adentrándose

El almacenamiento local persistente no había sido una cosa en aplicaciones web. Las _Cookies_ fueron inventadas en un momento temprano de la historia de la web. Pueden ser usadas como almacenamiento local para pequeñas cantidades de datos, pero tienen sus desventajas:

* Las Cookies vienen incluidas en todas las peticiones HTTP, realentizando al navegador haciendo transmisiones de datos repetitivas.
* Asímismo, envían tdatos sin cifrar hacia internet.
* Las Cookies se limitan a 4kb de datos.

Mientras que lo que buscamos es:

* Bastante espacio de almacenamiento
* en el cliente
* que continúe almacenado después de recargar la página
* y que no se transmite al servidor.

## Algo de historia sobre hacks de almacenamiento local antes de HTML5

Al inicio cuando Internet Explorer persistía, Microsoft agregó a su navegador una característica conocida como _DHTML Behaviors_, uno de estos "behaviors" se llamaba _userData_.

`userData` permite a las páginas web almacenar hasta 64kb de datos por dominio, en una estructura jerárquica basada en XML.

En 2002, Adobe introdujo una característica en Flash 6 conocida como _Local Shared Objects_. (Objetos locales compartidos).Lo que hacía era permitir a Flash almacenar hasta 100kb de datos por dominio.

En 2007, Google lanzó _Gears_, un plugin de navegador de código abierto, que, además de la funcionalidad que ofrece vista en el capítulo anterior, también provee de un API a una base de datos SQL implementada.

## Introduciendo el almacenamiento de HTML5

El almacenamiento de HTML es una forma para las páginas web de almacenar valores/llaves localmente dentro del navegador del cliente. Al igual que las cookies, estos datos se mantienen incluso después de salir del sitio web o cerrar el navegador. Estos datos no se mandan a un servidor web remoto, y esta función se implementa de forma nativa en los navegadores.

### Soporte para el almacenamiento de HTML5

* Internet Explorer: 8.0+
* Firefox: 3.5+
* Safari: 4.0+
* Chrome: 4.0+
* Opera: 10.5+
* iPhone: 2.0+
* Android: 2.0+

A través de JavaScript, accederemos al almacenamiento de HTML5 con el objeto `localStorage` en el `window`. Pero antes, averiguaremos si el navegador lo soporta.

```js
function supports_html5_storage(){
	try{
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e){
		return false;
	}
}
```

También podemos usar Modernizr:

```js
if(Modernizr.localstorage){
	//Funcion disponible
} else{
	//Funcion no disponible
}
```

## Usando el almacenamiento de HTML5

El almacenamiento de HTML5 se basa en pares nombrados llave/valor. Se almacenan datos basados en una llave nombrada, y después se recaban esos datos con esa misma llave. La llave nombrada es una cadena de carácteres. Los datos pueden ser de cualquier tipo soportados en JavaScript. Aunque los datos están realmente almacenados como cadenas, por lo que usaremos funciones como `parseInt()` o `parseFloat()` para pasarlos al tipo de dato deseado.

```js
interface Storage{
	getter any getItem(in DOMString key);
	setter creator void setItem(in DOMString key, in any data);
}
```

Si llamamos a la función `setItem()` con una llave nombrada que ya exista, esta se sobreescribirá. Y si llamamos a la función `getItem()` con una llave inexistente, se nos retornará `null`.

Al igual que con otros objetos de JavaScript, podemos usar los corchetes para sus métodos set y get.

```js
//get
var foo = localStorage["bar"];
//set
localStorage["bar"] = foo;
```

También existen métodos para remover un valor dada una llave.

```js
interface Storage{
	deleter void removeItem(in DOMString key);
	void clear();
};
```

Existe una propiedad para obtener el número total de valores en el almacenamiento.

```js
interface Storage{
	readonly attribute unsigned long length;
	getter DOMString key(in unsigned long index);
}
```

### Cambios en el área de almacenamiento de HTML5

El evento `storage` se llama en el objeto `window` cuando alguna de las funciones `setItem()`, `remoteItem()` o `clear()` se llama y cambian algún valor.

Para enganchar el evento `storage` necesitaremos revisar que mecanismo de eventos es soportado por en navegador.

```js
if(window.addEventListener){
	window.addEventListener("storage", handle_storage, false);
} else{
	window.attachEvent("onstorage", handle_storage);
}
```
La función `handle_storage` se llamará con un objeto `StorageEvent`. En Internet Explorer esto es diferente, pues el objeto de evento se encuentra en `window.event`.

```js
function handle_storage(e){
	if (!e) { e = window.event; }
}
```

La variable `e` ahora será un objeto `StorageEvent`.

#### Objeto `StorageEvent`

<table>
	<tr>
		<td>Propiedad</td>
		<td>Tipo</td>
		<td>Descripción</td>
	</tr>
	<tr>
		<td>key</td>
		<td>string</td>
		<td>la llave nombrada que tuvo cambios</td>
	</tr>
	<tr>
		<td>oldValue</td>
		<td>cualquier</td>
		<td>el valor anterior (null si un nuevo valor fue agregado)</td>
	</tr>
	<tr>
		<td>newValue</td>
		<td>cualquier</td>
		<td>el valor nuevo (null si el valor fue eliminado)</td>
	</tr>
	<tr>
		<td>url</td>
		<td>string</td>
		<td>la página que llamó al método</td>
	</tr>
</table>

## Almacenamiento de HTML5 en acción

Usaremos el almacenamieto de HTML5 con un juego conocido como Halma. Lo que haremos es que el usuario no pierda su progreso al recargar la página o cerrar el navegador.

```js
function saveGameState() {
    if (!supportsLocalStorage()) { return false; }
    localStorage["halma.game.in.progress"] = gGameInProgress;
    for (var i = 0; i < kNumPieces; i++) {
	localStorage["halma.piece." + i + ".row"] = gPieces[i].row;
	localStorage["halma.piece." + i + ".column"] = gPieces[i].column;
    }
    localStorage["halma.selectedpiece"] = gSelectedPieceIndex;
    localStorage["halma.selectedpiecehasmoved"] = gSelectedPieceHasMoved;
    localStorage["halma.movecount"] = gMoveCount;
    return true;
}
```

Al cargar la página, en vez de hacer un `newGame()`, ahora se llamará a la función `resumeGame()`, que revisa si el progreso de alguna partida está almacenado localmente. Si esto se cumple, se restauran los valores.

```js
function resumeGame() {
    if (!supportsLocalStorage()) { return false; }
    gGameInProgress = (localStorage["halma.game.in.progress"] == "true");
    if (!gGameInProgress) { return false; }
    gPieces = new Array(kNumPieces);
    for (var i = 0; i < kNumPieces; i++) {
	var row = parseInt(localStorage["halma.piece." + i + ".row"]);
	var column = parseInt(localStorage["halma.piece." + i + ".column"]);
	gPieces[i] = new Cell(row, column);
    }
    gNumPieces = kNumPieces;
    gSelectedPieceIndex = parseInt(localStorage["halma.selectedpiece"]);
    gSelectedPieceHasMoved = localStorage["halma.selectedpiecehasmoved"] == "true";
    gMoveCount = parseInt(localStorage["halma.movecount"]);
    drawBoard();
    return true;
}
```

Los datos se almacenan como cadenas, por lo que si queremos emplear un valor de tipo Boolean tendremos que construirlo nosotros mismos, de igual forma lo tendremos que hacer con los valores int.

```js
localStorage["halma.game.in.progress"] = gGameInProgress;
```

```js
gGameInProgress = (localStorage["halma.gane.in.progress"] == "true");
```

Con valores integer:

```js
localStorage["halma.movecount"] = gMoveCount;
```

```js
gMoveCount = parseInt(localStorage["halma.movecount"]);
```

## Más alla de pares de valores de llave

En 2007, Google lanzó Gears, un plugin multi-navegador de código abierto que inlcuía una base de datos implementada en SQLite. Esta versión temprana influenció en la creación de la _Web SQL Database_ (Base de datos Web SQL). Podemos utilizar varias funciones JavaScript con esta implementación.

```js
openDatabase('documents', '1.0', 'Local document storage', 5*1024*1024, function (db) {
  db.changeVersion('', '1.0', function (t) {
    t.executeSql('CREATE TABLE docids (id, name)');
  }, error);
});
```

La especificación Web SQL Database se ha implementado en 4 navegadores y plataformas distintas.

### Soporte para Web SQL Database

* Internet Explorer: N/A
* Firefox: N/A
* Safari: 4.0+
* Chrome: 4.0+
* Opera: 10.5+
* iPhone: 3.0+
* Android: 2.0+

Otra buena opción es utilizar _Indexed Database API_, mejor conocido como "IndexedDB".

Esta API nos proporciona con un _object store_, que comparte varios conceptos con una base de datos SQL, como campos o tablas. La principal diferencia es que el object store no tiene un lenguaje SQL, y debemos usar métodos proporcionados por el object store para, por ejemplo, seleccionar varios elementos de una tabla.