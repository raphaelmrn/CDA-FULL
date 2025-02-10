/**
 * In this challenge, you must find and attach to each ad the ad (or ads)
 * with which the current ad has the most tags in common. This algo will
 * be very useful to get similar products of a given product.
 * Attached ads must be sorted by their title (A to Z).
 * You must not change the order of the main list of ads.
 *
 * @param ads List of ads without closestAds
 * @returns The same list but with a new closestAds prop on each
 */

export default function ({
  ads,
}: {
  ads: AdWithTags[];
}): AdWithTagsAndClosestAds[] {
  return ads.map((ad) => {
    const similarAds = ads
      .filter((otherAd) => otherAd.title !== ad.title)
      .map((otherAd) => ({
        ad: otherAd,
        commonTags: ad.tags.filter((tag) => otherAd.tags.includes(tag)).length,
      }))
      .filter(({ commonTags }) => commonTags > 0)
      .sort((a, b) => {
        if (b.commonTags !== a.commonTags) {
          return b.commonTags - a.commonTags;
        }
        return a.ad.title.localeCompare(b.ad.title);
      })
      .map(({ ad }) => ad);

    return { ...ad, closestAds: similarAds };
  });
}

// used interfaces, do not touch
export interface AdWithTags {
  title: string;
  price: number;
  tags: string[];
}

export interface AdWithTagsAndClosestAds extends AdWithTags {
  closestAds: AdWithTags[];
}
