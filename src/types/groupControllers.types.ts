export type CreateGroupBodyRequestTypes = {
  title: string;
  bio?: string;
  imagePath?: string;
};
export type GroupTypes = {
  groupId: string;
  title: string;
  bio: string | null;
  ownerId: string;
  imagePath: string | null;
  updatedAt: Date;
  createdAt: Date;
};
export type AddAdminBodyRequestTypes = {
  userId: string;
  groupId: string;
};
export type AddMemberToGroupBodyRequestTyps = {
  userId: string;
  groupId: string;
};
