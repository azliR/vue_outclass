import type { CreatePostDto } from '@/dtos/directory'
import { defineStore } from 'pinia'

export const useCreatePostStore = defineStore('create-post', {
  state() {
    return {
      valid: false,
      post: <CreatePostDto>{},
    }
  },
  getters: {
    nameRules: () => [(v: string) => !!v || 'Namanya harus diisi dong'],
    descriptionRules: () => [
      (v: string) => v.length <= 255 || 'Deskripsinya jangan kepanjangan',
    ],
  },
  actions: {
    onFilesDropped(files: File[]) {
      this.post.files = files
    },
  },
})
