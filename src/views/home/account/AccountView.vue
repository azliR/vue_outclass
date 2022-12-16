<script setup lang="ts">
import AppError from '@/components/AppError.vue'
import { useAccountStore } from '@/stores/home/account/account-store'
import { storeToRefs } from 'pinia'
import QRCodeVue3 from 'qrcode-vue3'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useAccountStore()
const {
  getProfile,
  getClassroomMember,
  goToMembers,
  goToSettings,
  exitClass,
  signOutAccount,
} = store
const { loading, error, showQrDialog, user, classroomMember } =
  storeToRefs(store)

if (!user.value) {
  fetchAccount()
}

var joinUrl = ''
async function fetchAccount() {
  await getProfile()
  await getClassroomMember()
  const origin = location.origin
  const joinPath = '/join'
  joinUrl = origin + joinPath + '/' + classroomMember.value?.class_code
}

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))

// const theme = useTheme();
// const themeColor = theme.global.current.value.colors;
// const qrDotsColor = themeColor.primary;
// const qrBackgroundColor = themeColor.surface;
</script>

<template>
  <v-app-bar :title="t('account.title')" density="prominent">
    <template v-slot:append>
      <v-app-bar-nav-icon
        class="mt-2"
        icon="mdi-cog"
        color="on-surface-variant"
        @click="goToSettings"
      ></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
  <v-main scrollable>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <app-error
      v-if="error"
      class="mt-4"
      :error="error"
      @refresh="fetchAccount()"
    ></app-error>
    <v-container v-if="user && classroomMember">
      <div class="d-flex flex-column flex-lg-row">
        <v-sheet style="flex: 1">
          <div class="px-6 pt-4">
            <p class="text-h6">{{ t('account.profile.title') }}</p>
            <p class="my-1 text-body-2">
              {{ t('account.profile.subtitle') }}
            </p>
          </div>
          <v-list class="px-2" lines="two">
            <v-list-item
              :title="t('account.profile.nameLabel')"
              :subtitle="user?.name"
              @click.stop=""
            >
              <template v-slot:append>
                <v-avatar color="transparent">
                  <v-icon> mdi-menu-right </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :title="t('account.profile.nimLabel')"
              :subtitle="classroomMember.student_id"
              @click.stop=""
            >
              <template v-slot:append>
                <v-avatar color="transparent">
                  <v-icon> mdi-menu-right </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :title="t('account.profile.emailLabel')"
              :subtitle="user?.email"
              @click.stop=""
            >
              <template v-slot:append>
                <v-avatar color="transparent">
                  <v-icon> mdi-menu-right </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :title="t('account.profile.passwordLabel')"
              subtitle="********"
              @click.stop=""
            >
              <template v-slot:append>
                <v-avatar color="transparent">
                  <v-icon> mdi-menu-right </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>
        <div class="ma-2"></div>
        <v-sheet style="flex: 1">
          <div class="px-6 pt-4">
            <p class="text-h6">{{ t('account.class.title') }}</p>
            <p class="my-1 text-body-2">{{ t('account.class.subtitle') }}</p>
          </div>
          <v-list class="px-2" lines="two">
            <v-list-item
              :title="t('account.class.className')"
              :subtitle="classroomMember.classroom_name"
              @click.stop=""
            >
              <template v-slot:append>
                <v-avatar color="transparent">
                  <v-icon> mdi-menu-right </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :title="t('account.class.classCode')"
              :subtitle="classroomMember.class_code"
            >
              <template v-slot:append>
                <v-btn variant="outlined" color="primary"> Reset </v-btn>
                <div class="mx-1"></div>
                <v-dialog v-model="showQrDialog">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="mdi-qrcode"
                      variant="tonal"
                      @click.stop=""
                    >
                    </v-btn>
                  </template>
                  <v-card
                    :title="t('account.dialog.scanCode.title')"
                    :text="t('account.dialog.scanCode.subtitle')"
                  >
                    <QRCodeVue3
                      class="mx-auto mt-3"
                      :width="200"
                      :height="200"
                      :value="joinUrl"
                      :dotsOptions="{
                        type: 'dots',
                        color: '#000000',
                      }"
                      image="./src/assets/logo.svg"
                      :backgroundOptions="{ color: '#ffffff' }"
                      :cornersSquareOptions="{
                        type: 'extra-rounded',
                        color: '#000000',
                      }"
                      :cornersDotOptions="{ type: 'dot', color: '#000000' }"
                    />
                    <v-card-actions class="mx-2">
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="showQrDialog = false">
                        {{ t('account.dialog.scanCode.ok') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :title="t('account.class.members')"
              :subtitle="
                t('account.class.member', classroomMember.class_members_count)
              "
              @click="goToMembers"
            >
              <template v-slot:append>
                <v-avatar color="transparent">
                  <v-icon> mdi-menu-right </v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-sheet>
      </div>
      <div class="d-flex flex-wrap justify-center mt-4">
        <v-btn class="ma-2" variant="outlined" @click="exitClass">
          Keluar kelas
        </v-btn>
        <v-btn class="ma-2" variant="outlined" @click="signOutAccount">
          Keluar akun
        </v-btn>
      </div>
      <div class="my-4"></div>
    </v-container>
  </v-main>
  <v-snackbar v-model="showSnackbar" color="error">
    {{ error }}
  </v-snackbar>
</template>
