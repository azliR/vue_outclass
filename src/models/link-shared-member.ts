enum Access {
  read,
  edit,
}

export interface LinkSharedMember {
  ownerId: string
  access: Access
}
