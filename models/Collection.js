const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    collection_id: String,
    description: String,
    image_url: String,
    owner: String,
});

module.exports = mongoose.model('Collection', collectionSchema);