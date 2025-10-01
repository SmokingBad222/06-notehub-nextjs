'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import type { Note} from '../../types/note';
import { FetchNotesResponse } from '../../types/note'
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '../../components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import css from './Notes.client.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
  queryKey: ['notes', page, debouncedSearch],
  queryFn: (): Promise<FetchNotesResponse> =>
    fetchNotes({ page, perPage: 12, search: debouncedSearch }),
});

  const handleCreated = () => {
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  const handleDelete = async (id: number) => {
    try {
      await fetchNotes({}); 
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {(data?.totalPages ?? 0) > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data?.notes?.length ? (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {isFetching && !isLoading && <p>Updating…</p>}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onCreated={handleCreated} />
        </Modal>
      )}
    </div>
  );
}
