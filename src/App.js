import './App.css';
import {useState} from 'react';

export const App = () => {
    const [inputValue, updateInputValue] = useState('');
    const [squaredInputValue, updateSquaredInputValue] = useState('');

    const inputNumberChange = e => {
        updateInputValue(e.target.value);
    };

    const checkInputValue = () => {
        updateSquaredInputValue(inputValue === '' ? inputValue : inputValue * inputValue);
    };

    const isSquaredInputValueInFibonacci = () => {
        const isSquare = n => n > 0 && Math.sqrt(n) % 1 === 0;
        return !!(isSquare(5 * (squaredInputValue * squaredInputValue) - 4) || isSquare(5 * (squaredInputValue * squaredInputValue) + 4));
    };

    return (
        <div className="App">
            <div>
                <label htmlFor="inputValue">{'Input Number: '}</label>
                <input
                    id="inputValue"
                    data-testid="inputValueInput"
                    onChange={inputNumberChange}
                    value={inputValue}/>
                <button
                    data-testid="checkNumberButton"
                    name="checkValue"
                    onClick={checkInputValue}>
                    {'Check Input Value'}
                </button>
            </div>
            {squaredInputValue !== '' &&
            <div>
                <p data-testid="resultText">
                    The number {squaredInputValue} is {isSquaredInputValueInFibonacci() ? '' : 'NOT '}part of
                    the Fibonacci sequence.
                </p>
            </div>
            }
        </div>
    );
};

export default App;
