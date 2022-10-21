import type { Calendar } from '@/models/calendar';
import type { ResponseData } from '@/models/response-data';
import { API_URL } from '@/plugins/constants';
import type {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
  state() {
    return {
      error: <string | null>null,
      loading: false,
      currentEvents: <EventInput[]>[{}],
    };
  },
  actions: {
    async getEvents() {
      this.error = null;
      this.loading = true;

      await this.axios
        .get<ResponseData>(API_URL + '/events')
        .then(({ data }) => {
          this.loading = false;
          if (data.success) {
            this.error = null;
            console.log(data);

            this.currentEvents = (data.data as Calendar[]).map(
              (event: Calendar) => {
                return {
                  id: event.uid,
                  title: event.summary,
                  start: event.dtstart[0] as string,
                  end: event.dtend[0] as string,
                };
              }
            ) as EventInput[];

            console.log(this.currentEvents);
          } else {
            return Promise.reject(data.message);
          }
        })
        .catch((error: AxiosError) => {
          this.error = JSON.stringify(error.toJSON());
          this.loading = false;
          console.log(error);
        });
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Please enter a new title for your event');
      const calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();

      if (title) {
        calendarApi.addEvent({
          id: '1',
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo: EventClickArg) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events: EventApi[]) {
      // this.currentEvents = events.map((event: Event) => {});
    },
  },
});
