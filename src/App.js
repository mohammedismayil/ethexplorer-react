// import React from 'react'
import React, { useState, useEffect } from 'react';
export default function App() {
  var [blocks, setBlocks] = useState([]);
  let staticBlockCount = 5;
  useEffect(() => {
    // Update the document title using the browser API

    getLatestBlock();
  }, []);

  async function getLatestBlock() {
    // console.log("Getting latest block");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["latest", false],
        id: 1,
      }),
    };
    fetch("https://ismayilethtestnet.tk/", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        // fe = await getLastFewBlocks(),
        getLastFewBlocks(data["result"]["number"])
      );

    // const products = ["brush","keys","rings","watches"]
    // setBlocks(products);
  }

  async function getLastFewBlocks(hexString) {
    const latestblockNumber = parseInt(hexString, 16);
    var emptyblocks = [];
    for (let index = 0; index < staticBlockCount; index++) {
      // const element = array[index];

      if (latestblockNumber - index >= 0) {
        await getBlockUsingNumber(
          (latestblockNumber - index).toString(16)
        ).then((response) => {
          // console.log(response);

          emptyblocks.push(response);
          console.log(emptyblocks);
          setBlocks(emptyblocks);
        });

        // emptyblocks.push(blockData);
        // console.log(emptyblocks);
        // console.log("blocks count", emptyblocks.length);
      }

      if (index == staticBlockCount - 1) {
        // setBlocks(emptyblocks);
      }
    }

    return emptyblocks;
  }

  async function getBlockUsingNumber(number) {
    // console.log("Given block number is" + "0x" + number);
    var blockData = {};
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: ["0x" + number, false],
        id: 1,
      }),
    };

    await fetch("https://ismayilethtestnet.tk/", requestOptions)
      .then((response) => response.json())
      .then((returnedJSON) => {
        // console.log(returnedJSON);

        blockData = returnedJSON;
        // console.log("from blocks arr", blockData["result"]["hash"]);
      });

    if (blockData["result"] != null) {
      return blockData;
    }
  }

  function ListItem(props) {
    const value = props.value;
    const blockNumber = parseInt(props.blockNumber, 16);
    return (
      <li>
        <div>
          {blockNumber}-{value}
        </div>
      </li>
    );
  }
  const listItems =
    blocks.length > 0 ? (
      blocks.map((number) => (
        // Correct! Key should be specified inside the array.
        <ListItem
          key={number["result"]["hash"]}
          value={number["result"]["miner"]}
          blockNumber={number["result"]["number"]}
        />
      ))
    ) : (
      <div>No list</div>
    );
  return (
    // console.log("Rendering the APP"),
    <div>
      <div>ETH Explorer</div>
      <div>
        <ul>{listItems}</ul>
      </div>
    </div>
  );
}
