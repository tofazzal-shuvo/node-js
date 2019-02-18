const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(console.log('Database is connected....'))
    .catch(err => console.error('could not connect to MongoDB...',err));

    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: {type: Date, default: Date.now()},
        isPublished: Boolean,
        price:Number
    });
    
    const Course = mongoose.model('course',courseSchema);

async function updateCourse(id){
    const course = await Course.findById(id);
    //console.log(course);
    if(!course)return;
    course.isPublished = true;
    course.author = 'New Author';
    const result = await course.save()
    console.log(result);
    
}
updateCourse('5c5b3afd48442c175ccaebc6');