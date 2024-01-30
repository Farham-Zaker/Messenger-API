export type CreateChannelRequestBodyTypes = {
  title: string;
  bio: string;
  imagePath?: string;
};
export type AddAdminRequestBodyTypes = {
  channelId: string;
  userId: string;
};
