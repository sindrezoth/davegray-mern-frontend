import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.105:3500' }),
  tagTypes: ['Note', 'User'],
  endpoints: builder => ({})
});
