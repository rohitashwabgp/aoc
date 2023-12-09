const fs = require('node:fs');


function convert() {
    let input = "";
    let input_cards = [];
    input = fs.readFileSync('./input_9.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
       let temp = data.trim().split(" ")
       temp = temp.map(data=> +data)
        input_cards.push(temp)
    })

    return input_cards;
}

let input = convert();
console.log(input);

function next(check_list) {
    let new_check_list = [];
    for (let j = 0; j < check_list.length - 1; j++) {
        new_check_list.push(check_list[j + 1] - check_list[j])
    }
    return new_check_list;
}
let next_item_list2 = []
for (let item of input) {
    let temp = item;
    let next_item_list = [item];
    while (true) {
        if(temp.length > 0) {
        temp = next(item); 
        item =temp
        next_item_list.push(temp);
        temp = temp.filter(it => it != 0);
        } else {
            break;
        }
    }
    next_item_list2.push(next_item_list)
}

console.log(next_item_list2)

let sum = 0;
for(let item of next_item_list2) {
    for(let it of item) {
        if(isNaN(it[it.length-1])) {
            console.log("here")
        }
        sum = sum +it[it.length-1]
    }
}
console.log(sum)