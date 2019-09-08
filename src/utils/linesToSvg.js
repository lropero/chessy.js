import React from 'react'

const linesToSvg = (lines, width) => {
  return (
    <svg height={width} width={width}>
      {lines.map((line, index) => (
        <polyline
          fill='none'
          key={index}
          points={`${line.x1},${line.y1} ${line.x2},${line.y2}`}
          stroke={line.color}
          strokeWidth='8'
        />
      ))}
    </svg>
  )
}

export default linesToSvg
