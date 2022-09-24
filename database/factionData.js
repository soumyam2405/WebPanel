const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
    name: String,
    tag: String,
    id: Number,
    createdAt: Date,
});

const factionModel = mongoose.model('factionModel', factionSchema, 'factionData');

async function getFactions() {
    return await factionModel.find({});
}

async function createFaction(fac_id, fac_name, fac_tag, fac_createdAt) {
    await factionModel.replaceOne({ fac_id }, {
        fac_id,
        fac_name,
        fac_tag,
        fac_createdAt
    }, {
        upsert: true
    });
}

module.exports = {
    getFactions,
    createFaction
}