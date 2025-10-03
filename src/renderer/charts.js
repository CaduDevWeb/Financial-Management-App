const Chart = require('chart.js')

let expenseChart = null;

function renderChart(data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    if (expenseChart) {
        // Se o grafico ja existe, apenas o atualiza
        expenseChart.data = data;
        expenseChart.ontimeupdate();
    } else {
        // 1. Defina o objeto de configuração (config) COMPLETO
        const config = {
            type: 'pie', // Tipo do Grafico
            data: chartData, // Use os dados DINÂMICOS processados
            options: { // Mantenha "options" no plural
                responsive: true
            }
        };

        // 2. Crie a instância do gráfico, passando 'config' como segundo argumento
        const ctx = document.getElementById('expenseChart').getContext('2d');
        expenseChart = new Chart(ctx, config);
    }
}