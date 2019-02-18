const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(console.log('connected to database...'))
    .catch(err=>{console.log('could not connect',err)});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price:Number
});

const Course = mongoose.model('Course',courseSchema);

async function getCourse(){
    return await Course
    .find({isPublished: true, tags: {$in:['frontend', 'backend']}})
    .sort({price: -1})
    .select({name: 1, author: 1, price: 1});
}

async function run(){
    const result = await getCourse();
    console.log(result);
}
run();