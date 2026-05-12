import { auth } from '../database/supabase'
import { singIn } from '../auth/login'
import { signOut } from 'firebase/auth'
import type { User } from '../types/user'
import { useAuthStore } from '../stores/authStore'

export default function Header() {
  const { setLoading } = useAuthStore.getState()
  const user = useAuthStore(state => state.user)

  const loginHander = async () => {
    setLoading(true)
    await singIn()
  }

  const logoutHandler = async () => {
    setLoading(true)
    await signOut(auth)
  }

  return (
    <header className="flex absolute w-full h-10 justify-between bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
      <nav className="flex">
        <button className="flex items-center h-full px-4 md:px-8 font-bold hover:bg-neutral-600">
          editar
        </button>
        <button className="flex items-center h-full px-4 md:px-8 font-bold hover:bg-neutral-600">
          buscar
        </button>
      </nav>
      {user ? (
        <LogoutButton user={user} logout={logoutHandler} />
      ) : (
        <LoginButton login={loginHander} />
      )}
    </header>
  )
}

function LogoutButton({ user, logout }: { user: User; logout: () => void }) {
  const { name, photoURL } = user
  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 px-4 md:px-8 py-2 hover:bg-neutral-600"
    >
      <span className="font-bold text-sm">{name}</span>
      {photoURL !== null ? (
        <img src={photoURL} alt="" width={24} height={24} />
      ) : (
        <NoUserPhoto />
      )}
    </button>
  )
}

function LoginButton({ login }: { login: () => void }) {
  return (
    <button
      className="flex items-center gap-2 px-4 md:px-8 py-2 hover:bg-neutral-600"
      onClick={login}
    >
      <span className="font-bold text-sm text-ellipsis">Iniciar Sesión</span>
      <NoUserPhoto />
    </button>
  )
}

function NoUserPhoto() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
      <circle cx="12" cy="11" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
