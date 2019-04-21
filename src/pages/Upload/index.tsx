import * as React from 'react'
import { Upload, Icon, message } from '@/components'
import { UploadChangeParam } from 'antd/lib/upload'
import { Canvas } from './Canvas'

import './style'

const Dragger = Upload.Dragger

const props = {
  name: 'files',
  multiple: true,
  accept: 'image/*',
  showUploadList: false,
  customRequest() {},
}

export class UploadPage extends React.Component {
  state = {
    fileList: []
  }
  handleOnChange = (param: UploadChangeParam) => {
    this.setState({
      fileList: param.fileList
    })
  }
  render() {
    const {fileList} = this.state
    return (
      <>
        <div className="upload-container">
          <Dragger {...props} onChange={this.handleOnChange} fileList={fileList}>
            <Icon type="upload" />
          </Dragger>
        </div>
        <div className="upload-tool-bar"></div>
        <div className="upload-content">
          <div className="left"></div>
          <div className="right">
            <Canvas />
          </div>
        </div>
      </>
    )
  }
}