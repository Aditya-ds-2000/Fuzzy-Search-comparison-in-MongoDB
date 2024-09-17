const Table = require('cli-table3');

const compareObjects = (obj1, obj2, header1 = 'Object 1 Value', header2 = 'Object 2 Value') => {
    const table = new Table({
        head: ['Key', header1, header2],
        colWidths: [30, 30, 30]
    });

    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    keys.forEach(key => {
        table.push([
            key,
            obj1[key] !== undefined ? JSON.stringify(obj1[key]) : 'undefined',
            obj2[key] !== undefined ? JSON.stringify(obj2[key]) : 'undefined'
        ]);
    });

    console.log(table.toString());
};

module.exports = compareObjects;
