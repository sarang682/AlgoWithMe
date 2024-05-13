import StudyHeader from '@/components/header/StudyHeader'
import { Outlet, useParams } from 'react-router-dom'

import React from 'react'
import { RootState } from '@/lib/store.ts'
import { useSelector } from 'react-redux'
import SideBar from '@/components/sidebar/SideBar.tsx'
import PageCreateModal from '@/components/sidebar/PageCreateModal.tsx'
import ScrollToTop from '@/components/ScrollToTop'

export default function Layout() {
  const { groupId } = useParams()
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen)
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

  return (
    <div className="flex">
      <ScrollToTop />
      <SideBar groupId={Number(groupId)} />
      <main
        className={`${
          isSidebarOpen ? 'ml-52 mr-2' : 'mr-2'
        } ml-2 w-dvw max-w-dvw transition-all duration-700`}
      >
        <div>
          <StudyHeader groupId={Number(groupId)} />
          <main className="bg-white bg-opacity-70 p-8 rounded-lg mr-6">
            <Outlet />
          </main>
        </div>
      </main>
      {isModalOpen && <PageCreateModal />}
    </div>
  )
}
