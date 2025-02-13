import React, { useState } from 'react'
import SearchTagButtons from '@/components/header/SearchTagButtons'

interface List {
  id: number
  description: string
}

interface Props {
  items: List[]
}

const SearchDropdown: React.FC<Props> = ({ items }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)

  const handleItemClick = (itemName: string) => {
    console.log(`${itemName} 클릭됨!`)
    setDropdownVisible(false)
  }

  return (
    <div className="relative w-full mx-auto">
      <input
        className="bg-lighterPurple w-full p-1 text-base border border-navy shadow-md"
        type="text"
        placeholder="스터디 검색"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      />
      {dropdownVisible && (
        <div className="absolute w-full bg-background border shadow ">
          <div>
            {items.map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-lighterPurple"
                onClick={() => {
                  handleItemClick(item.description)
                }}
              >
                {item.description}
              </div>
            ))}
          </div>
          <SearchTagButtons />
        </div>
      )}
    </div>
  )
}

export default SearchDropdown
