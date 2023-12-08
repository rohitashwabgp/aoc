const fs = require('node:fs');


function covertInput() {
    let input = "";
    let input_cards = [];
    input = fs.readFileSync('./input_7.txt', 'utf8');
    input = input.split("\n");
    input.forEach((data, index) => {
        input_cards.push(data.trim().split(" "))
    })

    return { input_cards };
}
function arrayRemove(arr, value) {
    let count = arr.length
    arr = arr.filter(function (inp) {
        return inp != value;
    });
    let removecount = count - arr.length;
    return { arr, removecount }
}

function filterJ(arr) {
    let count = arr.length
    arr = arr.filter(function (inp) {
        return inp === "J";
    });
    let countJ = count - arr.length;
    return { arr, countJ }
}


function check5OfKind(input) {
    input = input.split("")
    let tempJ = arrayRemove(input, "J")
    if (tempJ.removecount === 5) {
        return 1;
    } else {
        let temp = arrayRemove(tempJ.arr, tempJ.arr[0])
        if(temp.removecount === 5) {
            return 1;
        }else if (temp.removecount + tempJ.removecount === 5) {
            return 1;
        } else {
            return null;
        }
    }

}

function check4OfKind(input) {
    input = input.split("")
    let tempJ = arrayRemove(input, "J")
    if (tempJ.removecount === 4) {
        return 2;
    } else {
        let temp = arrayRemove(tempJ.arr, tempJ.arr[0])
        if (temp.removecount  === 4) {
            return 2;
        } else if (temp.removecount + tempJ.removecount === 4) {
            return 2;
        } else {
            temp = arrayRemove(temp.arr, temp.arr[0])
            if (temp.removecount  === 4) {
                return 2;
            } else if (temp.removecount + tempJ.removecount === 4) {
                return 2;
            }
        }
    }
    return null
}

function checkfullhouseandthreeofkind(input) {
    input = input.split("")
    let isThreeSame = false;
    let prev1 = null;
    let prev2 = null;
    let item_to_remove = "J";
    let tempJ = arrayRemove(input, item_to_remove)
    input = tempJ.arr;
    if (tempJ.removecount === 3) {
        isThreeSame = true;
        tempJ.removecount = 0;
    }
    while (input.length > 0) {
        item_to_remove = input[0];
        let temp = arrayRemove(input, item_to_remove)
        input = temp.arr;
        if (temp.removecount === 3) {
            isThreeSame = true;
        } else if (temp.removecount + tempJ.removecount === 3) {
            isThreeSame = true;
            tempJ.removecount = tempJ.removecount - (3 - temp.removecount)
        } else {
            if (temp.removecount == 2) {
                prev1 = item_to_remove
                prev2 = item_to_remove
            } else if (isThreeSame && temp.removecount + tempJ.removecount == 2) {
                prev1 = item_to_remove
                prev2 = item_to_remove
                tempJ.removecount = tempJ.removecount - (2 - temp.removecount)
            }
            if (prev1 === null) prev1 = item_to_remove;
            if (prev1 !== item_to_remove && prev2 === null) prev2 = item_to_remove;
        }
    }
    if (isThreeSame) {
        if (prev1 === prev2) {
            return 3
        } else {
            return 4
        }
    } else {
        return null;
    }
}

function check_two_or_one_pair(input) {
    input = input.split("")
    let countPair = 0;
    let item_to_remove = "J";
    let tempJ = arrayRemove(input, item_to_remove)
    input = tempJ.arr;
    if (tempJ.removecount === 2) {
        countPair = countPair + 1;
        tempJ.removecount = 0;
    }
    while (input.length > 0) {
        let temp = arrayRemove(input, input[0])
        input = temp.arr;
        if (temp.removecount === 2) {
            countPair = countPair + 1;
        } else if (temp.removecount + tempJ.removecount === 2) {
            countPair = countPair + 1;
            tempJ.removecount = tempJ.removecount - 1;
        }
    }
    return countPair >= 2 ? 5 : countPair >= 1 ? 6 : null;
}
function compare(item1, item2) {
    let compare_array = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
    for (let i = 0; i < item1[0].split("").length; i++) {
        if (compare_array.indexOf(item1[0].split("")[i]) < compare_array.indexOf(item2[0].split("")[i]))
            return item1;
        else if (compare_array.indexOf(item2[0].split("")[i]) < compare_array.indexOf(item1[0].split("")[i])) {
            return item2;
        }
    }

    return null;
}
let { input_cards } = covertInput();
input_cards.sort((a, b) => {
    let kindfirst = check5OfKind(a[0]);
    if (!kindfirst) {
        kindfirst = check4OfKind(a[0])
    }
    if (!kindfirst) {
        kindfirst = checkfullhouseandthreeofkind(a[0])
    }
    if (!kindfirst) {
        kindfirst = check_two_or_one_pair(a[0])
    }
    let kindsecond = check5OfKind(b[0]);
    if (!kindsecond) {
        kindsecond = check4OfKind(b[0])
    }
    if (!kindsecond) {
        kindsecond = checkfullhouseandthreeofkind(b[0])
    }
    if (!kindsecond) {
        kindsecond = check_two_or_one_pair(b[0])
    }
    if (kindfirst === null) kindfirst = 7
    if (kindsecond === null) kindsecond = 7
    if (kindfirst === kindsecond) {
        let ro = compare(a, b)
        if (ro === a) {
            return 1
        }
        else {
            return -1
        }
    } else {
        return kindsecond - kindfirst
    }
})
let out = 0;
let index = 1;
for (let item of input_cards) {
    out = out + (index * +item[1])
    index++;
}

console.log(out)
