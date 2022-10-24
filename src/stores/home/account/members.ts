import type { User } from '@/models/user';
import { defineStore } from 'pinia';

export const useMembersStore = defineStore('members', {
  state() {
    return {
      kickDialog: false,
      loading: false,
      error: <string | null>null,
      members: <User[]>[
        {
          id: '8a43d2d3-c7b4-4aa9-b52e-4655534d3560',
          studentId: '12070500110',
          name: 'Rifky Maulana',
        },
        {
          id: '3a233563-09eb-4b23-ba32-50e2890fc7f6',
          studentId: '1207050109',
          name: 'Rizal Hadiyansah',
        },
        {
          id: '4ecf14b4-40cd-4057-8c5f-508e72559d2e',
          studentId: '1207050120',
          name: 'Romi Jatmiko',
        },
      ],
    };
  },
  actions: {
    onBackPressed() {
      this.router.push({ name: 'account' });
    },
  },
});
