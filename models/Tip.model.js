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
        }
    }

);

module.exports = model ('Tip', tipSchema);

/*
const Tip = require('./path/to/tipModel'); // Assuming you have imported the Tip model

// Accessing the enum arrays for level and category
const levelEnum = Tip.schema.path('level').enumValues;
const categoryEnum = Tip.schema.path('category').enumValues;

// Use the enum arrays as needed
console.log(levelEnum); // Output: ["beginner", "intermediate", "advanced"]
console.log(categoryEnum); // Output: ["category1", "category2", "category3"]

/*By accessing Tip.schema.path('level').enumValues and Tip.schema.path('category').enumValues, you can retrieve the enum arrays defined in the tipSchema model.

Make sure to replace './path/to/tipModel' with the correct path to your Tip model file.

With this approach, you can access the enum arrays dynamically from your model and use them as needed in your code.*/