import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    user : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

const imageModel = mongoose.model("imgs", imageSchema);
export default imageModel;