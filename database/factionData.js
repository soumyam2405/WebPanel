const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
    name: String,
    tag: String,
    id: Number,
    createdAt: Date,
});

const factionModel = mongoose.model('factionModel', factionSchema, 'factionData');

async function getFactions() {
    return await factionModel.find().sort({ tag: 1 });
}

async function createFaction(facId, facName, facTag, facCreatedAt) {
    await factionModel.replaceOne({ id: facId }, {
        id: facId,
        name: facName,
        tag: facTag,
        createdAt: facCreatedAt
    }, {
        upsert: true
    });
}

async function findFaction(facId) {
    return await factionModel.findOne({ id: facId});
}

async function removeFaction(facId) {
    return await factionModel.deleteOne({ id: facId });
}

module.exports = {
    getFactions,
    createFaction,
    findFaction,
    removeFaction
}