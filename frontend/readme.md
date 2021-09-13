Pasos que se deben cumplir para iniciar el Frontend del proyecto Experiencias Diferentes :

1) Clonar el repositorio de la manera que hemos aprendido cuando nos iniciamos en el Backend,

2) Luego en nuestro ambiente local Master / develop, ejecutamos los comandos pertinentes :

2.1) En el Backend tenemos que instalar el módulo cors, npm install cors este es un mecanismo que permite realizar peticiones de origen cruzado, que son no permitidas por defecto por la política de seguridad de los navegadores. Básicamente Permite que se realicen peticiones AJAX del back al front cuando estos estén hospedados en diferentes dominios. En  https://lenguajejs.com/javascript/peticiones-http/cors/ aquí lo explican muy bien.

2.2 ) Posteriormente se agrega en el server.js del backend, las líneas de códigos const cors = (“cors”); y app.use(cors()); así nos permitirá pedir peticiones al backend.

3) Ejecutamos el siguiente comando npx create-react-app nombre de nuestro directorio, este nos crea los archivos y directorios mínimos que comprende el ambiente (react ), para ejecutar nuestro Frontend.

4) Luego vamos app.js y limpiamos los que nos pinta en su interior, a igual con el app.ccs,
en ambos solo dejamos la lineas de código generales.

App.js

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
return (
     <Router>
            <Switch>
                    <Route path="/"></Route>
            </Switch>
     </Router>
);
}
export default App;

App.ccs

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

5) Dentro del proyecto front ejecutamos el comando npm install react-router-dom

6) Las buenas practicas indican que por cada componente debemos crear una carpeta con su index.js y style.ccs Carpeta Componentes…

7) crear un .env e incluir REACT_APP_BACKEND_URL= http:xxx.xxx.xxx:yyyy cabe destacar que el nombre de esta variable en REACT es BACKEND, podemos colocar el nombre que queramos seguido de su url. del backend.

8) Recordad que el archivo .env, debe estar fuera de la carpeta src.

Listo ir por ello.

npm start 

# Estructura del Frontend

frontend
|   node_modules        es un directorio que se crea en la carpeta raíz de nuestro proyecto 
|                       cuando instalamos paquetes o dependencias mediante npm .
|
|   helpers.js          Módulo con funciones de ayuda (formateo de fechas, envio de email...).
│   package.json        Dependencias NPM.
|   package-lock.json   Dependencias NPM. 
|   .env                Variables de entorno usadas por la aplicación.
|   .envExample         Variables de entorno usadas por la aplicación de Ejemplo.
|   readme.md           Este mismo documento que estás leyendo.
|   .gitignore          es un archivo de texto que le dice a Git qué archivos o carpetas      
|                       ignorar en un proyecto. 
|
|
└── public
|    |
|    └── ...
|
└── src     
|    |
|    └── components
|             |
|             └── Header
|                   |
|                   └── index.js
|                       style.js
|    |
|    └── hooks
|    |  
|    └── pages
|    |  
|    └── ...

