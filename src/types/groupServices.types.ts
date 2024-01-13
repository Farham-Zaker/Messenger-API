export type CreateGroupParametersTypes = {
  title: string;
  bio?: string;
  ownerId: string;
  imagePath?: string;
  updatedAt: Date;
};
export type GroupTypes = {
  groupId: string;
  bio: string | null;
  ownerId: string;
  imagePath: string | null;
  updatedAt: Date;
  createdAt: Date;
};
