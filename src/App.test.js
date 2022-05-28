import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import Chance from 'chance';

const chance = new Chance();

describe('App', () => {
    let inputNumberInput,
        checkNumberButton,
        resultText;

    const updateElements = () => {
        inputNumberInput = screen.getByTestId('inputValueInput');
        checkNumberButton = screen.getByTestId('checkNumberButton');
        resultText = screen.queryByTestId('resultText');
    };

    const renderComponent = () => {
        render(<App/>);

        updateElements();
    };

    const setInputValue = value => {
        fireEvent.change(inputNumberInput, {
            target: {value}
        });

        updateElements();
    };

    const clickCheckInputButton = () => {
        fireEvent.click(checkNumberButton);

        updateElements();
    };

    it('should initially render elements as expected', () => {
        renderComponent();
        expect(screen.getByText('Input Number:')).toBeInTheDocument();
        expect(inputNumberInput).toBeInTheDocument();
        expect(checkNumberButton).toBeInTheDocument();
        expect(checkNumberButton.innerHTML).toBe('Check Input Value');
        expect(resultText).toBeNull();
    });

    it('should update the input value when text is entered without running the check', () => {
        renderComponent();
        const newValue = chance.natural();
        setInputValue(newValue);

        expect(inputNumberInput.value).toBe(newValue.toString());

        expect(resultText).toBeNull();
    });

    it('should calculate the square value of the input value', async () => {
        renderComponent();
        const newValue = chance.natural();
        setInputValue(newValue);
        clickCheckInputButton();

        expect(resultText).toBeVisible();
        expect(resultText.innerHTML).toContain(`The number ${newValue * newValue}`);
    });

    it('should correctly display result when number is in Fibonacci sequence', async () => {
        renderComponent();
        const newValue = chance.pickone([0, 1, 12, 44444444]);
        setInputValue(newValue);
        clickCheckInputButton();

        expect(resultText).toBeVisible();
        expect(resultText.innerHTML).toContain(`The number ${newValue * newValue} is part of the Fibonacci sequence`);
    });

    it('should correctly display result when number is not in Fibonacci sequence', async () => {
        renderComponent();
        const newValue = chance.pickone([2, 3, 4, 5, 6]);
        setInputValue(newValue);
        clickCheckInputButton();

        expect(resultText).toBeVisible();
        expect(resultText.innerHTML).toContain(`The number ${newValue * newValue} is NOT part of the Fibonacci sequence`);
    });

    it('should clear result when button clicked after clearing the input value', async () => {
        renderComponent();
        setInputValue(chance.natural());
        clickCheckInputButton();

        expect(resultText).toBeVisible();

        setInputValue('');
        clickCheckInputButton();

        expect(resultText).toBeNull();
    });

    //future tests/considerations to implement
    //1) validation on the input to insure it's an integer value using a regex
    //2) disable button until the value is a valid number to check
    //3) button to clear result and reset input
});
