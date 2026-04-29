import "@testing-library/jest-dom";

// Provide a full localStorage implementation for jsdom
const storage: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => storage[key] ?? null,
  setItem: (key: string, value: string) => {
    storage[key] = value;
  },
  removeItem: (key: string) => {
    delete storage[key];
  },
  clear: () => {
    Object.keys(storage).forEach((k) => delete storage[k]);
  },
  get length() {
    return Object.keys(storage).length;
  },
  key: (i: number) => Object.keys(storage)[i] ?? null,
};
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });
