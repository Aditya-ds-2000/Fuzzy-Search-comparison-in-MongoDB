const mongoose = require('mongoose');
const fuzzilyMongoose = require('fuzzily-mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

productSchema.plugin(
    fuzzilyMongoose,
    {
        fields: ['name'],
        equalityPredicate: { department: 1 }
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
