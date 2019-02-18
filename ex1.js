const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(console.log('Database is connected...'))
.catch(err=>{console.log('could not connect',err)});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price:Number
});

const Course = mongoose.model('course',courseSchema);

async function getCourses(){
    const result = await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1});
    console.log(result);
}
getCourses();