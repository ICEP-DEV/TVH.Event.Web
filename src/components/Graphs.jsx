import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const PieChart = ({ labels, values, colors }) => {
  const chartRef = useRef(null); 
  const canvasRef = useRef(null); 
    useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    };

    const options = {
        plugins : {
            legend : {
                labels : {
                    color : "#ffffff"
                }
            }
        }
    }
    
    if (!chartRef.current && canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data,
        options
      });
    } else if (chartRef.current) {
 
      chartRef.current.data = data;
      chartRef.current.update();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null; 
      }
    };
  }, [labels, values, colors]);

  return <canvas ref={canvasRef}></canvas>;
};

export default PieChart;
