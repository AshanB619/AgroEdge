import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

console.log(typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL Database!");
});

pool.on("error", (err) => {
    console.error("❌ Database Connection Error:", err);
});


// Function to create the "farmers" table if it doesn't exist
const createFarmersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS farmers (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
        console.log("✅ Farmers table is ready!");
    } catch (error) {
        console.error("❌ Error creating table:", error);
    }
};

// Call the function when the app starts
createFarmersTable();

// Testing the connection by querying the database
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("❌ Error executing query:", err);
    } else {
        console.log("Database time:", res.rows[0]);
    }
});

export default pool;