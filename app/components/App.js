'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFontIt from 'react-font-it';

const styles = {
	google: {
		fontFamily: 'Work Sans'
	}
};

const fontConfig = {
	google: ['Work Sans:200']
};

class App extends Component {
	render() {
		return (
			<div className='frame' style={styles.google}>
				<div className='calculator'>
					<div className='display'>
						<div className='input'>0 - 6 / 5 + 67 x 67 - 9</div>
					</div>
					<div className='panel'>
						<div className='number-container'>
							<div className='btn white-btn btn-3x'
								style={{ borderTopLeftRadius: 20 }}
								children={<span>clear</span>} />
							{
								[...Array(9).keys()]
									.sort((a, b) => b - a)
									.map(item =>
										<div className='btn white-btn btn-1x'
											key={item}
											children={<span>{item + 1}</span>}
										/>)
							}
							<div className='btn white-btn btn-2x'
								children={<span>0</span>} />
							<div className='btn white-btn btn-1x'
								children={<span>.</span>} />
						</div>
						<div className='operation-container'>
							<div className='btn red-btn btn-1x'
								style={{ borderTopRightRadius: 20 }}
								children={<span>&divide;</span>} />
							<div className='btn red-btn btn-1x'
								children={<span>&times;</span>} />
							<div className='btn red-btn btn-1x'
								children={<span>-</span>} />
							<div className='btn red-btn btn-1x'
								children={<span>+</span>} />
							<div className='btn red-btn btn-1x'
								children={<span>=</span>} />
						</div>
					</div>

				</div>
			</div>
		);
	}
}

App.propTypes = {
	testProp: PropTypes.string.isRequired
};

export default ReactFontIt(App, fontConfig);
