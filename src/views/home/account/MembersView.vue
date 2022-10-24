<script setup lang="ts">
import { useMembersStore } from '@/stores/home/account/members';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useMembersStore();
const { onBackPressed } = store;
const { kickDialog, loading, error, members } = storeToRefs(store);
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
  <v-main>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <app-error
      v-else-if="error"
      class="mt-4"
      :error="error"
      @refresh="() => {}"
    ></app-error>
    <v-container v-else>
      <v-sheet>
        <v-list>
          <v-list-item
            v-for="member in members"
            :key="member.id"
            :title="member.name"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon color="on-primary-container"> mdi-account </v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-menu activator="parent">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="secondary"
                    icon="mdi-dots-vertical"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                </template>
                <v-list rounded="null">
                  <v-dialog v-model="kickDialog">
                    <template v-slot:activator="{ props }">
                      <v-list-item
                        :title="t('account.members.menu.kick')"
                        density="compact"
                        v-bind="props"
                      >
                        <template v-slot:prepend>
                          <v-icon class="pl-4" color="error">
                            mdi-account-cancel
                          </v-icon>
                        </template>
                      </v-list-item>
                    </template>

                    <v-card
                      :title="t('account.members.dialogs.title')"
                      :text="t('account.members.dialogs.subtitle')"
                    >
                      <v-card-actions class="mx-2">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="kickDialog = false">
                          {{ t('cancel') }}
                        </v-btn>
                        <v-btn
                          variant="flat"
                          color="error"
                          @click="kickDialog = false"
                        >
                          {{ t('account.members.menu.kick') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list>
              </v-menu>
            </template>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-container>
  </v-main>
</template>
