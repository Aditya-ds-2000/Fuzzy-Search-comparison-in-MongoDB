const { connectToDB } = require('../helpers/db');
const compareObjects = require('../helpers/compareTables');

// load models
const ProductOld = require('../schemas/ProductSchema');
const Product = require('../schemas/ProductSchemaWithPredicates');

(async () => {
    await connectToDB();

    const { executionStats: execStats1 } = await Product
        .fuzzySearch(
            { query: 'soft' },
            { department: 'Garden' }
        ).explain();

    const { executionStats: execStats2 } = await ProductOld
        .fuzzySearch(
            { query: 'soft' },
            { department: 'Garden' }
        ).explain();

    compareObjects(
        execStats1,
        execStats2,
        'With Equality Predicate',
        'Without Equality Predicate'
    );

    process.exit(0);
})();
