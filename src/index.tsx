import * as React from 'react'
import Cell from './components/Cell'
import Row from './components/Row'
import XLabels from './components/XLabels'
import Column from './components/Column'
import YLabels from './components/YLabels'
import YLabelAligner from './components/YLabelAligner'
import useElemetHeight from './hooks/useElemetHeight'

interface Props {
  data: number[][]
  xLabels?: string[]
  yLabels?: string[]
  cellHeight?: string
  square?: boolean
  xLabelsPos?: 'top' | 'bottom'
  yLabelsPos?: 'left' | 'right'
  xLabelsStyle?: (index: number) => {}
  yLabelsStyle?: (index: number) => {}
  cellStyle?: (x: number, y: number, ratio: number) => {}
  cellRender?: (x: number, y: number, value: number) => {}
  onClick?: (x: number, y: number) => void
}

function getMinMax(data: number[][]): [number, number] {
  const flatArray = data.reduce((i, o) => [...o, ...i], [])
  const max = Math.max(...flatArray)
  const min = Math.min(...flatArray)
  return [min, max]
}

export const HeatMapGrid = ({
  data,
  xLabels,
  yLabels,
  xLabelsPos = 'top',
  yLabelsPos = 'left',
  square = false,
  cellHeight = '2px',
  xLabelsStyle,
  yLabelsStyle,
  cellStyle,
  cellRender,
  onClick
}: Props) => {
  const [xLabelHeight, xLabelRef] = useElemetHeight(22)
  const [min, max] = getMinMax(data)
  const minMaxDiff = max - min
  const isXLabelReverse = xLabelsPos === 'bottom'
  const isYLabelReverse = yLabelsPos === 'right'

  return (
    <Row reverse={isYLabelReverse}>
      {yLabels && (
        <YLabelAligner
          xLabelHeight={xLabelHeight}
          isXLabelReverse={isXLabelReverse}
        >
          <YLabels
            reverse={isYLabelReverse}
            labels={yLabels}
            height={cellHeight}
            yLabelsStyle={yLabelsStyle}
          />
        </YLabelAligner>
      )}
      <Column reverse={isXLabelReverse} grow={!square}>
        <div ref={xLabelRef}>
          {xLabels && (
            <XLabels
              labels={xLabels}
              xLabelsStyle={xLabelsStyle}
              height={cellHeight}
              square={square}
            />
          )}
        </div>
        <Column>
          {data.map((rowItems, xi) => (
            <Row key={xi}>
              {rowItems.map((value, yi) => (
                <Cell
                  key={`${xi}-${yi}`}
                  posX={xi}
                  posY={yi}
                  onClick={onClick}
                  value={value}
                  height={cellHeight}
                  square={square}
                  render={cellRender}
                  style={cellStyle}
                  ratio={(value - min) / minMaxDiff}
                />
              ))}
            </Row>
          ))}
        </Column>
      </Column>
    </Row>
  )
}
