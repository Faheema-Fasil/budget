function calculateBudget() {
    const income = document.getElementById('income').value;
    const expenses = document.getElementById('expenses').value;
    const savings = document.getElementById('savings').value;

    if (income && expenses && savings) {
        const balance = income - expenses - savings;
        document.getElementById('result-text').textContent = `Remaining Balance: $${balance}`;
    } else {
        document.getElementById('result-text').textContent = 'Please fill in all fields.';
    }
}
