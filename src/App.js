// import React from 'react'
import React, { useState, useEffect } from 'react';
export default function App() {
  const [blocks,setBlocks] = useState([]);
  let staticBlockCount = 5;
  useEffect(() => {
    // Update the document title using the browser API
   
    console.log("Called initially");
    getLatestBlock();
  },[]);

 async function getLatestBlock(){
console.log("Getting latest block");
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1})
};
fetch('https://ethblockchain.mohammedismayi1.repl.co/', requestOptions)
  .then(response => response.json())
  .then(data => 
   
   
    console.log(data["result"]["number"]),
   
    // fe = await getLastFewBlocks(),
    getLastFewBlocks().then(response => console.log(response))
  );

  


  const products = ["brush","keys","rings","watches"]
  setBlocks(products);
  };


  async function getLastFewBlocks(){


    for (let index = 0; index < staticBlockCount; index++) {
      // const element = array[index];

      const blockData = await getBlockUsingNumber("0x1");

      console.log(blockData);
      console.log("get block using number");


      
    }
  }

  async function getBlockUsingNumber(number) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1", false],"id":1})
    };
    fetch('https://ethblockchain.mohammedismayi1.repl.co/', requestOptions)
      .then(response => 
        console.log(response.json())
        // response.json()
      
      
      
      
      )
      
        
        
    
  }





  function ListItem(props) {
    const value = props.value;
    return (
      <li>
        {value}
      </li>
    );
  }
  const listItems = blocks.map((number) =>
  // Correct! Key should be specified inside the array.
  <ListItem key={number.toString()} value={number} />
);
  return (
    console.log("Rendering the APP"),
    <div>ETH Explorer

      <div>
      <ul>
      {listItems}
    </ul>

      </div>
    </div>

    
  )
}
