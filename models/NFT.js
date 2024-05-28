const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    name: String,
    collection_id: String,
    description: String,
    image_url: String
});

module.exports = mongoose.model('NFT', nftSchema);