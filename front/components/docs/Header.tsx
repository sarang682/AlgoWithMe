import * as React from 'react'
import { useState } from 'react'
import TagSelector from '@/components/tag/Tags'

interface HeaderProps {
  activeTab: string
  onSave: () => void
}

const Header: React.FC<HeaderProps> = ({ activeTab, onSave }) => {
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

  return (
    <div className="bg-goldenPurple text-white flex justify-between items-center p-1 w-full">
      <div className="flex space-x-1">
        <button
          className="bg-primary hover:bg-secondary pt-1 h-8 text-white rounded-md p-2"
          onClick={() => setIsTagSelectorOpen(!isTagSelectorOpen)} // 모달 창 열기
        >
          문제 유형
        </button>
        {isTagSelectorOpen && (
          <TagSelector
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            onClose={() => setIsTagSelectorOpen(false)} // 모달 창 닫기
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
      </div>
    </div>
  )
}

export default Header
