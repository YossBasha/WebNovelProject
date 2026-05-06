const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('../novel_details.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const modal = document.getElementById('editNovelModal');
if (!modal) {
  console.log("Modal not found!");
  process.exit(0);
}

let parent = modal.parentElement;
let path = [];
while (parent) {
  let id = parent.id ? `#${parent.id}` : '';
  let cls = parent.className ? `.${parent.className.split(' ').join('.')}` : '';
  path.push(`${parent.tagName.toLowerCase()}${id}${cls}`);
  parent = parent.parentElement;
}
console.log(path.reverse().join(' > '));
