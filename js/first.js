// Toggle between Donation and History Sections
const donationBtn = document.getElementById('donationBtn');
const historyBtn = document.getElementById('historyBtn');
const donationSection = document.getElementById('donationSection');
const historySection = document.getElementById('historySection');
const balanceElement = document.getElementById('balance');
let balance = parseInt(balanceElement.innerText);

donationBtn.addEventListener('click', () => {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    historyBtn.classList.remove('bg-light-green');
    donationBtn.classList.add('bg-light-green');
});

historyBtn.addEventListener('click', () => {
    historySection.classList.remove('hidden');
    donationSection.classList.add('hidden');
    donationBtn.classList.remove('bg-light-green');
    historyBtn.classList.add('bg-light-green');
});

// Modal functionality
const modal = document.getElementById('donationModal');
const modalClose = document.getElementById('modalClose');

function showModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
});

// Donation functionality
document.querySelectorAll('.donateBtn').forEach(button => {
    button.addEventListener('click', () => {
        // const target = button.getAttribute('data-target');
        const donationInput = button.previousElementSibling;
        const donationAmount = parseInt(donationInput.value);


        if (isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        if (donationAmount > balance) {
            alert('You do not have enough balance.');
            return;
        }

        const balanceElement = button.parentNode.previousElementSibling.querySelector('h3');
        const currentBalance = parseInt(button.parentNode.previousElementSibling.querySelector('h3').innerText);
        const title = button.parentNode.previousElementSibling.querySelector('.title').innerText;
        balanceElement.innerText = currentBalance + donationAmount;

        // Update main balance
        balance -= donationAmount;
        document.getElementById('balance').innerText = balance;

        // Show success modal
        showModal();

        // Add transaction to history
        const historyContent = document.getElementById('historyContent');
        const transactionItem = document.createElement('div');
        const date = new Date();
        transactionItem.classList.add('border', 'p-4', 'rounded-md', 'shadow');
        transactionItem.innerHTML = `<h3 class="text-lg font-semibold">${donationAmount} Taka is Donated for ${title}</h3>
        <p class="text-gray-500 text-sm">Date: ${date}</p>`;
        historyContent.appendChild(transactionItem);

        // Clear input
        donationInput.value = '';
    });
});