import React from 'react';

export default function Button({ value, label, color, size, pressed, onClick }) {
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
