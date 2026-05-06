const { poolPromise } = require('../../AntiGravity/web-backend/db');
poolPromise.then(pool => pool.request().query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Chapters'"))
  .then(res => { console.log(JSON.stringify(res.recordset.map(r => r.COLUMN_NAME))); process.exit(0); })
  .catch(e => { console.error(e); process.exit(1); });
