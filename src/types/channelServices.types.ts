export type CreateChannelParametersTypes = {
  title: string;
  ownerId: string;
  bio: string;
  imagePath?: string;
};
export type CreatedChannelTypes = {
  channelId: string;
  title: string;
  bio: string;
  imagePath?: string;
  ownerId: string;
  updatedAt: Date;
  createdAt: Date;
};
