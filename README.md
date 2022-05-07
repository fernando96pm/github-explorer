# GitHub explorer

## Funcionalidad
La aplicación solicita un nombre de usuario y un repositorio, y realiza la búsqueda de las Issues asociadas, además de los datos del usuario y del repositorio. Haciendo uso de React Router se puede navegar por las diferentes secciones a través de los enlaces del menú lateral desplegable.
En la sección Issues, se muestra una lista con las issues obtenidas, especificando el título, el autor, la fecha de creación, el número de comentarios y las etiquetas asociadas. El botón 'Details' redirige hacia los detalles de esa Issue, incluyendo la id, la url, la fecha de última actualización y una lista de comentarios si los hubiese. De cada comentario se muestra el autor, el mensaje y las reacciones.
Las secciones User y Repository muestran los datos obtenidos del usuario y repositorio introducidos en la búsqueda. La sección Search redirige al usuario a una nueva búsqueda.

## Gestión de estado
El estado de los datos obtenidos en las peticiones se administra de manera global haciendo uso de Context, gestionando otro tipo de estados de manera local a través de useState. 

## UI
El diseño de los componentes se ha realizado en su mayoría con Tailwinds CSS. Para ciertos componentes se utilizan ficheros css.

## Configuración de plantilla
La configuración del proyecto se ha realizado clonando el repositorio https://github.com/ymulenll/react-webpack5-boilerplate.git y configurando el proyecto para el soporte de TypeScript y Tailwinds CSS. 
- En el paquete config se establecen las configuraciones relativas a Webpack.
- En el fichero babel.config.js se establece la configuración de Babel. 
- Los ficheros tsconfig.json, tailwinds.config.js y postcss.config.js establecen el resto de la configuración. 

## Instalación 
- npm install
- npm / yarn start
