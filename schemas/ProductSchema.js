const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

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

productSchema.index('department');

productSchema.plugin(mongooseFuzzySearching, { fields: ['name'] });

const ProductOld = mongoose.model('ProductOld', productSchema);

module.exports = ProductOld;
