# Capítulo 5 - Vídeo en la web

## Adentrándose

Antes de que existiese HTML5, no había una forma estándar de incorporar vídeo a una página web, se solía hacer mediante plugins de terceros, como _QuickTime_, _RealPlayer_, o _Flash_.

HTML5 define un método estándar para incluir vídeo en una página web utilizando el elemento `<video>`

### Soporte para el elemento `<video>`

* Internet Explorer: 9.0+
* Firefox: 3.5+
* Safari: 3.0+
* Chrome: 3.0+
* Opera: 10.5+
* iPhone: 1.0+
* Android: 2.0+

Antes de continuar debemos entender algunos fundamentos de fórmato de vídeo.

## Containers de vídeo

Los containers de vídeo los conocemos comúnmente como "el formato del vídeo" (aunque esto no es necesariamente correcto), por ejemplo, cuando vemos que la extensión de un archivo de vídeo es `.avi`, nos estamos refiriendo al container AVI, o _Audio Video Interleave_. El container de un vídeo se refiere meramente al modo en el que se almacenarán los datos del vídeo en su archivo (más no **qué** tipo de datos contiene).

Un archivo de vídeo contiene varias pistas de audio y vídeo dedicadas, que por lo general se encuentran interrelacionadas. Una pista de audio contiene marcadores que la ayudan sincronizarse con el vídeo. Las pistas por sí solas pueden contener metadatos como la relación de aspecto de una pista de vídeo o el idioma de una pista de audio. Los containers también pueden incluir metadatos, como el nombre del vídeo, la portada del vídeo, número de episodio, etc.

## Códecs de vídeo

Un vídeo consiste en una transmisión de vídeo y otra de audio, y el container define cómo almacenar las transmisiones de audio y vídeo en un solo archivo. Al observar un vídeo un reproductor se encarga de interpretar el formato del container, y decodificar las transmisiones de audio y vídeo para reproducirlas.

Un _códec de vídeo_ se refiere a un algoritmo en el que la transmisión de vídeo está codificada, y el reproductor lo que hace es decodificar la transmisión de vídeo de acuerdo al _códec de vídeo_ para después mostrar una serie de fotogramas en la pantalla. Lo que suelen hacer los códecs de vídeo modernos es minimizar la cantidad de información requerida para mostrar un fotograma después del otro. Estos no almacenan todos los fotogramas individuales, lo que almacenan son las diferencias entre los fotogramas, lo que da paso a tasas de compresión altas y produce como resultado archivos de menor peso.

Existen códecs de vídeo _con pérdida_ y _sin pérdida_ (lossy, y lossless en inglés). Los archivos con códecs sin pérdida son demasiado pesados y es impráctico usarlos en la web, por lo que se suele optar por usar códecs con pérdida, en estos una cantidad considerable de información se pierde (lo que puede resultar en bajones de calidad), sin embargo, esto hace que los archivos salgan con una tasa alta de compresión, lo cual los hace más ligeros y más convenientes para subirlos a la web.

### H.264

A este códec también se le conoce como "MPEG-4 part 10", "MPEG-4 AVC", y "MPEG-4 Advanced Video Coding". H.264 tiene como objetivo ser utilizado por dispositivos de gama baja como celulares, dispositivos de gama alta como computadoras de escritorio modernas y también dispositivos de por medio. Para lograr esto, el estándar H.264 se divide en perfiles que definen una serie de características opcionales para mayor complejidad a cambio de mayor tamaño de archivo. Los perfiles altos usan más características opcionales, y toman más tiempo en codificar requiriendo mayor rendimiento de CPU.

Actualmente H.264 es usado en la web en utilidades como Adobe Flash, el cual es usado por YouTube para codificar vídeos de alta definición.

### Theora

Theora surgió a raíz del códec _VP3_, este códec es libre de regalías, por lo que no requiere de una licencia.

El vídeo con el códec Theora puede ser incorporado con cualquier container (lo más común es verlo con un container Ogg). Es soportado de forma nativa en varias distribuciones de GNU/Linux y con el software de Xiph.org para Windows y Mac OS X.

### VP8

Un códec libre de regalías adueñado por Google después de adquirir a On2.

## Códecs de audio

Al igual que con los códecs de vídeo, los _códecs de audio_ son algoritmos para determinar la codificación de una transmisión de audio. También existen códecs de audio _con_ y _sin_ pérdida, donde los códecs de audio con pérdida son más convenientes para sitios web.

Existen categorías de códecs de audio con pérdida, como por ejemplo, códecs optimizados para transmitir palabras. A pesar de esto, raramente son soportados en los navegadores, por lo que emplearemos códecs de audio con pérdida de uso general.

El códec de audio se encarga de decodificar la transmisión de audio y transformarla a ondas de sonido que un speaker es capaz de reproducir. Si bien es cierto que nos enfocaremos a códecs de audio con pérdida, en los que una buena cantidad de información no se conserva después del codificado, los códecs de audio se encargan de que la pérdida de información sea imperciptible al oído humano, esto es gracias a que el audio se separa en canales (por lo general son 2), con el propósito de que cada canal vaya dirigido a cada speaker.

Durante una grabación, el sonido del audio se divide en canal izquierdo y derecho, en la codificación, ambos canales se almacenan en una misma transmisión de audio, y al ser decodificado por un reproductor, ambos canales se dirigen al speaker adecuado.

En la web se utilizan 3 códecs de audio.

### MPEG-1 Audio Layer 3

Más conocido como "mp3", este códec puede contener hasta 2 canales de sonido, que pueden ser codificados en _bitrates_ desde los 32 a los 320 kbps.
Entre más alto sea el bitrate, mayor calidad de audio y tamaño de archivo.
El formato mp3 permite codificar audio con _bitrate variable_, haciendo que algunas partes de la transmisión de audio tengan más compresión que otras. Aunque también se puede optar por codificar audio mediante un  _bitrate_ constante.

### Advanced Audio Coding

AAC es capaz de codificar audio en cualquier bitrate y hasta 48 canales de sonido. De manera similar a H.264, este códec cuenta con perfiles de codificación, como por ejemplo el perfil "low-complexity", que está diseñado para ser reproducible en tiempo real en dispositivos de bajo rendimiento.

### Vorbis

Usualmente se encuentran en containers Ogg o WebM, aunque también pueden ser implementados en containers mp4 o MKV. El códec soporta una cantidad amplia de canales de sonido.

## Compatibilidad en la web

Los navegadores siempre emplean distintos containers y códecs, y no hay ninguna combinación de estos que esté disponible en todos los navegadores HTML5. Si queremos agregar un vídeo en una página web lo que debemos hacer es subir varias versiones del mismo archivo de vídeo en diferentes containers.

Para la mayor compatibilidad posible, usaremos 3 formatos:

1. Vídeo WebM - VP8 con audio Vorbis.
2. Vídeo H.264 con audio AAC en container MP4.
3. Vídeo Theora con audio Vorbis en container Ogg.

Subiremos los 3 formatos y los referenciaremos en un solo elemento de `<video>`.

## El marcado

En HTML5 utilizamos el elemento `<video>` para agregar vídeo en una página web, seguido de esto podemos agregar la fuente del vídeo ya sea como atributo dentro de la misma etiqueta:

    ```
    html
    <video src="pr6.webm"></video>
    ```

O agregando el elemento source:

     ```
     html
     <video>
     	<source src="pr6.webm">
     </video>
     ```

Posteriormente, podemos definir las dimensiones del marco del vídeo.

    ```
    html
    <video width="320" height="240">
    	<source src="pr6.webm">
    </video>
    ```

Para añadir una interfaz de controles del vídeo (como ajustar el volumen, reproducir y pausar), incluimos el atributo `controls`

    ```
    html
    <video width="320" height="240" controls>
    	<source src="pr6.webm">
    </video>
    ```

Si deseamos que el vídeo empiece a descargarse tan pronto como la página cargue, debemos agregar el atributo `preload`, esto nos puede ser útil si el propósito principal de la página es reproducir el vídeo.

    ```
    html
    <video width="320" height="240" controls preload>
    	<source src="pr6.webm">
    </video>
    ```

Si no queremos esto, podemos ajustar este atributo.

    ```
    html
    <video width="320" height="240" controls preload="none">
    	<source src="pr6.webm">
    </video>
    ```

También podemos agregar el `autoplay`, por si queremos que el vídeo además de cargarse junto con la página, se reproducirá al instante.

    ```
    html
    <video width="320" height="240" controls autoplay>
    	<source src="pr6.webm">
    </video>
    ```

A continuación agregaremos más fuentes de vídeo al elemento:

    ```
    html
    <video width="320" height="240" controls>
    		<source 
      			src="pr6.ogv" 
      			type='video/ogg;
	 		codecs= "theora, vorbis"'
    		>
		<source 
  			src="pr6.webm"
  			type='video/webm;
    			codecs="vp8, vorbis"'
      		>
		<source 
  			src="pr6.mp4"
     			type='video/mp4;
			codecs="avc1.42E01E, mp4a.40.2"'
   		>
    </video>
    ```
    
