<script setup lang="ts">
import { useScanStore } from '@/stores/classrooms/scan-store'
import { storeToRefs } from 'pinia'
import { QrcodeStream } from 'vue-qrcode-reader'

const store = useScanStore()
const { onInit, onDecode, turnTorch, switchCamera } = store
const {
  initialised,
  error,
  torchSupported,
  noRearCamera,
  noFrontCamera,
  torchActive,
  camera,
} = storeToRefs(store)
</script>
<template>
  <v-main style="position: relative; background-color: black">
    <qrcode-stream
      class="camera"
      :style="camera === 'front' ? 'transform: scaleX(-1)' : ''"
      :camera="camera"
      :torch="torchActive"
      @decode="onDecode"
      @init="onInit"
    >
      <div class="box"></div>
    </qrcode-stream>
    <div class="control-bar d-flex justify-center">
      <v-btn
        class="mx-1"
        v-if="initialised && torchSupported"
        :prepend-icon="torchActive ? 'mdi-flash-off' : 'mdi-flash'"
        @click="turnTorch"
      >
        Flash
      </v-btn>
      <v-btn
        class="mx-1"
        v-if="initialised && !noRearCamera && !noFrontCamera"
        prepend-icon="mdi-camera-flip"
        @click="switchCamera"
      >
        Switch
      </v-btn>
    </div>
    <v-snackbar v-model="error" color="error">
      Kode yang kamu scan tidak valid!
    </v-snackbar>
  </v-main>
</template>

<style scoped>
.camera {
  position: absolute;
}
.control-bar {
  width: 100%;
  position: absolute;
  bottom: 8%;
}
.box {
  width: 60vmin;
  height: 60vmin;
  margin: 0px auto;
  position: relative;
  padding: 36px;
  outline: 4px solid white;
  border-radius: 24px;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.4);
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  margin: 0 8px;
  background: white;
  box-shadow: 0 0 80px 20px white;
  clip-path: inset(0);
  animation: x 2s ease-in-out infinite alternate, y 4s ease-in-out infinite;
}

@keyframes x {
  to {
    transform: translateY(-100%);
    top: 100%;
  }
}

@keyframes y {
  33% {
    clip-path: inset(-100px 0 0 0);
  }
  50% {
    clip-path: inset(0 0 0 0);
  }
  83% {
    clip-path: inset(0 0 -100px 0);
  }
}
</style>
