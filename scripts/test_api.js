const { poolPromise } = require('../../AntiGravity/web-backend/db');
async function test() {
  const pool = await poolPromise;
  const res = await pool.request().query('SELECT TOP 1 NovelId FROM Reviews');
  if(res.recordset.length) {
    const novelId = res.recordset[0].NovelId;
    const resp = await fetch('http://localhost:3000/api/reviews/' + novelId);
    console.log(await resp.json());
  }
  process.exit(0);
}
test();
