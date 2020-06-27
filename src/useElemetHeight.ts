import React from 'react'

interface ClientHeight {
  clientHeight: number
}

export default function useElemetHeight(
  initHeight: number
): [number, React.MutableRefObject<any>] {
  const eleRef = React.useRef(null)
  const [eleHeight, setEleHeight] = React.useState<number>(initHeight)

  React.useEffect(() => {
    if (eleRef.current) {
      const height = ((eleRef.current || {}) as ClientHeight).clientHeight
      setEleHeight(height)
    }
  }, [])

  return [eleHeight, eleRef]
}
