import { privateClient } from '@/core/private_client'
import {
  DIRECTORY_TYPE_FOLDER,
  DIRECTORY_TYPE_POST,
  type Directory,
  type Folder,
  type Post,
} from '@/models/directory'
import type { ResponseData } from '@/models/response-data'
import {
  DEFAULT_CLASSROOM_ID_PREF_KEY,
  DOWNLOADED_DIRECTORIES_STORE,
} from '@/plugins/constants'
import { AxiosError } from 'axios'
import { get, keys, set } from 'idb-keyval'
import { defineStore } from 'pinia'

export const useDirectoriesStore = (shareType: string, parentId: string) =>
  defineStore('directories-' + shareType + parentId, {
    state() {
      return {
        scrollContainer: <HTMLElement | null>null,
        folders: <Folder[] | undefined>undefined,
        posts: <Post[] | undefined>undefined,
        downloadedFileKeys: <string[]>[],
        page: 0,
        pageLimit: 10,
        directoryType: DIRECTORY_TYPE_FOLDER,
        hasNextPage: true,
        fileLoading: false,
        loadingFolder: false,
        loadingPost: false,
        errorFolder: <string | null>null,
        errorPost: <string | null>null,
        errorSnackbar: <string | null>null,
      }
    },
    actions: {
      async getDirectories(
        type: string,
        parentId: string | null,
        page: number,
        pageLimit: number
      ): Promise<Directory[] | null> {
        if (type === DIRECTORY_TYPE_FOLDER) {
          this.errorFolder = null
          this.loadingFolder = true
        } else {
          this.errorPost = null
          this.loadingPost = true
        }

        const classroomId = localStorage.getItem(
          DEFAULT_CLASSROOM_ID_PREF_KEY
        ) as string

        return await privateClient
          .get<ResponseData<Directory[]>>('/directories', {
            params: {
              type: type,
              classroom_id: classroomId,
              share_type: shareType,
              parent_id: parentId,
              page: page,
              page_limit: pageLimit,
            },
          })
          .then(({ data }) => {
            if (type === DIRECTORY_TYPE_FOLDER) {
              this.loadingFolder = false
            } else {
              this.loadingPost = false
            }

            if (data.success && data.data) {
              return data.data
            } else {
              return Promise.reject(data.message)
            }
          })
          .catch((error) => {
            console.error('directories.ts -> getDirectories', error)

            let err: string | null = null
            if (error instanceof AxiosError) {
              if (error.response) {
                err = error.response?.data?.message ?? ''
              } else {
                err = JSON.stringify(error.toJSON())
              }
            }
            if (type === DIRECTORY_TYPE_FOLDER) {
              this.loadingFolder = false
              this.errorFolder = err
            } else {
              this.loadingPost = false
              this.errorPost = err
            }
            return null
          })
      },
      async loadMore(
        scrollContainer: HTMLElement | null,
        wasScrollEvent: boolean
      ) {
        await this.getDirectories(
          this.directoryType,
          parentId,
          ++this.page,
          this.pageLimit
        )
          .then((newDirectories) => {
            if (this.directoryType === DIRECTORY_TYPE_FOLDER) {
              if (this.folders === undefined) {
                this.folders = []
              }
            } else {
              if (this.posts === undefined) {
                this.posts = []
              }
            }

            if (newDirectories !== null) {
              if (this.directoryType === DIRECTORY_TYPE_FOLDER) {
                this.folders!.push(...(newDirectories as Folder[]))
              } else {
                this.posts!.push(...(newDirectories as Post[]))
              }
              if (newDirectories.length < this.pageLimit) {
                if (this.directoryType === DIRECTORY_TYPE_FOLDER) {
                  this.directoryType = DIRECTORY_TYPE_POST
                  this.page = 0
                } else {
                  this.hasNextPage = false
                }
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
      async refresh() {
        this.page = 0
        this.hasNextPage = true
        this.folders = undefined
        this.posts = undefined
        this.directoryType = DIRECTORY_TYPE_FOLDER
        await this.loadMore(this.scrollContainer, false)
      },
      async onFilePressed(link: string, name: string, type: string) {
        this.fileLoading = false
        this.errorSnackbar = null

        get<Blob>(link, DOWNLOADED_DIRECTORIES_STORE)
          .then(async (file) => {
            if (!file) {
              const newFile = await this.onDownloadFilePressed(link, name, type)
              if (newFile instanceof Blob) {
                file = newFile
              } else {
                return Promise.reject(file)
              }
            }
            const url = URL.createObjectURL(file)
            open(url)
          })
          .catch((error: Error) => {
            console.error('directories.ts -> onFilePressed', error)
            this.fileLoading = false
            this.errorSnackbar = error.message
          })
      },
      async onDownloadFilePressed(
        link: string,
        name: string,
        type: string
      ): Promise<Blob | Error> {
        this.fileLoading = false
        this.errorSnackbar = null

        return await this.privateClient
          .get<ArrayBuffer>(link, {
            responseType: 'arraybuffer',
          })
          .then(async ({ data, status }) => {
            if (status === 200) {
              this.fileLoading = false
              this.errorSnackbar = null

              const blob = new File([data], name, {
                type: 'application/' + type,
              })
              await set(link, blob, DOWNLOADED_DIRECTORIES_STORE).then(() => {
                return data
              })
              this.downloadedFileKeys.push(link)
              return blob
            } else {
              return Promise.reject(data)
            }
          })
          .catch((error) => {
            console.log('directories.ts -> onDownloadFilePressed', error)
            this.fileLoading = false

            if (error instanceof AxiosError) {
              if (error.response) {
                this.errorSnackbar = error.response?.data?.message ?? ''
              } else {
                this.errorSnackbar = JSON.stringify(error.toJSON())
              }
            } else {
              this.errorSnackbar = error.message
            }
            return error
          })
      },
      async getDownloadedFileKeys() {
        await keys(DOWNLOADED_DIRECTORIES_STORE)
          .then((keys) => {
            this.downloadedFileKeys = keys.map((key) => key.toString())
          })
          .catch((error) => {
            console.log('directories.ts -> getDownloadedFileKeys', error)
          })
      },
      onFolderPressed(folder: Folder) {
        this.router.push({ name: 'folders', params: { folderId: folder.id } })
      },
    },
  })
