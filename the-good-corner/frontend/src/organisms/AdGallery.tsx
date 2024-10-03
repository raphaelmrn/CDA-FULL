import AdCard, { AdCardProps } from "../molecules/AdCard";

type AdGalleryProps = {
	title:string,
	ads:AdCardProps[]
}
export default function AdGallery(props: AdGalleryProps) {
	return (
		<main className="main-content">
			<h2>{props.title}</h2>
			<section className="recent-ads">
				{props.ads.map((ad) => (
					<AdCard
						key={ad.id}
						id={ad.id}
						picture={ad.picture}
						title={ad.title}
						price={ad.price}
					/>
				))}
			</section>
		</main>
	);
}
