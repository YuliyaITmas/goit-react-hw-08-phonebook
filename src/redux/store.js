import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { filterReducer } from '../redux/filterSlice';

import { contactsApi } from './contactsApi';
import { authApi } from './authorization/authApi';
import { authReducer } from './authorization/authSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
 
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);
;

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
    auth: persistedReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(contactsApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);


export const removeToken = () => {
  persistor.purge();
};