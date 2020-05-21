
import mongoose from "mongoose";


export type NewDocument = mongoose.Document & {
    itemType: string,
    itemTitle: string,
    itemTime: Date,
    itemId: string
};


const newSchema = new mongoose.Schema({
    itemType: String,
    itemTitle: String,
    itemTime: Date,
    itemId: String
}, { timestamps: false });


export const New = mongoose.model<NewDocument>("new", newSchema,'news');


/**
 * 新闻详情
 */

export type NewDetailDocument = mongoose.Document & {
    itemType: string,
    itemTitle: string,
    itemTime: Date,
    itemId: string,
    detailHtml:string
};


const newDetailSchema = new mongoose.Schema({
    itemType: String,
    itemTitle: String,
    itemTime: Date,
    itemId: String,
    detailHtml:String
}, { timestamps: false });


export const NewDetail = mongoose.model<NewDetailDocument>("newDetail", newDetailSchema,'newDetail');





