export type CreateGroupBodyRequestTypes = {
  title: string;
  bio?: string;
  imagePath?: string;
};
export type GroupTypes = {
  groupId?: string;
  title?: string;
  bio?: string | null;
  ownerId?: string;
  imagePath?: string | null;
  owner?: OwnerTypes;
  updatedAt?: Date;
  createdAt?: Date;
};
export type AddAdminBodyRequestTypes = {
  userId: string;
  groupId: string;
};
export type AddMemberToGroupBodyRequestTyps = {
  userId: string;
  groupId: string;
};
export type GetAllGroupsQueryTypes = {
  owner: string;
};
export type OwnerTypes = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  bio: string | null;
  email: string;
  areaCodeId: string;
  createdAt: Date;
};
