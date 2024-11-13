import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Arg, buildSchema, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
class Book {
	@Field()
	id: string;

	@Field()
	title: string;

	@Field()
	author: string;
}

@InputType()
class BookInput {
	@Field()
	title: string;

	@Field()
	author: string;
}

@Resolver(Book)
class BookResolver {
	@Query(() => [Book])
	getBooks() {
		return books;
	}

	@Query(() => Book)
	getBookById( @Arg("bookId") bookId: string) {
		return books.find((book) => {
			return book.id === bookId;
		});
	}

	@Mutation(() => Book)
	addBook(@Arg("data") {title, author}: BookInput) {
		const lastId = Number(books.at(-1).id);
		const newId = (lastId + 1).toString();
		books.push({ id: newId, title: title, author: author });
		return books.at(-1);
	}
}

// const myTypes = `#graphql
//     type Book {
//         title: String
//         author: String
//         id: ID
//     }

//     type Query {
//         getBooks: [Book]
//         getBookById(bookId: ID): Book
//     }
//     type Mutation {
//         addBook(title:String, author: String): Book
//     }
// `;

const books: Book[] = [
	{
		id: "12",
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		id: "134",
		title: "City of Glass",
		author: "Paul Aster",
	},
];

// const myResolvers = {
// 	Query: {
// 		getBooks: () => {
// 			return books;
// 		},
// 		getBookById: (_, args) => {
// 			return books.find((book) => {
// 				return book.id === args.bookId;
// 			});
// 		},
// 	},
// 	Mutation: {
// 		addBook: (_, args) => {
// 			const lastId = Number(books.at(-1).id);
// 			const newId = (lastId + 1).toString();
// 			books.push({ id: newId, title: args.title, author: args.author });
// 			return books.at(-1);
// 		},
// 	},
// };

const schema = await buildSchema({
	resolvers: [BookResolver]
})

const apiServer = new ApolloServer({schema});

const { url } = await startStandaloneServer(apiServer, {
	listen: { port: 4000 },
});

console.log("Hey, ça marche ! =D");
console.log(url);
