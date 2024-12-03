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
	<input 
		name="q" 
		placeholder="Search Bookmarks and History"
	>
	<input 
		type="submit" 
		value="Search"
	>
</form>
```

Los navegadores que no soporten el atributo `placeholder` lo ignorarán.

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
	<input 
		name="q" 
		autofocus
	>
	<input 
		type="submit" 
		value="Search"
	>
</form>
```

Los navegadores que no soporten el atributo lo ignorarán, pero si queremos que esto funcione en todos los navegadores, podemos hacer lo siguiente.

```html
<form name="f">
  <input 
  	id="q" 
  	autofocus
  >
  <script>
    if (!("autofocus" in document.createElement("input"))) {
      document.getElementById("q").focus();
    }
  </script>
  <input 
  	type="submit" 
  	value="Go"
  >
</form>
```

### Poniendo el Foco lo más antes posible.

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
</body>
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

Si deseamos pedir un número al usuario, lo más común es hacerlo dentro de un rango de números.

```html
<input
	type="number"
	min="0"
	max="10"
	step="2"
	value="6"
>
```

* `type="number"` especifica el tipo de entrada.
* `min="0"` designa el mínimo valor aceptable.
* `max="10"`es el máximo valor aceptable.
* `step"2"` define una sucesión aceptable de números, en este caso `0, 2, 4, 6..`
* `value="6"` es el valor por defecto.

Lo que se nos mostrará en navegadores de escritorio será un spinbox, que tiene botones con flechas a los que podemos dar click para cambiar los valores.


También podemos utilizar métodos de JavaScript para estos tipos de entrada.

* `input.stepUp(n)`, que incrementa el valor del campo.
* `input.stepDown(n)`, decrementa el valor del campo.
* `inpupt.valueAsNumber`, que retorna el valor actual como un número flotante.

Los navegadores que no soporten este tipo de entrada lo tratarán como un `<input type="text">`. Podemos revisar el soporte para esta característica en Modernizr.

```js
if (!Modernizr.inputtypes.number){
	// No hay soporte para los campos con type=number
}
```

## Números con Sliders

También podemos darle la opción al usuario de ajustar valores con un Slider. Podemos implementar este tipo de entrada de la siguiente forma:

```html
<input 
	type="range"
	min="0"
	max="10"
	step="2"
	value="6"
>
```

Los atributos del ejemplo funcionan de la misma manera que con el `<input type="number">`.

## Selectores de fecha

Existen varios tipos de selectores de fecha en HTML5, los cuales son:

* `type="date"`: Permite seleccionar una fecha específica.
* `type="datetime"`: Seleccionar una fecha específica junto a una hora.
* `type="month"`: Sirve para seleccionar únicamente un año y un mes.
* `type="week"`: Seleccionar únicamente un año y una semana.
* `type="time"`: Introducir una hora.

## Barras de búsqueda

Si queremos colocar barras de búsqueda podemos usar lo siguiente:

```html
<form>
	<input
		name="q"
		type="search"
	>
	<input 
		type="submit"
		value="Find"
	>
</form>
```

Lo que el `<input type="search">` permite depende del navegador; por lo general se implementa un pequeño botón junto a una "x" para limpiar lo que se esté escribiendo.

## Selectores de color

Para agregar un selector de color usaremos el marcado `<input type="color">`. Lo que esto hará será desplegar el selector de color nativo del sistema. El valor que retornará este tipo de entrada será un valor hexadecimal RGB.

## Validación de Formulario

### Soporte para Validación de Formulario

* Internet Explorer: N/A
* Firefox: 4.0+
* Safari: 5.0+
* Chrome: 10.0+
* Opera: 9.0+
* iPhone: N/A
* Android: N/A

En HTML5 se encuentra habilitada por defecto la opción de validar automáticamente un valor ingresado por el usuario. Específicamente para los tipos de entrada `email`, `url` y `number`.

En caso de que un valor ingresado por el usuario no sea válido, el navegador no le permitirá subir el formulario.

Para deshabilitar la validación automática, lo que haremos será utilizar el atributo `novalidate`.

```html
<form novalidate>
	<input 
		type="email" 
		id="addr"
	>
	<input 
		type="submit 
		value="Subscribe"
	>
</form>
```

## Campos requeridos

### Soporte para `<input required>`

* Internet Explorer: N/A
* Firefox: 4.0+
* Safari: N/A
* Chrome: 10.0+
* Opera: 9.0+
* iPhone: N/A
* Android: N/A

Podemos hacer que algunos campos del formulario deban tener obligatoriamente algún valor antes de enviar el formulario.

El marcado es el siguiente:

```html
<form>
	<input 
		id="q" 
		required
	>
	<input 
		type="submit" 
		value="Search"
	>
</form>
```

Los navegadores usualmente lo que harán será avisar al usuario que un campo es obligatorio en caso de que no se haya llenado.
