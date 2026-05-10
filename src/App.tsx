import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SongProvider } from './store/SongContext'
import SongEditor from './routes/SongEditor'
import SongList from './routes/SongList'
import Header from './componets/Header'

function App() {
  return (
    <div className="min-h-screen md:w-screen md:h-screen">
      <BrowserRouter>
        <Header />
        <SongProvider>
          <Routes>
            <Route path="/" element={<SongEditor />} />
            <Route path="/search" element={<SongList />} />
          </Routes>
        </SongProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
