import { type ChangeEvent } from 'react'
import type { Song } from '../types/song'
import { STAGE, TAGS } from '../constant/tags'

export function FormSection({
  song,
  setSong
}: {
  song: Song
  setSong: React.Dispatch<React.SetStateAction<Song>>
}) {
  const saveSong = () => {
    console.log('GUARDAR')
  }

  const onSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveSong()
  }

  return (
    <section className="w-full pt-10 pb-4 md:p-0 md:h-full">
      <form
        onSubmit={onSubmitHandler}
        className="w-full h-full flex flex-col gap-4"
      >
        <span className="flex items-center h-8 font-bold text-red-600 dark:text-red-400">
          Escribir canto
        </span>
        <FormView song={song} setSong={setSong} />
      </form>
    </section>
  )
}

function FormView({
  song,
  setSong
}: {
  song: Song
  setSong: React.Dispatch<React.SetStateAction<Song>>
}) {
  const updatePage = (e: ChangeEvent<HTMLInputElement>) => {
    setSong(prev => {
      const value = e.target.value
      const newSong = { ...prev }
      newSong['page'] = Number(value)
      return newSong
    })
  }

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSong(prev => {
      const value = e.target.value
      const newSong = { ...prev }
      newSong['title'] = value
      return newSong
    })
  }

  const updateSubtitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSong(prev => {
      const value = e.target.value
      const newSong = { ...prev }
      newSong['subtitle'] = value
      return newSong
    })
  }

  const updateStage = (e: ChangeEvent<HTMLSelectElement>) => {
    setSong(prev => {
      const value = e.target.value
      const newSong = { ...prev }
      newSong['stage'] = value as Song['stage']
      return newSong
    })
  }

  const updateTags = (e: ChangeEvent<HTMLSelectElement>) => {
    setSong(prev => {
      const value = Array.from(
        e.target.selectedOptions,
        option => option.value
      ) as Song['tags']
      const newSong = { ...prev }
      newSong['tags'] = value
      return newSong
    })
  }

  const updateLyric = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSong(prev => {
      const value = e.target.value
      const newSong = { ...prev }
      newSong['lyric'] = value
      return newSong
    })
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-wrap gap-4">
        <div className="min-w-16 flex flex-col gap-1">
          <label
            htmlFor="page"
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            Página
          </label>
          <input
            id="page"
            type="number"
            min="0"
            max="999"
            value={song.page}
            onChange={updatePage}
            className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1"
            placeholder="0-999"
          />
        </div>
        <div className="min-w-32 flex flex-col gap-1">
          <label
            htmlFor="title"
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            Título
          </label>
          <input
            id="title"
            value={song.title}
            className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1"
            onChange={updateTitle}
            placeholder="El Señor es mi pastor"
          />
        </div>
        <div className="min-w-32 flex flex-col gap-1">
          <label
            htmlFor="subtitle"
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            Subtítulo
          </label>
          <input
            id="subtitle"
            value={song.subtitle}
            className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1"
            onChange={updateSubtitle}
            placeholder="Himno"
          />
        </div>
        <div className="min-w-32 flex flex-col gap-1">
          <label
            htmlFor="stage"
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            Tíempo de camino
          </label>
          <select
            id="stage"
            name="stage"
            value={song.stage}
            onChange={updateStage}
            className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1"
          >
            {Object.entries(STAGE).map(([key, value], i) => (
              <option key={i} className="" value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-32 flex flex-col gap-1">
          <label
            htmlFor="tags"
            className="text-sm text-neutral-700 dark:text-neutral-300"
          >
            Etiquetas
          </label>
          <select
            multiple
            id="tags"
            name="tags"
            value={song.tags}
            onChange={updateTags}
            className="bg-neutral-200 dark:bg-neutral-800 px-2 py-1"
          >
            {Object.entries(TAGS).map(([key, value]) => (
              <option key={value} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <textarea
        className="w-full h-full resize-none overflow-auto py-2 px-2 bg-neutral-200 dark:bg-neutral-800 font-mono "
        onChange={updateLyric}
        value={song.lyric}
        placeholder="A. [A]Aleluya, [D]aleluya, [G]aleluya"
      />
      <button type="submit" className="bg-red-400">
        Guardar
      </button>
    </div>
  )
}
