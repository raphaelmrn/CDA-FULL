/**
 * In this challenge, you have to regroup messages into an array of day based on their
 * sentAt property, messages in a day must be sorted by their sent at prop (oldest first)
 * The main array must be sort chronologically by their day dates (oldest first)
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHours, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [{ content: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" }, { content: "Hello", sentAt: "2020-11-17T11:45:01.721Z" }, { content: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" }]
 * Output: [
 *      {
 *          day: "2020-11-17T00:00:00.000Z",
 *          messages: [
 *              { content: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" },
 *              { content: "Hello", sentAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 *      {
 *          day: "2020-11-18T00:00:00.000Z",
 *          messages: [
 *              { content: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" },
 *          ]
 *      },
 * ]
 *
 * @param messages List of messages, unsorted and not grouped in days
 * @returns Sorted list of days (only days with messages!) with a list of sorted messages of the day
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ messages }: { messages: Message[] }): DayMessages[] {
  const groupedMessages: { [key: string]: Message[] } = {};

  messages.forEach((msg) => {
    const date = new Date(msg.sentAt);
    date.setUTCHours(0, 0, 0, 0);
    const dayKey = date.toISOString();

    if (!groupedMessages[dayKey]) {
      groupedMessages[dayKey] = [];
    }
    groupedMessages[dayKey].push(msg);
  });

  return Object.entries(groupedMessages)
    .map(([day, messages]) => ({
      day,
      messages: messages.sort(
        (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
      ),
    }))
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
}

// used interfaces, do not touch
export interface Message {
  content: string;
  sentBy: string;
  sentAt: string;
  message: string;
}

export interface DayMessages {
  day: string;
  messages: Message[];
}
