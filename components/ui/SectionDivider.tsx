import { cn } from '@/lib/utils'

interface SectionDividerProps {
  number: string
  title: string
  color?: string   // e.g. "#00F0FF", "#FF00E5", "#FBFF00"
  className?: string
}

export default function SectionDivider({
  number,
  title,
  color = '#00F0FF',
  className,
}: SectionDividerProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-12', className)}>
      {/* Outline Number – unchanged */}
      <span
        className="font-display font-black text-6xl md:text-8xl leading-none select-none"
        style={{
          WebkitTextStroke: `1px ${color}4D`,
          color: 'transparent',
        }}
      >
        {number}
      </span>

      {/* Line + Title */}
      <div className="relative flex-1 flex items-center">
        {/* Gradient line: transparent on left → full colour on right */}
        <div
          className="w-full h-px"
          style={{
            background: `linear-gradient(to right, transparent 0%, ${color}4D 50%, ${color} 100%)`,
          }}
        />

        {/* Title – larger, shifted left, vertically centred on the line */}
        <span
          className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0A0A0F] pl-4 font-display font-bold text-lg md:text-xl tracking-[0.3em] uppercase whitespace-nowrap"
          style={{ color }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}