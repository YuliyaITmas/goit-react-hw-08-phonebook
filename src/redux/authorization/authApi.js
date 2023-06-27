
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: credentials => ({
        url: 'users/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    logIn: builder.mutation({
      query: credentials => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['User'],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => 'users/current',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogInMutation,
  useLogOutMutation,
  useGetCurrentUserQuery,
} = authApi;
