Imagine you are senior full stack developer.  This is for an AI4devs certification. Everything must be documented, include a README.md, prompts.md denoting the whole prompting interactions. I want the project to be scalable, following domain-driven design and industry best practices.
It must have a clear and modular structure of captchas and standards.
.env configured to avoid disclosing information such as passwords
.gitignore correct
README.md with instructions for use.
Prompts.md for including the prompts used to achieve the previously described goal.
Issues.md for recording problems and solutions during development. Locally, this has to be stored in /home/mg/Yandex.Disk/L1der/Modulo 3 - 270625/
My intention is to follow the adhered instructions for the project to take place:

1. Download Github's base repository
In this session the base repository in Github is:

@https://github.com/LIDR-academy/AI4Devs-lab-ides-202506

2. Initialize the project
You will find how to start the project (backend, border and database) in the instructions in the readme.MD, read them carefully.


3. Perform the exercise
Once the project is operational, it is time to start contributing to work tickets.

This is the user story to work:

Add candidate to system
As recruiter,
I want to have the ability to add candidates to the ATS system,
So that you can manage your selection data and processes efficiently.

Acceptance criteria:

Function accessibility: There must be a clearly visible button or link to add a new candidate from the main page of the recruiter dashboard.
Data admission form: When selecting the option to add candidate, a form must be presented that includes the necessary fields to capture the information of the candidate as a name, surname, email, telephone, address, education and work experience.
Data validation: The form must validate the data entered to ensure that they are complete and correct. For example, email must have a valid format and mandatory fields should not be empty.
Document load: The recruiter must have the option of loading the CV of the candidate in PDF or Docx format.
Added confirmation: Once the form is completed and the information sent, a confirmation message should appear indicating that the candidate has been added successfully to the system.
Errors and Exception Management: In case of error (for example, failure in the connection with the server), the system must show an adequate message to the user to inform you of the problem.
Accessibility and compatibility: functionality must be accessible and compatible with different devices and web browsers.
Grades:

The interface must be intuitive and easy to use to minimize the training time necessary for new recruiters.
Consider the possibility of integrating autocomplete functionalities for the fields of education and work experience, based on pre -existing data in the system.
Technical tasks:

Implement the user interface for the form of adding candidate.
Develop the necessary backend to process the information entered into the form.
Ensure the security and privacy of the candidate's data.
As you can see, there are 3 necessary technical tasks: develop the backend, the border and the database. Since there is nothing yet in the base project, it will require extra tasks such as creating the data model, launching migration in PostgreSql, etc.

We strongly recommend defining first the 3 work tickets thoroughly, and using them as input for the code assistant.

We expect your delivery as a Pull Request in the repository.
Includes the modified files in their corresponding place, and a prompts-inicial.md file in the root.

To do this, you must follow the following steps:

Make a repository fork (button up to the right)
Clone (download) the fork, which will be a project with the same name but under your user
Complete the exercise: fill the prompt and files
Create a new branch for your deliverable of the Solved-MG type
Make Commit
⁠Git push
In your repository interface you will get a warning up to make ⁠Pull request

This contains the README.md:

LTI - Sistema de Seguimiento de Talento
Este proyecto es una aplicación full-stack con un frontend en React y un backend en Express usando Prisma como ORM. El frontend se inicia con Create React App y el backend está escrito en TypeScript.

Explicación de Directorios y Archivos
backend/: Contiene el código del lado del servidor escrito en Node.js.
src/: Contiene el código fuente para el backend.
index.ts: El punto de entrada para el servidor backend.
prisma/: Contiene el archivo de esquema de Prisma para ORM.
tsconfig.json: Archivo de configuración de TypeScript.
.env: Contiene las variables de entorno.
frontend/: Contiene el código del lado del cliente escrito en React.
src/: Contiene el código fuente para el frontend.
public/: Contiene archivos estáticos como el archivo HTML e imágenes.
build/: Contiene la construcción lista para producción del frontend.
docker-compose.yml: Contiene la configuración de Docker Compose para gestionar los servicios de tu aplicación.
README.md: Este archivo contiene información sobre el proyecto e instrucciones sobre cómo ejecutarlo.
Estructura del Proyecto
El proyecto está dividido en dos directorios principales: frontend y backend.

Frontend
El frontend es una aplicación React y sus archivos principales están ubicados en el directorio src. El directorio public contiene activos estáticos y el directorio build contiene la construcción de producción de la aplicación.

Backend
El backend es una aplicación Express escrita en TypeScript.

El directorio src contiene el código fuente
El directorio prisma contiene el esquema de Prisma.
Primeros Pasos
Para comenzar con este proyecto, sigue estos pasos:

Clona el repositorio.
Instala las dependencias para el frontend y el backend:
cd frontend
npm install

cd ../backend
npm install
Construye el servidor backend:
cd backend
npm run build
Inicia el servidor backend:
cd backend
npm run dev
En una nueva ventana de terminal, construye el servidor frontend:
cd frontend
npm run build
Inicia el servidor frontend:
cd frontend
npm start
El servidor backend estará corriendo en http://localhost:3010 y el frontend estará disponible en http://localhost:3000.

Docker y PostgreSQL
Este proyecto usa Docker para ejecutar una base de datos PostgreSQL. Así es cómo ponerlo en marcha:

Instala Docker en tu máquina si aún no lo has hecho. Puedes descargarlo desde aquí. Navega al directorio raíz del proyecto en tu terminal. Ejecuta el siguiente comando para iniciar el contenedor Docker:

docker-compose up -d
Esto iniciará una base de datos PostgreSQL en un contenedor Docker. La bandera -d corre el contenedor en modo separado, lo que significa que se ejecuta en segundo plano.

Para acceder a la base de datos PostgreSQL, puedes usar cualquier cliente PostgreSQL con los siguientes detalles de conexión:

Host: localhost
Port: 5432
User: postgres
Password: password
Database: mydatabase
Por favor, reemplaza User, Password y Database con el usuario, la contraseña y el nombre de la base de datos reales especificados en tu archivo .env.

Para detener el contenedor Docker, ejecuta el siguiente comando:

docker-compose down
