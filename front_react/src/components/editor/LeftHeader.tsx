'use client'

import * as React from 'react'
import { useState } from 'react'
import TagSelector from '@/components/tag/Tags'

interface LeftHeaderProps {
  activeTab: string
  onSave: () => void
  url: string
}

const LeftHeader: React.FC<LeftHeaderProps> = ({ activeTab, onSave, url }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // 선택된 태그를 관리하는 상태
  const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false)

  const toggleTag = (key: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(key)
        ? prevTags.filter((tag) => tag !== key)
        : [...prevTags, key],
    )
  }

  const handleSaveClick = (action: string) => {
    if (action === '저장') {
      onSave() // 저장 버튼 클릭 시 onSave 호출
    }
  }

  const handleProblemLinkClick = () => {
    window.open(url, '_blank')
  }

  return (
    <div className="bg-goldenPurple text-white flex justify-between items-center p-1 w-full">
      <div className="flex space-x-1">
        <button
            className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
            onClick={() => setIsTagSelectorOpen(!isTagSelectorOpen)}
        >
          문제 유형
        </button>
        {isTagSelectorOpen && (
            <TagSelector
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                onClose={() => setIsTagSelectorOpen(false)}
            />
        )}
      </div>
      <div className="flex space-x-1">
        {activeTab === '개인 메모장' && (
            <button
                className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
                onClick={() => handleSaveClick('저장')}
            >
              저장
            </button>
        )}
        <button
          className=" bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          onClick={() => handleProblemLinkClick()}
        >
          문제 링크
        </button>
      </div>
    </div>
  )
}

export default LeftHeader
