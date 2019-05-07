import * as React from 'react'
import { Select, InputNumber } from '@/components'
import { InputNumberProps } from 'antd/lib/input-number'
import { SelectProps } from 'antd/lib/select'

const Option = Select.Option

export class ToolBar extends React.Component {
  render() {
    return (
      <>
        <span>对齐方式：</span>
        <Select {...SelectProps}>
          <Option value="auto">自适应</Option>
          <Option value="vertical">从上到下</Option>
          <Option value="horizontal">从左到右</Option>
          <Option value="tilt">斜对齐</Option>
        </Select>
        <span className="space"></span>
        <span>元素间距：</span>
        <InputNumber {...InputNumberProps} />
      </>
    )
  }
}

const SelectProps: SelectProps = {
  size: 'small',
  style: {
    width: 100
  }
}

const InputNumberProps: InputNumberProps = {
  defaultValue: 10,
  size: 'small',
  formatter: (value?: string | number) => `${value} px`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  parser(value: string) {
    value = value.replace(/\s?|(,*)\s*px/g, '')
    const num = parseInt(value)
    return isNaN(num) ? 0 : num
  }
}