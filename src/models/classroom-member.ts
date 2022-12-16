export const OWNER_CLASSROOM_ROLE = 1
export const ADMIN_CLASSROOM_ROLE = 2
export const MEMBER_CLASSROOM_ROLE = 3

export interface ClassroomMember {
  id: string
  user_id: string
  classroom_id: string
  student_id: string
  name: string
  role: number
  classroom_name: string
  class_code: string
  classroom_description: string
  class_members_count: number
}

export function toRoleString(role: number): string {
  switch (role) {
    case OWNER_CLASSROOM_ROLE:
      return 'Owner'
    case ADMIN_CLASSROOM_ROLE:
      return 'Admin'
    case MEMBER_CLASSROOM_ROLE:
      return 'Member'
    default:
      return 'Unknown'
  }
}

export function fromRoleString(role: string): number {
  switch (role) {
    case 'Owner':
      return OWNER_CLASSROOM_ROLE
    case 'Admin':
      return ADMIN_CLASSROOM_ROLE
    case 'Member':
      return MEMBER_CLASSROOM_ROLE
    default:
      return 0
  }
}
