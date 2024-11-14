import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";

@InputType()
class AdInput {
	@Field()
	title!: string;
	
	@Field()
	description?: string;

	@Field()
	owner!: string;

	@Field()
	price!: number;

	@Field()
	picture!: string;

	@Field()
	location!: string;
}

@Resolver(Ad)
export class AdResolver {
	@Query(() => [Ad])
	async getAds() {
		const ads = await Ad.find()
		return ads;
	}
	
	@Query(() => Ad)
	async getAdById( @Arg("adId") id: string) {
		const ad = await Ad.findOneByOrFail({id})
		return ad;
	}
	
	@Mutation(() => Ad)
	async createAd(@Arg("data") {title, location, owner, picture, price, description}: AdInput) {
		const ad = new Ad()
		ad.title=title;
		ad.location=location;
		ad.owner=owner;
		ad.picture=picture;
		ad.price=price;
		ad.description=description;
		await ad.save()
		return ad;
	}

	@Mutation(() => Boolean)
	async deleteAdById( @Arg("adId") id: string) {
		return (await Ad.delete({id})).affected

		//@Elie > "Plus complet mais plus lent" (gère les relations)
		// const ad = await Ad.findOneByOrFail({id})
		// ad.remove()
		// return true;
	}

	@Mutation(() => Ad)
	async replaceAdById( @Arg("adId") id: string, @Arg("data") data:AdInput ) {
		let ad = await Ad.findOneByOrFail({id})
		ad = Object.assign(ad, data);
		await ad.save()
		return ad;  

		// Autre méthode, plus verbeuse
		// let ad = await Ad.findOneByOrFail({id})
		// ad.title=title;
		// ad.location=location;
		// ad.owner=owner;
		// ad.picture=picture;
		// ad.price=price;
		// ad.description=description;
		// await ad.save()
		// return ad;
	}

	



}
