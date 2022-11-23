<script setup lang="ts">
import { useAccountStore } from '@/stores/home/account/account';
import { storeToRefs } from 'pinia';
import QRCodeVue3 from 'qrcode-vue3';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useAccountStore();
const { goToMembers, goToSettings, exitClass, signOutAccount } = store;
const { showQrDialog } = storeToRefs(store);

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
    <v-container>
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
              subtitle="Rizal Hadiyansah"
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
              subtitle="1207050109"
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
              subtitle="rizalhadiyansah@gmail.com"
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
              subtitle="IF E"
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
              subtitle="358812"
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
                      value="358812"
                      :qrOptions="{
                        mode: 'Numeric',
                        errorCorrectionLevel: 'H',
                      }"
                      :dotsOptions="{
                        type: 'dots',
                        color: '#000000',
                      }"
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
              :subtitle="t('account.class.member', 3)"
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
</template>
<style></style>
