import React from 'react'
import { AddTodo } from '../components/Todos/components/AddTodo'
import { shallow, mount } from 'enzyme'

const setup = () => {
  // 模拟props
  const props = {
    handleSubmit: jest.fn()
  }

  const wrapper = shallow(<AddTodo {...props}/>)
  const mounted = mount(<AddTodo {...props}/>)
  return {
    props,
    wrapper,
    mounted
  }
}

describe('components', () => {
  describe('AddTodo', () => {
    const { wrapper, props } = setup()
    it('render input 输入框', () => {
      expect(wrapper.find('input').exists());
    })
    it('如果输入框有内容，敲下回车后 todo列表中应该有一条数据', () => {
      const mockEvent = {
        key: 'Enter',
        target: {
          value: 'test'
        }
      }
      wrapper.find('input').simulate('keyup', mockEvent)
      expect(props.handleSubmit).toBeCalled();
    })
    it('如果输入框没有输入内容，回车后 handleSubmit 不被调用', () => {
      const { wrapper, props } = setup();
      const mockEventObj = {
        key: 'Enter',
        target: {
          value: ''
        }
      };

      wrapper.find('input').simulate('keyup', mockEventObj);
      expect(props.handleSubmit).not.toBeCalled();
    });

    it('handleSubmit 之后清空输入框', () => {
      const { mounted } = setup();
      const mockEventObj = {
        key: 'Enter',
        target: {
          value: 'test'
        }
      };
      mounted.find('input').simulate('keyup', mockEventObj);
      expect(mounted.find('input').props().value).toEqual('');
    });
  })
})