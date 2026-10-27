import type { User } from '@/types/user';
import { nextServer } from './api';
import type { Note, NoteTag } from '@/types/note';

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
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};
export interface AuthRequest {
  email: string;
  password: string;
}

export const register = async (data: AuthRequest): Promise<User> => {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
};

export const login = async (data: AuthRequest): Promise<User> => {
  const response = await nextServer.post<User>('/auth/login', data);
  return response.data;
};
export const checkSession = async (): Promise<boolean> => {
  const response = await nextServer.get<User | ''>('/auth/session');
  return Boolean(response.data);
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
export interface UpdateMeRequest {
  username: string;
}

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const response = await nextServer.patch<User>('/users/me', data);
  return response.data;
};
