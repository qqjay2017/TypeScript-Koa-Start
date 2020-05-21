import {ParameterizedContext} from 'koa'
import {New, NewDetail} from '../models/New'

/**
 * GET /news
 * List of API examples.
 */
export const getNews = async (ctx: ParameterizedContext) => {
    const options = {
        current: 1 * ctx.request.query.current || 1,
        limit: 1 * ctx.request.query.limit || 15
    }
    const news = await New.find(null, null, {
        skip: options.limit * (options.current - 1),
        limit: options.limit
    })


    ctx.body = {
        code:200,
        result:news,
        msg:'请求成功'
    }
};

/**
 * GET /news/:id
 * List of API examples.
 */
export const getNewDetail = async (ctx: ParameterizedContext) => {
    const newDetail = await NewDetail.findOne({itemId: ctx.params.itemId})

    ctx.body = {
        code:200,
        result:newDetail,
        msg:'请求成功'
    }
};