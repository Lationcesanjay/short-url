const mongoose =require('mongoose');
const url = 'mongodb+srv://sanjaymanix:Sanjay%40manix47@cluster0.omqyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/short-url';
async function connectMongoDB(){
    return mongoose.connect(url).then(()=> console.log('Connected to MongoDB'));
}

module.exports = {connectMongoDB};


