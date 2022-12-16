import type { Token } from '@/models/auth'
import type { Classroom } from '@/models/classroom'
import type { ClassroomMember } from '@/models/classroom-member'
import type { ResponseData } from '@/models/response-data'
import {
  DEFAULT_CLASSROOM_ID_PREF_KEY,
  JWT_TOKEN_PREF_KEY,
} from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useSignInStore = defineStore('signin', {
  state() {
    return {
      showPassword: false,
      loading: false,
      error: <string | null>null,
      email: '',
      password: '',
    }
  },
  getters: {
    emailRules: () => [
      (v: string) => !!v || 'Emailnya harus diisi yah',
      (v: string) => /.+@.+\..+/.test(v) || 'Emailnya enggak valid',
    ],
    passwordRules: () => [(v: string) => !!v || 'Passwordnya harus diisi yah'],
  },
  actions: {
    async onSignInPressed() {
      this.loading = true
      this.error = null

      await this.publicClient
        .post<ResponseData<Token>>('/user/sign/in', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            const token = response.data.data

            localStorage.setItem(JWT_TOKEN_PREF_KEY, JSON.stringify(token))

            this.router.push({ name: 'overview' })
          } else {
            return Promise.reject(response.data.message)
          }
        })
        .catch((error: Error) => {
          console.error('signin-store.ts -> onSignInPressed', error)

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
    async getClassrooms() {
      this.privateClient
        .get<ResponseData<ClassroomMember[]>>('/user/classrooms')
        .then(({ data }) => {
          if (data.success && data.data) {
            // TODO: Hardcode for now, multiple classrooms not supported yet
            const classroom = data.data[0]
            this.getClassroom(classroom.id)
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('signin-store.ts -> getClassrooms', error)

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
    },
    async getClassroom(classroomId: string) {
      this.privateClient
        .get<ResponseData<Classroom>>(`/classrooms/${classroomId}`)
        .then(({ data }) => {
          if (data.success && data.data) {
            const classroom = data.data

            localStorage.setItem(DEFAULT_CLASSROOM_ID_PREF_KEY, classroom.id)
          }
        })
        .catch((error: Error) => {
          console.error('signin-store.ts -> getClassroom', error)

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
    },
    goToSignUpPage() {
      this.router.push({ name: 'up' })
    },
  },
})
