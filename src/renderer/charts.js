// Dados para o grafico
const data = {
    labels: [ //Categorias de gastos
        'Alimentação',
        'Moradia',
        'Transporte',
        'Lazer'
    ],
    datasets: [{
        labels: 'First piece',
        data: [300, 50, 100, 60], // valores para cada fatia
        backgroundColor: [ 
            '#E74C3C', 
            '#3498DB', 
            '#F1C40F',
            '#9B59B6'
        ],
        hoverOffset: 4 // efeito ao passar o mouse
    }]
};

//Configuracao do Grafico
const config = {
    type: 'pie',// Tipo do Grafico
    data: data,
    option: {
        responsive: true
    }
};

//Renderizar o grafico
const ctx = document.getElementById('pie-grafic').getContext('2d');
//Cria o grafico
const mygrafic = new Chart(ctx, config);