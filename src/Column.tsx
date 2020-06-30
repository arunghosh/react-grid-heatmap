import React from 'react'

interface Props {
  children: any
  reverse?: boolean
}

export default function Column({ children, reverse = false }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        flexGrow: 1
      }}
    >
      {children}
    </div>
  )
}
