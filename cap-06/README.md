# Cap 06 - Estás aquí (Y todos los demás también)

## Adentrándose

La Geolocalización es una función que sirve para determinar en qué parte del mundo se encuentra un dispositivo, recabando información como la dirección IP, la conexión de red inalámbrica, la información del hardware de su GPS, etc.

## El Api Geolocation

El _Api geolocation_ permite compartir la información de localización con sitios web de confianza. Puede enviar la latitud y longitud para que los datos sean usados por scripts.

### Soporte para el API Geolocation

* Internet Explorer: 9.0+
* Firefox: 3.5+
* Safari: 5.0+
* Chrome: 5.0+
* Opera: 10.6+
* iPhone: 3.0+
* Android: 2.0+

## El código

El API emplea uso de la propiedad `navigator.geolocation`, encontrada en el objeto global `navigator`.

Una función del API geolocation es la siguiente:

```js
function get_location(){
	navigator.geolocation.getCurrentPosition(show_map);
}
```

Para detectar el soporte para el API podemos usar Modernizr:

```js
function get_location(){
	if(Modernizr.geolocation){
		navigator.geolocation.getCurentPosition(show_map);
	} else{
		// no hay soporte para el API
	}
}
```

En caso de no contar con soporte nativo para el API, se puede optar por _Gears_ (mostrado más adelante).

Al llamar al método `getCurrentPosition()` se mostrará una ventana emergente en el navegador, que pide al usuario si desea compartir su ubicación al sitio web. La ventana emergente solo se mostrará en la pestaña específica, y es incondicional, pues el sitio web no puede saltarse este paso.

El argumento que pasamos al método `getCurrentPosition` es una función que llamamos `show_map`, que podremos utilizar para obtener los datos de la posición del usuario.

```js
function show_map(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
}
```

Esta función contiene un parámetro, que consiste en un objeto con 2 propiedades: `coords` y `timestamp`. Este último se refiere a la fecha y hora de cuando se calculó la localización. La propiedad `coords` es un objeto también, con las propiedades que vimos en el código anterior `latitude` y `longitude`.

<table>
<tr>
	<td>Propiedad</td>
	<td>Tipo de dato</td>
	<td>Notas</td>
</tr>
<tr>
	<td>coords.latitude</td>
	<td>double</td>
	<td></td>
</tr>
<tr>
	<td>coords.longitude</td>
	<td>double</td>
	<td></td>
</tr>
<tr>
	<td>coords.altitude</td>
	<td>double/null</td>
	<td>metros sobre la elipse de referencia</td>
</tr>
<tr>
	<td>coords.accuracy</td>
	<td>double/null</td>
	<td>metros</td>
</tr>
<tr>
	<td>coords.altitude.Accuracy</td>
	<td>double/null</td>
	<td>metros</td>
</tr>
<tr>
	<td>coords.heading</td>
	<td>double/null</td>
	<td>grados en sentidos de las manecillas del reloj desde el norte</td>
</tr>
<tr>
	<td>coords.speed</td>
	<td>double/null</td>
	<td>metros/segundo</td>
</tr>
<tr>
	<td>timestamp</td>
	<td>DOMTimeStamp</td>
	<td>similar a un objeto Date()</td>
</tr>
</table>

`coords.latitude` `coords.longitude`, y  `coords.accuracy` son las propiedades que siempre retornarán un valor, el resto puede devolver un `null`.

## Manejo de errores

La geolocalización puede ser problemática, es por esto que el método `getCurrentPosition()` tiene un segundo argumento que es una función empleada para el manejo de errores. (`handle_error`).

```js
navigator.geolocation.getCurrentPosition(show_map, handle_error)
```

En caso de que se presenten errores, el objeto `PositionError` contendrá la propiedad `code`, que será el valor de uno de las siguientes posibilidades:

* `PERMISSION_DENIED (1)`: Si el usuario no permite al sitio acceder a su ubicación
* `PERMISSION_UNAVAILABLE (2)`: Si la conexión o los satélites de posicionamiento fallan.
* `TIMEOUT (3)` si la red funciona pero se toma demasiado tiempo para calcular la posición del usaurio.

```js
function handle_error(err){
	if(err.code == 1){
		//Usuario negó el acceso
	}
}
```

## Elecciones

La función `getCurrentPosition` tiene un tercer argumento opcional, el objeto `PositionOptions`. Hay tres propiedades que se pueden ajustar en este objeto, y las 3 son opcionales.

#### Objeto `PositionOptions`

<table>
	<tr>
		<td>Propiedad</td>
		<td>Tipo de dato</td>
		<td>Valor por defecto</td>
		<td>Notas</td>
	</tr>
	<tr>
		<td>enableHighAccuracy</td>
		<td>Boolean</td>
		<td>false</td>
		<td>Activado puede ser más lento</td>
	</tr>
	<tr>
		<td>timeotu</td>
		<td>logn</td>
		<td>(no default)</td>
		<td>milisegundos</td>
	</tr>
	<tr>
		<td>maximumAge</td>
		<td>long</td>
		<td>0</td>
		<td>milisegundos</td>
	</tr>
</table>

La propiedad `enableHighAccuracy` nos puede servir si necesitamos la posición exacta del usuario, la propiedad `timeout` es el tiempo en milisegundos que se puede configurar para que la aplicación web espere a la posición, y la propiedad `maximumAge` permite recibir la información de los últimos milisegundos especificados, información la cual se encuentra almacenada en caché.

## Internet Explorer

Anterior a la versión 9 de Internet Explorer, el navegador no soportaba el API geolocation del W3C, por lo que podemos usar el plugin `Gears`.

## geo.js

`geo.js` es una librería JavaScript de código abierto. Para usarlo necesitaremos colocar 2 elementos `<script>` en la página.

El primer script inicializa Gears si está instalado.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Html</title>
	</head>
	<body>
		...
		<footer>
			<script src="gears_init.js"></script>
			<script src="geo.js"></script>
		</footer>
	</body>
</html>
```

Lo que podemos hacer ahora es usar cualquier API geolocation que esté instalado.

Lo primero que haremos será llamar a la función `init()`, que retornará `true` si un API está disponible.

```js
if(geo_position_js.init()){ ... }
```

Una vez se haya verificado que es posible determinar la ubicación del usuario, usaremos la función `getCurrentPosition()`.

```js
geo_position_js.getCurrentPosition(geo_success, geo_error);
```

La función toma otras 2 funciones como arbumentos, llamará a una de las 2 (`geo_success` o `geo_error`) dependiendo de si el resultado fue exitoso o no.

La función llamada en un intento exitoso toma un argumento con la información de la posición.

```js
function geo_success(p){
	alert("Encontrado en " + p.coords.latitude +
		", " + p.coords.longitude);
}
```

En caso de que no haya sido posible obtener la localización, se llamará a la funcion pasada como el segundo argumento (`geo_error`);

```js
function geo_error(){
	alert("no se pudo obtener la localizacion");
}
```

## Ejemplo

Primero haremos que al cargarse, la página llame a la función `geo_position_js.init()` para determinar si un API de geolocation existe.

Luego agregaremos un link que llame a la función `lookup_location()`:

```js
function lookup_location(){
	geo_position_js.getCurrentPosition(show_map, show_map_error);
}
```
Posteriormente se llama a la función `show_map()`, que tiene el argumento `loc`, este objeto contiene la propiedad `coords`, la cual tiene la información de latitud, longitud y precisión.

```js
function show_map(loc){
	$("#geo-wrapper").css({'width':'320px','height':'350px'});
	var map = new GMap2(document.getElementById("geo-wrapper"));
  	var center = new GLatLng(loc.coords.latitude, loc.coords.longitude);
  	map.setCenter(center, 14);
  	map.addControl(new GSmallMapControl());
  	map.addControl(new GMapTypeControl());
  	map.addOverlay(new GMarker(center, {draggable: false, title: "You are here (more or less)"}));
}
```
En caso de que no se pueda determinar la localización del usuario, se llama a la segunda función, `show_map_error()`

```js
function show_map_error(){
	$("#live-geolocation").html('No se pudo determinar la localización');
}
```
