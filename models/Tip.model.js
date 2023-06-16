const { mongoose, Schema, model } = require('mongoose');

const tipSchema = new Schema(
    
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        level:{
            type: [String],
            enum:["beginner","intermediate","advanced"],
            required: true

        },
        category: {
            type: [String],
            enum:["category1","category2","category3"],
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }

);

module.exports = model ('Tip', tipSchema);





