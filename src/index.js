const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, ctx, info) => {
            return ctx.prisma.links()
        }
        //link: (parent, args) => links.find(link => link.id === args.id)
    },

    Mutation: {
        post: (root, args, ctx) => {
            return ctx.prisma.createLink({
                url: args.url,
                description: args.description
            })
        },
        deleteLink: (root, args, ctx, info) => {
            return ctx.prisma.deleteLink({id: args.id}, info)
        },
        updateLink: (root, args, ctx, info) => {
            return ctx.prisma.updateLink(args, {where: {id: args.id}}, info)
        }
        // updateLink: (parents, args) => {
        //     const link = links.find(link => link.id === `link-${args.id}`)
        //     link.url = args.url;
        //     link.description = args.description;
        //     return link;
        // },
        // deleteLink: (parents, args) => {
        //     links = links.filter(link => link.id !== `link-${args.id}`)
        //     return `You deleted link-${args.id}`;
        // }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
