import pkg from 'pg';
const { Pool } = pkg;
import { config } from "dotenv";

config({ path: "./config.env" });


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const connectdb = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

export { connectdb, pool };
