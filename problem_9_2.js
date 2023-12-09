const fs = require('node:fs');


function covert() {
    let input = "";
    let input_cards = [];
    input = fs.readFileSync('./input_7.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        input_cards.push(data.trim().split(" "))
    })

    return { input_cards };
}