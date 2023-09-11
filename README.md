# VerdeVoz

VerdeVoz es una aplicación web desarrollada como respuesta a la prueba técnica proporcionada. La plataforma está diseñada para permitir a los usuarios registrarse, iniciar sesión, visualizar un feed de posts y gestionar interacciones basadas en roles específicos de usuario. A través de este proyecto, he buscado no solo cumplir con los requisitos técnicos, sino también demostrar mi adaptabilidad, compromiso y alineación con la misión de Shambala. Adicionalmente, he configurado manualmente un usuario con rol de administrador para facilitar la revisión: `admin@shambala.life` con la contraseña `ShambalaAdmin2023!`.

## Instalación

Usar [pnpm](https://pnpm.io/es/) para instalar VerdeVoz.

```bash
pnpm install
```

Para iniciar ambas aplicaciones de NestJS y NextJS

```bash
pnpm dev
```

## Variables del entorno server

En la carpeta `server` crear un archivo .env con el URI de una base de la base de datos Mongo

- DB_URI=mongodb://[username:password@]host1[:port1],...hostN[:portN]][/[defaultauthdb][?options]]

## Variables del entorno client

En la carpeta `web` agregar un archivo.env.local con las variables de entorno para enlazar FIrebase

- NEXT_PUBLIC_NESTJS_SERVER=http://localhost:4000

- NEXT_PUBLIC_FIREBASE_API_KEY=
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
- NEXT_PUBLIC_FIREBASE_DATABASE_URL=
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
- NEXT_PUBLIC_FIREBASE_APP_ID=

El server está desplegado en https://server-production-0589.up.railway.app/
