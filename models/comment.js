const mongoose = require('mongoose')
const mongoosePaginator = require('mongoose-paginate-v2')


const commentSchema = new mongoose.Schema({
    comment: {type: String, required:true},
    toxic: {type: String, required:true},
    severe_toxic: {type: String, required:true},
    obscene: {type: String, required:true},
    threat: {type: String, required:true},
    insult: {type: String, required:true},
    identity_hate: {type: String, required:true},

})

commentSchema.plugin(mongoosePaginator)
module.exports = mongoose.model('comment', commentSchema)