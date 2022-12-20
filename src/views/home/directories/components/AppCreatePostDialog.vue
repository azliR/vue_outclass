<script setup lang="ts">
import type { CreatePostDto } from '@/dtos/directory'
import type { Post } from '@/models/directory'
import { useCreatePostStore } from '@/stores/home/directories/create-post-store'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'
import AppDropFile from './AppDropFile.vue'

const props = defineProps({
  post: Object as PropType<Post | null>,
})

const emit = defineEmits({
  close: () => true,
  save: (post: CreatePostDto) => true,
})

const store = useCreatePostStore()
const { nameRules, descriptionRules, onFilesDropped } = store
const { valid, post } = storeToRefs(store)

if (props.post) {
  post.value = {
    name: props.post.name,
    description: props.post.description,
  } as CreatePostDto
}

function onClosePressed() {
  emit('close')
  console.log(post.value)

  store.$reset()
}

function onSavePressed() {
  emit('save', post.value)
  store.$reset()
}
</script>

<template>
  <v-card>
    <v-toolbar>
      <v-btn icon="mdi-close" @click="onClosePressed" variant="flat"> </v-btn>
      <v-toolbar-title>{{
        props.post ? 'Edit Post' : 'Buat Post Baru'
      }}</v-toolbar-title>
      <v-toolbar-items variant="elevated" color="primary">
        <v-btn class="ma-2" height="40" elevation="0" @click="onSavePressed">
          Simpan
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="post.name"
          :rules="nameRules"
          label="Nama post"
          placeholder="Masukin nama buat post kamu"
          prepend-icon="mdi-format-title"
          required
        ></v-text-field>
        <v-textarea
          v-model="post.description"
          :rules="descriptionRules"
          label="Description"
          placeholder="Masukin deskripsinya"
          counter="255"
          prepend-icon="mdi-text"
        ></v-textarea>
        <app-drop-file @files-dropped="onFilesDropped"> </app-drop-file>
        <!-- <app-drop-file
          class="drop-area"
          @files-dropped="addFiles"
          #default="{ dropZoneActive }"
        >
          <label for="file-input">
            <span v-if="dropZoneActive">
              <span>Drop Them Here</span>
              <span class="smaller">to add them</span>
            </span>
            <span v-else>
              <span>Drag Your Files Here</span>
              <span class="smaller">
                or <strong><em>click here</em></strong> to select files
              </span>
            </span>

            <input
              type="file"
              id="file-input"
              multiple
              @change="onInputChange"
            />
          </label>
          <ul class="image-list" v-show="post.files.length">
            <app-file-preview
              v-for="file of post.files"
              :key="file.id"
              :file="file"
              tag="li"
              @remove="removeFile"
            />
          </ul>
        </app-drop-file> -->
      </v-form>
    </v-container>
  </v-card>
</template>
