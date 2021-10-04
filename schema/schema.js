const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema} = graphql;
const {getAllBooks, getAllAuthors} = require('../parser/functions')


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {'type': GraphQLString},
        name: {'type': GraphQLString},
        category: {'type': GraphQLString},
        authorId: {'type': GraphQLString},
        author : {
            type: AuthorType,
            resolve (parent, args) {
                return getAllAuthors(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'AuthorGets',
    fields: () => ({
        id: {'type': GraphQLString},
        name: {'type': GraphQLString},
        age: {'type': GraphQLInt},
        'books': {
            type: new GraphQLList(BookType),
            resolve (parent, args) {
                return getAllBooks(0, parent.id);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : {
            type: BookType,
            args: {id: {'type': GraphQLString}},
            resolve (parent, args) { return getAllBooks(args.id); }
        },

        author: {
            type: AuthorType,
            args: {id: {'type': GraphQLString}},
            resolve (parent, args) { return getAllAuthors(args.id) }
        },

        allBooks: {
            type: new GraphQLList(BookType),
            resolve (parent, args) { return getAllBooks() }
        },

        allAuthors: {
            type: new GraphQLList(AuthorType),
            resolve (parent, args) { return getAllAuthors() }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})