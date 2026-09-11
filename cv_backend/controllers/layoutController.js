import { LayoutModel } from "../modals/layoutModel.js";

export const getLayouts = async (req, res) =>{
    const layouts = await LayoutModel.find();
    res.json({success:true, layouts})
}
