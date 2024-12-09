const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,   
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);   
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    visitHistory: [ {timestamp: {
        type: Date,
        default: Date.now
    }}],
    
},{timestamps: true});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
