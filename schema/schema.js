const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema} = graphql;

const books = [
    {'id':'1', 'authorId':'1', name:'chidinma', 'category':'Soul music'},
    {'id':'2', 'authorId':'1', name:'The titans', 'category':'Soul music'},
    {'id':'3', 'authorId':'3', name:'John F kennedy', 'category':'Soul music'},
    {'id':'4', 'authorId':'4', name:'Timeline of love', 'category':'Soul music'}
]

const authors = [
    {'id':'1', name:'Stanley chukwu', 'age':55},
    {'id':'2', name:'Uche chukwu', 'age':24},
    {'id':'3', name:'Nonso chukwu', 'age':33},
    {'id':'4', name:'Chinaza chukwu', 'age':70}
]

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
                return authors.find(ech => ech.id == parent.authorId);
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
                return books.filter(ech => ech.authorId == parent.id);
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
            resolve (parent, args) {
                return books.find(ech => ech.id == args.id);
            }
        },

        author: {
            type: AuthorType,
            args: {id: {'type': GraphQLString}},
            resolve (parent, args) {
                return authors.find(ech => ech.id == args.id);
            }
        },

        allBooks: {
            type: new GraphQLList(BookType),
            resolve (parent, args) {
                return books
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})