<script setup lang="ts">
import AppError from '@/components/AppError.vue'
import { toRoleString } from '@/models/classroom-member'
import { useMembersStore } from '@/stores/home/account/members-store'
import { useInfiniteScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useMembersStore()
const { loadMore, onBackPressed } = store
const { kickDialog, loading, hasNextPage, errorSnackbar, classroomMembers } =
  storeToRefs(store)

const scrollContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (classroomMembers.value.length === 0) {
    loadMore(scrollContainer.value, false)
  }
})

useInfiniteScroll(
  scrollContainer,
  async () => {
    if (hasNextPage.value) {
      await loadMore(scrollContainer.value, true)
    } else {
      return
    }
  },
  { distance: 10 }
)

const showSnackbar = ref(false)
watch(errorSnackbar, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-app-bar :title="t('account.members.title')" density="prominent">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="mt-2"
        icon="mdi-arrow-left"
        @click="onBackPressed"
      ></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
  <v-main class="scroll-main">
    <div class="scroll-container" ref="scrollContainer">
      <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
      <app-error
        v-else-if="errorSnackbar"
        class="mt-4"
        :error="errorSnackbar"
        @refresh="() => {}"
      ></app-error>
      <v-container v-else>
        <v-sheet>
          <v-list>
            <v-list-item
              v-for="member in classroomMembers"
              :key="member.id"
              :title="member.name"
              :subtitle="toRoleString(member.role)"
            >
              <template v-slot:prepend>
                <v-avatar>
                  <v-icon color="on-primary-container"> mdi-account </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-container>
    </div>
  </v-main>
  <v-dialog v-model="kickDialog">
    <v-card
      :title="t('account.members.dialogs.title')"
      :text="t('account.members.dialogs.subtitle')"
    >
      <v-card-actions class="mx-2">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="kickDialog = false">
          {{ t('cancel') }}
        </v-btn>
        <v-btn variant="flat" color="error" @click="kickDialog = false">
          {{ t('account.members.menu.kick') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
