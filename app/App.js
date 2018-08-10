'use strict';

// 3rd party
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFontIt from 'react-font-it';
import math from 'mathjs';


// Components
import Display from './components/Display'
import Button from './components/Button'

const styles = {
	google: {
		fontFamily: 'Work Sans'
	}
};

const fontConfig = {
	google: ['Work Sans:200']
};

class App extends Component {
	constructor() {
		super()
		this.state = { queue: [] }
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e) => {
		const value = e.target.getAttribute('data-value');
		switch (value) {
			case 'clear':
				this.setState({
					queue: []
				})
				break;
			case '=':
				this.calculate();
				break;
			default:
				this.setState({
					queue: [...this.state.queue, value]
				})
				break;
		}
	}
	calculate = () => {
		const input = this.state.queue.join('');
		if (input.length) {
			const result = math.eval(input);
			const formattedResult = math.format(result, { precision: 14 });
			this.setState({
				queue: [formattedResult]
			});
		}
	}
	render() {
		return (
			<div className='frame' style={styles.google}>
				<div className='calculator'>
					<Display input={this.state.queue} />
					<div className='panel'>
						<div className='number-container'>
						<Button size='3x' color="white" onClick={this.handleClick} value='clear' style={{ borderTopLeftRadius: 20 }}/>
							{
								[...Array(9).keys()]
									.sort((a, b) => b - a)
									.map(item =>
										<Button key={item} size='1x' color="white" onClick={this.handleClick} value={(item + 1).toString()} />
									)
							}
							<Button size='2x' color="white" onClick={this.handleClick} value='0' />
							<Button size='1x' color="white" onClick={this.handleClick} value='.' />
						</div>

						<div className='operation-container'>
							<Button size='1x' color="red" onClick={this.handleClick} value='/' label='&divide;' style={{ borderTopRightRadius: 20 }} />
							<Button size='1x' color="red" onClick={this.handleClick} value='*' label='&times;' />
							<Button size='1x' color="red" onClick={this.handleClick} value='-' />
							<Button size='1x' color="red" onClick={this.handleClick} value='+' />
							<Button size='1x' color="red" onClick={this.handleClick} value='=' />
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
