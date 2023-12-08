const fs = require('node:fs');

let start = "";
let i =0;
function covertInput() {
    let input = "";
    let instructions = [];
    let nodes = {};
    input = fs.readFileSync('./input_8.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        if(index ===0)
        instructions = data.trim().split("")
    else {
        
        if(data.length > 3) {
            
            let temp =  data.trim().split("=");
            let temp1 = temp[1].split("(").join("");
            temp1 =temp1.split(")").join("");
            let ot = temp1.trim().split(",")
            let key = temp[0].trim();
            if(i === 0) {
                start = key
                i++
            }
            nodes[key] = { L:ot[0].trim(),  R: ot[1].trim()} ;
        }
    }
    })

    return { nodes, instructions };
}
let {instructions, nodes} = covertInput()
currentNode = "AAA";
destinationNode = "ZZZ";
let count =0
while(currentNode !== "ZZZ") {
for(let inst of instructions) {
    currentNode = nodes[currentNode][inst]
    count++;
}
}
 console.log(count)

