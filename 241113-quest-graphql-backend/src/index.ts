import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Arg, buildSchema, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class Book extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id: string;
	
	@Field()
	@Column()
	title: string;
	
	@Field()
	@Column()
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
	async getBooks() {
		const books = await Book.find()
		return books;
	}
	
	@Query(() => Book)
	async getBookById( @Arg("bookId") id: string) {
		const book = await Book.findOneByOrFail({id})
		return book;
	}
	
	@Mutation(() => Book)
	async addBook(@Arg("data") {title, author}: BookInput) {
		const book = new Book()
		book.title=title;
		book.author=author;
		await book.save()
		return book;
	}
}

const dataSource = new DataSource({
	entities: [Book],
  
	type: "sqlite",
	database:"./database.sqlite",
  
	synchronize: true,
	logging: true,
  });

dataSource.initialize()

const schema = await buildSchema({
	resolvers: [BookResolver]
})

const apiServer = new ApolloServer({schema});

const { url } = await startStandaloneServer(apiServer, {
	listen: { port: 4000 },
});

console.log("Hey, ça marche ! =D");
console.log(url);
