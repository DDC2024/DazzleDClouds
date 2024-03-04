import React,{useState} from 'react'

const Sample = () => {


  const [counter, setCounter]=useState(0);

  const addHadler=()=>{

    setCounter(counter + 1);
  }

  const minusHandler=()=>{
    setCounter(counter - 1);
  }

  return (
    <div className=''>

              


        <span onClick={addHadler}>+</span> {counter} <span onClick={minusHandler}>-</span>


  


    </div>
  )
}

export default Sample