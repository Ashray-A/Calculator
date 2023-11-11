document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    let displayValue = '0';
    let firstNumber = null;
    let operator = null;
  
    // Get elements
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
  
    // Helper function to update display
    function updateDisplay() {
      display.textContent = displayValue;
    }
  
    // Helper function to perform basic math operations
    function operate() {
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(displayValue);
  
      switch (operator) {
        case 'add':
          displayValue = (num1 + num2).toString();
          break;
        case 'subtract':
          displayValue = (num1 - num2).toString();
          break;
        case 'multiply':
          displayValue = (num1 * num2).toString();
          break;
        case 'divide':
          if (num2 === 0) {
            displayValue = 'Error';
          } else {
            displayValue = (num1 / num2).toString();
          }
          break;
        default:
          break;
      }
  
      // Round answers with long decimals
      displayValue = parseFloat(displayValue).toFixed(10).toString().replace(/\.?0+$/, '');
  
      updateDisplay();
    }
  
    // Event listener for button clicks
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const buttonValue = this.textContent;
  
        if (!isNaN(buttonValue) || buttonValue === '.') {
          // Handle number and decimal button clicks
          displayValue = displayValue === '0' ? buttonValue : displayValue + buttonValue;
        } else if (buttonValue === 'C') {
          // Handle clear button click
          displayValue = '0';
          firstNumber = null;
          operator = null;
        } else if (buttonValue === '←') {
          // Handle backspace button click
          displayValue = displayValue.length === 1 ? '0' : displayValue.slice(0, -1);
        } else if (buttonValue === '=') {
          // Handle equals button click
          if (firstNumber !== null && operator !== null) {
            operate();
            firstNumber = null;
            operator = null;
          }
        } else {
          // Handle operator button click
          if (firstNumber === null) {
            firstNumber = displayValue;
            operator = buttonValue;
          } else {
            operate();
            firstNumber = displayValue;
            operator = buttonValue;
          }
        }
  
        updateDisplay();
      });
    });
  });
  