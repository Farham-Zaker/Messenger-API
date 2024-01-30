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
export type AddAdminParametersTypes = {
  channelId: string;
  userId: string;
};
export type ChannelAdminTypes = {
  adminId?: string;
  channelId?: string;
  channel?: ChannelTypes;
  userId?: string;
  user?: UserTypes;
};
type UserTypes = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  areaCodeId: string;
  phoneNumber: string;
  bio: string | null;
  email: string | null;
  password: string | null;
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
    userId: string;
    channelId: string;
  };
  selectedFields: {
    channels_admins: string[];
    channel?: string[];
    user?: string[];
  };
};
export type FindOneMemberParametersTypes = {
  condition: {
    userId: string;
    channelId: string;
  };
  selectedFields: {
    channels_members: string[];
    channel?: string[];
    user?: string[];
  };
};
export type ChannelMemberTypes = {
  memberId?: string;
  userId?: string;
  user?: UserTypes;
  channelId?: string;
  channel?: ChannelTypes;
};
