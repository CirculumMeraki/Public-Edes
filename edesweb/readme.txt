README.TXT	   Versión 08.03

PASOS A SEGUIR PARA CREAR UN PROYECTO DE INTRANET CON E-DES

SOBRE Windows y Linux instalar los paquetes completos de WAMP o LAMP que hay en internet.

Referencias:
http://www.apachefriends.org
Ultima versión: XAMPP 1.6.6 PARA WINDOWS
	Apache HTTPD 2.2.8 + Openssl 0.9.8g
	MySQL 5.0.51
	PHP 5.2.5
	PHP 4.4.8 (RC2)
	phpMyAdmin 2.11.4
	FileZilla FTP Server 0.9.25
	Mercury Mail Transport System 4.52

Ultima versión: XAMPP 1.6.6 PARA LINUX
	Apache 2.2.8
	MySQL 5.0.51a
	PHP 5.2.5 & 4.4.8 & PEAR + SQLite 2.8.17/3.3.17 + multibyte (mbstring) support
	Perl 5.10.0
	ProFTPD 1.3.1
	phpMyAdmin 2.11.4
	OpenSSL 0.9.8e
	GD 2.0.1
	Freetype2 2.1.7
	libjpeg 6b 
	libpng 1.2.12
	gdbm 1.8.0
	zlib 1.2.3
	expat 1.2
	Sablotron 1.0
	libxml 2.6.31
	Ming 0.3
	Webalizer 2.01
	pdf class 009e
	ncurses 5.8
	mod_perl 2.0.2
	FreeTDS 0.63
	gettext 0.11.5
	IMAP C-Client 2004e
	OpenLDAP (client) 2.3.11
	mcrypt 2.5.7
	mhash 0.8.18
	eAccelerator 0.9.5.2
	cURL 7.17.1
	libxslt 1.1.8
	phpSQLiteAdmin 0.2
	libapreq 2.08
	FPDF 1.53
	XAMPP Control Panel 0.6

	Si instalas La versión de Xampp para Windows, anula las lineas que estan en la Etiqueta [Zend] que ha creado en el fichero "c:\xampp\apachebin\php.ini", reinicia el apache e instala la ultima versión del optimizador descargandoleta de zend.com.Esto se explica en el apartado mas adelante de ZEND OPTIMIZER.


http://www.appsrvnetwork.com
Ultima versión: AppServ 2.5.9 
	Apache 2.2.4 
	PHP 5.2.3 
	MySQL 5.0.45 
	phpMyAdmin-2.10.2 

http://www.wampserver.com
Ultima versión: Wampserver 2.0a 
	Apache 2.2.6
	MySQL 5.0.45
	PHP 5.2.5



PASOS A SEGUIR CON UN MODELO COMPATIBLE UTILIZANDO LA DISTRIBUCION XAMPP:

	APACHE
	- Ejemplo instalación XAMPP "c:\xampp"
	- Probar Apache--> http://localhost
	- Editar
		"c:\xampp\apache\conf\httpd.conf"
		Añadir la siguiente linea en su directiva correspondiente.
		AddType application/x-httpd-php .gs  Para que Apache entienda las extensiones .gs como ficheros php.
	- En el fichero de Apache "mime.types" incluir:
		application/x-ms-application application
	PHP

	- Editar "c:\xampp\apache\bin\php.ini"
		Modificar las siguientes lineas si no están activas
			register_globals = On
			open_basedir = Off
			php_errormsg = On
			track_errors = On
			magic_quotes_gpc = On
			auto_detect_line_endigs = On
			session.save_path = "...."

	ZEND OPTIMIZER 

	- Instalar la ultima versión del Optimizador de ZEND (www.zend.com)
	- Se añadiran automáticamente al final del fichero "c:\xampp\apache\bin\php.ini" las siguientes lineas

		[Zend]
		zend_extension_manager.optimizer_ts="c:\xampp\zenoptimizer\lib\Optimizer-3.3.0" ; Donde se haya instalado
		zend_extension_ts="c:\xampp\zenoptimizer\lib\ZendExtensionManager.dll" ; Donde se haya instalado
	- Para instalar la licencia hay que añadir la siguiente linea
		zend_optimizer.license_path = "c:\xampp\htdocs\edesweb\license_edes.zl" ; El fichero de licencia se encuentra dentro del directorio raiz de edesweb.

	PDFLIB 7.0

	- Crear directorio "c:\xampp\pdflib"
	- Copiar de "c:\xampp\pdflib\bind\php520\libpdf_php.dll" en "c:\xampp\php\ext"
	- Editar "c:\xampp\apache\bin\php.ini"
	- Comprobar esta linea extension_dir = "c:\xampp\php\ext"
	- Crear directiva siguiente:
		extension = libpdf_php.dll
	- Anular directiva siguiente
		;extension=php_pdf.dll

2- CONFIGURACION DEL NAVEGADOR INTERNET EXPLORER 6 o SUPERIOR. (http://www.e-des.org/navegador.gs)

3- INSTALAR E-DES.

	- Descomprimir el fichero edesweb.zip en un directorio dentro de "c:\web\apache\htdocs" se creara un directorio "c:\xampp\apache\htdocs\edesweb".
	- Las Intranet que tu desarrolles se situaran al mismo nivel que EDES. 
	- En el caso de instalar una Intranet en una maquina de producción se debe crear un directorio "c:\web\apache\htdocs\aplicacion\http" y configurar el http.conf del servidor apache con "DocumentRoot "c:\web\apache\htdocs\aplicacion\http" y el <Directory "c:\web\apache\htdocs">. 
	Con esto se consigue acceso al directorio EDES desde cualquier Intranet compartiendo el motor y máxima seguridad no permitiendo desde fuera,acceso a los programas de la aplicación porque en el root solo estarían situados ficheros sin trascendencia, como graficos,etc.

4- ARRANCAR "gsCreate" PARA CONFIGURAR Y CREAR UNA INTRANET NUEVA.

	- Para ejecutar "gsCreate" hay que entrar en la aplicación "edesweb.php" llamando a http://localhost/edesweb/http/edes.php?gscreate
	- Pedirá nombre de usuario y contraseña. El nombre de usuario es el "LOGIN DE PROGRAMADOR". La contraseña es la que se introduzca por primera vez. Esta pantalla de autentificación saldrá siempre que se entre en el entorno de desarrollo dentro de una Intranet.
	- Al ejecutar  http://localhost/edesweb/http/edes.php?gscreate por primera vez puede mostrarte una pantalla con las indicaciones precisas para que configures tu navegador de forma automatica. Tendras que entrar nuevamente para que los cambios se produzcan. 

5- DEFINIR SQL.

	- En el apartado "Definir SQL" se pondrán las tablas en orden en que se quieran las opciones y los campos dentro de la tabla en el orden que quieras que aparezca en las fichas aunque posteriormente se podrán mover.
	- En la definición del SQL hay que tener en cuenta que cualquier campo por el que se quiera buscar de forma transparente ha de estar creado como no NULL, usar los tipos de datos mas adecuados ( TEXT, TINYTEXT, MEDIUMTEXT, BLOB, TINYBLOB, MEDIUMBLOB ), y los campos de búsqueda mas frecuentes con índice.

	- Nombre de campos "cd_" / "nm_".  Esto permite facilidad de relación en tablas auxiliares que con el nombre el motor eDes sabe encontrarlas.

	- Si antes del label ponemos una "," el campo se situará a la derecha del anterior.

		#Tab: Expedientes
		#Forder:
		CREATE TABLE prueba (             # Nombre carpeta: "Prueba"
			campo01 char(2),          # Label campo01: Descripción si hace falta
			campo02 char(2),          #,Label campo02: Descripción si hace falta
			...
			PRIMARY KEY (campo01),
			...
		);

	- El "Nombre carpeta" se utiliza además para el título de la ficha/listado pudiendo poner "/" para indicar el plural
	- Si se quiere crear menus sin crear la tabla se utilizará el comando "#Menu: NombreMenu : NombreScript".

6- ENTRAR A LA INTRANET.

	- Para entrar en la aplicación se utiliza como login por defecto user@mail.com, parametrizado en gscreate y el password por defecto, pudiendo cambiarse despues, esto te da acceso como usuario si quieres poder editar los fuentes tienes que poner al final de la "password" tu clave de desarrollador separada por el caracter "&", tu clave de desarrollo tiene que ir en minúsculas para ello al meterla tienes que tener pulsada la tecla "shift".

	Ejemplo de acceso directo: http://localhost/miintranet/edes.php?user@mail.com&CLAVE&clavedesarrollo

	- Una vez en la aplicación el menú de desarrollo se activa pulsando el boton derecho estando situado encima del arbol de opciones o CTRL + BOTON DERECHO RATON.

7- MAS INFORMACION EN LA PAGINA www.e-des.org

Nota: El manual se encuentra en el directorio "edesweb\t\manuales\edes.chm".
