# Introduction

The HCMUT Student Smart Printing Service (HCMUT_SSPS) is a cutting-edge application designed to streamline and optimize document printing services for students across the university's campuses, by integrating advanced features and ensuring seamless usability.

# Framework

To work in this project, you have to install `Node` with `npm` and `npx` to manage the packets.

## Front-end

This application's UI/UX is built based on ReactJS.

When you pull the new version from this repository to your local, please install new packets.

```bash
npm install
```

## Back-end
This application's server that is responsible for request processing, and data management, etc are built based on the NodeJS framework.

When you pull the new version from this repository to your local, please install new packets.

```bash
npm install
```

To developes back-end, please work in `back-end` branch by type:

```bash
git checkout -b back-end
```

Before starting to work, please guarantee that you had the newest version of `node_modules` via:

```bash
npm install
```

You must setup your `.env` file to work correctly.

### Work with database via Prisma

#### Setup the Docker

The database is hosted by Docker, so you have to install Docker and Docker Desktop to work with the database via this [guideline](https://docs.docker.com/desktop/setup/install/windows-install/).

### Run the database

To make the database active, you should type this command in the `tn01-05` directory:

```bash
docker compose up dev-db -d
```

If you want to turn off the database, type:

```bash
docker compose down
```

#### Setup the .env file

Please setup your .env file:

```bash
DATABASE_URL="postgresql://postgres:1@localhost:5434/HCMUT_SSPS"
JWT_SECRET="super-secret"
```

#### Prisma generate and migrate

Now you can work with your own PostgreSQL database, to apply the schema defined in Prisma to the database, please follow these instructions:

1. You have to take the information in `scheme.prisma` to the `@prisma\client` to interact with the models via the command

```bash
npx prisma generate
```

2. To create tables and setup the relations in the database, please type

```bash
npx prisma migrate dev --name <you migrate name>
```