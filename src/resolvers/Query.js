function feed(parent, args, ctx, info) {
    return ctx.prisma.links()
}

function link(parent, args, ctx, info) {
    return ctx.prisma.link({id: args.id}, info)
}

const info = () => `This is the API of a Hackernews Clone`

module.exports = {
    feed,
    link,
    info
}