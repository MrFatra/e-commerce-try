declare module 'redux-persist/lib/storage/createWebStorage' {
    const createWebStorage: (type: 'local' | 'session') => any;
    export default createWebStorage;
  }
  