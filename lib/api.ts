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

// Отримати список нотаток
export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: { 'Cache-Control': 'no-cache' },
  });
  return data;
};

// Створити нотатку
export const createNote = async (body: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', body);
  return data;
};

// Видалити нотатку
export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

// Отримати нотатку за id
export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};
