
import {  QueryClient } from '@tanstack/react-query';
import TanStackProvider from '../../components/TanStackProvider/TanStackProvider';
import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
  });



  return (
    <TanStackProvider >
      <NotesClient />
    </TanStackProvider>
  );
}

