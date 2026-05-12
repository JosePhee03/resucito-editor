import { FormSection } from '../components/FormSection'
import ViewSection from '../components/ViewSection'

export default function SongEditor() {
  return (
    <main className="flex flex-col w-full h-full px-4 md:px-8 md:pb-8 md:pt-12 md:gap-8 md:grid grid-cols-2">
      <FormSection />
      <ViewSection />
    </main>
  )
}
