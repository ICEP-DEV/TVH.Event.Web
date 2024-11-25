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
                    color : "#000000"
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

  return <canvas className='text-black rounded-3' style={{backgroundColor:"var(--grey2)"}} ref={canvasRef}></canvas>;
};


const BarGraphComponent = ({ labels, label_1, values_1, label_2,values_2, colour_1, colour_2 })=>{
  const barRef = useRef(null); 
  const canvasRef = useRef(null); 
  useEffect(()=>{
    const data = {
      labels : labels,
      datasets : [
        {
          data : values_1,
          backgroundColor : colour_1,
          label : label_1
        },
        {
          data : values_2,
          backgroundColor : colour_2,
          label : label_2
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


  return <canvas className='col rounded-3' style={{backgroundColor:"var(--grey2)"}} ref={canvasRef}></canvas>
}



export {PieChart, BarGraphComponent};
