import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import { HeatMapGrid } from '.'

const xLabels = new Array(10).fill(0).map((_, i) => `${i}Hr`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * Math.random() * 200))
  )

describe('HeatMapGrid', () => {
  it('is truthy', () => {
    expect(HeatMapGrid).toBeTruthy()
  })

  it('should render with only its madatory attributes and Y-axis labels', () => {
    render(<HeatMapGrid data={data} yLabels={yLabels} />)
    expect(screen.getByText('Sun')).toBeInTheDocument()
  })

  it('should handle onclick without any error even if onclick is not provided', () => {
    render(
      <HeatMapGrid
        data={data}
        cellRender={(_x, _y, value) => <div>{value}</div>}
        yLabels={yLabels}
      />
    )
    expect(screen.getAllByText(data[0][0].toString())[0]).toBeInTheDocument()
    fireEvent.click(screen.getAllByText(data[0][0].toString())[0])
  })

  it('should invoke onclick callback when user clicks on a cell', () => {
    const onClick = jest.fn();
    render(
      <HeatMapGrid
        data={data}
        onClick={onClick}
        cellRender={(_x, _y, value) => <div>{value}</div>}
        yLabels={yLabels}
      />
    )
    expect(screen.getAllByText(data[0][0].toString())[0]).toBeInTheDocument()
    fireEvent.click(screen.getAllByText(data[0][0].toString())[0])
    expect(onClick).toHaveBeenCalledTimes(1)
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
