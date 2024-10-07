# Cap 01 - ¿Cómo llegamos aquí?

## Al adentrarse

Las implementaciones no deben ser terminadas antes de las especificaciones ya que éstas restringen o limitan las especificaciones si se empieza a depender mucho de las implementaciones, sin embargo tampoco se deben terminar las especificaciones antes ya que se necesita del feedback y de la experiencia del autor para realizar las implementaciones, por lo que hay que estar un poco en el medio.

## Tipos MIME

Al visitar una página web, el servidor de la página envía 'Headers' antes de enviar la página de marcado (osea, el contenido). Uno de estos headers es conocido como 'content-type' o 'MIME type' y lo que contiene es lo siguiente:

     Content-Type : text/html

Este header es lo que determina cómo se va a mostrar cada recurso gráficamente. Los archivos como imágenes, JavaScripts, y hojas de estilo CSS tienen su propio tipo MIME.

## Digresión hacia la creación de los estándares

Todo elemento, atributo y característica de HTML fueron creados por personas que decidieron cómo funcionarían. Más elementos se fueron agregando a HTML a través del tiempo, conformando así a lo que conocemos como HTML5.

"MIME, someday, maybe" es una referencia a Negociación de contenido, un mecanismo definido como parte de _HTTP_ en el que un cliente le comunica al servidor el tipo de recursos que el cliente puede soportar, para que así el servidor retorne algo en el formato preferido del cliente.

El protocolo _HTTP_ original definido en 1992 no tenía ningún método de poder comunicar del cliente al servidor qué tipo de formatos soportaban, por lo que para el navegador Midas de 1992 se pensó en utilizar la etiqueta ICON o IMAGE con un parámetro NAME, el cual tenía la idea de utilizar una colección de imágenes 'built in' del navegador y si este parámetro coincidía con una de estas imágenes, se utilizaría la imagen en lugar de buscarla por internet.

_HTTP2_ es una referencia al _HTTP Básico de 1992_, para 1993 aún no era implementado, aunque eventualmente _HTTP2_ se estandarizó como _HTTP 1.0_, e incluía headers para **negociación de contenido**.

En 1993 se propuso _HTML+_ como una evolución del HTML estándar, no se implementó y fue sustituido por _HTML 2.0_, que formalizaba los agregados que ya se encontraban en uso común.

Posteriormente se escribió _HTML 3.0_, que tampoco fue implementado y fue sustituido por _HTML 3.2_, que agregabaa características como tablas, applets y flujo de texto sobre imágenes, aún teniendo retrocompatibilidad completa con _HTML 2.0_.

## Una línea sin romper

* HTTP sigue existiendo y evolucionando, desde la versión 0.9, 1.0, 1.1...
* HTML sigue existiendo a pesar de la gran cantidad de añadidos sin implementar, y sin embargo, sigue siendo bastante retrocompatible con páginas antiguas.
* La mayoría de las versiones de HTML han sido 'retro-specs', HTML nunca ha sido realmente 'puro'.
* Ninguno de los navegadores de 1993 existen a día de hoy.
* Algunos sistemas operativos de 1993 aún existen pero ninguno es relevante a la web moderna, Windows estaba en la versión 3.1, las Macs estaban en System 7 y Linux era distribuido mediante Usenet.
* Muchas de las personas que aportaron a HTML 2.0, HTML 3.0, HTML 3.2, y HTML4 siguen haciendo contribuciones a los 'web standards' a día de hoy.

## Línea de tiempo del desarrollo de HTML desde 1997 hasta 2004

En Diciembre de 1997 la _World Wide Web Consortium_ (W3C) publicó HTML 4.0 y desvaneció el _Grupo de Trabajo de HTML_. Poco después, otro Grupo de trabajo de la W3C publicó _XML 1.0_, y posteriormente reorganizaron el _Grupo de Trabajo de HTML_ para reformular a HTML en XML en 1998, lo que dio paso a _XHTML 1.0_, con un nuevo tipo MIME, el cual era:

     application/xhtml+xml

Para migrar páginas HTML4 existentes se incluía _Appendix C_ el cual tenía el propósito de servir como guía a aquellos autores que deseaban que sus documentos XHTML se visualizaran en agentes HTML.

En Agosto de 1999 el Grupo de Trabajo de HTML publicó un borrador de _XHTML Extended Forms_ el cual no tendría retrocompatibilidad con navegadores diseñados para versiones anteriores de HTML y poco después fue renombrado como _XForms_ y se le asignó su propio Grupo de Trabajo que trabajó en paralelo con el Grupo de Trabajo de HTML. En Octubre de 2003 se lanzó XForms 1.0.

## Todo lo que conoces sobre XHTML está mal

A pesar de que muchas páginas afirman estar escritas en XHTML, la gran mayoría de estas usan el tipo MIME

     text/html
y son muy pocas las que utilizan el

     application/xhtml+xml

Esto se debe a que en XHTML se introdujo el _manejo draconiano de errores_, en el que la más mínima falta en la sintaxis provocaría un error fatal y no mostraría la página al usuario.

En HTML, esto no sucede, pues los errores de sintaxis suelen ser ignorados por los navegadores y se muestra la página de todos modos. La gran mayoría de las páginas de HTML en internet tienen al menos un error, pero al no presentar errores visibles, muchos deciden no corregirlos.

## Visión competitiva

En Junio de 2004, la W3C presentó en el _Taller de Aplicaciones Web y Documentos Compuestos_ en el que un grupo de partícipes presentaron su visión competitiva para el futuro de la web una evolución del estándar HTML4 para agregar nuevas características, la cual tenía como principios los siguientes.

* Retrocompatibilidad
	- Las tecnologías deberán estar basadas en aquellas con los que los autores estén familiarizados, como HTML, CSS, JavaScipt y DOM.
 * Buen manejo de errores
	 - El manejo de errores debe estar definido con tal de que los Agentes de usuario no deban inventar sus propios mecanismos de manejo de errores o hacer ingeniería inversa a otros Agentes de usuario.
 * Los Usuarios no deben exponerse a errores de autor
	 - Se debe plantear una recuperación exacta para cada escenario de error posible, debe estar definido para errores de escala mayor, y no en errores obvios que sean fatales.
 * Uso práctico
	 - Todas las características deben estar justificadas por un caso de uso práctico.
 * El scripting se queda
	 - Aunque debe de evitarse mientras se pueda utilizar el marcado declarativo.
 * Se debe de evitar elaborar perfiles en un dispotitivo específico
	 - Los autores deben de depender en las mismas características implementadas en las versiones de escritorio y móvil.
 * Proceso abierto
	 - Las Aplicaciones Web deben ser abiertas, es decir, la documentación, archivos, borradores, etc. Deben ser visibles al público.

### Grupo de Trabajo WHAT

El _Grupo de Trabajo WHAT_, se define como:

> El Web Hypertext Applications Technology Working Group es una colaboración no oficial y abierta de personas y empresas. El grupo tiene como objetivo desarrollar especificaciones basadas en HTML y tecnologías del estilo para facilitar el lanzamiento de Aplicaciones Web interoperables, con la intención de subir los resultados a una organización de estándares. Este envío formaría entonces la base de trabajo para extender formalmente a HTML en el camino de los estándares.
>
>La creación de este foro va desde varios meses de trabajo por e-mails privados en especificaciones para tales tecnologías. El enfoque principal a este punto ha extendido los Formularios HTML4 para dar soporte a características peticionadas por autores sin romper la retrocompatibilidad con el contenido existente. Este grupo fue creado para asegurar que el desarrollo futuro de estas especificaciones sea completamente abierto, a través de una archivación abierta.

Aquí la frase clave es "sin romper la retrocompatibildad". XHTML no era retrocompatible con HTML, pues requería un tipo MIME completamente nuevo que además obligaba a emplear el uso del manejo de errores draconiano. XForms no es compatible con los formularios HTML, ya que solo podía ser utilizado en documentos con el tipo MIME de XHTML.

El Grupo de Trabajo WHAT se dio a la tarea de documentar los algoritmos de manejo de errores indulgentes (pues "perdonaban los errores") que eran empleados por los navegadores. Muchos navegadores entonces intentaban que el contenido coincidiera con otros navegadores de la competencia. A pesar de esto, el grupo WHAT documentó cómo analizar sintácticamente HTML de una forma que fuera compatible con el contenido web existente.

Silenciosamente, el Grupo WHAT trabajaba en 2 proyectos, uno conocido como _Web Forms 2.0_, que añadía nuevos tipos de control a los formularios HTML, y otro llamado _Web Applications 1.0_, con añadidos como soporte nativo de audio y vídeo sin el uso de plugins.

## De vuelta con la W3C

Mientras el Grupo WHAT se enfocaba en añadidos de HTML, el Grupo de Trabajo de HTML de la W3C se encontraba ocupado con la versión 2.0 de XHTML, y para Octubre de 2006 no era implementado por ningún navegador de renombre, por lo que al ver el impulso del G	rupo WHAT, la W3C anunció que trabajaría con el Grupo de Trabajo WHAT para evolucionar a HTML.

El objetivo para ellos era alquilar un nuevo grupo de trabajo para HTML, que a diferencia del anterior, haría mejoras drásticas a HTML y en paralelo con XHTML.

Además, habría que extender los formularios de HTML, era algo complicado, pues los formularios existentes de HTML y XForms son lenguajes, y ya se contaba con implementaciones y usuarios en XForms y HTML.

Una de las primeras cosas que el nuevo Grupo de Trabajo de HTML de la W3C decidió hacer fue renombrar _Web Applications 1.0_ a _HTML5_.

## Posdata

En Octubre de 2009, la W3C desvaneció el Grupo de Trabajo de XHTML2 y explicó que no renovarían el alquiler del Grupo de Trabajo.