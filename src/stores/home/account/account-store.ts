import type { User } from '@/models/auth'
import type { ClassroomMember } from '@/models/classroom-member'
import type { ResponseData } from '@/models/response-data'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state() {
    return {
      loading: false,
      error: <string | null>null,
      showQrDialog: false,
      user: <User | undefined>undefined,
      classroomMember: <ClassroomMember | undefined>undefined,
    }
  },
  actions: {
    async getProfile() {
      this.loading = true

      await this.privateClient
        .get<ResponseData<User>>('/user/profile')
        .then(({ data }) => {
          if (data.success) {
            const user = data.data
            this.user = user
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('account-store.ts -> getProfile', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.error = error.response?.data?.message ?? ''
            } else {
              this.error = JSON.stringify(error.toJSON())
            }
          } else {
            this.error = error.message
          }
        })
      this.loading = false
    },
    async getClassroomMember() {
      this.loading = true

      const classroomId = localStorage.getItem(
        DEFAULT_CLASSROOM_ID_PREF_KEY
      ) as string

      await this.privateClient
        .get<ResponseData<ClassroomMember>>(
          '/classrooms/' + classroomId + '/members/profile'
        )
        .then(({ data }) => {
          if (data.success && data.data) {
            const classroomMember = data.data
            this.classroomMember = classroomMember
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('account-store.ts -> getClassroom', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.error = error.response?.data?.message ?? ''
            } else {
              this.error = JSON.stringify(error.toJSON())
            }
          } else {
            this.error = error.message
          }
        })
      this.loading = false
    },
    goToMembers() {
      this.router.push({ name: 'members' })
    },
    goToSettings() {
      this.router.push({ name: 'settings' })
    },
    exitClass() {
      this.router.push({ name: 'join' })
    },
    signOutAccount() {
      this.router.push({ name: 'in' })
    },
  },
})
