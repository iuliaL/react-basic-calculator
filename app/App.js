'use strict';

// 3rd party
import React, { Component } from 'react';
import ReactFontIt from 'react-font-it';
import math from 'mathjs';
import keydown from 'react-keydown';

// Components
import Display from './components/Display'
import Button from './components/Button'

@keydown
export default class Calculator extends Component {

	state = { queue: [] };

	componentWillReceiveProps(nextProps) {
		const { keydown: { event } } = nextProps;
		if (event) {
			this.handleKeyPress(event.key);
		}
	}

	handleValue = value => {
		switch (value) {
			case 'clear':
				this.setState(() => ({
					queue: [],
					pressedKey: null
				}));
				break;
			case '=':
				this.calculate();
				break;
			default:
				this.setState((prevState) => ({
					...prevState,
					queue: [...prevState.queue, value]
				}));
				break;
		}
	}

	handleKeyPress = key => {
		const acceptedKeys = [
			'.',
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'+', '-', '*', '/', '=',
			'Enter', 'Backspace'
		];
		const keyAccepted = acceptedKeys.indexOf(key) > -1;
		if (keyAccepted) {
			let timerId;
			const keyValue = (key === 'Enter' && '=') || (key === 'Backspace' && 'clear') || key;
			this.setState((prevState) => ({ ...prevState, pressedKey: keyValue }));
			this.handleValue(keyValue);
			if (timerId) {
				clearTimeout(timerId);
			}
			timerId = setTimeout(() =>
				this.setState((prevState) => ({ ...prevState, pressedKey: null }))
				, 300);
		}
	}

	handleClick = e => {
		const value = e.target.getAttribute('data-value');
		this.handleValue(value);
	}

	calculate = () => {
		const input = this.state.queue.join('');
		if (input.length) {
			const result = math.eval(input);
			const formattedResult = math.format(result, { precision: 10 });
			this.setState((prevState) => ({
				...prevState,
				queue: [formattedResult]
			}));
		}
	}

	render() {
		return (
			<div className='frame'>
				<div className='calculator'>
					<Display input={this.state.queue} />
					<div className='panel'>
						<div className='number-container'>
							<Button
								pressed={this.state.pressedKey === 'clear'}
								size='3x' color="white" onClick={this.handleClick} value='clear'
								style={{ borderTopLeftRadius: 20 }} />
							{
								[...Array(9).keys()]
									.sort((a, b) => b - a)
									.map(item =>
										<Button
											pressed={this.state.pressedKey === (item + 1).toString()}
											key={item}
											size='1x'
											color="white"
											onClick={this.handleClick}
											value={(item + 1).toString()} />
									)
							}
							<Button pressed={this.state.pressedKey === '0'}
								size='2x' color="white" onClick={this.handleClick} value='0' />
							<Button pressed={this.state.pressedKey === '.'}
								size='1x' color="white" onClick={this.handleClick} value='.' />
						</div>

						<div className='operation-container'>
							<Button size='1x' color="red"
								pressed={this.state.pressedKey === '/'}
								onClick={this.handleClick}
								value='/'
								label='&divide;'
								style={{ borderTopRightRadius: 20 }} />
							<Button pressed={this.state.pressedKey === '*'}
								size='1x' color="red" onClick={this.handleClick} value='*' label='&times;' />
							<Button pressed={this.state.pressedKey === '-'}
								size='1x' color="red" onClick={this.handleClick} value='-' />
							<Button pressed={this.state.pressedKey === '+'}
								size='1x' color="red" onClick={this.handleClick} value='+' />
							<Button pressed={this.state.pressedKey === '='}
								size='1x' color="red" onClick={this.handleClick} value='=' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
