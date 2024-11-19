# Cap 09 - Formulario loco

## Adentrándose

HTML5 define nuevos tipos de entrada (_input types_) que podemos utilizar en los formularios.

## Texto placeholder

### Soporte para Placeholder

* Internet Explorer: N/A
* Firefox: 3.7+
* Safari: 4.0+
* Chrome: 4.0+
* Opera: 11.0+
* iPhone: 4.0+
* Android: N/A

El texto placeholder se muestra dentro del campo de entrada siempre y cuando el campo este vacío y no se le está haciendo foco.

Para incluir texto placeholder en los formularios web podemos poner lo siguiente:

```html
<form>
	<input name="q" placeholder="Search Bookmarks and History">
	<input type="submit" value="Search">
</form>
```

Los navegadore que no soporten el atributo `placeholder` lo ignorarán.

## Campos autofocus

### Soporte para Autofocus

* Internet Explorer: N/A
* Firefox: 4.0+
* Safari: 4.0+
* Chrome: 3.0+
* Opera: 10.0+
* iPhone: N/A
* Android: N/A

Los sitios web pueden usar JavaScript para enfocar al primer campo de entrada de un formulario de forma automáticamente.

Aunque también podemos usar el atributo `autofocus` introducido por HTML5. El cual podemos usar de la siguiente forma:

```html
<form>
	<input name="q" autofocus>
	<input type="submit" value="Search">
</form>
```

Los navegadores que no soporten el atributo lo ignorarán, pero si queremos que esto funcione en todos los navegadores, podemos hacer lo siguiente.

```html
<form name="f">
  <input id="q" autofocus>
  <script>
    if (!("autofocus" in document.createElement("input"))) {
      document.getElementById("q").focus();
    }
  </script>
  <input type="submit" value="Go">
</form>
```

### Poniendo el Foco lo más antes posibles.

Varias páginas web esperarán hasta que el evento `window.onload` se ejecute para ajustar el foco. Pero este evento no se ejecuta hasta que todas las imágenes terminen de cargar.

En el ejemplo anterior se coloca el script de auto-foco justo después del campo del formulario al que se referencía. Si no deseamos colocar scripts en medio de la página, debemos ajustar el foco en otro evento como `$(document).ready()` de jQuery.

```html
<head>
<script src=jquery.min.js></script>
<script>
	$(document).ready(function() {
		if(!("autofocus" in document.createElement("input"))){
			$("#q").focus();
		}
	});
</script>
</head>
<body>
<form name="f">
	<input 
		id="q"
		autofocus
	>
	<input
		type="submit"
		value="Go"
	>
</form>
```

El evento se ejecuta después de que el DOM haya sido cargado, y no espera hasta que las imágenes estén listas.

## Direcciones de correo

Un tipo de entrada introducido por HTML5 es el que está dedicado para direcciones de correo, el tipo de entrada luce así:

```html
<form>
	<input type="email">
	<input
		type="submit"
		value="Go"
		>
</form>
```

No es necesario implementar ningún script para navegadores que no soporten esta característica, pues aquellos que no lo hagan simplemente tratarán al tipo de entrada como un `<input type="text">`.

En navegadores de escritorio no será visiblemente diferente un tipo de entrada de texto común a uno para direcciones de correo. Sin embargo, en celulares esto puede ser útil, pues hará que el teclado táctil del usuario contenga los carácteres comunes de correo (como el "@" o el ".com") de manera más accesible.

## Direcciones web

Al igual que con el tipo de entrada anterior, en los navegadores de escritorio no habrá una clara diferencia frente a un tipo de entrada de texto común, y no hay que implementar ninguna alternativa para los navegadores que no soporten esta característica.

Al implementar `<input type="url">` los teclados táctiles para los usuarios de celular tendrán de forma más accesible los carácteres comunes para escribir direcciones de páginas web (como el ".", "/" o ".com").

## Números en Spinboxes

Si deseamos pedir un número 