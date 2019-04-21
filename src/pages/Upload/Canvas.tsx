import * as React from 'react'

interface IState {
  propsCanvas: object
}

export class Canvas extends React.Component<{}, IState> {
  refCanvas: React.RefObject<HTMLCanvasElement> = React.createRef()
  refPanel: React.RefObject<HTMLDivElement> = React.createRef()
  state = {
    propsCanvas: {}
  }
  componentDidMount () {
    this.setCanvasSize()
    window.addEventListener('resize', this.setCanvasSize)
  }
  componentWillUnmount() {
    // window.removeEventListener('resize', this.calcCanvasSize)
  }
  drawBackImg() {

  }
  setCanvasSize = () => {
    const elPanel = this.refPanel.current as HTMLDivElement
    const elCanvas = this.refCanvas.current as HTMLCanvasElement
    elCanvas.width = elPanel.offsetWidth
    elCanvas.height = elPanel.offsetHeight
  }
  render() {
    return (
      <div className="canvas-panel" ref={this.refPanel}>
        <canvas ref={this.refCanvas}></canvas>
      </div>
    )
  }
}