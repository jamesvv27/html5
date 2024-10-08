# Cap 03 - ¿Qué significa todo esto?

## Adentrándose

Aquí se realizarán mejoras a una página HTML, algunas cosas serán más abstractas, y otras se alargarán.

## Doctype

Los navegadores empezaron a tener dos modos conocidos como _quirks mode_ (modo estándar) y _standards mode_ (modo de estándares), modos los cuales son definidos en el _doctype_ antes de la etiqueta `<html>`. Posteriormente debido a un quiebre en el modo standard que solo se enfocaba en un _quirk_ específico, se creó el _almost standards mode_.

    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

El anterior es uno de los 15 doctypes que activan el modo estándar en los navegadores modernos. Esto se puede omitir y escribir lo siguiente en su lugar:

    <!DOCTYPE html>

## Elemento root

En una página de HTML hay elementos ancestros, padres e hijos a modo de árboles, aquellos que no tienen elementos hijos son llamados "hojas".

El elemento ancestro de todos los demás siempre será la etiqueta `<html>`, la cual luce de la siguiente forma:

    <html xmlns="http://www.w3.org/1999/xhtml"
    	lang="en"
    	xml:lang="en">

El atributo `xmlns` nos dice que los elementos en la página están en el namespace de XHTML, sin embargo los elementos de HTML5 se encuentran siempre en este namespace, por lo que no es necesario colocar este atributo.

    <html lang="en" xml:lang="en">

De igual forma, el atributo `xml:lang`, que define el lenguaje de la página, puede ser omitido.

    <html lang="en">

## El elemento `<head>`

La etiqueta `<head>` es por lo general, el primer elemento hijo de `<html>`. Esta contiene los metadatos e información de la página.

    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <title>My Weblog</title>
     <link rel="stylesheet" type="text/css" href="style-original.css" />
     <link rel="alternate" type="application/atom+xml"
                        title="My Weblog feed"
                        href="/feed/" />
     <link rel="search" type="application/opensearchdescription+xml"
                        title="My Weblog search"
                        href="opensearch.xml"  />
     <link rel="shortcut icon" href="/favicon.ico" />
    </head>

## Codificación de carácteres

Existen varios tipos de codificación de carácteres para las letras de los distintos idiomas como el Ruso, Japonés, Ingés, Español, etc.

En un encabezado HTTP la definición de la codificación de carácteres luciría de la siguiente forma:

    Content-Type: text/html; charset="utf-8"

Dado que pocos autores de páginas HTML tienen control sobre sus servidores HTTP, en HTML4 se introdujo una forma de especificar la codificación de carácteres desde el mismo documento.

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8>

Como vemos, aquí se está utilizando la codificación de carácteres UTF-8.

En HTML5 se puede omitir lo anterior y escribir esto en su lugar.

    <meta charset="utf-8" />

## Friends y relaciones (de links)

Las relaciones de links son un modo de apuntar a otra página con un objeto como una hoja de estilos, una traducción, el siguiente capítulo de un libro.

En HTML5 las relaciones de links se encuentran en dos categorías:

1. Links a recursos externos que pueden ser usados para compleentar al documento.
2. Hiperlinks (o hiperenlaces), los cuales son links a otros documentos.

Por lo general las relaciones de links se visualizan en la cabeza `<head>` de una página.

### rel = stylesheet

En la página de ejemplo esta es la primer relación de link:

    <link rel="stylesheet" href="style-original.css" type="text/css" />

`rel="stylesheet"` se define para apuntar a una hoja de estilo CSS almacenada en otro archivo. El atributo `type` puede ser omitido, pues por defecto el atributo type está asignado a CSS.

### rel = alternate

La siguiente relación de link en la página es:

    <link rel="alternate"
    	type="application/atom+xml"
    	title="My Weblog feed"
    	href="/feed/" />

Lo anterior habilita algo llamado "feed automático", que permite a lectores descubrir que un sitio cuenta con un tablón de noticias de los últimos artículos. `rel="alternate"` en conjunción con `type=application/atom+xml` indica la existencia de un feed de Atom para la página.

### Otras relaciones de links en HTML5

`rel="author"` se usa para direccionar hacia información del autor de la página.

`rel="external"` indica que el link dirige a un documento que no forma parte del sitio.

`rel="start"`, `rel="prev"`, y `rel="next"` definen relaciones entre páginas que son parte de una serie.

`rel="icon"` funciona para adjuntar un archivo .ico para mostrar un ícono en la pestaña de la página en el navegador. Se puede usar con el atributo `sizes` para ajustar el tamaño del ícono.

`rel="license"` se usa para apuntar hacia una hoja que contenga una licencia de derechos de autor para el documento actual.

`rel="nofollow"` es utilizazdo para indicar que un determinado link no está afiliado al autor de la página.

`rel="noreferrer"`se refiere a que no se encuentra información del referente que pueda ser filtrada al acceder al link.

`rel="pingback"`especifica la dirección de un servidor "pingback", el sistema pingback fue creado con la intención de que un blog sea notificado cuando otro sitio web lo referencíe.

`rel="prefetch"` es empleado para retener que un recurso especificado será muy seguramente requerido por el usuario. Los motores de búsqueda los usan para los resultados que sean más populares y deban ir al inicio de la página.

`rel="search"` sirve para indicar que el documento referenciado da una interfaz para buscar al documento y sus recursos relacionados.

`rel="sidebar"` es usado para que un link referenciado se muestre en un tablón secundario del navegador si es posible (por ejemplo, una barra lateral).

`rel="tag"` indica que una etiqueta que el documento referenciado representa aplique también para el documento actual.

## Nuevos elementos semánticos en HTML5

Veamos algunos elementos semánticos nuevos.

* `<section>`: Una sección genérica.
* `<nav>`: Sección de una página que direccione a otras páginas u otras partes de la misma página
* `<article>`: Muestra el componente de una página que tenga una composición autónoma.
* `<aside>`: Permite representar la sección de una página cuyo contenido sea colocado alrededor del elemento `aside`.
* `<hgroup>` : Representa el encabezado de una sección y puede ser usado para agrupar una serie de etiquetas `<h1>` a `<h6>`.
* `<header>`: Se usa para contener el encabezado de la página, que puede incluir una tabla de contenidos, una barra de busqueda, etc.
* `<footer>`: Este representa el pie de página, que suele contener información del sitio, derechos de autor, enlaces a otros documentos, y demás.
* `<time>`: Muestra un tiempo en formato de 24 horas o una fecha.
* `<mark>`: Una serie de texto en prosa que está subrayado para ser referenciado.

## Digresión hacia cómo los navegadores manejan elementos desconocidos

Todos los navegadores cuentan con una lista maestra de elementos HTML que soportan, los que no se encuentrán en la lista son tratados como _elementos desconocidos_. A estos seguido no sabe cómo tratárseles, cómo estilizarlos, cómo debería lucir su objeto DOM.

Esto suele producir problemas, pero se puede arreglar creando elementos `<article>` de prueba con JavaScript.

    <html>
    <head>
    <style>
     article { display: block; border: 1px solid red }
    </style>
    <script>document.createElement("article");</script>
    </head>
    <body>
    <article>
    <h1>Welcome to Initech</h1>
    <p>This is your <span>first day</span>.</p>
    </article>
    </body>
    </html>

## Headers

Estos son los headers de la página de ejemplo.

    <div id="header">
    	<h1>My Weblog</h1>
    	<p class="tagline">A lot of effort went into making this effortless.</p>
    </div>
    
    ...
    
    <div class="entry">
    	<h2>Travel day</h2>
    </div>
    
    ...
    
    <div class="entry">
    	<h2>I'm going to Prague!</h2>
    </div>

Primero quitaremos el `<div id = "header">`, dado que el elemento `div` no cuenta con semánticas definidas, que el valor de su `id` sea `header` no cambiaría nada. Por lo que utilizaremos la etiqueta `<header>` en su lugar.

    <header>
    	<h1>My Weblog</h1>
    	<p class="tagline">A lot of effort went into making this effortless.</p>
    	...
    </header>

Posteriormente podemos agregar el elemento `<hgroup>`, actúa para envolver 2 o más elementos de encabezado.

    <header>
    	<hgroup>
    		<h1></h1>
    	</hgroup>
    	...
    </header>
    
    ...
    
    <div class="entry">
    	<h2>Travel day</h2>
    </div>
    
    ...
    
    <div class="entry">
    	<h2>I'm going to Prague!</h2>
    </div>

## Artículos

En la página de ejemplo encontramos esto:

    <div class="entry">
    	<p class="post-date">October 22, 2009</p>
    	<h2>
    		<a href="#"
    			rel="bookmark"
    			title="link to this post">
    			Travel day
    			</a>
    	</h2>
    	...
    </div>

Esto es válido en HTML5, pero lo ideal es colocar un elemento más específico, de este modo:

    <article>
    	<p class="post-date">October 22, 2009</p>
    	<h2>
    		<a href="#"
    			rel="bookmark"
    			title="link to this post">
    			Travel day
    		</a>
    	</h2>
    	...
    </article>

A esto se le puede agregar un cambio más:

    <article>
    	<header>
    	<p class="post-date">October 22, 2009</p>
    	<h1>
    		<a href="#"
    			rel="bookmark"
    			title="link to this post">
    			Travel day
    		</a>
    	</h1>
    	</header>
    	...
    </article>

Cambiando los encabezados `<h2>` a `<h1>` y encerrandolos dentro de un `<header>`, esto crearía un nodo autónomo en el contorno del documento.

## Fechas y horas

    <div class="entry">
    	<p class="post-date">October 22, 2009</p>
    	<h2>Travel day</h2>
    </div>

Si bien esto es válido en HTML5, también existe un elemento específico para este caso: El elemento `time`

    <time datetime="2009-10-22" pubdate>October 22, 2009</time>

3 partes conforman este elemento:

1. Fecha de computadora
2. Fecha escrita en texto
3. Flag opcional `pubdate`

Para añadir una hora se añade la letra `T` después de la fecha y la hora con una zona horaria.

    <time datetime="2009-10-22T13:59:47-04:00" pubdate></time>

El artículo completo quedaría de la siguiente forma:

    <article>
    	<header>
    		<time datetime="2009-10-22" pubdate>
    			October 22, 2009
    		</time>
    		<h1>
    			<a href="#"
    				rel="bookmark"
    				title="link to this post">			
    					Travel day
    				</a>
    		</h1>
    	</header>
    	<p>Lorem ipsum dolor sit amet...</p>
    </article>

## Navegación

La barra de navegación estaba originalmente marcada de esta forma:

    <div id="nav">
    	<ul>
    		<li><a href="#">home</a></li>
    		<li><a href="#">blog</a></li>
    		<li><a href="#">gallery</a></li>
    		<li><a href="#"></a>about</li>
    	</ul>
    </div>

Semánticamente no es posible distinguir a qué parte de la página pertenece esta lista, como el encabezado o el cuerpo. Esto podría ser un problema para gente con problemas de visión o con padecimientos motrices. por lo que usaremos el elemento `<nav>`, que es mucho más específico.

    <nav>
    	<ul>
    		<li><a href="#">home</a></li>
    		<li><a href="#">blog</a></li>
    		<li><a href="#">gallery</a></li>
    		<li><a href="#"></a>about</li>
    	</ul>
    </nav>

## Footers

En el final de la página de ejemplo encontramos el pie de página, el cual estaba originalmente así:

    <div id="footer">
    	<p>&#167;</p>
  		<p>&#169; 2001&#8211;9 <a href="#">Mark Pilgrim</a></p>
    </div>

De nueva cuenta, esto es válido en HTML5, pero este ofrece un elemento más específico, el elemento `<footer>`.

    <footer>
    	<p>&#167;</p>
  		<p>&#169; 2001&#8211;9 <a href="#">Mark Pilgrim</a></p>
    </footer>

En el footer realmente se puede poner lo que el autor desee, además de la información de la sección, quién la escribió, links hacia otros documentos relacionados, datos del derecho de autor y cosas por el estilo.