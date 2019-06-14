// This scrip[t generates graphs
function drawLineChart(content, type, placementID) {

    var ctx = document.getElementById(placementID).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: type,
        
        // The data for our dataset
        data: {
            labels: content.Lables,
            datasets: [{
                label: content.Title,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: content.data,
            }]
        },

        // Configuration options go here
        options: {
            title: {
                display:"true",
                text: content.Category,
            }
        }
    });
}