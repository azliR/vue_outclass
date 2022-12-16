import { API_URL } from '@/plugins/constants'
import axios from 'axios'

export const publicClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
