import * as React from 'react'
import { Upload, Icon } from '@/components'
import { UploadChangeParam } from 'antd/lib/upload'
import { Canvas } from './Canvas'
import { ToolBar } from './ToolBar'
import { resolveSortedBase64List } from './internal'

import './style'

const Dragger = Upload.Dragger

const props = {
  name: 'files',
  multiple: true,
  accept: 'image/*',
  showUploadList: false,
  customRequest() {}
}

export class UploadPage extends React.Component {
  canvasEl: HTMLCanvasElement
  canvasCtx: CanvasRenderingContext2D
  state = {
    fileList: [],
    base64List: []
  }
  handleOnChange = async (param: UploadChangeParam) => {
    const originFileList = param.fileList.map(
      uploadFile => uploadFile.originFileObj
    ) as File[]
    resolveSortedBase64List({
      fileList: originFileList
    })
    this.setState({
      fileList: param.fileList
    })
  }
  setCanvasEl = (el: HTMLCanvasElement) => {
    this.canvasEl = el
    this.canvasCtx = el.getContext('2d') as CanvasRenderingContext2D
  }
  render() {
    const { fileList } = this.state
    return (
      <>
        <div className="upload-container">
          <Dragger {...{ ...props, onChange: this.handleOnChange, fileList }}>
            <Icon type="upload" />
          </Dragger>
        </div>
        <div className="upload-tool-bar">
          <ToolBar />
        </div>
        <div className="upload-content">
          <div className="left" />
          <div className="right">
            <Canvas setCanvasEl={this.setCanvasEl} />
          </div>
        </div>
      </>
    )
  }
}
