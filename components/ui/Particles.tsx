'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface ParticleConfig {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
  xDrift: number
  yDrift: number
}

interface ParticlesProps {
  count?: number
  className?: string
}

export default function Particles({ count = 24, className }: ParticlesProps) {
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: i % 3 === 0 ? '#FF00E5' : '#00F0FF',
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      xDrift: (Math.random() - 0.5) * 60,
      yDrift: (Math.random() - 0.5) * 60,
    }))
  }, [count])

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            x: [0, p.xDrift, 0],
            y: [0, p.yDrift, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
