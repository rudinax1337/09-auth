import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

axios.defaults.headers.common['Authorization'] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`);
  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(BASE_URL, payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`);
  return response.data;
};
