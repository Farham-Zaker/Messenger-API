export type SendMessageBodyRequest = {
  messageId: string;
  text: string;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
  replyOf: string | null;
  mediaId: string | null;
  privateChatId: string | null;
  groupId: string | null;
  channelId: string;
};