import React from 'react'

interface Props {
  labels: string[]
  height: string
  yLabelsStyle?: (index: number) => {}
}

export default function YLabels({
  labels,
  height,
  yLabelsStyle = () => ({})
}: Props) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}
    >
      {labels.map((label, index) => (
        <div
          key={label}
          style={{
            boxSizing: 'border-box',
            padding: '0 0.2rem',
            lineHeight: height,
            ...yLabelsStyle(index)
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
