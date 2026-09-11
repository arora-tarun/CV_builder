import mongoose from "mongoose";

const layoutSchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    templateKey: String,
});

export const LayoutModel = mongoose.model('Layout', layoutSchema);