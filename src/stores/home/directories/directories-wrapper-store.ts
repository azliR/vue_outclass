import type {
  CreateFolderDto,
  CreatePostDto,
  UpdateFolderDto,
  UpdatePostDto,
} from '@/dtos/directory'
import type { Folder, Post } from '@/models/directory'
import type { ResponseData } from '@/models/response-data'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export interface Breadcrumb {
  folderId: string | null
  folderName: string
}

export const useDirectoriesWrapperStore = defineStore('directories-wrapper', {
  state() {
    const router = useRouter()
    const currentPath = router.currentRoute.value.path
    const rootPath = `/${currentPath.split('/')[1]}/${
      currentPath.split('/')[2]
    }`

    const index = folderTabs.findIndex((tab) => tab.path === rootPath)

    return {
      currentFolder: <Folder | null>null,
      tempPost: <Post | null>null,
      tempFolder: <Folder | null>null,
      selectedTabIndex: index,
      breadcrumbs: <Breadcrumb[]>[],
      folderTabs: folderTabs,
      errorSnackbar: <string | null>null,
      postDialog: false,
      folderDialog: false,
      deletePostDialog: false,
      deleteFolderDialog: false,
    }
  },
  actions: {
    async getCurrentFolder(folderId: string): Promise<Folder | null> {
      return await this.privateClient
        .get<ResponseData<Folder>>(`/directories/${folderId}`)
        .then(({ data }) => {
          if (data.success && data.data) {
            return (this.currentFolder = data.data)
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            this.errorSnackbar = JSON.stringify(error.toJSON())
          }
          return null
        })
    },
    async getBreadcrumbs(folderId: string | undefined) {
      let breadcrumb: Breadcrumb
      if (folderId) {
        const folder = await this.getCurrentFolder(folderId)
        this.currentFolder = folder

        const parentDirectoryId = (folderId as string) ?? null

        breadcrumb = {
          folderId: parentDirectoryId,
          folderName: folder?.name ?? 'Berkas',
        }
      } else {
        this.currentFolder = null
        breadcrumb = {
          folderId: null,
          folderName: 'Berkas',
        }
      }
      const index = this.breadcrumbs.findIndex(
        (e) => e.folderId === breadcrumb.folderId
      )

      if (index != -1) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1)
      } else {
        this.breadcrumbs.push(breadcrumb)
      }
    },
    async createFolder(createFolderDto: CreateFolderDto): Promise<boolean> {
      const shareType = folderTabs[this.selectedTabIndex].path.split('/')[2]

      const classroomId = localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY)

      return await this.privateClient
        .post<ResponseData<Folder>>('/directories/folders', {
          parent_id: this.currentFolder?.parent_id,
          classroom_id: shareType === 'class' ? classroomId : null,
          name: createFolderDto.name,
          color: createFolderDto.color,
          description: createFolderDto.description,
        })
        .then(({ data }) => {
          if (data.success) {
            return true
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('folders-wrapper.ts -> createNewFolder', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          return false
        })
    },
    async updateFolder(updateFolderDto: UpdateFolderDto): Promise<boolean> {
      return await this.privateClient
        .put<ResponseData<Folder>>(
          '/directories/folders/' + this.tempFolder?.id,
          {
            name: updateFolderDto.name,
            color: updateFolderDto.color,
            description: updateFolderDto.description,
          }
        )
        .then(({ data }) => {
          if (data.success) {
            return true
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('folders-wrapper.ts -> updateFolder', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          return false
        })
    },
    async deleteFolder(): Promise<boolean> {
      return await this.privateClient
        .delete<ResponseData<null>>('/directories/' + this.tempFolder?.id)
        .then(({ status, data }) => {
          if (status === 204) {
            return true
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('folders-wrapper.ts -> deleteFolder', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          return false
        })
    },
    async createPost(createPostDto: CreatePostDto): Promise<boolean> {
      console.log(
        '⛔ | file: directories-wrapper-store.ts:183 | createPost | createPostDto',
        createPostDto
      )
      const shareType = folderTabs[this.selectedTabIndex].path.split('/')[2]

      const classroomId = localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY)
      if (classroomId === null) {
        return false
      }

      const formData = new FormData()
      formData.append('parent_id', this.currentFolder?.parent_id ?? '')
      formData.append('classroom_id', shareType === 'class' ? classroomId : '')
      formData.append('name', createPostDto.name)
      formData.append('description', createPostDto.description ?? '')
      createPostDto.files?.forEach((file) => {
        formData.append('files', file)
      })

      return await this.privateClient
        .post<ResponseData<Post>>('/directories/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => {
          if (data.success) {
            return true
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('folders-wrapper.ts -> createNewPost', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          return false
        })
    },
    async updatePost(updatePostDto: UpdatePostDto): Promise<boolean> {
      return await this.privateClient
        .put<ResponseData<Post>>('/directories/folders/' + this.tempPost?.id, {
          name: updatePostDto.name,
          description: updatePostDto.description,
        })
        .then(({ data }) => {
          if (data.success) {
            return true
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('folders-wrapper.ts -> updatePost', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          return false
        })
    },
    async deletePost(): Promise<boolean> {
      return await this.privateClient
        .delete<ResponseData<null>>('/directories/' + this.tempPost?.id)
        .then(({ status, data }) => {
          if (status === 204) {
            return true
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('folders-wrapper.ts -> deletePost', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
          return false
        })
    },
    onTabChange(i: number) {
      const newTab = folderTabs[i]
      const currentPath = this.router.currentRoute.value.path
      const rootPath = `/${currentPath.split('/')[1]}`

      this.folderTabs = this.folderTabs.map((tab) => {
        if (tab.path === rootPath) {
          if (newTab.path === rootPath) {
            newTab.currentPath = tab.path
          } else {
            tab.currentPath = currentPath
          }
        }
        return tab
      })

      this.router.push(newTab.currentPath)
      this.selectedTabIndex = i
    },
    onAddFolderPressed() {
      this.folderDialog = true
    },
    onUpdateFolderPressed(folder: Folder) {
      this.folderDialog = true
      this.tempFolder = folder
    },
    onDeleteFolderPressed(folder: Folder) {
      this.deleteFolderDialog = true
      this.tempFolder = folder
    },
    onCloseFolderPressed() {
      this.folderDialog = false
      this.tempFolder = null
    },
    onCloseDeleteFolderPressed() {
      this.deleteFolderDialog = false
      this.tempFolder = null
    },
    async onSaveFolderPressed(directoriesStore: any, folder: CreateFolderDto) {
      this.folderDialog = false
      const result = this.tempFolder
        ? await this.updateFolder({
            parent_id: this.tempFolder.parent_id,
            name: folder.name,
            color: folder.color,
            description: folder.description,
          })
        : await this.createFolder({
            name: folder.name,
            color: folder.color,
            description: folder.description,
          })
      if (result) {
        await directoriesStore.refresh()
      }
      this.tempFolder = null
    },
    onAddPostPressed() {
      this.postDialog = true
    },
    onUpdatePostPressed(post: Post) {
      this.postDialog = true
      this.tempPost = post
    },
    onDeletePostPressed(post: Post) {
      // this.deletePostDialog = true
      this.tempPost = post
    },
    onClosePostPressed() {
      this.postDialog = false
      this.tempPost = null
    },
    onCloseDeletePostPressed() {
      this.deletePostDialog = false
      this.tempPost = null
    },
    async onSavePostPressed(directoriesStore: any, post: CreatePostDto) {
      this.postDialog = false
      const result = this.tempPost
        ? await this.updatePost({
            parent_id: this.tempPost.parent_id,
            name: post.name,
            description: post.description,
          })
        : await this.createPost({
            name: post.name,
            description: post.description,
            files: post.files,
          })
      if (result) {
        await directoriesStore.refresh()
      }
      this.tempPost = null
    },
    onBackPressed() {
      if (this.currentFolder?.parent_id) {
        this.router.push({
          name: 'folders',
          params: { folderId: this.currentFolder.parent_id },
        })
      } else {
        this.router.push({
          name: 'rootFolders',
        })
      }
    },
  },
})

export default interface FolderTab {
  title: string
  alert: string
  path: string
  currentPath: string
}

const folderTabs = <FolderTab[]>[
  {
    title: 'files.folderTabs.class.title',
    alert: 'files.folderTabs.class.alert',
    path: '/folders/class',
    currentPath: '/folders/class',
  },
  {
    title: 'files.folderTabs.shared.title',
    alert: 'files.folderTabs.shared.alert',
    path: '/folders/group',
    currentPath: '/folders/group',
  },
  {
    title: 'files.folderTabs.personal.title',
    alert: 'files.folderTabs.personal.alert',
    path: '/folders/personal',
    currentPath: '/folders/personal',
  },
]
