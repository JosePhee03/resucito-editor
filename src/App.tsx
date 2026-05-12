import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SongEditor from './routes/SongEditor'
import Header from './components/Header'
import SongSearch from './routes/SongSearch'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './stores/authStore'
import { auth } from './database/supabase'
import type AppError from './database/error'
import { useEffect } from 'react'
import { useSong } from './hooks/useSong'

onAuthStateChanged(auth, user => {
  const { setUser, setLoading } = useAuthStore.getState()
  if (user == null) setUser(null)
  else {
    const { email, displayName, photoURL } = user
    setUser({
      email: email ?? 'Anonimo',
      name: displayName ?? 'Anonimo',
      photoURL
    })
  }
  setLoading(false)
})

function App() {
  const isLoading = useAuthStore(state => state.isLoading)
  const {
    error,
    isLoading: isLoadingSongs,
    loadSongs,
    reset,
    songs
  } = useSong()

  useEffect(() => {
    loadSongs()
  }, [songs, loadSongs])

  return (
    <div className="bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
      <BrowserRouter>
        {isLoading || isLoadingSongs ? (
          <Loading reload={reset} />
        ) : (
          <>
            <Header />
            {error && <Error error={error} />}
            {error === null && (
              <Routes>
                <Route path="/" element={<SongSearch />} />
                <Route path="/edit" element={<SongEditor />} />
              </Routes>
            )}
          </>
        )}
      </BrowserRouter>
    </div>
  )
}

function Loading({ reload }: { reload: () => void }) {
  return (
    <div className="flex flex-col h-dvh w-screen justify-center items-center gap-2  ">
      <span className="text-6xl font-bold text-red-600 dark:text-red-400">
        Resucitó
      </span>
      <p className="animate-pulse font-medium">Sincronizando...</p>
      <button className="underline hover:cursor-pointer" onClick={reload}>
        Recargar
      </button>
    </div>
  )
}

function Error({ error }: { error: AppError }) {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
      <span className="text-4xl font-bold">{error.code}</span>
      <span className="text-lg">{error.message}</span>
    </div>
  )
}

export default App
