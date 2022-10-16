import type { Axios } from 'axios';
import type { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
    axios: Axios;
  }
}
