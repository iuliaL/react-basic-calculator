import React, { Component } from 'react';

class Button extends Component {
	render() {
		const label = this.props.label || this.props.value;
		return (
			<div
				onClick={this.props.onClick}
				className={`btn ${this.props.color}-btn btn-${this.props.size}`}
				data-value={this.props.value}
			>
				{label}
			</div>
		)
	}
}

export default Button;
