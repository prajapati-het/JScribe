import mongoose from "mongoose";
  //typescript schema
interface ICodeSchema{
    fullCode:{
        html: string;
        css: string;
        javascript: string
    }
}
//mongoose schema
const CodeSchema = new mongoose.Schema<ICodeSchema>({
    fullCode:{
        html: String,
        css: String,
        javascript: String,
    },
});

export const Code = mongoose.model("Code",CodeSchema);