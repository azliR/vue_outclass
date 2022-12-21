<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits({
  'files-dropped': (files: File[]) => true,
})

const field = ref<HTMLInputElement>()

var isDragging = ref(false)
var files = ref<File[]>([])

function onChange() {
  const fileList = field.value?.files
  if (fileList) {
    const newFiles = [...fileList].filter(
      (file) =>
        !files.value.some(
          (oldFile) =>
            `${oldFile.name}-${oldFile.size}-${oldFile.lastModified}-${oldFile.type}` ===
            `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        )
    )
    files.value.push(...newFiles)
    emit('files-dropped', files.value)
  }
}

function generateThumbnail(file: File) {
  let fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 1000)
  return fileSrc
}

function makeName(name: string) {
  return (
    name.split('.')[0].substring(0, 3) +
    '...' +
    name.split('.')[name.split('.').length - 1]
  )
}
function remove(i: number) {
  files.value.splice(i, 1)
}
function dragover() {
  isDragging.value = true
}
function dragleave() {
  isDragging.value = false
}
function drop(e: DragEvent) {
  const newFiles = e.dataTransfer?.files
  if (newFiles) {
    field.value!.files = newFiles
  }
  onChange()
  isDragging.value = false
}
</script>

<template>
  <div class="main-container">
    <v-sheet
      class="pa-2 ml-10 w-100"
      style="height: 180px"
      border
      rounded="lg"
      @dragover.prevent="dragover"
      @dragleave.prevent="dragleave"
      @drop.prevent="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="field"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="fileInput" class="file-label">
        <div v-if="isDragging">Lepasin buat nyimpen berkasnya disini.</div>
        <div v-else>
          Lempar berkasnya sini atau <u>klik disini</u> buat upload.
        </div>
      </label>

      <div class="preview-container mt-4" v-if="files.length">
        <v-sheet
          v-for="file in files"
          :key="`${file.name}-${file.size}-${file.lastModified}-${file.type}`"
          class="preview-card"
          rounded="lg"
        >
          <div>
            <img
              v-if="file.type.split('/')[0] === 'image'"
              class="preview-img"
              :src="generateThumbnail(file)"
            />
            <v-icon v-else size="50"> mdi-file </v-icon>
            <p :title="file.name">
              {{ makeName(file.name) }}
            </p>
          </div>
          <div>
            <button
              class="ml-2"
              type="button"
              @click="remove(files.indexOf(file))"
              title="Remove file"
            >
              <b>&times;</b>
            </button>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
.preview-container {
  display: flex;
  margin-top: 2rem;
}
.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}
.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
