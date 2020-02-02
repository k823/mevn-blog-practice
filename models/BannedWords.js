const mongoose = require('mongoose');
 
const BannedSchema = new mongoose.Schema({
    word: String,
    value: {type: Number, default: 5}
});

BannedSchema.methods.toJSONFor = function() {
    return {
        word: this.word,
        value: this.value
    };
};

mongoose.model('BannedWord', BannedSchema);