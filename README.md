# Introduction

The HCMUT Student Smart Printing Service (HCMUT_SSPS) is a cutting-edge application designed to streamline and optimize document printing services for students across the university's campuses, by integrating advanced features and ensuring seamless usability.

# Framework

To work in this project, you have to install `Node` with `npm` and `npx` to manage the packets.

## Front-end

This application's UI/UX is built based on ReactJS.

## Back-end

### General notice

This application's server that is responsible for request processing, and data management, etc are built based on NodeJS framework.

To developes back-end, please work in `back-end` branch by type:

```
git checkout -b back-end
```

Before starting to work, please guarantee that you had the newest version of `node_modules` via:

```
npm install
```

You must setup your `.env` file to work correctly.

### Work with database via Prisma

#### Setup the database

We use Prisma to connect and interact with `PostgreSQL`, because the database is local, to work with the database, you should setup your own database with these information:

1. The user name: postgres

2. The database name: HCMUT_SSPS

3. The password: 1

#### Setup the .env file

Please setup your .env file:

```
DATABASE_URL="postgresql://postgres:1@localhost:5432/HCMUT_SSPS"
JWT_SECRET="super-secret"
```

#### Prisma generate and migrate

1. You have to take the information in `scheme.prisma` to the `@prisma\client` to interact with the models via the command

```
npx prisma generate
```

2. To create tables and setup the relations in the database, please type

```
npx prisma migrate dev --name <you migrate name>
```