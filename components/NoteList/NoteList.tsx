"use client";

import type { Note } from "../../types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) return <p>No notes available</p>;

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}

