export type CreateGroupBodyRequestTypes = {
  title: string;
  bio?: string;
  imagePath?: string;
};
export type AddMemberToGroupBodyRequestTyps = {
  userId: string;
  groupId: string;
};
