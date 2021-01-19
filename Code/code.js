let { namesArray, datesArray } = require('./data.js');
//The amount of rows you want to generate
const talbeRowsAmount = 100;

//Only the true values will be generatеа
let tableInformation = {
    'index': true,
    'name': true,
    'DATETIME': false,
    'BIT': false,
    'TINYINT': false,
    'INT': false,
}

generateTableInfo(tableInformation, talbeRowsAmount);

function generateTableInfo(tableInformation, tableRowsAmount) {
    let result = 'INSERT INTO your_table_name VALUES\n';
    let arrayOfProperties = [];
    Object.entries(tableInformation).forEach(([key, value]) => {
        if (value === false) {
            delete tableInformation[key];
        } else {
            arrayOfProperties.push(key);
        }
    });

    for (let index = 1; index <= tableRowsAmount; index++) {

        let currentRecord = '';

        for (let arrayIndex = 0; arrayIndex < arrayOfProperties.length; arrayIndex++) {
            switch (arrayOfProperties[arrayIndex]) {
                case 'index':
                    currentRecord += `${index},`;
                    break;
                case 'name':
                    currentRecord += `'${namesArray[randomNumberInRange(0,namesArray.length)]}',`
                    break;
                case 'DATETIME':
                    currentRecord += `'${datesArray[randomNumberInRange(0,datesArray.length)]}',`
                    break;
                case 'BIT':
                    currentRecord += `${randomNumberInRange(0,2)},`
                    break;
                case 'TINYINT':
                    currentRecord += `${randomNumberInRange(0,256)},`
                    break;
                case 'INT':
                    currentRecord += `${randomNumberInRange(-2147483648,2147483648)},`
                    break;
            }

        }
        currentRecord = currentRecord.split(',');
        currentRecord.pop();
        currentRecord = currentRecord.join(', ');
        result += `(${currentRecord}),\n`;
    }

    
    let newText = result.slice(0,-2);
    console.log(newText);
}

function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}  
