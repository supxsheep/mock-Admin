import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ 
    token: '',
  }),
  getters: {
    double: (state) => state.token,
  },
  actions: {
    setToken(value:string) {
      this.token = value
    },
  },
})