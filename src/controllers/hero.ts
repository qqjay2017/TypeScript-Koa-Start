import { Hero, HeroDocument } from "../models/Hero";
import { ParameterizedContext, Next } from "koa";


// export const getBaseHero = async (ctx: ParameterizedContext, next: Next) => {
//    
// }
export const getBaseHero = async (ctx: ParameterizedContext) => {
    
    const str = '之'

    /**
     * 第一个参数  条件
     * 第二个参数 回来的内容 0不要 1要
     * 第三个参数 options
     */
    const baseHero = await Hero.find({
        name: RegExp(`${str}`,'ig')
    },{ magic: 0 },{
        limit:10,
        sort:{
            attack:-1
        }
    }).collation({
        locale:'en',
        numericOrdering:true
    })


    ctx.body =baseHero
    // const hero = new Hero({
    //     "heroId": "999",
    //     "name": "黑暗之女99",
    //     "alias": "Annie",
    //     "title": "安妮",
    //     "roles": ["mage"],
    //     "isWeekFree": "0",
    //     "attack": "2",
    //     "defense": "3",
    //     "magic": "10",
    //     "difficulty": "6",
    //     "selectAudio": "https://game.gtimg.cn/images/lol/act/img/vo/choose/1.ogg",
    //     "banAudio": "https://game.gtimg.cn/images/lol/act/img/vo/ban/1.ogg"
    // })
    

    // ctx.body = await hero.save();

};