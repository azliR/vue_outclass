import type { ClassroomMember } from '@/models/classroom-member'
import type { ResponseData } from '@/models/response-data'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useJoinStore = defineStore('join', {
  state() {
    return {
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
    studentIdRules: () => [(v: string) => !!v || 'NIM nya harus diisi yah'],
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
    goToCreateClassroom() {
      this.router.push({ name: 'createClassroom' })
    },
    goToScanCode() {
      this.router.push({ name: 'scan' })
    },
    signOutAccount() {
      localStorage.clear()
      this.router.push({ name: 'in' })
    },
  },
})
