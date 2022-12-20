export interface CreatePostDto {
  name: string
  description: string | null
  files?: File[]
}

export interface UpdatePostDto {
  parent_id: string | null
  name: string | null
  description: string | null
  files?: File[]
}

export interface CreateFolderDto {
  name: string
  description: string | null
  color: string
}

export interface UpdateFolderDto {
  parent_id: string | null
  name: string | null
  description: string | null
  color: string | null
}
