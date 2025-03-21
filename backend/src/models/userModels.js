import pool from "../config/dbConfig.js";

const registerFarmerService = async (fullName,  email, passwordHash ) => {
    try {
        const result = await pool.query(
            "INSERT INTO farmers (full_name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [fullName, email, passwordHash]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error registering farmer:", error);
        throw new Error("Failed to register farmer");
    }
};


const findFarmerByEmail = async (email) => {
    console.log("🔍 Running findFarmerByEmail with:", email);

    try {
        const result = await pool.query("SELECT * FROM farmers WHERE email = $1", [email]);
        console.log("🔍 Query Result:", result.rows);
        return result.rows[0];  
    } catch (error) {
        console.error("❌ Error in findFarmerByEmail:", error);
        throw new Error("Database query failed");
    }
};


const updateFarmerProfileService = async (id, firstName, lastName, email) =>{
    const result = await pool.query("UPDATE farmers SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING * ",
    [firstName, lastName, email, id]);
    return result.rows[0];
};

const deleteFarmerProfileService = async (id) =>{
    const result = await pool.query("DELETE FROM farmers WHERE id = $1 RETURNING * ", [id])
    return result.rows[0];
};


const getAllFarmersService = async () => {
    const query = "SELECT * FROM farmers"; 
    const result = await pool.query(query);
    return result.rows;
};

export { registerFarmerService, findFarmerByEmail, updateFarmerProfileService, deleteFarmerProfileService, getAllFarmersService };
