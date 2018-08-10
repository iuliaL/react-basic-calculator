import React, { Component } from 'react'

class Display extends Component {
	render() {
		const input = this.props.input.join('');
		return <div className='display'>
			<div className='input'>{input}</div>
		</div>;
	}
}
export default Display