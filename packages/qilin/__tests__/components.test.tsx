// counter-rtl.test.js
import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
/**
 * 不论是hooks写法还是class写法都支持
 */
// import Counter from "../counter";
import Counter from '../src/components'

describe('<Counter />', () => {
  // cleanup 作为一个参数传递给 afterEach ，以便在每次测试后清理所有东西，以避免内存泄漏。
  afterEach(cleanup)

  it('properly increments and decrements the counter', () => {
    /**
     * AAA模式：编排（Arrange），执行（Act），断言（Assert）。
     * 几乎所有的测试都是这样写的。首先，您要编排(初始化)您的代码，以便为接下来的步骤做好一切准备。然后，您执行用户应该执行的步骤(例如单击)。最后，您对应该发生的事情进行断言。
     */

    // 编排（Arrange）
    // 渲染组件
    const { getByText, asFragment } = render(<Counter />)
    // 获取dom元素
    const counter = getByText('0')
    const incrementButton = getByText('+')
    const decrementButton = getByText('-')
    /**
     * getByLabelText:搜索与作为参数传递的给定文本匹配的标签，然后查找与该标签关联的元素。
        getByText:搜索具有文本节点的所有元素，其中的textContent与作为参数传递的给定文本匹配。
        getByTitle:返回具有与作为参数传递的给定文本匹配的title属性的元素。
        getByPlaceholderText:搜索具有占位符属性的所有元素，并找到与作为参数传递的给定文本相匹配的元素。
     */
    // 执行（Act）
    fireEvent.click(incrementButton)
    // 断言（Assert）。
    expect(counter.textContent).toEqual('1')

    fireEvent.click(decrementButton)
    expect(counter.textContent).toEqual('0')

    // 创建测试快照, 我们可以使用 render 呈现组件，并从方法中获取 asFragment 作为返回值。最后，确保组件的片段与快照匹配。
    // 如果，你在 组件 中做出更改，测试将失败，因为快照将不再匹配。更新快照可以按 u(jest -u) ，或者将对应快照文件删除即可。
    expect(asFragment()).toMatchSnapshot()
  })
})
