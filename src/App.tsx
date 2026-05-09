import { FormSection } from './componets/FormSection'
import ViewSection from './componets/ViewSection'
import { SongProvider } from './store/SongContext'

function App() {
  return (
    <SongProvider>
      <main className="flex flex-col w-full h-full md:w-screen md:h-screen md:grid grid-cols-2 md:p-8 md:gap-8 bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
        <FormSection />
        <ViewSection />
      </main>
    </SongProvider>
  )
}

export default App
