const fs = require("fs");
const readline = require("readline-sync");

// Función para solicitar datos al usuario
function promptUser(question) {
  return readline.question(question + " ");
}

// Datos a solicitar al usuario
const DATABASE_USERNAME = promptUser("Enter database username:");
const DATABASE_PASSWORD = promptUser("Enter database password:");
const DATABASE_NAME = promptUser("Enter database name:");

// Contenido del archivo .env
const envContent = `
DATABASE_USERNAME=${DATABASE_USERNAME}
DATABASE_PASSWORD=${DATABASE_PASSWORD}
DATABASE_NAME=${DATABASE_NAME}
`;

// Ruta del archivo .env en la carpeta backend
const envFilePath = "./backend/.env";

// Crear el archivo .env en la carpeta backend
fs.writeFileSync(envFilePath, envContent);

console.log(".env file created successfully.");
