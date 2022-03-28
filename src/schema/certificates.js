const { Schema, model } = require('mongoose');

const certificatesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
}, {
    collection: 'certificates',
    versionKey: false,
    timestamps: false
})

module.exports = model('certificates', certificatesSchema);