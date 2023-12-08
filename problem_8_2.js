const fs = require('node:fs');


function covert() {
    let input = "";
    let instructions = [];
    let nodes = {};
    let current_node = [];
    input = fs.readFileSync('./input_8.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        if (index === 0)
            instructions = data.trim().split("")
        else {
            if (data.indexOf("=") > 0) {
                let temp = data.trim().split("=");
                let temp1 = temp[1].split("(").join("");
                temp1 = temp1.split(")").join("");
                let ot = temp1.trim().split(",")
                let key = temp[0].trim();
                if (key.endsWith("A")) {
                    current_node.push(key)
                }
                nodes[key] = { L: ot[0].trim(), R: ot[1].trim() };
            }
        }
    })
    return { nodes, instructions, current_node };
}

function all_ends_with_z(current_node) {
    let temp_check = current_node.filter(data => data.endsWith("Z"))
    if (temp_check.length === current_node.length) {
        return true;
    }
    if(temp_check.length === 5){
        console.log("fat gayi")
    }
    return false;
}

function next_step(nodes, current_node, inst) {
    for (let i = 0; i < current_node.length; i++) {
        current_node[i] = nodes[current_node[i]][inst]
    }
    return current_node;
}

function count_steps() {
    let { instructions, nodes, current_node } = covert()
    let count = 0
    while (true) {
        for (let inst of instructions) {
            if (all_ends_with_z(current_node)) {
                return count;
            }          
            current_node = next_step(nodes, current_node, inst);
            count++;
        }
    }
}

let count = count_steps();
console.log(count)

