const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB, DB_PORT } = process.env;

const db = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB,
  port: DB_PORT,
  ssl: {
    rejectUnauthorized: true,
  }
});

async function insertInitialData(client) {
  const query = `
-- Insert roles in Rols table
    INSERT INTO public."Rols" (id, rol) VALUES
    (1, 'Administrador'),
    (2, 'Directivo'),
    (3, 'Coordinador de semestre'),
    (4, 'Docente'),
    (5, 'Estudiante'),
    (6, 'Visitante')
    ON CONFLICT (id) DO NOTHING;

    -- Insert user with RolId 1 (Administrator)
    INSERT INTO Public."Users"(id, "Avatar", "Nombre", "Password", "Email", "RolId") VALUES
    (1, 'https://lh3.googleusercontent.com/a/ACg8ocIWLEt0bdA6AXvNFm_EV4HlU6nhruO_7R5OPnfSuV2LOaL3qwyd=s288-c-no', 'Carlos Julian', 'emugameplay.tv', 'emugameplay.tv@gmail.com', 1)
    ON CONFLICT (id) DO NOTHING;
  `;

  try {
    await client.query(query);
    console.log('Initial data inserted successfully');
  } catch (error) {
    console.error('Error inserting initial data:', error);
    throw error;
  }
}

async function createTablesIfNotExist(client) {
  const tables = [
    'Rols', 'Users', 'Facultades', 'Programas', 'Pensums', 'Materias',
    'MateriaPorPensums', 'Docentes', 'Estudiantes', 'PeriodoAcademicos', 'Notas'
  ];

  for (const table of tables) {
    try {
      const exists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        );
      `, [table]);

      if (!exists.rows[0].exists) {
        console.log(`Table ${table} not found, creating tables...`);
        const sqlFile = await fs.readFile(path.join(__dirname, 'adatar.sql'), 'utf8');
        await client.query(sqlFile);
        console.log('Tables created successfully');
        break; // Exit loop after creating tables to avoid redundant creation
      } else {
        console.log(`Table ${table} already exists`);
      }
    } catch (error) {
      console.error(`Error checking/creating table ${table}:`, error);
      throw error;
    }
  }
}

async function initDB() {
  let client;
  try {
    client = await db.connect();
    await createTablesIfNotExist(client);
    await insertInitialData(client);
    console.log(`Database ${DB} connected successfully`);
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    if (client) client.release();
  }
}

module.exports = {
  db,
  initDB
};