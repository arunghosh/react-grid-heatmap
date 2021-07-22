import React from 'react'

interface Props {
  children: any
  reverse?: boolean
}

export default function Row({ children, reverse = false }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        justifyContent: reverse ? 'flex-end' : 'initial'
      }}
    >
      {children}
    </div>
  )
}
