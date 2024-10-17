



let uname = localStorage.getItem('username'); // Correct key retrieval
const welcome1 = document.getElementById('welcome'); // Ensure this element exists in your HTML
console.log(uname);

// Display welcome message only if uname is available
if (uname) {
    welcome1.innerHTML = `WELCOME ${uname}`;
} else {
    welcome1.innerHTML = 'WELCOME USER'; // Default message if no username is found
}
let totalBudget = 0;
let totalExpense = 0;
let expenseCount = 0; // Initialize a counter for expenses
let currentExpenseIndex = -1; // To keep track of the currently edited expense

const ctx = document.getElementById('budgetChart').getContext('2d');
let budgetChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Budget', 'Expenses'],
        datasets: [{
            label: 'Budget vs Expenses',
            data: [totalBudget, totalExpense],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Budget color
                'rgba(255, 99, 132, 0.2)'  // Expenses color
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Budget vs Expenses'
            }
        }
    }
});

function calculateBudget() {
    const budgetInput = document.getElementById('budgetAmount').value;
    totalBudget = parseFloat(budgetInput);
    document.getElementById('budgetDisplay').innerText = `$${totalBudget}`;
    document.getElementById('balanceDisplay').innerText = `$${totalBudget}`;
    updateChart();
}

function addNewBudget() {
    const newBudgetInput = document.getElementById('newBudgetAmount').value;
    const newBudget = parseFloat(newBudgetInput);
    totalBudget += newBudget;
    document.getElementById('budgetDisplay').innerText = `$${totalBudget}`;
    document.getElementById('balanceDisplay').innerText = `$${totalBudget}`;
    document.getElementById('newBudgetAmount').value = ''; // Clear the input field
    updateChart();
}

function addExpense() {
    const details = document.getElementById('expenseDetails').value;
    const amount = document.getElementById('expenseAmount').value;

    if (details === '' || amount === '') {
        alert('Please enter both expense details and amount.');
        return;
    }

    const expense = {
        id: expenseCount++,
        details: details,
        amount: parseFloat(amount)
    };

    totalExpense += expense.amount;
    document.getElementById('expenseDisplay').innerText = `$${totalExpense}`;
    document.getElementById('balanceDisplay').innerText = `$${totalBudget - totalExpense}`;
    document.getElementById('expenseDetails').value = '';
    document.getElementById('expenseAmount').value = '';

    displayExpense(expense);
    updateChart();
}

function displayExpense(expense) {
    const expenseList = document.getElementById('expenseList');
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
        <span>${expense.details}: $${expense.amount}</span>
        <button onclick="editExpense(${expense.id})">Edit</button>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
}

function editExpense(id) {
    const expenseList = document.getElementById('expenseList').children;
    for (let i = 0; i < expenseList.length; i++) {
        if (expenseList[i].children[0].innerText.includes(id)) {
            const expense = expenseList[i];
            document.getElementById('expenseDetails').value = expense.children[0].innerText.split(':')[0];
            document.getElementById('expenseAmount').value = expense.children[0].innerText.split('$')[1];
            currentExpenseIndex = id;
            break;
        }
    }
}

function deleteExpense(id) {
    const expenseList = document.getElementById('expenseList').children;
    for (let i = 0; i < expenseList.length; i++) {
        if (expenseList[i].children[0].innerText.includes(id)) {
            const amount = parseFloat(expenseList[i].children[0].innerText.split('$')[1]);
            totalExpense -= amount;
            document.getElementById('expenseDisplay').innerText = `$${totalExpense}`;
            document.getElementById('balanceDisplay').innerText = `$${totalBudget - totalExpense}`;
            expenseList[i].remove();
            updateChart();
            break;
        }
    }
}

function clearAll() {
    totalBudget = 0;
    totalExpense = 0;
    document.getElementById('budgetDisplay').innerText = `$${totalBudget}`;
    document.getElementById('expenseDisplay').innerText = `$${totalExpense}`;
    document.getElementById('balanceDisplay').innerText = `$${totalBudget - totalExpense}`;
    document.getElementById('expenseList').innerHTML = ''; // Clear expense list
    document.getElementById('budgetAmount').value = '';
    document.getElementById('newBudgetAmount').value = '';
    document.getElementById('expenseDetails').value = '';
    document.getElementById('expenseAmount').value = '';
    updateChart();
}

function toggleChart() {
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.style.display = chartContainer.style.display === 'none' ? 'block' : 'none';
}

function updateChart() {
    budgetChart.data.datasets[0].data = [totalBudget, totalExpense];
    budgetChart.update();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
function logout() {
    window.location='./login.html'
    localStorage.clear()
}
