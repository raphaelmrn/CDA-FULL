/**
 * In this challenge, you have to get all the images sent in a conversation (list of messages).
 * Images must be sorted by message datetime they are attached to (recents first, if datetimes are the same, should be sorted by content length).
 * You should not display duplicates. If duplicates are found, the recent one should be kept.
 * This algo is useful to create a medias gallery in a conversation app (such as in WhatsApp conversations)
 *
 * @param messages List of messages with their images
 * @returns All existing images sorted by their parent datetimes (recent first), without duplicates
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  messages,
}: {
  messages: MessageWithImages[];
}): string[] {
  // 1) Associer chaque image à son contexte
  const imageMap = new Map<string, { sentAt: string; contentLength: number }>();

  messages.forEach((message) => {
    message.images.forEach((image) => {
      if (imageMap.has(image)) {
        const existing = imageMap.get(image)!;
        if (
          message.sentAt > existing.sentAt || // Prio message le plus récent
          (message.sentAt === existing.sentAt &&
            message.content.length < existing.contentLength) // si y'a égalité, le contenu plus court
        ) {
          imageMap.set(image, {
            sentAt: message.sentAt,
            contentLength: message.content.length,
          });
        }
      } else {
        imageMap.set(image, {
          sentAt: message.sentAt,
          contentLength: message.content.length,
        });
      }
    });
  });

  // 2) Trier les images par contexte
  return Array.from(imageMap.entries())
    .sort((a, b) => {
      const [_, contextA] = a;
      const [__, contextB] = b;

      if (contextA.sentAt !== contextB.sentAt) {
        return contextB.sentAt.localeCompare(contextA.sentAt); // Tri par sentAt décroissant
      }

      return contextA.contentLength - contextB.contentLength; // Tri par longueur croissant
    })
    .map(([image]) => image);
}

// used interfaces, do not touch
export interface MessageWithImages {
  sentBy: string;
  content: string;
  images: string[];
  sentAt: string;
}
