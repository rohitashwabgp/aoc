const fs = require('node:fs');


let current_node_indexed = [];
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
                    current_node_indexed.push({ key: key, z_index: 0, mapped: null })
                }
                nodes[key] = { L: ot[0].trim(), R: ot[1].trim() };
            }
        }
    })
    return { nodes, instructions, current_node };
}

function find_z_index(current_node, count) {

    let temp_check = current_node.filter(data => data.endsWith("Z"))
    if (temp_check.length > 0) {
        temp_check.forEach(data => {
            for (let item of current_node_indexed) {
                if (item.mapped === data) {
                    item.z_index = count
                }
            }
        })
    }
    if (temp_check.length === current_node.length) {
        return true;
    }
    return false;
}

function next_step(nodes, current_node, inst) {
    for (let i = 0; i < current_node.length; i++) {
        current_node[i] = nodes[current_node[i]][inst]
        current_node_indexed[i].mapped = current_node[i]
    }
    return current_node;
}

function count_steps() {
    let { instructions, nodes, current_node } = covert()
    let count = 0
    while (true) {
        for (let inst of instructions) {
            if (find_z_index(current_node, count)) {
                return count;
            }
            current_node = next_step(nodes, current_node, inst);
            count++;
        }
        let filter = current_node_indexed.filter(data => data.z_index !== 0)
        if (filter.length === current_node_indexed.length) break;
    }
}

let count = count_steps();
console.log(count)
console.log("GET LCM OF- "+current_node_indexed)

