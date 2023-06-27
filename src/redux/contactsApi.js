import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
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
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({ url: 'contacts/' }),
      providesTags: ['Contacts'],
      keepUnusedData: false,
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: newContact => ({
        url: `contacts`,
        method: 'Post',
        body: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    updateContact: builder.mutation({
      query: ({ id, updatedContact }) => ({
        url: `contacts/${id}`,
        method: 'PATCH',
        body: updatedContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});
export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  useUpdateContactMutation,
} = contactsApi;
