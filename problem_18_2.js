const fs = require('node:fs');


function convert() {
    let input = fs.readFileSync('./input_12.txt', 'utf8');
    let lines = input.split('\n');
    for (let y = 0; y < lines.length; y++) {
        lines[y] = lines[y].trim().split(" ")
        lines[y][1] = lines[y][1].split(",")
        lines[y][1] = lines[y][1].map(data=> +data)
        lines[y] = { line : lines[y][0], indexU:lines[y][1]}
      
    }
    return lines
}

let lines = convert()
let unknownLocations = []
console.log(lines)
for(let line of lines) {
   let temp = line.line.split(".");
   let it = {un_val: [], un_no: line.indexU }
   for(let item of temp) {
    if(item.indexOf("?")>=0 || item.indexOf("#")>=0) {
        it.un_val.push(item)
       }
   }
   unknownLocations.push(it)
  
}
console.log(unknownLocations)