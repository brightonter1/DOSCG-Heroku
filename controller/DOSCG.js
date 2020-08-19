
/*

    Assign 1 : Create controller and model called "DOSCG"

*/


/*
    Assign 2 : Function use to find sequence follow (n^2) - n + 3
*/

module.exports.findSequence = function (input) {
    var inputs = input.split(',');
    for (var i = 0; i < inputs.length; i++) {
        if (parseInt(inputs[i])) {
            inputs[i] = Number(inputs[i])
        } else {
            inputs[i] = (i ** 2) - i + 3
        }
    }
    return inputs
}

/*
    Assign 3 : Function to find equation one variable 
*/

function findEquation(num1, num2, result, callback) {
    if (sum(num1, num2) != result) {
        if (isMinus(result)) {
            num2--;
            findEquation(num1, num2, result, callback)
        } else {
            num2++;
            findEquation(num1, num2, result, callback)
        }
    }
    else {
        callback(num2)
    }
}

// Summary two parameter for function : findEquation

function sum(num1, num2) { return num1 + num2 }

// Check result when is minus will return true for function : findEquation

function isMinus(num) {
    if (Math.abs(num) == num) {
        return false
    } else
        return true
}

module.exports.findEquation = findEquation

/*
    Assign 4 : Location Central World and SCG Bangsue
*/

module.exports.location = [
    {
        place: "Central World",
        lat: 13.7465966,
        lng: 100.5393615
    },
    {
        place: "SCG Bangsue",
        lat: 13.8041014,
        lng: 100.5381916
    }
]
