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
          { y: 62000 },
          { y: 63000 },
          {
            y: 71000,
            indexLabel: "highest",
            markerColor: "red",
            markerType: "triangle"
          },
          { y: 69000 },
          { y: 62000 },
          { y: 65000 },
          { y: 63000 },
          { y: 64000 },
          {
            y: 61000,
            indexLabel: "lowest",
            markerColor: "DarkSlateGrey",
            markerType: "cross"
          },
          { y: 63000 },
          { y: 65000 },
          { y: 68000 }
        ]
      }
    ]
  });
  setTimeout(function() {
    chart.render();
  }, 1000);
};
