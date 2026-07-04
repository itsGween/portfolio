export default function TypingIndicator() {
  return (
    <div className="flex gap-[9px] items-end max-w-[90%]">
      <span
        className="flex-none w-7 h-7 rounded-full"
        style={{ background: '#3a1a08 url(/assets/gween-bot.png) center -2px/150% no-repeat' }}
      />
      <div
        className="flex gap-1 px-[14px] py-[13px] rounded-[16px]"
        style={{ background: '#2a1a0e', borderBottomLeftRadius: 5 }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[7px] h-[7px] rounded-full"
            style={{
              background: '#b7a493',
              animation: `btb 1s infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
