const mongoose = require('mongoose');
const { create } = require('./userModel');

const galarySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minLength: [4, "title must be at least 4 characters"],
    },
    discription: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
        minLength: [20, "description must be at least 20 characters"],
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    }
    ,
    createAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },

    views: [{

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        times: {
            type: Number,
            default: 1,
            required: true
        }

    }
    ],
    reqTimes: {
        type: Number,
        default: 0,
        required: true,
    }

});

module.exports = mongoose.model('Galary', galarySchema);