import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		const { value, label, color, size, pressed, onClick } = this.props;
		const text = label || value;
		return (
			<div
				onClick={onClick}
				className={`btn ${color}-btn btn-${size} ${pressed && `btn-${color}-pressed`}`}
				data-value={value}>
				{text}
			</div>
		);
	}
}
