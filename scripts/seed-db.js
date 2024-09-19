const { faker } = require('@faker-js/faker');

// connect to DB
const { connectToDB } = require('../helpers/db');

// Load models
const ProductOld = require('../schemas/ProductSchema');
const Product = require('../schemas/ProductSchemaWithPredicates');

const count = 100_000;

(async () => {
    await connectToDB();

    const fakeProducts = faker.helpers.multiple(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ symbol: '$' }),
        department: faker.commerce.department(),
        material: faker.commerce.productMaterial(),
        stock: faker.number.int({ min: 0, max: 1000 }),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        createdAt: faker.date.past(),
    }), { count });

    await Product.collection.drop();
    await ProductOld.collection.drop();

    console.log('cleared DB successfully!');

    // insert data
    await Product.insertMany(fakeProducts);
    await ProductOld.insertMany(fakeProducts);

    console.log('successfully seeded DB!');

    // create indexes
    await Product.createIndexes();
    await ProductOld.createIndexes();

    console.log('successfully created indexes!');

    process.exit();
})();
