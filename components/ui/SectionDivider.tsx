import { cn } from '@/lib/utils'

interface SectionDividerProps {
  number: string
  label?: string
  className?: string
}

export default function SectionDivider({ number, label, className }: SectionDividerProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-12', className)}>
      <span
        className="font-display font-black text-6xl md:text-8xl leading-none select-none"
        style={{
          WebkitTextStroke: '1px rgba(0,240,255,0.3)',
          color: 'transparent',
        }}
      >
        {number}
      </span>
      {label && (
        <>
          <div className="h-px flex-1 bg-gradient-to-r from-[#00F0FF]/40 to-transparent" />
          <span className="font-display font-700 text-lg md:text-xl tracking-[0.3em] text-[#00F0FF] uppercase">
            {label}
          </span>
          <div className="h-px w-16 bg-[#00F0FF]/40" />
        </>
      )}
      {!label && (
        <div className="h-px flex-1 bg-gradient-to-r from-[#00F0FF]/40 to-transparent" />
      )}
    </div>
  )
}
