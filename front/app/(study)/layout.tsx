import SideBar from '@/components/layout/SideBar'
import SidebarProvider from '@/context/SidebarProvider'
import StudyHeader from '@/components/studypage/StudyHeader'
import React from 'react'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<SidebarProvider>
				<div className='flex'>
					<SideBar />
					<div className='flex-grow'>
						<StudyHeader />
						<main className='bg-background h-full bg-opacity-80'>{children}</main>
					</div>
				</div>
			</SidebarProvider>
		</>
	)
}
