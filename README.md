# Delilah Restó API Rest

## Instalación
** · ** Instalar todas las dependencias NPM del archivo "package.json" - *npm install* 

** · ** Completar el archivo ".env" con los datos correspondientes para la conexión a la base de datos (user, pw, host). El mismo tiene también la información sobre el puerto del servidor y la firma para el JWT, si se quisiesen cambiar.

** · ** El archivo "contenido_bd.sql" (dentro de la carpeta /database) contiene el script para crear la base de datos que utiliza la aplicación. Dentro de la base se encuentran usuarios con roles de administrador y cliente, así como productos y pedidos ya creados.

** · ** Ejecutar el archivo "api.js" para iniciar la aplicación - *node api*


## Endpoints
** · ** El archivo "delilah_resto.yaml" contiene la documentación sobre los endpoints de la aplicación y sus respuestas.

** · ** El archivo "postman_collection.json" contiene los JSON's necesarios para realizar las pruebas dentro de Postman.

**/productos**

**/pedidos**

**/usuarios**
