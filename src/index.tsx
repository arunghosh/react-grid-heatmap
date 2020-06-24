import * as React from 'react'
import Cell from './Cell'
import Row from './Row'
import XLabels from './XLabels'
import Column from './Column'
import YLabels from './YLabels'
import YLabelAligner from './YLabelAligner'

interface Props {
  xLabels: string[]
  yLabels: string[]
  data: number[][]
  cellHeight?: string
  square?: boolean
  xLabelsPos?: 'top' | 'bottom'
  xLabelsStyle?: (index: number) => {}
  yLabelsStyle?: (index: number) => {}
  cellStyle?: (x: number, y: number, ratio: number) => {}
  cellRender?: (x: number, y: number, ratio: number) => {}
}

interface ClientHeight {
  clientHeight: number
}

function getMinMaxDiff(data: number[][]): number {
  const flatArray = data.reduce((i, o) => [...o, ...i], [])
  const max = Math.max(...flatArray)
  const min = Math.min(...flatArray)
  return max - min
}

export const HeatMapGrid = ({
  data,
  xLabels,
  yLabels,
  xLabelsPos = 'top',
  square = false,
  cellHeight = '2px',
  xLabelsStyle,
  yLabelsStyle,
  cellStyle,
  cellRender
}: Props) => {
  const [xLabelHeight, setXLabelHeight] = React.useState<number>(22)
  const xLabelRef = React.useRef(null)
  const minMaxDiff = getMinMaxDiff(data)
  const isXLabelReverse = xLabelsPos === 'bottom'

  // TODO: move to custom hook
  React.useEffect(() => {
    if (xLabelRef.current) {
      const height = ((xLabelRef.current || {}) as ClientHeight).clientHeight
      setXLabelHeight(height)
    }
  })

  return (
    <Row>
      <YLabelAligner
        xLabelHeight={xLabelHeight}
        isXLabelReverse={isXLabelReverse}
      >
        <YLabels
          labels={yLabels}
          height={cellHeight}
          yLabelsStyle={yLabelsStyle}
        />
      </YLabelAligner>
      <Column reverse={isXLabelReverse}>
        <div ref={xLabelRef}>
          <XLabels
            labels={xLabels}
            xLabelsStyle={xLabelsStyle}
            height={cellHeight}
            square={square}
          />
        </div>
        <Column>
          {data.map((rowItems, xi) => (
            <Row key={xi}>
              {rowItems.map((value, yi) => (
                <Cell
                  key={`${xi}-${yi}`}
                  posX={xi}
                  posY={yi}
                  value={value}
                  height={cellHeight}
                  square={square}
                  render={cellRender}
                  style={cellStyle}
                  ratio={value / minMaxDiff}
                />
              ))}
            </Row>
          ))}
        </Column>
      </Column>
    </Row>
  )
}

export { Cell }
