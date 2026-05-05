const { poolPromise } = require('../AntiGravity/web-backend/db');
poolPromise.then(pool => pool.request().query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Novels'"))
.then(res => { console.log(res.recordset); process.exit(0); });
