'use client'
import store from '@/store/sidebarStore'
import { Provider } from 'react-redux'

type Props = {
	children: React.ReactNode
}

export default function UserProvider({ children }: Props) {
	return <Provider store={store}>{children}</Provider>
}
