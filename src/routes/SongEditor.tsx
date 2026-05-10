import { FormSection } from '../componets/FormSection'
import ViewSection from '../componets/ViewSection'

export default function SongEditor() {
  return (
    <main className="flex flex-col w-full h-full px-4 md:px-8 md:pb-8 md:pt-12 md:gap-8 md:grid grid-cols-2 bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
      <FormSection />
      <ViewSection />
    </main>
  )
}
