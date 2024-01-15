const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        re: 'user'
    },
    productName:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('sales', UserSchema);