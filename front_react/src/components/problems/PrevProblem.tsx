import { BiLinkExternal } from 'react-icons/bi'

const PrevProblem = () => {
  return (
    <div className="flex w-full bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 hover:bg-dimmedPurple hover:bg-opacity-80 hover:border-opacity-0 transition-colors">
      <img
        src="/swea.png"
        alt="백준로고"
        width={20}
        height={20}
        className="rounded-full mr-4 "
      />
      <div className="mr-2 w-[80%]">
        {'5534.'}
        {'민숭의 생일파티'}
      </div>
      <a
        className=""
        target="_blank"
        href={'https://www.acmicpc.net/problem/1000'}
      >
        <BiLinkExternal />
      </a>
    </div>
  )
}

export default PrevProblem
