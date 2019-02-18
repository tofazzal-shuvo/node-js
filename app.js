const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(console.log('Database is connected....'))
    .catch(err => console.error('could not connect to MongoDB...',err));


const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        maxlength: 200,
        minlength: 3
    },
    category:{
        type: String,
        required: true,
        enum: ['web','mobile','network']
    },
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now()},
    isPublish: Boolean,
    price: {
        type: Number,
        required:function(){return this.isPublish},
        min: 20,
        max: 300
    }
});

const Course = mongoose.model('course',courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'php.js',
        author: 'shuvo',
        tags: [ 'js', 'node', 'script'],
        isPublish: true,
        category: 'web',
        price:20
    });
    try{
        const resut = await course.save();
        console.log(resut);
    }catch (ex) {
        console.log(ex.message);
    }
} 
createCourse();

async function getCourses(){
    const result = await Course
    //.find({author: 'tofazzal',isPublish: true})
    //.find({price: {$gte: 10, $lte: 20}})
    .find({author: {$in: ['tofazzal', 'shuvo']}})
    .limit(10)
    .sort({name: 1,tags: 1})
    .select({name: 1, tags: 1});
    console.log(result);
}

//getCourses();