const { poolPromise } = require('../../AntiGravity/web-backend/db');
poolPromise.then(pool => {
  return pool.request().query("DELETE FROM NovelCategories WHERE CategoryId NOT IN (SELECT Id FROM Categories)");
}).then(() => {
  console.log("Deleted invalid categories.");
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
