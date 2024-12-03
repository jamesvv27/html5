# Cap 08 - Tomémoslo Offline

## Adentrándose

Un navegador que implemente aplicaciones HTML5 offline leerá una lista de URLs de un archivo _manifest_ (manifiesto), descargará los recursos, los almacenará en caché de forma local, y mantendrá las copias locales actualizadas conforme cambien.
Cuando el navegador ya no tenga conexión a Internet, cambiará automáticamente a las copias locales.

### Soporte Offline

* Internet Explorer: N/A
* Firefox: 3.5+
* Safari: 4.0+
* Chrome: 5.0+
* Opera: 10.6+
* iPhone 2.1+
* Android 2.0+

## Manifiesto Caché

Una aplicación web offline gira en torno a un archivo manifiesto de caché. Un archivo manifiesto es una lista de los recursos que una aplicación web necesitará acceder mientras no se cuente con conexión a Internet. Para usar este archivo debemos apuntarlo desde el elemento `<html>`.

```html
<!DOCTYPE html>
<html manifest="/cache.appcache">
	<body>
		...
	</body>
</html>
```

El archivo manifiesto puede estar ubicado en cualquier lugar del servidor web, pero debe estar bajo el content type `text/cache-manifest`. El archivo debe tener la terminación `.appcache`.

Ahora veremos lo que debe de ir en un archivo manifiesto. La primer línea de todos los archivos manifiesto es la siguiente:

    CACHE MANIFEST

Estos archivos se dividen en 3 partes: la sección "explícita" (_explicit_) la sección de "alternativa" (o _fallback_), y la sección de "lista blanca de elementos online" (_online whitelist_). Cada sección tiene un encabezado. Si el archivo manifiesto no tiene encabezados para las secciones, todos los recursos listados se encontrarán en la sección "explícita".

El siguiente es un archivo manifiesto válido, que contiene una lista de 3 recursos.

```manifest
CACHE MANIFEST
/clock.css
/clock.js
/clock-face.jpg
```

El ejemplo anterior no tiene headers de sección, por lo que todo se encuentra en la sección "explícita". Los recursos en esta sección se descargarán y se almacenarán en caché de forma local para ser utilizados en el momento en que la conexión a Internet se interrumpa.

### Secciones de Red

Si tenemos un recurso que solamente queremos que sea utilizado con conexión a Internet, como un servicio de rastreo (en este ejemplo, un script `tracking.cgi`), podemos hacer lo siguiente:

```manifest
CACHE MANIFEST
NETWORK:
/tracking.cgi
CACHE:
/clock.css
/clock.js
/clock-face.jpg
```

Este archivo manifiesto contiene encabezados de sección. La línea en donde está escrito `NETWORK:` es el comienzo de la "lista blanca de elementos online" (a la cual podemos llamar sección "network"). Los recursos en esta sección nunca se almacenan en caché, por lo que no estarán disponibles sin conexión.
<br />
La línea `CACHE:` es el comienzo de la sección "explícita", y el resto de los recursos son idénticos a los del ejemplo anterior.

## Secciones de alternativa (Fallback)

En la sección de "alternativa" (o sección fallback) podemos definir sustitutos a recursos online que no pueden ser almacenados en caché.

```manifest
CACHE MANIFEST
FALLBACK:
/ /offline.html
NETWORK:
*
```

Lo que esto hace es descargar los elementos de una página web mientras una conexión a Internet esté disponible. En las distintas páginas de un sitio web puede que necesite reutilizar recursos de otras páginas, o incluso de otros dominios, para lo cual, si no se cuenta con una conexión a Internet, la página mostrará lo que se encuentre en la sección `FALLBACK:` , y utilizará cualquier recurso que haya sido descargado de los que esté listados en la sección `NETWORK:`; En el ejemplo anterior, la sección cuenta únicamente con un "*", lo que indica que cualquier cosa que no se encuentré en el appcache aún puede ser descargado y utilizado en la dirección original.

## El flujo de los eventos.

Cuando el navegador visita una página que apunte hacia un manifiesto caché, lo que hará será ejecutar una serie de eventos en el objeto `window.applicationCache`.

1. Lo primer que hará será ejecutar un evento `checking`, esto siempre sucederá sin importar si la página fue visitada con anterioridad.
2. En caso de que el navegador no haya visto el archivo manifiesto antes hará lo siguiente:
	1. Ejecutará un evento `downloading`, y empezará a descargar los recursos listados en el manifiesto caché.
	2. Mientras la descarga se encuentre en curso, el navegador ejecutará periodicamente eventos `progress`, que contienen información sobre la cantidad de archivos que ya han sido descargados, los que están en cola, y los que se están descargando.
	3. Una vez que todos los recursos listados en el manifiesto caché hayan sido descargados, el navegador ejecuta el evento `cached`. Cuando esto suceda, la aplicación web offline se encuentrá almacenada en caché por completo.
3. En caso de que la página haya sido visitada anteriormente, o cualquier otra página que apunte hacie el mismo manifiesto caché, primero verificará si este archivo ha cambiado desde la última vez que el navegador lo revisó.
	1. Si el manifiesto caché no recibió cambios, el navegador ejecutará el evento `noupdate`, y todo estará listo.
	2. En caso de que si hayan cambios, el navegador ejecutará un evento `downloading`, y empezará a volver a descargar todos los recursos listados en el manifiesto caché.
	3. Mientras las descargas se encuentren en curso, el navegador ejecutará los eventos `progress`.
	4. Una vez que todos los recursos listados hayan sido descargados nuevamente, el navegador ejecuta el evento `updateready`, lo cual significa que la nueva versión de la aplicación web se encuentra almacenada en caché en su totalidad. Si deseamos usar esta nueva versión sin forzar al usuario a recargar la página, podemos llamar a la función `window.applicationCache.swapCache()`.

Si en cualquier momento hay algún error, el navegador ejecutará un evento `error`, y se detendrá. Esto puede ocurrir si alguno de los recursos listados en el manifiesto caché no se pudo descargar o si el manifiesto caché sufrió cambios mientras se estaba ejecutando la actualización.

## Depuración (Debugging)

Cuando el navegador ejecute el evento `error`, no habrá una indicación de cual fue el problema realmente.

Otra cosa a destacar es que algo a lo que ni si quiera podría ser considerado un problema lucirá como un erorr serio en el navegador hasta que sepamos de qué se trata. Esto va a cómo el navegador revisa si un manifiesto caché ha cambiado, lo cual es un proceso de 3 pasos:

1. A través de protocolos HTTP, el navegador revisará si el manifiesto caché ha expirado. El servidor web muy probablemente incluirá metadatos sobre el archivo en los encabezados de las respuestas HTTP. Algunos de estos encabezados (como `Expires` y `Cache-Control`) le dirán al navegador cómo se le permite almacenar en caché al archivo sin preguntar al servidor si ha cambiado o no. Este método de almacenamiento en caché no tiene relación a aplicaciones web offline, y ocurre en casi toda la totalidad de páginas HTML y los recursos que puedan contener.
2. Si los encabezados HTTP indican que el manifiesto caché ha expirado, el navegador le preguntará al servidor si existe una nueva versión. En caso de que sí, exista una nueva versión, el navegador la descargará. Para esto el navegador proporcionará una petición HTTP que incluirá la última fecha de modificación del manifiesto caché. Si el servidor web detecta que el archivo manifiesto no ha sufrido cambios, retornará un estado `304 (Not Modified)`.
3. Si el servidor web determina que el archivo manifiesto ha tenido cambios, retornará un estado `200 (OK)`, seguido del contenido del nuevo archivo, y junto a nuevos headers `Cache-Control` con una nueva fecha de última modificación, de modo que los primeros 2 pasos funcionen de forma correcta la próxima vez. Cuando el archivo manifiesto caché esté descargado, el navegador contrastará los contenidos con la última copia que se encontraba descargada. Si no hay nuevos recursos que descargar, el navegador no volverá a descargar ningún recurso listado en el manifiesto.

Por diversas razones, desearemos evitar que un archivo manifiesto se almacene en caché por los protocolos HTTP. <br />
Si la página web está corriendo en un servidor web Apache (o basado), podemos escribir lo siguiente en el archivo `.htaccess`:

    ExpiresActive On
    ExpiresDefault "Access"

Esto desactivará el caché para cualquier archivo en el directorio y los subdirectorios que contenga. Podemos configurar esto con un directorio `<Files>` para que lo anterior solo afecte al archivo manifiesto caché, o crear un subdirectorio que contenga únicamente el archivo `.htaccess` y el archivo manifiesto.

Una vez deshabilitado el almacenamiento en caché HTTP para el manifiesto, aún pueden haber cambios en alguno de los recursos en el appcache. Esto hará que en el segundo paso del proceso, el navegador no se dará cuenta de los cambios.

    CACHE MANIFEST
    # rev 42
    clock.js
    clock.css

Si hacemos cambios en el archivo `clock.css`, los cambios no surtirán efecto, pues el archivo manifiesto no ha cambiado. La forma más sencilla de solucionar esto es cambiando algún carácter en un comentario del manifiesto, de este modo el archivo manifiesto habrá sufrido cambios, y se iniciará el proceso para volver a descargar los recursos listados en el manifiesto.

    CACHE MANIFEST
    # rev 43
    clock.js
    clock.css

## Construyamos uno

En el juego de Halma visto en el capítulo anterior, crearemos un manifiesto que liste todos los recursos que el juego necesite. Esta vez colocaremos los scripts para el guardado local del juego en un archivo llamado `halma-localstorage.js`, pues este, junto a la página HTML principal, serán incluidos en el manifiesto.

Este es el manifiesto:

    CACHE MANIFEST
    halma.html
    halma-localstorage.js

Ahora lo apuntaremos en la página principal.

```html
<!DOCTYPE html>
<html lang = "en" manifest = "halma.appcache">
```