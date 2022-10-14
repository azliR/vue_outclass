import { defineStore } from 'pinia';

export const useScanStore = defineStore('join', {
  state() {
    return {
      camera: 'auto',
      error: false,
      torchSupported: false,
      noRearCamera: false,
      noFrontCamera: false,
      torchActive: false,
    };
  },
  actions: {
    async onInit(promise: Promise<any>) {
      try {
        const { capabilities } = await promise;
        this.torchSupported = capabilities.torch;
      } catch (error: any) {
        const triedRearCamera = this.camera === 'rear';
        const triedFrontCamera = this.camera === 'front';
        const cameraMissingError = error.name === 'OverconstrainedError';

        if (cameraMissingError) {
          if (!this.noRearCamera && triedRearCamera) {
            this.switchCamera();
            this.noRearCamera = true;
            this.onInit(promise);
            return;
          } else if (!this.noFrontCamera && triedFrontCamera) {
            this.switchCamera();
            this.noFrontCamera = true;
            this.onInit(promise);
            return;
          } else {
            this.camera = 'auto';
          }
        }
        console.error(this.camera);
        console.error(error);
      }
      this.error = false;
    },
    async onDecode(content: string) {
      this.camera = 'off';

      if (content.length === 6 && !isNaN(Number(content))) {
        this.router.push({ name: 'home' });
      } else {
        setTimeout(() => {
          this.camera = 'auto';
          this.error = true;
        }, 1000);
      }
    },
    turnTorch() {
      this.torchActive = !this.torchActive;
    },
    switchCamera() {
      switch (this.camera) {
        case 'front':
          this.camera = 'rear';
          break;
        case 'rear':
          this.camera = 'front';
          break;
        default:
          this.camera = 'front';
      }
    },
  },
});
