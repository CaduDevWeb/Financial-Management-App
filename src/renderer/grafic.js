import { Chart } from 'chart.js';
import { PieController, ArcElement, Legend, Tooltip } from 'chart.js';
const STORAGE_KEY = 'allExpenses'
let myCHart = null;
const color_MAP = {
    'Alimentação': '#E74C3C',
    'Moradia': '#3498DB',
    'Transporte': '#F1C40F',
    'Lazer': '#9B59B6',
    'outros': '#3331d3ff'
}
Chart.register(
    PieController,
    ArcElement,
    Legend,
    Tooltip
)
export function renderChart(chartsLabels, chartsValues, chartBackgroundColors) {
    if (myCHart) {
        myCHart.data.labels = chartsLabels;
        chartBackgroundColors = chartsLabels.map((label, index) => {
            return color_MAP[index % color_MAP.length]
        })
        myCHart.data.datasets[0].data = chartsValues;
        //myCHart.data.datasets[0].backgroundColor = chartBackgroundColors;
        const chartBackgroundColors = chartsLabels.map(label => {
            return color_MAP[label] || color_MAP['Outros']
        })
        console.log('Grafico ja existente atualizado')
        myCHart.update();
    } else {
        console.log('Novo grafico criado')
        const rawDataJSON = localStorage.getItem(STORAGE_KEY);
        const allExpenses = rawDataJSON ? JSON.parse(rawDataJSON) : [];
        const chartsLabels = allExpenses.map(expense => expense.type);
        const chartsValues = allExpenses.map(expense => parseFloat(expense.value));
        const ctx = document.getElementById('pie-grafic')
        if (chartsValues.length === 0) {
            console.warn("AVISO: Dados de gráfico vazios. Não renderizando.");
            return;
        }

        const chartBackgroundColors = chartsLabels.map(label => {
            return color_MAP[label] || color_MAP['Outros']
        })
        myCHart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chartsLabels,
                datasets: [{
                    label: 'Total de gastos (R$)',
                    data: chartsValues,
                    backgroundColor: chartBackgroundColors
                }]
            },
            options: {
                responsive: true,
            }
        })
    }
}
