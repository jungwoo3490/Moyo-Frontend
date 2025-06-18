export const accessTokenStore = {
  SESSION_STORAGE_KEY: "ACCESS_TOKEN",
  store: sessionStorage,

  get() {
    return this.store.getItem(this.SESSION_STORAGE_KEY);
  },

  set(atk: string) {
    this.store.setItem(this.SESSION_STORAGE_KEY, atk);
  },

  clear() {
    this.store.removeItem(this.SESSION_STORAGE_KEY);
  },
};
