var Table = require('cli-table');
 
// instantiate
var table = new Table({
    head: ['ID Number', 'Product Name', 'Price']
  , colWidths: [100, 100, 100]
});
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    ['First value', 'Second value']
);
 
console.log(table.toString());