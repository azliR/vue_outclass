<script setup lang="ts"></script>

<template>
  <v-app-bar title="Akun"> </v-app-bar>
  <v-main>
    <v-container>
      <v-sheet>
        <div class="px-6 py-4">
          <p class="text-h5">Profil Kamu</p>
          <p class="my-1 text-body-2">
            Semua orang di kelas kamu bakal bisa liat info ini!
          </p>
        </div>
        <v-list class="px-2">
          <v-list-item class="py-3" title="Nama" subtitle="Rizal Hadiyansah">
          </v-list-item>
        </v-list>
      </v-sheet>
      <div class="my-4"></div>
      <v-sheet>
        <div class="px-6 py-4">
          <p class="text-h5">Kelas</p>
          <p class="my-1 text-body-2">Data kelas yang kamu masukin sekarang</p>
        </div>
        <v-list class="px-2 pb-4">
          <v-list-item class="py-3" title="Nama Kelas" subtitle="IF E">
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="py-3" title="Kode Kelas" subtitle="358812">
            <template v-slot:append>
              <v-btn icon="mdi-qrcode" variant="tonal" @click.stop=""> </v-btn>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            class="py-3"
            title="Anggota kelas"
            subtitle="23 anggota"
            append-icon="mdi-menu-right"
            @click=""
          >
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-container>
  </v-main>
</template>
