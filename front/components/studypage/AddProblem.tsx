'use client'
import Image from 'next/image'
import { MdAddCircleOutline } from 'react-icons/md'
import { useState } from 'react'
import AddProblemModal from './AddProblemModal'

const AddProblem = () => {
  const [showModal, setShowModal] = useState(false)
  const handleModal = () => {
    setShowModal(true)
  }

  const clickModal = (e: MouseEvent) => {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <div onClick={handleModal}>
      <div className="flex bg-background w-fit h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 hover:bg-purple-200 hover:border-opacity-0 transition-colors">
        <MdAddCircleOutline className="min-w-6 min-h-6 mx-2" />
        <div className=" font-bold flex justify-center mr-2">문제 추가하기</div>
        <Image
          src="/swea.png"
          alt="swea logo"
          width={20}
          height={20}
          className="rounded-full mr-2"
        />
        <Image
          src="/bojlogo.png"
          alt="boj logo"
          width={20}
          height={20}
          className="rounded-full mr-2"
        />
        <Image
          src="/programmers.png"
          alt="programmers logo"
          width={20}
          height={20}
          className="rounded-full"
        />
      </div>
      {showModal && <AddProblemModal clickModal={clickModal} />}
    </div>
  )
}

export default AddProblem
