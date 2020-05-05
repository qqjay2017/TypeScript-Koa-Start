
import mongoose from "mongoose";

/**
 * 注意:
 * Document定义的是ts  string小写开头
 * Schema是mongoose类型  大写开头
 */
export type HeroDocument = mongoose.Document & {
    heroId: {type:string,unique:true},
    name: string,
    alias: string,
    title: string,
    roles: string[],
    isWeekFree: string,
    attack: number,
    defense: string,
    magic: string,
    difficulty: string,
    selectAudio: string,
    banAudio: string
};


const heroSchema = new mongoose.Schema({
    heroId: {type:String,unique:true},
    name: String,
    alias: String,
    title: String,
    roles: Array,
    isWeekFree: String,
    attack: Number,
    defense: String,
    magic: String,
    difficulty: String,
    selectAudio: String,
    banAudio: String
}, { timestamps: false });


/**
 * modelName  大写开头单数,自动转成小写开头复数
 * BaseHero会变成 baseheros 
 * 第三个参数指定collectionName,这样就可以用我们的自定义名称了
 */
export const Hero = mongoose.model<HeroDocument>("baseHero", heroSchema,'baseHeros');


