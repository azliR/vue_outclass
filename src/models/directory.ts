export const DIRECTORY_TYPE_FOLDER = 'folder';
export const DIRECTORY_TYPE_POST = 'post';

export interface Directory {
  id: string;
  parent_id: string;
  owner_id: string;
  classroom_id: string;
  name: string;
  type: 'folder' | 'post';
  color: string | null;
  description: string | null;
  files: File[] | null;
  shared_with: UserWithAccess[] | null;
  last_modified: Date;
  date_created: Date;
}

export interface Folder {
  id: string;
  parent_id: string;
  owner_id: string;
  classroom_id: string;
  name: string;
  color: string;
  description: string | null;
  shared_with: UserWithAccess[] | null;
  last_modified: Date;
  date_created: Date;
}

export interface Post {
  id: string;
  parent_id: string;
  owner_id: string;
  classroom_id: string;
  name: string;
  description: string | null;
  files: File[];
  shared_with: UserWithAccess[] | null;
  last_modified: Date;
  date_created: Date;
}

export interface File {
  name: string;
  link: string;
  type: string;
  size: number;
}

export interface UserWithAccess {
  user_id: string;
  access: string;
}
