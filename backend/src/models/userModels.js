import pool from "../config/dbConfig.js";

const registerFarmerService = async (firstName, lastName, email, passwordHash, district, farmsize, farmingexperience) => {
    try {
        const result = await pool.query(
            "INSERT INTO farmers (first_name, last_name, email, password, district, farmsize, farmingexperience) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [firstName, lastName, email, passwordHash, district, farmsize, farmingexperience]
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
        return result.rows[0];  // Ensure it correctly returns the first row or null
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
