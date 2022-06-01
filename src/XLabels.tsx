import React from 'react'

interface Props {
  labels: string[]
  xLabelsStyle?: (index: number) => {}
  square?: boolean
  height: string
}

export default function XLabels({
  labels,
  xLabelsStyle = () => ({}),
  height,
  square = false
}: Props) {
  const widthPercent = `${100 / labels.length}%`
  return (
    <div style={{ display: 'flex', textAlign: 'center' }}>
      {labels.map((label, index) => (
        <div
          key={`${label}-${index}`}
          style={{
            padding: '0.2rem 0',
            boxSizing: 'border-box',
            flexGrow: square ? 'initial' : 1,
            overflow: 'hidden',
            flexShrink: 1,
            flexBasis: square ? height : widthPercent,
            width: square ? height : widthPercent,
            ...xLabelsStyle(index)
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
