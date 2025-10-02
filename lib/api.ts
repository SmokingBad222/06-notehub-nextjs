import axios from 'axios';
import type { Note } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: { 'Cache-Control': 'no-cache' },
  });
  return data;
};


export const createNote = async (
  body: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', body);
  return data;
};


export const deleteNote = async (id: string): Promise<Note> => {  // 🔥 number → string
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};


export const fetchNoteById = async (id: string): Promise<Note> => { // 🔥 number → string
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

