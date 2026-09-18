document.addEventListener('DOMContentLoaded', () => {
    const numbersBtns = document.querySelectorAll('.btn-number');
    const displayCurrent = document.querySelector('.display-current');
    const displayHistory = document.querySelector('.display-history');
    const operationBtn = document.querySelectorAll('.btn-op');
    const functionBtn = document.querySelectorAll('.btn-func')
    const equalBtn = document.querySelector('.btn-equal')
    const decimal = document.querySelector('.decimal')
    displayCurrent.textContent = ''
    let first = null
    let secondActive = false
    let pendingOp = null
    const clearAll = function clear() {
        first = null
        secondActive = false
        pendingOp = null
        displayCurrent.textContent = ''
        displayHistory.textContent = ''
    }
    const summary = (arg1, arg2) => Number(arg1) + Number(arg2)
    const multiply = (arg1, arg2) => Number(arg1) * Number(arg2)
    const separation = (arg1, arg2) => Number(arg1) / Number(arg2)
    const minus = (arg1, arg2) => Number(arg1) - Number(arg2)
    const procent = (arg1, arg2) => Number(arg1) * (Number(arg2) / 100)
    const calculate = function calculator(a,b,c) {
        switch (c) {
            case '+': return summary(a, b);
            case '-': return minus(a, b);
            case '*': return multiply(a, b);
            case '/': return separation(a, b);
            case '%': return procent(a, b)
        };
    };

    numbersBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.num ?? btn.textContent;
            if (secondActive) {
                displayCurrent.textContent = '';
                secondActive = false;
            }
            displayCurrent.textContent += value;
        });
    });


    operationBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            op = btn.dataset.op

                if (pendingOp && !secondActive) {
                    const second = displayCurrent.textContent
                    const result = calculate(first, second, pendingOp)
                    displayCurrent.textContent = result;
                    firstNumber = result;
                } 
                else {
                    first = displayCurrent.textContent;
                };
            pendingOp = op
            secondActive = true
            displayHistory.textContent =  first + ' ' + op;
                 
    });
    equalBtn.addEventListener('click', () => {
        if (pendingOp == null) return;
        const second = displayCurrent.textContent;
        const result = calculate(first, second, pendingOp);
        displayCurrent.textContent = result;
        secondActive = false
        pendingOp = null
        displayHistory.textContent =  first + ' ' + op + ' ' + second;
    });
    functionBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.action === 'clear') {
                clearAll()
            };
            if (btn.dataset.action === 'delete') {
                const newCurrentNumber = displayCurrent.textContent.slice(0, -1)
                displayCurrent.textContent = newCurrentNumber
                if (newCurrentNumber == '') {
                    clearAll()
                };
            };
        }); 
    });

})});