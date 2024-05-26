const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Adarsh:singh9540@cluster0.yju1yru.mongodb.net/QuizApp');

const QuestionSchema = mongoose.Schema({
    id:Number,
    question:String,
    isCompleted:String,
})

const Ques = mongoose.model("ques",QuestionSchema);

module.exports({
    Ques,
})
