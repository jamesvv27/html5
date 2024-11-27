# CAP 10 - Extensibilidad

## Adentrándose

Debido a que no existe un estándar para absolutamente todo en HTML5 y que existen muchas ideas sin implementar, muchos optan por usar _microformatos_ y _RDFa_.

Una tercera opción para extender páginas con elementos que no son parte de HTML son los microdatos.

## Qué son los microdatos

Los microdatos anotan el DOM con valores pares de vocabularios personalizados.

Veamos a la serie de los elementos HTML5 como un vocabulario. Este vocabulario incluye elementos que representan una sección o un artículo, pero no incluye los elementos para representar una persona o un evento. Si deseamos representar una persona en una página web será necesario definir otro vocabulario. Los microdatos nos permiten hacer esto, definir un vocabulario y empezar a implementar propiedades personalizadas en una página web.

Los microdatos funcionan con pares de valor/nombre. Cada vocabulario de microdatos define una serie de propiedades nombradas. 

Además de contar con propiedades nombrdas, los microdatos dependen del "_scoping_" (o alcance). Lo cual lo podemos ver como las jerarquías padre-hijo de los elementos en el DOM (como el elemento `<html>` que por lo general tiene 2 elementos hijos, el `<head>` y el `<body>`). Los microdatos reutilizan la estructura jerárquica del DOM para permitir el uso de más de un vocabulario de microdatos en la misma página.

Algo a tener en cuenta de los microdatos es que son utilizados para agregar semánticas a datos que ya se encuentran visibles en la página web, no para ser un formato de datos único, pues es un complemento a HTML. Los microdatos sirven bastante bien para modificar semánticas de datos que ya se encuentran en el DOM, si estos datos no se encuentran en el DOM, muy posiblemente no sea una buena opción usar microdatos.

## El modelo de datos de los microdatos

Para definir un vocabulario de microdatos necesitaremos un namespace (una URL), que puede apuntar a una página web funcional.

Supongamos que deseamos crear un vocabulario de microdatos que describa a una persona. Si somos propietarios del dominio `data-vocabulary.org` usaremos la URL `http://data-vocabulary.org/Person` como namespace para el vocabulario de microdatos.

Lo siguiente que haremos será definir algunas propiedades nombradas.

* `name` - nombre
* `photo` - una imagen con una foto
* `url` - un enlace a un sitio asociado a la persona

Las propiedades de este vocabulario consisten en texto, un marcado de imagen y una URL. Supongamos que representado en el marcado, el nombre es un encabezado, la foto es un elemento `<img>` y la URL asociada es un `<a>`, y que estos elementos se encuentran dentro de un elemento `<section>`.

```html
<section>
	<h1>Juan</h1>
	<p><img src="http://www.example.com/photo.jpg" alt="Ale"></p>
	<p><a href="http://diveintomark.org/">Sitio</a></p>
</section>
```

El modelo de datos de los microdatos son pares de valor/nombre. El nombre de una propiedad siempre se declara en un elemento HTML, y el valor correspondiente de la propiedad se toma del DOM del elemento. Para la mayoría de los elementos HTML, el valor de la propiedad es el contenido de texto del elemento, aunque hay unas contadas excepciones.

<table>
	<tr>
		<td>Elemento</td>
		<td>Valor</td>
	</tr>
	<tr>
		<td>&lt;meta&gt;</td>
		<td>atributo `content`</td>
	</tr>
	<tr>
		<td>&lt;audio&gt;</td>
		<td>atributo `src`</td>
	</tr>
	<tr>
		<td>&lt;embed&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;iframe&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;img&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;source&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;video&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;a&gt;</td>
		<td>atributo `href`</td>
	</tr>
	<tr>
		<td>&lt;area&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;link&gt;</td>
		<td>-</td>
	</tr>
	<tr>
		<td>&lt;object&gt;</td>
		<td>atributo `data`</td>
	</tr>
	<tr>
		<td>&lt;time&gt;</td>
		<td>atributo `datetime`</td>
	</tr>
	<tr>
		<td>Todos los demás elementos</td>
		<td>contenido de texto</td>
	</tr>
</table>

Añadir microdatos a una página consiste en añadir algunos atributos a los elementos HTML ya existentes. Lo primero que hay que hacer es declarar el vocabulario de microdatos que se van a utilizar añadiendo el atributo `itemtype`. Después es necesario declarar el scope del vocabulario uitlizando el atributo `itemscope`. En el ejemplo anterior los datos que deseamos hacer semánticos se encuentran dentro de un elemento `<section>`, por lo que declararemos los atributos mencionados ahí.

```html
<section 
	itemscope 
	itemtype="http://data-vocabulary.org/Person"
>
```

El primer dato encontrado es el encabezado con el nombre, un elemento `<h1>`. El valor de la propiedad con este elemento es simplemente el contenido del texto. Lo que debemos hacer ahora es definir la propiedad en sí con el atributo `itemprop`.

```html
<h1 itemprop="name">
	Juan
</h1>
```

En este caso, esta es la propiedad `name`. Esta propiedad pertenece al vocabulario que proporcionamos (`http://data-vocabulary.org/Person`), y el valor de la propiedad es `Juan`.

Ahora, la propiedad `photo` es un URL, y el valor de un elemento `<img>` es su atributo `src`, lo 	que haremos será declarar el elemento de la propiedad colocando el atributo `itemprop`.

```html
<p>
	<img 
		itemprop="photo"
		src="http://www.example.com/photo.jpg"
		alt="Ale"
	>
</p>
```

La propiedad `url` es un elemento `<a>`, y el valor de este elemento es su atributo `href`, no necesitamos hacer más cambios al elemento más que definirlo como una propiedad con el atributo `itemprop`.

```html
<a 
	itemprop="url"
	href="http://diveintomark.org/">
	sitio
</a>
```

Ahora bien, veamos a un ejemplo más en donde tengamos la tarea de definir como propiedad `url` a un marcado algo distinto.

```html
<A href=# onclick=goExternalLink()>http://diveintomark.org/</A>
```

El problema con este ejemplo es que el enlace no se encuentra en el atributo `href`, y lo que hace es llamar una función que haga el trabajo de direccionar hacia la URL.

Entonces, lo que podemos hacer es encerrar el elemento `<a>` en otro, y definir como propiedad a ese elemento que agregamos (en este caso, el elemento será un `<span>` y a este le añadiremos el atributo `itemprop`)

```html
<span itemprop="url">
   <A href=# onclick=goExternalLink()>http://diveintomark.org/</A>
</span>
```

Esto funcionará, pues ahora al tratarse de un elemento sin "reglas especiales" (vistas en la tabla anterior), el valor de la propiedad será el contenido de texto. Pero el contenido de texto no abarca toda la etiqueta `<a>`, simplemente lo que esté dentro de la etiqueta, en este caso siendo el enlace `http://diveintomark.org/`, por lo que este es el valor de la propiedad `url`.

## Marcado para gente.

En el ejemplo anterior, pusimos un vocabulario de microdatos para gente, y la cosa es, que, en verdad existe un vocabulario para hacer un marcado de información para personas.

Podemos integrar estos microdatos en un sitio web personal, específicamente una sección "acerca de". Sobre una página existente, implementaremos este vocabulario de microdatos.

El marcado sin modificaciones está encerrado dentro de un elemento `<section>`, ahí encontraremos algunos elementos como encabezados, listas e imágenes.

Lo primero que debemos hacer es declarar el vocabulario que vamos a utilizar, y el alcance de las propiedades a agregar. Para hacer esto, colocaremos los atributos `itemtype` y `itemscope` en el elemento que agrupe a toda la información, en este caso, el `<section>`.

```html
<section 
	itemscope 
	itemtype="http://data-vocabulary.org/Person"
>
```

Teniendo la posibilidad de definir las propiedades del vocabulario de personas, veamos cuáles son las propiedades que podemos implementar.

#### Vocabulario de personas

<table>
	<tr>
		<td>Propiedad</td>
		<td>Descripción</td>
	</tr>
	<tr>
		<td>name</td>
		<td>El nombre</td>
	</tr>
	<tr>
		<td>nickname</td>
		<td>El apodo</td>
	</tr>
	<tr>
		<td>photo</td>
		<td>Un enlace de una imagen</td>
	</tr>
	<tr>
		<td>title</td>
		<td>El titulo de la persona</td>
	</tr>
	<tr>
		<td>role</td>
		<td>El cargo o rol de la persona</td>
	</tr>
	<tr>
		<td>url</td>
		<td>Enlace a un sitio web</td>
	</tr>
	<tr>
		<td>affiliation</td>
		<td>El nombre de una organización a la que pertenezca</td>
	</tr>
	<tr>
		<td>friend</td>
		<td>Identifica una relación entre esta persona y otra más</td>
	</tr>
	<tr>
		<td>contact</td>
		<td>-</td>
	</tr>
	<tr>
		<td>acquaintance</td>
		<td>-</td>
	</tr>
	<tr>
		<td>address</td>
		<td>La ubicación de la persona. Puede tener las subpropiedades `street-address`, `locality`, `region`, `postal-code` y `country-name`</td>
	</tr>
</table>

Lo primero que hay en la sección es una foto marcada con un elemento `<img>`. Lo que haremos es agregarle el atributo `itemprop="photo"` al elemento `<img>`.

```html
  <img 
  	itemprop="photo" 
  	width="204" 
  	height="250"
      	src="http://diveintohtml5.org/examples/2000_05_mark.jpg"
     	alt="[Mark Pilgrim, circa 2000]"
  >
```
	
Como habíamos visto anteriormente, el valor de la propiedad es el atributo `src` de la imagen.

Ahora bien, como el `<img>` anterior es un elemento hijo del elemento `<section>`, los microdatos se reutilizan en relaciones padre-hijo para definir las propiedades de alcance. Por lo que no es necesario volver a colocar los atributos `itemscope` o `itemtype`.

Continuando con la página, lo siguiente que encontramos es un encabezado `<h1>` y una lista `<dl>`.

```html
<h1>Contact Information</h1>
<dl>
    <dt>Name</dt>
    <dd>Mark Pilgrim</dd>
</d1>
```

No necesitamos definir las propiedades como estos elementos, lo que debemos hacer es buscar en **dónde** se encuentra la información que vamos a definir como propiedad, en este caso, lo primero que encontramos es el nombre, por lo que ahí es donde declararemos la propiedad.

```html
<dd itemprop="name">
	Mark Pilgrim
</dd>
```

Las siguientes propiedades a declarar las encontramos en el siguiente marcado.

```html
    <dt>Position</dt>
    <dd>Developer advocate for Google, Inc.</dd>
```

En un solo elemento encontramos 2 datos de información, lo que podemos hacer es colocar elementos `<span>` dentro del `<dd>`, de la siguiente forma:

```html
    <dt>Position</dt>
    <dd>
    	<span itemprop="title">
    		Developer advocate
    	</span>
    	for
        <span itemprop="affiliation">
        	Google, Inc.
        </span>
    </dd>
```

Siguiendo con el marcado, encontramos la dirección, la cual se encuentra en un solo elemento `<dd>`

```html
    <dt>Mailing address</dt>
    <dd>
      100 Main Street<br>
      Anytown, PA 19999<br>
      USA
    </dd>
```

Lo que haremos será añadir un atributo `itemprop`, pero también añadiremos los atributos `itemscope` y `itemtype`, pues la dirección es un objeto de microdatos.

```html
	<dt>Mailing address</dt>
    <dd
    	itemprop="address"
    	itemscope
    	itemtype="http://data-vocabulary.org/Address"
    >
      100 Main Street<br>
      Anytown, PA 19999<br>
      USA
    </dd>
```

Toda la información que utilizaremos se encuentra en un solo texto, lo que podemos hacer es lo que realizamos en el ejemplo anterior:

```html
<dt>Mailing address</dt>
<dd
	itemprop="address"
	itemscope
    	itemtype="http://data-vocabulary.org/Address"
>
    	<span itemprop="street-address">
    		100 Main Street
    	</span><br>
    	<span itemprop="locality">
    		Anytown
    	</span>,
    	<span itemprop="region">
    		PA
    	</span>
    	<span itemprop="postal-code">
    		19999
    	</span>
    	<span itemprop="country-name">
    		USA
    	</span>
</dd>
```

Lo siguiente que tenemos en esta página es la sección de URLs

```html
  <h1>My Digital Footprints</h1>
  <ul>
    <li>
    	<a href="http://diveintomark.org/">
		weblog
	</a>
    </li>
    <li>
    	<a href="http://www.google.com/profiles/pilgrim">
		Google profile
	</a>
    </li>
    <li>
    	<a href="http://www.reddit.com/user/MarkPilgrim">
		Reddit.com profile
	</a>
    </li>
    <li>
    	<a href="http://www.twitter.com/diveintomark">
		Twitter
	</a>
    </li>
  </ul>
```

Afortunadamente contamos con que cada dirección web se encuentra dentro de su propio elemento `<a>`, lo que haremos será tan simple como colocar el atributo `itemprop="url"` a cada elemento.

```html
  <h1>My Digital Footprints</h1>
  <ul>
    <li>
    	<a 
    		href="http://diveintomark.org/" 
    		itemprop="url"
    	>
    		weblog
    	</a>
    </li>
    <li>
    	<a 
    		href="http://www.google.com/profiles/pilgrim" 
    		itemprop="url"
    	>
    		Google profile
    	</a>
    </li>
    <li>
    	<a 
    		href="http://www.reddit.com/user/MarkPilgrim" 
    		itemprop="url"
    	>
    		Reddit.com profile
    	</a>
    </li>
    <li>
    	<a 
    		href="http://www.twitter.com/diveintomark" 
    		itemprop="url"
    	>
    		Twitter
    	</a>
    </li>
  </ul>
```

### Introduciendo Google Rich Snippets

Una utilidad de implementar los microdatos, son los resultados de los motores de búsqueda. Por ejemplo, al tener los microdatos de una persona como su nombre, cargo, dirección, etc. Un motor de búsqueda podría identificar esta información estructurada y mostrarla entre los resultados de búsqueda.

Google tiene soporte para microdatos con el programa Rich Snippets, con una herramienta es posible visualizar de qué forma ve Google las propiedades de los microdatos que hayamos implementado. Probándolo con la página "acerca de" anterior, podemos ver el siguiente resultado:

```
Item
  Type: http://data-vocabulary.org/person
  photo = http://diveintohtml5.org/examples/2000_05_mark.jpg 
  name = Mark Pilgrim 
  title = Developer advocate 
  affiliation = Google, Inc. 
  address = Item( 1 ) 
  url = http://diveintomark.org/ 
  url = http://www.google.com/profiles/pilgrim 
  url = http://www.reddit.com/user/MarkPilgrim 
  url = http://www.twitter.com/diveintomark 

Item 1 
  Type: http://data-vocabulary.org/address
  street-address = 100 Main Street
  locality = Anytown
  region = PA
  postal-code = 19999
  country-name = USA
```

## Marcado para organizaciones

Es posible implementar vocabularios de microdatos para organizaciones y negocios.

Tomaremos una página de ejemplo que tiene un listado de organizaciones.

```html
<article>
  <h1>Google, Inc.</h1>
  <p>
    1600 Amphitheatre Parkway<br>
    Mountain View, CA 94043<br>
    USA
  </p>
  <p>650-253-0000</p>
  <p>
  	<a href="http://www.google.com/">
  		Google.com
  	</a>
  </p>
</article>
```

La información de la organización se encuentra dento del elemento `<article>`, por lo que ahí agregaremos el vocabulario y el alcance.

```html
<article
	itemscope
	itemtype="http://data-vocabulary.org/Organization"
>
</article>
```

### Vocabulario de organizaciones

<table>
	<tr>
		<td>Propiedad</td>
		<td>Descripción</td>
	</tr>
	<tr>
		<td>name</td>
		<td>El nombre</td>
	</tr>
	<tr>
		<td>url</td>
		<td>El enlace al sitio de la organización</td>
	</tr>
	<tr>
		<td>address</td>
		<td>La ubicación</td>
	</tr>
	<tr>
		<td>tel</td>
		<td>El número de teléfono</td>
	</tr>
	<tr>
		<td>geo</td>
		<td>Las coordenadas geográficas de la ubicación, siempre contiene las subpropiedades `latitude` y `longitude`</td>
	</tr>
</table>

Hasta la dirección web que encontramos en el marcado, podemos aplicar lo visto anteriormente para declarar las propiedades del vocabulario, quedando de esta forma:

```html
<article
	itemscope
	itemtype="http://data-vocabulary.org/Organization"
>
  <h1 itemprop="name">Google, Inc.</h1>
  <p 
  	itemprop="address"
  	itemscope
  	itemtype="http://data-vocabulary.org/Address"
  >
  	<span itemprop="street-address">
  		1600 Amphitheatre Parkway
  	</span><br>
   	<span itemprop="locality">
   		Mountain View
   	</span>,
    	<span itemprop="region">
    		CA
    	</span>
    	<span itemprop="postal-code">94043</span><br>
    	<span itemprop="country-name">USA</span>
  </p>
  <p itemprop="tel">650-253-0000</p>
  <p>
  	<a
  		itemprop="url" 
  		href="http://www.google.com/"
  	>
  		Google.com
  	</a>
  </p>
</article>
```

Para definir propiedades de geolocalización implementaremos su propio vocabulario dentro de un elemento `<span>` que servirá meramente para esto.

La información de gelocalización se define en su propio vocabulario, y al definir en el elemento `<span>` la propiedad, necesitará contar con otros 3 atributos:

1. `itemprop="geo"`
2. `itemtype="http://data-vocabulary.org/Geo"`
3. `itemscope`

El marcado para los microdatos de geolocalización quedará de la siguiente forma:

```html
  <span 
  	itemprop="geo" 
  	itemscope
    	itemtype="http://data-vocabulary.org/Geo"
  >
  	<meta 
  		itemprop="latitude" 
  		content="37.4149" 
  	/>
    	<meta 
    		itemprop="longitude" 
    		content="-122.078" 
    	/>
  </span>
```

Así pues, lo podremos colocar dentro del elemento `<article>`

## Marcado para eventos

A continuación, veremos la tabla de propiedades del vocabulario de microdatos para los eventos.

<table>
	<tr>
		<td>Propiedad</td>
		<td>Descripción</td>
		<td>Elemento recomendado</td>
	</tr>
	<tr>
		<td>summary</td>
		<td>Nombre del evento</td>
		<td>&lt;h1&gt, &lt;h2&gt, etc...</td>
	</tr>
	<tr>
		<td>url</td>
		<td>Enlace a la página de los detalles</td>
		<td>&lt;a&gt;</td>
	</tr>
	<tr>
		<td>location</td>
		<td>La ubicación en la que el evento se llevará a cabo</td>
		<td>&lt;p&gt;</td>
	</tr>
	<tr>
		<td>description</td>
		<td>Una descripción del evento</td>
		<td>&lt;p&gt;</td>
	</tr>
	<tr>
		<td>startDate</td>
		<td>La hora y fecha de comienzo</td>
		<td>&lt;time&gt;</td>
	</tr>
	<tr>
		<td>endDate</td>
		<td>La hora y fecha de finalización</td>
		<td>&lt;time&gt;</td>
	</tr>
	<tr>
		<td>duration</td>
		<td>La duración del evento</td>
		<td>&lt;time&gt;</td>
	</tr>
	<tr>
		<td>eventType</td>
		<td>La categoría del evento</td>
		<td>&lt;span&gt;</td>
	</tr>
	<tr>
		<td>geo</td>
		<td>La ubicación por coordenadas del evento</td>
		<td>&lt;span&gt;</td>
	</tr>
	<tr>
		<td>photo</td>
		<td>Enlace a una foto o imagen relacionada al evento</td>
		<td>&lt;img&gt;</td>
	</tr>
</table>

## Marcado para reseñas

La siguiente es la tabla para las propiedades del vocabulario de microdatos para reseñas.

<table>
	<tr>
		<td>Propiedad</td>
		<td>Descripción</td>
		<td>Elemento recomendado</td>
	</tr>
	<tr>
		<td>itemreviewed</td>
		<td>Nombre del objeto reseñado</td>
		<td>&lt;h1&gt, &lt;h2&gt, etc...</td>
	</tr>
	<tr>
		<td>rating</td>
		<td>Una calificación para el objeto en escala de 1 a 5</td>
		<td>&lt;p&gt;</td>
	</tr>
	<tr>
		<td>reviewer</td>
		<td>Nombre del autor que hizo la reseña</td>
		<td>&lt;span&gt;</td>
	</tr>
	<tr>
		<td>dtreviewed</td>
		<td>La fecha en la que el objeto fue reseñado</td>
		<td>&lt;time&gt;</td>
	</tr>
	<tr>
		<td>summary</td>
		<td>Un resumen corto de la reseña</td>
		<td>&lt;p&gt;</td>
	</tr>
	<tr>
		<td>description</td>
		<td>El cuerpo de la reseña</td>
		<td>&lt;p&gt;</td>
	</tr>
</table>

	
