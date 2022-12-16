import type { Classroom } from '@/models/classroom'
import type { ResponseData } from '@/models/response-data'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useCreateClassroomStore = defineStore('create-classroom', {
  state() {
    return {
      loading: false,
      error: <string | null>null,
      name: '',
      description: '',
      studentId: '',
    }
  },
  getters: {
    nameRules: () => [(v: string) => !!v || 'Nama kelasnya harus diisi yah'],
    descriptionRules: () => [
      (v: string) => v.length <= 256 || 'Gak boleh kepanjangan deskripsinya',
    ],
    studentIdRules: () => [(v: string) => !!v || 'NIM nya harus diisi yah'],
  },
  actions: {
    async onCreatePressed() {
      this.loading = true

      await this.privateClient
        .post<ResponseData<Classroom>>('/classrooms', {
          name: this.name,
          description: this.description,
          student_id: this.studentId,
        })
        .then(({ data }) => {
          if (data.success && data.data) {
            const classroom = data.data

            localStorage.setItem(DEFAULT_CLASSROOM_ID_PREF_KEY, classroom.id)

            this.router.push({ name: 'overview' })
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('create-classroom-store.ts -> onCreatePressed', error)

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
    goToJoinClassroom() {
      this.router.push({ name: 'join' })
    },
  },
})
