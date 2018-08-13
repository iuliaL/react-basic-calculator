import React from 'react'

export default function Display({ input }) {
	const output = input
		.map((char) => {
			switch (char) {
				case '*': {
					return '&times;'
				}
				case '/': {
					return '&divide;'
				}
				default: {
					return char;
				}
			}
		})
		.join('');
	return <div className='display'>
		<div className='input' dangerouslySetInnerHTML={createMarkup(output)} />
	</div>;
}

function createMarkup(input) { return { __html: input }; }
