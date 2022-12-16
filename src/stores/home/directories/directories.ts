import { privateClient } from '@/core/private_client'
import {
  colors,
  DIRECTORY_TYPE_FOLDER,
  DIRECTORY_TYPE_POST,
  type Directory,
  type Folder,
  type Post,
} from '@/models/directory'
import type { ResponseData } from '@/models/response-data'
import { DOWNLOADED_DIRECTORIES_STORE } from '@/plugins/constants'
import { AxiosError } from 'axios'
import { get, keys, set } from 'idb-keyval'
import { defineStore } from 'pinia'
import { useLinksStore } from './links'

export const useDirectoriesStore = (shareType: string, parentId: string) =>
  defineStore('directories-' + shareType + parentId, {
    state() {
      return {
        folders: <Folder[]>[],
        posts: <Post[]>[],
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
        deleteDialog: false,
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

        return await privateClient
          .get<ResponseData<Directory[]>>('/directories', {
            params: {
              type: type,
              classroom_id: '6374de6d18022546ac175b70',
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
            if (newDirectories !== null) {
              if (this.directoryType === DIRECTORY_TYPE_FOLDER) {
                this.folders.push(...(newDirectories as Folder[]))
              } else {
                this.posts.push(...(newDirectories as Post[]))
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
        this.folders = []
        this.posts = []
        this.directoryType = DIRECTORY_TYPE_FOLDER
        await this.loadMore(null, false)
      },
      // async deleteFolder(id: string) {
      //   this.error = null;
      //   this.loading = true;

      //   await this.privateClient
      //     .get<ResponseData<Folder[]>>(API_URL + '/folders' + id)
      //     .then<Folder[]>(({ data }) => {
      //       this.loading = false;
      //       if (data.success && data.data) {
      //         this.error = null;
      //         return data.data;
      //       } else {
      //         return Promise.reject(data.message);
      //       }
      //     })
      //     .catch((error: AxiosError) => {
      //       console.error(
      //         '⛔ ~ file: directories.ts ~ line 69 ~ deleteFolder ~ error',
      //         error
      //       );
      //       this.error = JSON.stringify(error.toJSON());
      //       this.loading = false;
      //     });
      // },
      async onFilePressed(link: string, type: string) {
        if (type === 'link') {
          return
        }
        this.fileLoading = false
        this.errorSnackbar = null

        get<Blob>(link, DOWNLOADED_DIRECTORIES_STORE)
          .then(async (file) => {
            if (!file) {
              const newFile = await this.onDownloadFilePressed(link, type)
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

              const blob = new File([data], 'asasas', {
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
        const linksStore = useLinksStore()
        linksStore.$reset()

        this.router.push({ name: 'folders', params: { folderId: folder.id } })
      },
      getFileIcon(type: string): string {
        if (type === 'pdf') return 'mdi-file-pdf-box'
        else if (type === 'doc' || type === 'docx') return 'mdi-file-document'
        else if (type === 'xls' || type === 'xlsx')
          return 'mdi-google-spreadsheet'
        else if (type === 'ppt' || type === 'pptx') return 'mdi-play-box'
        else if (type === 'zip' || type === 'rar') return 'mdi-zip-box'
        else if (type === 'txt') return 'mdi-text-box'
        else if (type === 'link') return 'mdi-link'
        else if (type === 'mp4' || type === 'avi' || type === 'mkv')
          return 'mdi-movie'
        else if (type === 'mp3' || type === 'wav') return 'mdi-music-box'
        else if (type === 'jpg' || type === 'png' || type === 'jpeg')
          return 'mdi-image'
        return 'mdi-file'
      },
      getFileColor(type: string): string {
        if (type === 'pdf') return 'red'
        else if (type === 'doc' || type === 'docx') return 'blue-darken-2'
        else if (type === 'xls' || type === 'xlsx') return 'green-darken-1'
        else if (type === 'ppt' || type === 'pptx') return 'orange'
        else if (type === 'zip' || type === 'rar') return 'green'
        else if (type === 'txt') return 'grey-darken-1'
        else if (type === 'link') return 'blue-darken-4'
        else if (type === 'mp4' || type === 'avi' || type === 'mkv')
          return 'red-darken-2'
        else if (type === 'mp3' || type === 'wav') return 'blue-grey'
        else if (type === 'jpg' || type === 'png' || type === 'jpeg')
          return 'deep-purple'
        return 'grey'
      },
      getFolderColor(name: string): string | undefined {
        return colors.find((color) => color.key == name)?.color
      },
    },
  })
