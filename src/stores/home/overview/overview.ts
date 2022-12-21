import type Assignment from '@/models/assignment'
import type { Event } from '@/models/event'
import { defineStore } from 'pinia'

export const useOverviewStore = defineStore('overview', {
  state() {
    return {
      deadlineAssignments: <Assignment[] | undefined>[
        {
          id: '9459437a-9aa8-44b0-88c7-2e65deb1e63f',
          classroomId: '358812',
          name: 'Presentasi OutClass',
          deadline: new Date('2022-10-24'),
          description: 'Ini buat penilaian UTS',
        },
        {
          id: '39250009-887b-4e01-a0c6-ad2f7532dc0c',
          classroomId: '358812',
          name: 'Membuat mockup OutClass IMK',
          deadline: new Date('2022-10-27'),
          description: null,
        },
        {
          id: '39250009-887b-4e01-a0c6-ad2f7532dc0c',
          classroomId: '358812',
          name: 'Module 1-7 Cisco',
          deadline: new Date('2022-10-29'),
          description: null,
        },
      ],
      upcomingEvents: <Event[] | undefined>[
        {
          id: 'c2fa9ba7-86ae-4f0c-87a6-2577a2b91438',
          classroomId: '358812',
          title: 'Manajemen Proyek Perangkat Lunak',
          date: new Date('2022-10-25T12:40:00'),
          endDate: new Date('2022-10-25T15:10:00'),
          description: null,
        },
      ],
    }
  },
  actions: {},
})
