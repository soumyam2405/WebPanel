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
    await factionModel.replaceOne({ id: fac_id }, {
        id: fac_id,
        name: fac_name,
        tag: fac_tag,
        createdAt: fac_createdAt
    }, {
        upsert: true
    });
}

async function findFaction(fac_id) {
    return await factionModel.findOne({ id: fac_id});
}

async function removeFaction(fac_id) {
    return await factionModel.remove({ id: fac_id });
}

module.exports = {
    getFactions,
    createFaction,
    findFaction,
    removeFaction
}