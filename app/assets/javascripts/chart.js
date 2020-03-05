window.onload = function() {
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Income"
    },
    axisY: {
      includeZero: false,
      title: "Income"
    },
    axisX: {
      title: "Years"
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { y: 72000 },
          { y: 73000 },
          {
            y: 77000,
            indexLabel: "highest",
            markerColor: "red",
            markerType: "triangle"
          },
          { y: 76000 },
          { y: 72000 },
          { y: 75000 },
          { y: 73000 },
          { y: 74000 },
          {
            y: 71000,
            indexLabel: "lowest",
            markerColor: "DarkSlateGrey",
            markerType: "cross"
          },
          { y: 73000 },
          { y: 75000 },
          { y: 76000 }
        ]
      }
    ]
  });
  setTimeout(function() {
    chart.render();
  }, 1000);
};
