import mongoose from "mongoose";
  //typescript schema
interface ICodeSchema{
    fullCode:{
        html: string;
        css: string;
        javascript: string
    };
    title: string
    ownerInfo: mongoose.Types.ObjectId | string;
    ownerName: string;
}
//mongoose schema
const CodeSchema = new mongoose.Schema<ICodeSchema>({
    fullCode:{
        html: String,
        css: String,
        javascript: String,
    },
    title: {type: String, required: true},
    ownerInfo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    ownerName: String,
},{timestamps:true});

export const Code = mongoose.model("Code",CodeSchema);