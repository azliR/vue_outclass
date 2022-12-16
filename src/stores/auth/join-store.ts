import type { ClassroomMember } from '@/models/classroom-member'
import type { ResponseData } from '@/models/response-data'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useJoinStore = defineStore('join', {
  state() {
    return {
      valid: false,
      loading: false,
      error: <string | null>null,
      studentId: '',
      classCode: '',
    }
  },
  getters: {
    classCodeRules: () => [
      (v: string) => !!v || 'Kode kelasnya harus diisi yah',
      (v: string) =>
        (v && v.length === 16) || 'Kode kelasnya harus ada 16 karakter yah',
    ],
    studentIdRules: () => [(v: string) => !!v || 'nya harus diisi yah'],
  },
  actions: {
    async onJoinPressed() {
      this.loading = true

      await this.privateClient
        .post<ResponseData<ClassroomMember>>('/classrooms/join', {
          class_code: this.classCode,
          student_id: this.studentId,
        })
        .then(({ data }) => {
          if (data.success && data.data) {
            const classroomMember = data.data

            localStorage.setItem(
              DEFAULT_CLASSROOM_ID_PREF_KEY,
              classroomMember.classroom_id
            )

            this.router.push({ name: 'overview' })
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('signup-store.ts -> onSignUpPressed', error)

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
    goToScanCode() {
      this.router.push('scan')
    },
  },
})
