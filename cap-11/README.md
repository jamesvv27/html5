# Cap 11 - Manipulación del historial

## Adentrándose

El API del historial de HTML5 es una forma estandarizada para manipular el historial del navegador mediante scripts. Algunas partes de este API han estado disponibles en versiones anteriores de HTML, y las nuevas partes incluyen un modo de añadir entradas al historial del navegador, cambiar el URL en la barra de navegación sin recargar la página, y un evento que se ejecute cuando el usuario presione el botón de regreso.

## El porqué

El API del historial está diseñado para asegurarse de que los URLs continúen siendo de utilidad en aplicaciones web cargadas de scripts.

En este caso, puede que deseemos que los recursos únicos tengan sus propios URLs, pero los navegadores tienen la limitante de que al cambiar el URL, incluso mediante scripts, se haga un recargado completo de la página. Nosotros queremos lo contrario, pues puede que la nueva página tenga contenidos muy similares a la anterior, y al final solo estaríamos solicitando al usuario volver a descargar los mismos recursos.

Afortunadamente, el API del historial de HTML5 nos da la solución. En lugar de recargar una página completa, podemos usar scripts para descargar solo la mitad. Esto puede ser algo complicado de lograr.

Supongamos que tenemos 2 páginas (A y B), estas son en un 90% idénticas, y la diferencia se encuentra en el 10% restante. El usuario se encuentra en la página A e intenta navegar a la página B. En vez de recargar por completo la página, lo que haremos será interrumpir esto para hacer lo siguiente:

1. Cargar ese 10% de contenido restante de la página B que es distinto al de la página A. Para esto habrá que escribir código de modo que retorne solo el contenido distinto.
2. Intercambiar el contenido distinto utilizando `innerHTML` u otros métodos DOM.
3. Actualizar la barra de dirección con el URL de la página B.

Si todo salió correctamente, el navegador tendrá un DOM idéntico al de la página B, y la barra de dirección también tendrá una URL idéntica a la de la página B. Solo que no se habrá navegado realmente a la página B, pues no hubo un recargado completo de la página.

## El cómo

### Soporte para `history.pushState`

* Internet Explorer: N/A
* Firefox: 4.0+
* Safari: 5.0+
* Chrome: 8.0+
* Opera: 11.50+
* iPhone: 4.2.1+
* Android: N/A

En navegadores que no soportan esta característica, solamente se hará un recargado completo de la página.

Usaremos una página de ejemplo para ver cómo funciona. [Esta página](https://diveinto.html5doctor.com/examples/history/fer.html) consiste en una galería de fotos, en la que al presionar los enlaces de "Siguiente" y "Anterior" actualizarán la foto y la URL en la barra de dirección. Esto sin recargar por completo la página.

```html
<aside id="gallery">
	<p class="photonav">
		<a
			id="photonext" 
			href="casey.html"
		>
			Next &gt;
		</a>
		<a
			id="photoprev" 
			href="adagio.html"
		>
			&lt; Previous
		</a>
	</p>
	<figure id="photo">
		<img
			alt="Fer"
			height="375"
			id="photoimg" 
			src="gallery/1972-fer-500.jpg"
			width="500"
		>
		<figcaption>
			Fer, 1972
		</figcaption>
	</figure>
</aside>
```

Es importante que los enlaces en los elementos `<a>` funcionen correctamente.

La función principal obtiene cada uno de los enlaces y los pasa a otra función, `addClicker()`.

```js
function setupHistoryClicks() {
	addClicker(document.getElementById("photonext"));
	addClicker(document.getElementById("photoprev"));
}
```

La función `addClicker()` toma un elemento `<a>` y lo añade al handler `click`.

```js
function addClicker(link) {
	link.addEventListener("click", function(e){
		swapPhoto(link.href);
		history.pushState(null, null, link.href);
		e.preventDefault();
	}, false);
}
```

La función `swapPhoto()` realiza los primeros 2 pasos del método visto anteriormente. La primer parte de la función toma parte de la URL, y construye una URL a una página oculta que contiene únicamente el marcado requerido para mostrar la siguiente foto.

```js
function swapPhoto(href) {
	var req = new XMLHttpRequest();
	req.open("GET",
		"http://diveintohtml5.org/examples/history/gallery/" +
		href.split("/").pop(),
		false);
	req.send(null);
	
	//...
}
```

La segunda mitad de la función `swapPhoto()` realiza el segundo paso del método, que consiste en insertar el nuevo marcado a la página actual.

```js
if (req.status == 200) {
	document.getElementById("gallery").innerHTML = req.responseText;
	setupHistoryClicks();
	return true;
}
return false;
```

Regresando a la función `addClicker()`, después de intercambiar la foto, hay un paso más en el método: cambiar el URL en la barra de dirección sin recargar la página.

```js
history.pushState(null, null, link.href);
```

La función toma 3 parámetros:

1. `state`, que puede ser cualquier estructura de datos JSON, pero lo podemos dejar en `null`.
2. `title`, puede ser un string cualquiera, aunque ya no se suele utilizar en navegadores. Para ajustar el título de la página es necesario almacenarlo en el argumento `state` y ajustarlo manualmente en el callback `popstate`
3. `url`. Este es el URL que deseamos que aparezca en la barra de dirección.

Al llamar a la función `history.pushState()` la URL de la barra de dirección se cambiará automáticamente.

Ahora bien, cuando el usuario desee presionar el botón de regreso, también debemos tener un evento para manejar esto, en este caso, el evento `popstate`.

```js
window.addEventListener("popstate", function(e) {
	swapPhoto(location.pathname);
}
```

Después de utilizar la función `history.pushState()` para mostrar una URL falsa a la pila del historial de navegador, una vez que el usuario presione el botón de regresar, el navegador ejecutará un evento `popstate` en el objeto `window`. De este modo, traeremos todo de vuelta.
