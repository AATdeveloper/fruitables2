const Joi = require("joi");
const { query } = require("../db/mysql");

const categoryadd = {

    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        description: Joi.string().required().max(100),
        image: Joi.string().allow(''),

    }),


}
const categoryupdate = {

    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        description: Joi.string().required().max(100),
        image: Joi.string().allow(''),

    }),
    params: Joi.object().keys({
        category_id: Joi.string().required().max(24)

    })
}
const categoryget = {

    query: Joi.object().keys({
       category_id: Joi.string().max(5).required(),

    }),

}
const categorydelete = {

    params: Joi.object().keys({
        category_id: Joi.string().required().max(24)

    })
}

module.exports = {
    categoryadd,
    categorydelete,
    categoryget,
    categoryupdate


}
