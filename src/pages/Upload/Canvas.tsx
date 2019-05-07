import * as React from 'react'

interface IProps {
  setCanvasEl: (el: HTMLCanvasElement) => void
}

export class Canvas extends React.Component<IProps> {
  refCanvas: React.RefObject<HTMLCanvasElement> = React.createRef()
  componentDidMount() {
    const { setCanvasEl } = this.props
    setCanvasEl(this.refCanvas.current as HTMLCanvasElement)
  }
  render() {
    return (
      <div className="canvas-panel">
        <canvas ref={this.refCanvas}></canvas>
      </div>
    )
  }
}