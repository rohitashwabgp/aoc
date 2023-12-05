const fs = require('node:fs');

function covertInput() {
    let input = "";
    let input_list = [];
    input = fs.readFileSync('./input_4.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        input_list.push(data.trim());
    })

    return input_list;
}

function parse() {
    let card_details = [];
    for (let item of covertInput()) {
        let master = item.split("|");
        let data = master[1].trim().split(" ");
        data = data.filter(it => !['', "", " ", undefined, null].includes(it))
        let masterData = master[0].trim().split(":");
        let card_no = Number(masterData[0].substring(5));
        card_details.push({ master: masterData[1].trim().split(" ").filter(it => !['', "", " ", undefined, null].includes(it)), card_no, data })
    }
    return card_details;
}

function match() {
    let matching_details = [];
    let card_details = parse();
    for (let item of card_details) {
        let line_out = 0;
        for (let data of item.data) {
            if (item.master.includes(data)) {
                line_out = line_out + 1;
            }
        }
        matching_details.push({ card_no: item.card_no, match_count: line_out, card_count: 1 })
    }
    return matching_details;
}

function process() {
    let matching_details = match();
    for (let item of matching_details) {
        for (let step = 1; step <= item.match_count; step++) {
            let card = matching_details.find(data => {
                return data.card_no === item.card_no + step
            })
            card.card_count = card.card_count + (item.card_count * 1);
        }
    }
    return matching_details;
}
let matching_details = process();
let count = 0;
for (let item of matching_details) {
    count = count + item.card_count;
}

console.log(count)