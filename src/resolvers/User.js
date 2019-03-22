function links(root, args, ctx) {
    return ctx.prisma.user({ id: root.id }).links()
}

module.exports = {
    links,
}