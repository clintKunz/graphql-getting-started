function postedBy(root, args, ctx) {
    return ctx.prisma.link({ id: parent.id }).postedBy()
}

module.exports = {
    postedBy,
}