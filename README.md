# Admin Pro
---

AdminPro es un proyecto desarrollado en Angular 5, el cual consiste en un gestor de Hospitales. Además, puede probarlo para aprender de una forma eficiente como estructurar los módulos, servicios, pipes de un proyecto grande. 

Este proyecto está estructurado por módulos agrupados por tareas específicas, manteniendo así una estructura organizada, legible y reutilizable.

Las páginas están ordenadas por módulos con sus rutas hijas y se cargan de forma independiente gracias al uso de Lazy Load y Guards para proteger y restringir el acceso a diferentes tipos de usuario, ya tengan permisos de administrador o no.

## Características:
---

+ Comunicación con un backend en Express con MongoDB.
+ Funciones CRUD, busquedas y subida de archivos.
+ Autenticación con Google Sig-in personalizado.
+ Rutas Hijas
+ @inputs, @Outputs, @ViewChild, atributos personalizados, etc...
+ Servicios básicos, temas, rutas básicas y persistencia de los ajustes.
+ Uso Observables y Promesas
+ Uso de Guards
+ Lazy Load
+ Pipes
+ Pages: Las páginas están ordenadas por módulos con sus rutas hijas y se cargan de forma independiente gracias al uso de Lazy Load.
    + Autenticación Normal y mediante Google 


+ Services : Los servicios están organizados en un módulo y almacenados en un fichero index propio para los servicios.
    - Servicio para Médicos
    - Servicio para Usuarios
    - Servicio para Hospitales
    - Servicio para los diferentes Guards desarrollados
        - Admin Guard
        - Login Guard
        - Auto renovar Token
    - Servicio para subir archivos
    - Servicio para opciones
    - Servicio para el sidebar

### Requisitos
---

Requisitos mínimos para montar el proyecto.

| Requisitos| Versión |
| --------- | ------- |
| Angular CLI| 1.6.3|
| Node| 6.11.3|
| Angular| 5.1.3|


### Instalación
---

AdminPro requiere [Node.js](https://nodejs.org/) v5+

Instalar las dependencias y lanzarlo. 
```sh
$ npm install
$ ng serve -o
```

Si desea trabajar de forma completa debe de instalar ***MongoDB*** en el puerto 27017 y el backend propio en ***express*** en el puerto 8080.

El repositorio del backend lo puede encontrar [aquí](https://github.com/jadelmag/backend-server-admin-pro).

### Autor
---

* [Javier Delgado Magdalena](http://www.linkedin.com/pub/javier-delgado-magdalena/33/9a1/226)