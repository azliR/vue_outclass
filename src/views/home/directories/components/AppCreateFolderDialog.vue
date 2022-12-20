<script setup lang="ts">
import type { CreateFolderDto } from '@/dtos/directory'
import type { Folder } from '@/models/directory'
import { useCreateFolderStore } from '@/stores/home/directories/create-folder-store'
import { isDark } from '@/utils/colors'
import { storeToRefs } from 'pinia'
import { ref, type PropType } from 'vue'

const props = defineProps({
  folder: Object as PropType<Folder | null>,
})

const emit = defineEmits({
  close: () => true,
  save: (folder: CreateFolderDto) => true,
})

const store = useCreateFolderStore()
const { colors, nameRules, descriptionRules } = store
const { valid, folder } = storeToRefs(store)

if (props.folder) {
  folder.value = ref(props.folder).value
}

function onClosePressed() {
  emit('close')
  store.$reset()
}
function onSavePressed() {
  emit('save', folder.value)
  store.$reset()
}
</script>

<template>
  <v-card>
    <v-toolbar>
      <v-btn icon="mdi-close" @click="onClosePressed" variant="flat"> </v-btn>
      <v-toolbar-title>{{
        props.folder ? 'Edit Folder' : 'Buat Folder Baru'
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
          v-model="folder.name"
          :rules="nameRules"
          label="Nama folder"
          placeholder="Masukin nama buat folder kamu"
          prepend-icon="mdi-format-title"
          required
        ></v-text-field>
        <v-textarea
          v-model="folder.description"
          :rules="descriptionRules"
          label="Description"
          placeholder="Masukin deskripsinya"
          counter="255"
          prepend-icon="mdi-text"
        ></v-textarea>
        <p class="ml-10 mb-2 text-subtitle-2">Warna folder</p>
        <div class="ml-9">
          <v-tooltip
            v-for="color in colors"
            :key="color.key"
            :text="color.name"
            location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="ma-1"
                :color="color.color"
                rounded="lg"
                size="small"
                @click="folder.color = color.key"
                icon
              >
                <v-icon
                  v-if="folder.color === color.key"
                  :color="isDark(color.color) ? 'white' : 'black'"
                >
                  mdi-check-bold
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
