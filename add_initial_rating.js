const { poolPromise } = require('../AntiGravity/web-backend/db');

async function fix() {
  const pool = await poolPromise;
  try {
    // Check if InitialRating exists
    const check = await pool.request().query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Novels' AND COLUMN_NAME = 'InitialRating'");
    if (check.recordset.length === 0) {
      await pool.request().query("ALTER TABLE Novels ADD InitialRating FLOAT NULL");
      await pool.request().query("UPDATE Novels SET InitialRating = Rating WHERE Rating IS NOT NULL AND Rating > 0");
      console.log("Added InitialRating column and populated it.");
    } else {
      console.log("InitialRating already exists.");
    }
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
fix();
