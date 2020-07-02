import React from 'react'

interface Props {
  children: any
  reverse?: boolean
  grow?: boolean
}

export default function Column({
  children,
  grow = false,
  reverse = false
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        flexGrow: grow ? 1 : 0
      }}
    >
      {children}
    </div>
  )
}
