const { error } = require('node:console');
const fs = require('node:fs');

function covertInput() {
    let input = "";
    let input_list = [];
        input = fs.readFileSync('./input_3.txt', 'utf8');
        input = input.split("\n");
        input.forEach((data, index) => {
            input_list.push(data.trim().split(""));
        })

    return input_list;
}
function* range(from, to, step = 1) {
    let value = from;
    while (value <= to) {
        yield value;
        value += step;
    }
}

function containsSpecialChars(input) {
    return isNaN(input) && input !== "."
}

function isNumber(char) {
    if (typeof char !== 'string') {
        return false;
    }

    if (char.trim() === '') {
        return false;
    }

    return !isNaN(char);
}

const special_chars = new Set();
const input_list = covertInput();
const input_not_symbol = [];
for (y = 0; y < input_list.length; y++) {
let isPrevSpcl = true;
    for (x = 0; x < input_list[y].length; x++) {
        if (isNumber(input_list[y][x])) {
            if (!isPrevSpcl) {
                let concatNum = input_not_symbol.pop();
                concatNum.check = concatNum.check.concat(input_list[y][x])
                input_not_symbol.push(concatNum)
            } else {
                input_not_symbol.push({ check: input_list[y][x], index_x: x, index_y: y })

            }
            isPrevSpcl = false;
        }
        if (containsSpecialChars(input_list[y][x])) {
            special_chars.add(input_list[y][x])
            isPrevSpcl = true;
        }
        if (input_list[y][x] === ".") {
            isPrevSpcl = true;
        }
    }
}
let out = [];
let out1 =[]

for (let item of input_not_symbol) {
    let test_y_range = [];
    let test_x_range = [];
    let isAdded = false;
    if (item.index_y > 0) {
        test_y_range = [item.index_y - 1, item.index_y + 1]
    }
    if (item.index_y === 0) {
        test_y_range = [item.index_y, item.index_y + 1]
    }
    if (item.index_y === input_list.length - 1) {
        test_y_range = [item.index_y - 1, item.index_y]
    }
    if (item.index_x > 0) {
        test_x_range = [item.index_x - 1, item.index_x + item.check.length  ]
    }
    if (item.index_x === 0) {
        test_x_range = [item.index_x, item.index_x + item.check.length ]
    }
    if (item.index_x === input_list[item.index_y].length - item.check.length) {
        test_x_range = [item.index_x - 1, item.index_x + item.check.length -1 ]
    }
    for (let item_y of range(test_y_range[0], test_y_range[1])) {
        for (let item_x of range(test_x_range[0], test_x_range[1])) {
            if(input_list[item_y][item_x] === undefined) {
               throw Error("error");
            }
            if (special_chars.has(input_list[item_y][item_x])) {
                if (!isAdded) {
                    out.push(item);
                    isAdded = true;
                }
            }
            if (isAdded) break;
        }
        if (isAdded) break;
    }
    if (!isAdded) out1.push(item);
}

let sum = 0;

// calculate sum using forEach() method
out.forEach( num => {
  sum += +num.check;
})

console.log(out1)
console.log(out)
console.log(sum)