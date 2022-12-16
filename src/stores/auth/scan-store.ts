import { defineStore } from 'pinia'

export const useScanStore = defineStore('scan', {
  state() {
    return {
      camera: 'rear',
      error: false,
      torchSupported: false,
      noRearCamera: false,
      noFrontCamera: false,
      torchActive: false,
      initialised: false,
    }
  },
  actions: {
    async onInit(promise: Promise<any>) {
      this.initialised = false
      try {
        const { capabilities } = await promise
        this.torchSupported = capabilities.torch
      } catch (error: any) {
        const triedRearCamera = this.camera === 'rear'
        const triedFrontCamera = this.camera === 'front'
        const cameraMissingError = error.name === 'OverconstrainedError'

        if (cameraMissingError) {
          if (!this.noRearCamera && triedRearCamera) {
            this.switchCamera()
            this.noRearCamera = true
            this.onInit(promise)
            return
          } else if (!this.noFrontCamera && triedFrontCamera) {
            this.switchCamera()
            this.noFrontCamera = true
            this.onInit(promise)
            return
          } else {
            this.camera = 'auto'
          }
        }
      } finally {
        this.initialised = true
      }
      this.error = false
    },
    onDecode(content: string) {
      this.camera = 'off'

      const url = new URL(content)
      const pathNames = url.pathname.split('/')

      if (
        (url.host === 'localhost:5173' ||
          url.host === 'outclass.azlir.my.id') &&
        pathNames.length === 3 &&
        pathNames[1] === 'join'
      ) {
        this.router.push({
          name: 'joinInsertStudentId',
          params: {
            classCode: pathNames[2],
          },
        })
      } else {
        setTimeout(() => {
          this.camera = 'auto'
          this.error = true
        }, 1000)
      }
    },
    turnTorch() {
      this.torchActive = !this.torchActive
    },
    switchCamera() {
      switch (this.camera) {
        case 'front':
          this.camera = 'rear'
          break
        case 'rear':
          this.camera = 'front'
          break
        default:
          this.camera = 'front'
      }
    },
  },
})
