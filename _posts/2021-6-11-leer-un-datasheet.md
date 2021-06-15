---
layout: post
title: Como leer un datasheet o hoja de datos
tags: Electronica
---
Mas que informacion adicional o una simple receta, el datasheet de un componente electronico es de **lectura obligatoria** antes de empezar a lidiar con el. Pero encontrar los datos que necesitamos puede ser dificil. Esta es, por decirlo de alguna forma, una guia de por donde mirar estos documentos.
<!--more-->
![Datasheet chino ejemplo](/images/leer-un-datasheet-1.png)
Podemos imaginarnos un circuito electronico como una construccion de piezas Lego. Excepto que si ponemos la pieza en el lugar equivocado, en la posicion equivocada, o si es del color o tamaño incorrectos, en el mejor de los casos se quemara y no funcionara mas. Y en un peor escenario, habremos hecho fuegos artificiales caseros y dejado sin electricidad a todo el edificio.

Ya sea para diseñar circuitos o analizar un circuito ya hecho, lo mas probable es que encontremos componentes nuevos que no conozcamos. Para acudir en nuestra ayuda, cada fabricante de componentes electronicos suele publicar un documento conocido como "Hoja de Datos", aunque es mas comun referirse a estos documentos por su nombre original, "Datasheets", ya que la gran mayoria (por no decir casi todos) se redactan en ingles. 

No podriamos hacer una sola guia para todos, pues asi como hay muchisimos tipos de componentes, hay muchos tipos de datasheets. Pero vamos a poner 2 ejemplos para hacerlo mas facil. En cada uno nos centraremos en 4 tipos de datos: informacion basica, funciones principales, caracteristicas electricas y pinout.  
Vamos con el primer ejemplo.  

## Transistores

Practicamente toda la electronica moderna se basa en el funcionamiento de los transistores. Y dentro de esta categoria tenemos montones de variedades de ellos. Un modelo que suelo usar mucho en mi trabajo es el transistor BC547. Empecemos con ese. [Podes descargarlo de este enlace.](https://www.sparkfun.com/datasheets/Components/BC546.pdf)

Lo primero que encontramos es la informacion basica, que nos indica la serie a la que pertenece este transistor, que va desde el BC546 al BC550.  
Encontramos tambien que es un transistor NPN para trabajar con voltajes relativamente altos, con bajo nivel de ruido y que es su complemento PNP es la serie de transistores del BC556 al BC560.

El cuadro que nos interesa es "Absolute Maximum Ratings", en el cual encontramos 3 valores muy utiles. **1)** El voltaje a aplicar en la base (Emiter-Base Voltage) el cual en este caso es de 6V; **2)** El voltaje maximo que puede cruzar al transistor es de 45V (Collector-Emitter Voltage); **3)** La corriente maxima que puede trabajar es de 100mA (Collector Current DC).

Teniendo estos datos, y la indicacion en la parte superior de que es un transistor para usar como interruptor o "switch", nos queda un poco mas claro para que casos seria apropiado.  
Es un transistor que admite voltajes altos, pero no alta potencia. Es muy comun usar estos transistores para encender dispositivos que no representen una carga muy grande, como podrian ser luces, buzzers, relays, etc. Si se necesita como interruptor para cargas mas grandes recomiendo el BC639, cuyo datasheet lo pueden ojear [aqui](http://www.soloelectronica.net/PDF/BC635.pdf). Tambien se puede usar el BC547 para conmutar otros transistores que necesiten voltajes o corrientes mas altos.

Por ultimo el pinout tiene la siguiente configuracion:
![Pinout del BC547](/images/BC547-pinout.gif)

Este primer ejemplo era bastante sencillo. Vayamos con algo un poco mas complejo.

## Circuitos Integrados

Los circuitos integrados son como su nombre un circuito completo integrado dentro de un [encapsulado](a "Un encapsulado es la carcasa en la que viene un componente") lo mas chico posible.

Hace poco tuve que modificar un circuito que usaba como nucleo el integrado CD4047, el cual dejo su datasheet [aca](http://pdf.datasheetcatalog.com/datasheets/90/109077_DS.pdf). Usaremos este integrado como ejemplo.

Paso a traducir el parrafo inicial de el datasheet:
>El CD4047 es capaz de operar tanto de forma monoestable o astable. Requiere un capacitor y una resistencia externos para determinar el ancho del pulso en el modo monoestable, y la frecuencia de salida en el modo astable.  
El modo astable es habilitado tanto con un estado alto en la entrada ASTABLE o con un pulso bajo en la entrada !ASTABLE (es mi forma de indicar negacion). La frecuencia de salida (a un 50% de ancho de pulso) en los pines Q y !Q es determinada por los componentes de sincronizacion.
>

Me detengo ahi pues a mi me indicaron, y lo pude ver en el circuito, que el integrado esta operando en modo astable. Asi que, que decia ahi arriba?  
Bueno, basicamente que este integrado lo que hace es generar una señal complementaria con un ancho de pulso del 50% en los pines Q y Q!. La frecuencia de esta señal estara determinada por el valor que tengan los componentes que van conectados en los pines RC, que son basicamente una resistencia y un capacitor.

Mas abajo en la tercer pagina tenemos la tabla de valores maximos y caracteristicas electricas.
![Caracteristicas electricas](/images/leer-un-datasheet-2.png)
Algo importante en los circuitos integrados es mirar el voltaje de alimentacion. Trabajar con el voltaje de alimentacion maximo no es recomendable, siempre tratar de que sea un valor estandar que represente como mucho el 80% del valor maximo. En el caso de este integrado esta funcionando a 15V.

Otro dato en este caso es el voltaje y corriente de salida de la señal de frecuencia, ya que como necesito esa señal para operar transistores MOSFET de alta potencia, este valor me deja claro que antes debo amplificarla o no lograria excitar (si, se dice asi) las compuertas de los mismos.

En esta tabla vemos que tenemos unas columnas con valores de temperatura en grados celcius. Estos valores son la temperatura de el ambiente en el que esta trabajando el integrado. Los valores nominales o tipicos casi siempre se toman considerando una temperatura ambiente de 25°C. En otros datasheets tal vez no veamos columnas con las temperaturas, pero si estara indicado en algun lugar las condiciones en las que estos parametros fueron fijados.

Un poco mas abajo llegamos a la seccion de graficos de rendimiento, aqui llamada "Typical Performance Characteristics".
![Caracteristicas de rendimiento](/images/leer-un-datasheet-3.png)
Por lo general, estos graficos nos muestran como se relacionan 2 o mas parametros en el integrado. Muchos puede que pasen de largo esta seccion, pero siempre hay datos importantes que rescatar.  

Estos dos graficos mostrados arriba señalan que tan precisos seran los tiempos de la señal dependiendo de el voltaje de alimentacion que hayamos usado. Y salta a la vista que mientras mas bajo sea el voltaje, mas imprecisos seran los tiempos.  
Esto me fue muy util a mi ya que habia hecho los calculos para saber que componentes usar para lograr la frecuencia que queria, pero cuando lo probaba diferia bastante de lo esperado. Despues de ver este grafico me di cuenta que al integrado se lo estaba alimentando con 10V, muy por debajo del valor ideal que es 15V. Corregi eso y mejoro notablemente la precision del calculo.

En otros circuitos integrados o con transistores, estos graficos pueden ser muy utiles si tratamos de controlar el voltaje o la corriente que entregan, o si tenemos problemas de ruido electronico.

Y al igual que con el BC547, por ultimo veremos el pinout del integrado. 
![Pinout CD4047](/images/leer-un-datasheet-4.png)
De este diagrama sacamos algo interesante, que es que este integrado, como lo decia la descripcion, tiene pines que funcionan como Enable, o habilitacion. Esto es muy util para control de potencia, pues se podria implementar un PWM con estos pines. Ya dedicare otro post para desarrollar este concepto.

## Conclusiones

El datasheet de un componente es un documento que fue hecho para ayudarnos a sacarle el maximo rendimiento. Todos los datos que nos ofrece tienen una utilidad. Pero los principales siempre se resumen en la primera pagina. Siempre prestar mucha atencion a la tabla de valores maximos y a la de caracteristicas electricas. Y al menos ojear los graficos de rendimiento por si hay algo que nos pueda servir.

Espero que te hayas llevado algo provechoso de este articulo.  
Nos vemos en el siguiente.