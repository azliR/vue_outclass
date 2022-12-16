import type { ClassroomMember } from '@/models/classroom-member'
import type { ResponseData } from '@/models/response-data'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useMembersStore = defineStore('members', {
  state() {
    return {
      kickDialog: false,
      loading: false,
      errorSnackbar: <string | null>null,
      classroomMembers: <ClassroomMember[]>[],
      page: 0,
      hasNextPage: true,
      pageLimit: 10,
    }
  },
  actions: {
    async getClassroomMember(
      page: number,
      pageLimit: number
    ): Promise<ClassroomMember[] | null> {
      this.loading = true

      const classroomId = localStorage.getItem(
        DEFAULT_CLASSROOM_ID_PREF_KEY
      ) as string

      return await this.privateClient
        .get<ResponseData<ClassroomMember[]>>(
          '/classrooms/' + classroomId + '/members',
          {
            params: {
              page: page,
              page_limit: pageLimit,
            },
          }
        )
        .then(({ data }) => {
          this.loading = false
          if (data.success && data.data) {
            const classroomMembers = data.data
            return classroomMembers
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('account-store.ts -> getClassroom', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          this.loading = false
          return null
        })
    },
    async loadMore(
      scrollContainer: HTMLElement | null,
      wasScrollEvent: boolean
    ) {
      await this.getClassroomMember(++this.page, this.pageLimit)
        .then((newMembers) => {
          if (newMembers !== null) {
            this.classroomMembers.push(...(newMembers as ClassroomMember[]))
            if (newMembers.length < this.pageLimit) {
              this.hasNextPage = false
            }

            if (wasScrollEvent || !this.hasNextPage) return
            setTimeout(() => {
              if (
                scrollContainer &&
                scrollContainer.scrollHeight <= scrollContainer.clientHeight
              ) {
                this.loadMore(scrollContainer, false)
              }
            }, 500)
          } else {
            this.hasNextPage = false
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
        })
    },
    onBackPressed() {
      this.router.push({ name: 'account' })
    },
  },
})
