import React, {useRef, useEffect} from "react";



function AnimatedValue(args) {
    const objRef = useRef(null);

    useEffect(()=>{
        function animateValue(obj, start, end, duration){
            let startTimestamp = null;
            const step = (timestamp) => {
                if(!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration)
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if(progress < 1){
                    window.requestAnimationFrame(step)
                }
            };
            window.requestAnimationFrame(step);
        }

        if(objRef.current){
            animateValue(objRef.current, args.start, args.end, args.duration)
        }
    }, [args.start, args.end, args.duration]);

    return <div ref={objRef}>0</div>
}



export default AnimatedValue;

/*

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const obj = document.getElementById("value");
animateValue(obj, 100, 0, 5000);

*/