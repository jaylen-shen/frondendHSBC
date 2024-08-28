// Function to fetch user info and populate the dropdown
async function fetchUserInfo() {
    try {
        const response = await fetch('http://localhost:3000/api/user-data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        document.getElementById('dropdown-username').textContent = `Username: ${data.username}`;
        document.getElementById('dropdown-balance').textContent = `Balance: $${data.balance}`;

        const stocksList = document.getElementById('stocks-list');
        stocksList.innerHTML = ''; // Clear existing items
        data.stocks.forEach(stock => {
            const listItem = document.createElement('li');
            listItem.textContent = `${stock.stock_name}: ${stock.quantity}`;
            stocksList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    const isHidden = dropdown.classList.contains('hidden');
    
    // Hide any visible dropdown
    document.querySelectorAll('#user-dropdown').forEach(dd => dd.classList.add('hidden'));

    // Toggle the dropdown
    if (isHidden) {
        fetchUserInfo(); // Fetch and display user info when dropdown is shown
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
}


// Function to handle user logout
async function logout() {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            window.location.href = '/'; // Redirect to login page
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

// Function to fetch and display recommendation trends for a stock
async function fetchRecommendationTrends(symbol) {
    try {
        const response = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=cr5un8hr01qgfrnluivgcr5un8hr01qgfrnluj00`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Prepare data for the chart
        const labels = data.map(item => item.period);
        const strongBuy = data.map(item => item.strongBuy);
        const buy = data.map(item => item.buy);
        const hold = data.map(item => item.hold);
        const sell = data.map(item => item.sell);
        const strongSell = data.map(item => item.strongSell);

        // Set the stock name in the HTML
        document.getElementById('stock-name').textContent = `${symbol} Recommendation Trends`;

        // Create the chart
        const ctx = document.getElementById('recommendation-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Strong Buy',
                        data: strongBuy,
                        backgroundColor: 'rgba(0, 128, 0, 0.6)',
                    },
                    {
                        label: 'Buy',
                        data: buy,
                        backgroundColor: 'rgba(0, 0, 255, 0.6)',
                    },
                    {
                        label: 'Hold',
                        data: hold,
                        backgroundColor: 'rgba(255, 165, 0, 0.6)',
                    },
                    {
                        label: 'Sell',
                        data: sell,
                        backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    },
                    {
                        label: 'Strong Sell',
                        data: strongSell,
                        backgroundColor: 'rgba(128, 0, 0, 0.6)',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allow resizing
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching recommendation trends:', error);
    }
}

// Call the function to fetch and display trends for AAPL
document.addEventListener('DOMContentLoaded', () => {
    fetchRecommendationTrends('AAPL');
});
