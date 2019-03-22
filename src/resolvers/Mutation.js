const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, ctx, info) {
    const user = await ctx.prisma.user({ email: args.email })
    
    if(!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)

    if(!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET )

    return {
        token, 
        user,
    }
}

function post(parent, args, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId }},
    })
}

function deleteLink(root, args, ctx, info) {
    return ctx.prisma.deleteLink({id: args.id}, info)
}

function updateLink(root, args, ctx, info) {
    return ctx.prisma.updateLink({
        where: {id: args.id}, 
        data: {url: args.url, description: args.description}
    }, info)
}


module.exports = {
    signup,
    login,
    post
}