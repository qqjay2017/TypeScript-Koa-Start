import { ParameterizedContext } from 'koa';

/**
 * GET /cat
 * List of API examples.
 */
export const getCat = (ctx: ParameterizedContext) => {

    ctx.body = "miao";
};