import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { HeatMapGrid } from '.'

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 50 + 50))
  )

describe('HeatMapGrid', () => {
  it('is truthy', () => {
    expect(HeatMapGrid).toBeTruthy()
  })

  it('should render with only its madatory attributes and Y-axis labels', () => {
    render(
      <HeatMapGrid
        data={data}
        yLabels={yLabels}
      />
    )
    expect(screen.getByText('Sun')).toBeInTheDocument()
  })

  it('should render with all its optional attributes', () => {
    render(
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? 'transparent' : '#777',
          fontSize: '.8rem'
        })}
        yLabelsStyle={() => ({
          fontSize: '.7rem',
          textTransform: 'uppercase',
          color: '#777'
        })}
        cellStyle={(_, __, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: '.8rem',
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
        })}
        cellHeight='2rem'
        xLabelsPos='bottom'
        yLabelsPos='right'
        square
      />
    )
    expect(screen.getByText('Sun')).toBeInTheDocument()
  })
})
