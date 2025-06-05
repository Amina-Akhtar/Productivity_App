// Retrieve task status from localStorage
const taskStatus = JSON.parse(localStorage.getItem('taskStatus')) || {};
const totalTasks = taskStatus.totalTasks || 0;
const completedTasks = taskStatus.completedTasks || 0;

console.log('Total Tasks:', totalTasks);
console.log('Completed Tasks:', completedTasks);

const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
const remainingPercentage = totalTasks > 0 ? 100 - completionPercentage : 100;


const completionChartElement = document.getElementById('completionChart');
completionChartElement.setAttribute('data-percent', completionPercentage.toFixed(2)); // Round to 2 decimal places
//completionChartElement.setAttribute('data-percent', completionPercentage.toFixed(2)); // Round to 2 decimal places



// Update the visual representation of the completion percentage
const completedSpan = completionChartElement.querySelector('.completed');
completedSpan.textContent = completionPercentage.toFixed(0); // Display the rounded completion percentage
completedSpan.style.fontWeight = 'bold'
completedSpan.style.fontSize = '24px'; // Set font size to 24px or adjust as needed

// Update chart element with the calculated remaining percentage for pendingChart
const pendingChartElement = document.getElementById('pendingChart');
pendingChartElement.setAttribute('data-percent', remainingPercentage.toFixed(2)); // Round to 2 decimal places

// Update the visual representation of the remaining percentage for pendingChart
const pendingSpan = pendingChartElement.querySelector('.pending');
pendingSpan.textContent = remainingPercentage.toFixed(0); // Display the rounded remaining percentage
pendingSpan.style.fontWeight = 'bold'
pendingSpan.style.fontSize = '24px'; // Set font size to 24px or adjust as needed


const overallChartElement = document.getElementById('overallChart');
overallChartElement.setAttribute('data-percent', completionPercentage.toFixed(2)); // Round to 2 decimal places

// Update the visual representation of the completion percentage
const overallSpan =overallChartElement.querySelector('.overall');
overallSpan.textContent = completionPercentage.toFixed(0); // Display the rounded completion percentage
overallSpan.style.fontWeight = 'bold'
overallSpan.style.fontSize = '24px'; // Set font size to 24px or adjust as needed


// Update chart element with the calculated remaining percentage for pendingChart
const aimChartElement = document.getElementById('aimChart');
aimChartElement.setAttribute('data-percent', remainingPercentage.toFixed(2)); // Round to 2 decimal places

// Update the visual representation of the remaining percentage for pendingChart
const aimSpan = aimChartElement.querySelector('.aim');
aimSpan.textContent = remainingPercentage.toFixed(0); // Display the rounded remaining percentage
aimSpan.style.fontWeight = 'bold'
aimSpan.style.fontSize = '24px'; // Set font size to 24px or adjust as needed
