// models/Review.js
const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    employeeToReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default : 0
    },
    feedback: {
        type: String,
        required: true,
        default : 'None'
    },
    status : {
        type : String,
        default : 'Pending'
    }
},{
    timestamps : true
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
