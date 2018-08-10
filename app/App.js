'use strict';

// 3rd party
import React, { Component } from 'react';
import ReactFontIt from 'react-font-it';
import math from 'mathjs';
import keydown from 'react-keydown';

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

@keydown
class App extends Component {

	state = { queue: [] };

	componentWillReceiveProps(nextProps) {
		const { keydown: { event } } = nextProps;
		if (event) {
			const acceptedKeys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'Enter', 'Backspace'];
			const pressedKey = event.key;
			const keyAccepted = acceptedKeys.indexOf(pressedKey) > -1;
			if (keyAccepted) {
				const key = (pressedKey === 'Enter' && '=') || (pressedKey === 'Backspace' && 'clear') || pressedKey;
				this.setState({ ...this.state, pressedKey: key });
				this.handleValue(key);
			}
		}
	}

	handleValue = (value) => {
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

	handleClick = (e) => {
		const value = e.target.getAttribute('data-value');
		this.handleValue(value);
	}

	calculate = () => {
		const input = this.state.queue.join('');
		if (input.length) {
			const result = math.eval(input);
			const formattedResult = math.format(result, { precision: 14 });
			this.setState({
				...this.state,
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
							<Button size='3x' color="white" onClick={this.handleClick} value='clear' style={{ borderTopLeftRadius: 20 }} />
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

export default ReactFontIt(App, fontConfig);
