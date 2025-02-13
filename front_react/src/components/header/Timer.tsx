import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import toast, { Toaster } from 'react-hot-toast'
import { FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa'
import useSolving from '@/hooks/useSolving'
import useTimer from '@/hooks/useTimer'
import { useRef, useState } from 'react'
import SetTimer from '../studypage/SetTimer'
import { HiDotsVertical } from 'react-icons/hi'

const Timer = () => {
  const { handleChangeTimer } = useTimer()

  const initialHour = useSelector((state: RootState) => state.timer.initialhour)
  const initialMin = useSelector((state: RootState) => state.timer.initialmin)
  const initialSec = useSelector((state: RootState) => state.timer.initialsec)

  const timerHour = useSelector((state: RootState) => state.timer.hour)
  const timerMin = useSelector((state: RootState) => state.timer.min)
  const timerSec = useSelector((state: RootState) => state.timer.sec)

  const studyDurationInSec = timerHour * 3600 + timerMin * 60 // 스터디 진행시간 in S

  //   const [remainHour, setRemainHour] = useState(timerHour)
  //   const [remainMin, setRemainMin] = useState(timerMin)
  //   const [remainSec, setRemainSec] = useState(0)

  const isSolving = useSelector((state: RootState) => state.solving.isSolving)

  const { handleStartSolving, handleEndSolving } = useSolving()

  const timerId = useRef()

  const handleTimerPlay = () => {
    const startTime = Number(localStorage.getItem('startedAt'))
    timerId.current = setInterval(() => {
      const localTime = new Date().getTime()
      // 매 초마다 현재 로컬 시간 업데이트

      const totalPassedSec = Math.floor((localTime - startTime) / 1000) // 전체 경과 in S

      // 총 남은 초
      const totalRemainSec = studyDurationInSec - totalPassedSec

      if (totalRemainSec <= 0) {
        toast('풀이 시간이 종료되었어요', { icon: '⏱' })
        handleEndSolving()
        handleChangeTimer({
          hour: initialHour,
          min: initialMin,
          sec: initialSec,
        })
        clearInterval(timerId.current)
      }

      // 남은 초를 시간 분 초 단위로 변경
      const newRemainSec = totalRemainSec % 60 // 나머지 == 초
      const newRemainMin = Math.floor((totalRemainSec / 60) % 60)
      const newRemainHour = Math.floor(totalRemainSec / 3600)

      handleChangeTimer({
        hour: Math.max(0, newRemainHour),
        min: Math.max(0, newRemainMin),
        sec: Math.max(0, newRemainSec),
      })
    }, 1000) // 1초 간격으로 setInterval 실행
  }

  const handleStart = () => {
    if (timerHour === 0 && timerMin === 0 && timerSec === 0) {
      toast.error('시간을 다시 설정해주세요')
    } else {
      handleStartSolving()
      handleTimerPlay()
    }
  }

  const handleEnd = () => {
    if (confirm('풀이를 종료하시겠어요?')) {
      clearInterval(timerId.current)
      handleEndSolving()
      handleChangeTimer({ hour: initialHour, min: initialMin, sec: initialSec })
    }
  }

  const [isSetTimerVisible, setIsSetTimerVisible] = useState(false)
  const [isEditingTime, setIsEditingTime] = useState(false)

  return (
    <div className="flex items-center relative">
      <div
        className={`bg-white bg-opacity-20 border border-accent border-opacity-50 flex p-2 w-fit rounded-3xl shadow-foggyPurple items-center mr-2`}
      >
        <span className="text-xs text-navy mr-2 ">남은 시간</span>
        <span style={{ fontFamily: 'orbitron' }} className="text-sm">
          {timerHour}
        </span>
        <span className="text-xs text-navy mr-2 ml-1">시간</span>
        <span style={{ fontFamily: 'orbitron' }} className="text-sm">
          {' '}
          {timerMin}
        </span>
        <span className="text-xs text-navy mr-2 ml-1">분</span>
        <span style={{ fontFamily: 'orbitron' }} className="text-sm">
          {' '}
          {timerSec}
        </span>
        <span className="text-xs text-navy ml-1 mr-2">초</span>

        <div className="mr-1 cursor-pointer">
          {isSolving ? (
            <FaRegStopCircle onClick={handleEnd} />
          ) : (
            <FaRegPlayCircle onClick={handleStart} />
          )}
        </div>
        <div
          onClick={() => setIsSetTimerVisible(!isSetTimerVisible)}
          // className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors"
        >
          <HiDotsVertical className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
      {isSetTimerVisible && (
        <div className="absolute top-10 left-20">
          <SetTimer />
        </div>
      )}
      {/* <Toaster position="bottom-center" reverseOrder={false} /> */}
    </div>
  )
}

export default Timer
