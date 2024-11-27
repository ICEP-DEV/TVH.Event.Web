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

  return <canvas className='text-black rounded-3 bg-light' ref={canvasRef}></canvas>;
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
      indexAxis: 'x',
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


  return <canvas className='col rounded-3 bg-light' ref={canvasRef}></canvas>
}

const RatingGraph = ({labels, values, label, colors})=>{
  const barRef = useRef(null); 
  const canvasRef = useRef(null); 

  useEffect(()=>{
    const data = {
      labels : labels,
      datasets : [
        {
          data : [values[0]],
          backgroundColor : colors[0],
          label : label[0]
        },
        {
          data : [values[1]],
          backgroundColor : colors[1],
          label : label[1]
        },
        {
          data : [values[2]],
          backgroundColor : colors[2],
          label : label[2]
        },
        {
          data : [values[3]],
          backgroundColor : colors[3],
          label : label[3]
        },
        {
          data : [values[4]],
          backgroundColor : colors[4],
          label : label[4]
        }
      ]
    }

    const options = {
      indexAxis: 'y',
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

  


  return <canvas className='col rounded-3 bg-light' ref={canvasRef}></canvas>
}




const ReviewGaugeComponent = ({label,values})=>{
  
  let counter = 0;
  let sum = 0;

  values.map((val) =>{
    sum += val;
  })

  const calculatePerc = (val)=>{
    return ((val / sum) * 100).toFixed(2)
  }

  const gaugeStyle = (val)=> (
    {
      width : calculatePerc(val) + "%",
      height : "30px",
      backgroundColor : "var(--blue2)",
      left : 0,
    }
  )

  return <div className="container-fluid">
      {
        label.map((l) => (
          <div key={l[0]} className='row'>
            <div className='col-2 text-center align-self-center'>
              {l}
            </div>
            <div className="col-10 py-1">
              <div className="container-fluid p-0 rounded-2 border" style={{height:"30px"}}>
                <div className="rounded-2" style={gaugeStyle(values[counter])}></div>
                <div hidden>{counter++}</div>
              </div>
            </div>
          </div>
        ))
      }
  </div>
}




export {PieChart, BarGraphComponent, RatingGraph,ReviewGaugeComponent};
