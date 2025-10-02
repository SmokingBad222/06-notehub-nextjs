import {  QueryClient } from '@tanstack/react-query';
import TanStackProvider from '../../../components/TanStackProvider/TanStackProvider';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client'; 

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params; 
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <TanStackProvider>
      <NoteDetailsClient id={id} />
    </TanStackProvider>
  );
}


