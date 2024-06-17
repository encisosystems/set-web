## Intalacion de las librerias
Para instalar las librerias y modulos necesarios usar el siguiente comando: `npm i`

## Ejecución de la aplicación

Para ejecutar la aplicación, se debe ejecutar el comando `npm start` en la terminal. Este comando iniciará un servidor web en el puerto 3000, y abrirá una ventana en el navegador con la aplicación. En caso de que no se abra automáticamente, se puede acceder a la aplicación en la dirección [http://localhost:3000](http://localhost:3000).

## Compilación de la aplicación

Para compilar la aplicación, se debe ejecutar el comando `npm run build` en la terminal. Este comando generará una carpeta llamada `build` en la raíz del proyecto, la cual contiene los archivos necesarios para desplegar la aplicación en un servidor web.

## Ejecución de la aplicación en modo de desarrollo

Para ejecutar la aplicación en modo de desarrollo, se debe ejecutar el comando `npm run dev` en la terminal. Este comando iniciará un servidor web en el puerto 3000, y abrirá una ventana en el navegador con la aplicación. En caso de que no se abra automáticamente, se puede acceder a la aplicación en la dirección [http://localhost:3000](http://localhost:3000).

## Pruebas de la aplicación

Para ejecutar las pruebas de la aplicación, se debe ejecutar el comando `npm test` en la terminal. Este comando ejecutará todas las pruebas unitarias de la aplicación, y mostrará los resultados en la terminal.

## Despliegue de la aplicación en AWS EC2

Para desplegar la aplicación en un servidor web de AWS EC2, se deben seguir los siguientes pasos:

1. Crear una instancia de AWS EC2 con el sistema operativo Amazon Linux 2.
2. Conectarse a la instancia de AWS EC2 a través de Putty.
3. Instalar Node.js, npm y git en la instancia de AWS EC2.
4. Clonar el repositorio de la aplicación en la instancia de AWS EC2.
5. Instalar las dependencias de la aplicación con el comando `npm install`.
6. Compilar la aplicación con el comando `npm run build`.
   - Para instalar el paquete `serve` de forma global, se debe ejecutar el comando `npm install -g serve`.
   - Para iniciar el servidor web con el comando `serve -s build -l 3000`.
   - Para acceder a la aplicación en la dirección IP pública de la instancia de AWS EC2. Ejemplo: [http://[ip]:3000](http://[ip]:3000).
7. Iniciar la aplicación con el comando `npm start`.
8. Acceder a la aplicación en la dirección IP pública de la instancia de AWS EC2.

Para detener la aplicación, se debe ejecutar el comando `Ctrl + C` en la terminal.
