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
  imagePath: string | null;
  ownerId: string;
  updatedAt: Date;
  createdAt: Date;
};
export type FindOneChannelParametersTypes = {
  condition: FindOneChannelQueryConditionTypes;
  selectedFields: {
    channels: string[];
    owner?: string[];
    messages?: string[];
  };
};
export type FindOneChannelQueryConditionTypes = {
  channelId: string;
  ownerId?: string;
  member?: {
    userId: string;
    relation: "one to many" | "one to one";
  };
};
export type ChannelTypes = {
  channelId?: string;
  title?: string;
  bio?: string;
  imagePath?: string | null;
  ownerId?: string;
  updatedAt?: Date;
  createdAt?: Date;
};
export type FindOneChannelAdminParametersTypes = {
  condition: {
    adminId?: string;
    userId?: string;
    channelId?: string;
  };
  selectedFields: {
    channels_admins: string[];
    channel: string[];
    user: string[];
  };
};
