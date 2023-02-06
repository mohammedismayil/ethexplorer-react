import React, { useState, useEffect } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import { AppConfiguration } from "../Constants";
export default function TX() {
  var [txData, setTXData] = useState([]);
  const params = useParams();

  console.log("got id ", params.txID); // 👉️

  useEffect(() => {
    // Update the document title using the browser API
    // getBlockUsingNumber(params.blockNumber);
    console.log("Use effect has been called");
    getTXData(params.txID);
  }, []);

  async function getTXData(txID) {
    // console.log("Given block number is" + "0x" + number);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "eth_getTransactionByHash",
        params: [txID],
        id: 1,
        jsonrpc: "2.0",
      }),
    };

    await fetch(AppConfiguration.networkURL, requestOptions)
      .then((response) => response.json())
      .then((returnedJSON) => {
        console.log(returnedJSON);

        // blockData = returnedJSON;
        setTXData(returnedJSON); // console.log("from blocks arr", blockData["result"]["hash"]);
      });

    // if (blockData["result"] != null) {
    //   return blockData;
    // }
  }
  function convertToWei(hexString) {
    return parseInt(hexString, 16);
  }
  function convertToETH(hexString) {
    return parseInt(hexString, 16) / 10 ** 18 + "ETH";
  }
  function ListItem(props) {
    return (
      <div>
        <div>Transaction Hash: {params.txID}</div>
        <div>Block: {convertToWei(txData["result"]["blockNumber"])}</div>
        <div>From: {txData["result"]["from"]}</div>
        <div>To: {txData["result"]["to"]}</div>
        <div>Value: {convertToETH(txData["result"]["value"])}</div>
        <div>Gas Used: {convertToWei(txData["result"]["gasUsed"])}</div>
        <div>Gas Limit: {convertToWei(txData["result"]["gasLimit"])}</div>
        <div>Burnt Fees: {convertToWei(txData["result"]["baseFeePerGas"])}</div>
      </div>
    );
  }
  const listItems =
    txData["result"] != null ? <ListItem></ListItem> : <div></div>;

  return (
    <div>
      <div>TX</div>
      <div>{listItems}</div>
    </div>
  );
}
//