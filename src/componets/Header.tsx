import { useEffect, useState } from 'react'
import { auth } from '../database/supabase'
import { login } from '../auth/login'
import {
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  type User
} from 'firebase/auth'

type UserData = {
  name: string
  email: string
  photoURL: string | null
}

const USER_PRESET: UserData = {
  email: 'Anonimo',
  name: 'Anonimo',
  photoURL: null
}

export default function Header() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await getRedirectResult(auth)
        console.log({ getRedirectResult: result })
      } catch (error) {
        console.log({ redirect: error })
      }

      onAuthStateChanged(auth, currentUser => {
        console.log({ auth, currentUser })
        if (currentUser === null) return setUserData(null)
        if (userData !== null) return
        const { email, displayName, photoURL } = auth.currentUser as User
        setUserData({
          email: email ?? USER_PRESET.email,
          name: displayName ?? USER_PRESET.name,
          photoURL
        })
      })
    }

    loadUser()
  }, [userData])

  const loginHander = async () => {
    try {
      await login()
      const { email, displayName, photoURL } = auth.currentUser as User
      setUserData({
        email: email ?? USER_PRESET.email,
        name: displayName ?? USER_PRESET.name,
        photoURL
      })
    } catch (error) {
      console.log({ errorAuth: auth.currentUser, error })
    }
  }

  const logoutHandler = async () => {
    try {
      await signOut(auth)
      console.log({ successLogout: auth.currentUser })
    } catch (error) {
      console.log({ errorLOgout: auth.currentUser, error })
    }
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
      {userData ? (
        <LogoutButton userData={userData} logout={logoutHandler} />
      ) : (
        <LoginButton login={loginHander} />
      )}
    </header>
  )
}

function LogoutButton({
  userData,
  logout
}: {
  userData: UserData
  logout: () => void
}) {
  const { name, photoURL } = userData
  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 px-4 md:px-8 py-2 hover:bg-neutral-600"
    >
      <span className="font-bold text-sm">{name}</span>
      {photoURL ? (
        <img src={photoURL} width={24} height={24} />
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
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
      <circle cx="12" cy="11" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}
