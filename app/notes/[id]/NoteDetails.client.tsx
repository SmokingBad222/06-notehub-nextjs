"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import type { Note } from "../../../types/note";

type NoteDetailsClientProps = {
  id: string; 
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note</p>;
  if (!data) return <p>No note found</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <small>Created at: {new Date(data.createdAt).toLocaleString()}</small>
    </div>
  );
}

