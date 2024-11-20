import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';

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


const BarGraphComponent = ({ label, labels, values, colors })=>{
  const barRef = useRef(null); 
  const canvasRef = useRef(null); 

  useEffect(()=>{
    const data = {
      labels : labels,
      datasets : [
        {
          data : values,
          backgroundColor : colors,
          label : label
        }
      ]
    }

    const options = {
      plugins : {
          legend : {
              labels : {
                  color : "#000000"
              }
          }
      }
  }

    if(!barRef.current && canvasRef.current){
      barRef.current = new Chart(
        canvasRef.current, {
          type : 'bar',
          data,
          options
        }
      )
    }
    else if (barRef.current) {
 
      barRef.current.data = data;
      barRef.current.update();
    }

    return () => {
      if (barRef.current) {
        barRef.current.destroy();
        barRef.current = null; 
      }
    };
  })


  return <canvas ref={canvasRef}></canvas>
}



export {PieChart, BarGraphComponent};
