import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../../redux/action'

interface IProps {
  handleSubmit: (value: string) => void
}
interface IState {
  value: string
}

export class AddTodo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: ''
    }
  } 
  _handleSubmit = (e: any) => {
    const value = e.target.value
    
    if (e.key === 'Enter' && value) {
      this.setState({
        value
      })
      this.props.handleSubmit(value)
      this.setState({
        value: ''
      })
    }    
  }
  handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({
      value
    })
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <input onKeyUp={this._handleSubmit} value={value} onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    handleSubmit: (text:any) => {
      dispatch(addTodo(text))
    }
  }
}
export default connect(null, mapDispatchToProps)(AddTodo)