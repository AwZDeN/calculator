document.addEventListener('DOMContentLoaded', () => {
    const numbersBtns = document.querySelectorAll('.btn-number');
    const displayCurrent = document.querySelector('.display-current');
    const displayHistory = document.querySelector('.display-history');
    const operationBtn = document.querySelectorAll('.btn-op');
    const functionBtn = document.querySelectorAll('.btn-func')
    const equalBtn = document.querySelector('.btn-equal')
    const historyContainer = document.querySelector('.history-list')
    const clearHistoryBtn = document.querySelector('.history-clear')
    let historyItem = []
    displayCurrent.textContent = ''
    const historyList = []
    let op = null
    let first = null
    let pendingOp = null
    let secondActive = false
    const clearAll = function clear() {
        first = null
        secondActive = false
        pendingOp = null
        displayCurrent.textContent = ''
        displayHistory.textContent = ''
    }
    const createElement = (el, index) => {
        historyContainer.insertAdjacentHTML(`beforeend`, 
            `
            <li class="history-item" data-index='${index}'>
              <div class="history-expression">${el.first} ${el.op} ${el.second}</div>
              <div class="history-result">= ${el.result}</div>
            </li>
            ` 
        );
        historyItem = document.querySelectorAll('.history-item')
        return historyItem
    };
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
        displayHistory.textContent =  first + ' ' + op + ' ' + second;
        if (second !== null && first !== null && result !== null) {
            historyList.push({
                first: first,
                second: second,
                op: pendingOp,
                result: result
            })
            createElement(historyList.at(-1), historyList.length - 1)
            clearHistoryBtn.addEventListener('click', () => {
                historyList.length = 0
                historyContainer.textContent = ''
            })
        };
        secondActive = false
        pendingOp = null
    });
    historyContainer.addEventListener('click', (e) => {
        const element = e.target.closest('.history-item');
        if (!element) return;

        const index = Number(element.dataset.index);
        const record = historyList[index];
        if (!record) return;

        displayCurrent.textContent = record.result;
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
