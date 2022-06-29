import React, { useState, useEffect } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
export default function Block() {
  var [block, setBlock] = useState([]);
  const params = useParams();

  console.log("got id ", params.blockNumber); // 👉️

  useEffect(() => {
    // Update the document title using the browser API

    getBlockUsingNumber(params.blockNumber);
  }, []);
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
        console.log(returnedJSON);

        // blockData = returnedJSON;
        setBlock(returnedJSON); // console.log("from blocks arr", blockData["result"]["hash"]);
      });

    // if (blockData["result"] != null) {
    //   return blockData;
    // }
  }
  function getDateFromTimeStamp(hexString) {
    console.log(Date(parseInt(hexString, 16)).toLocaleString());
    // var dateUTC = new Date("1655650331");
    // var dateUTC = dateUTC.getTime();
    // var dateIST = new Date(dateUTC);
    // //date shifting for IST timezone (+5 hours and 30 minutes)
    // dateIST.setHours(dateIST.getHours() + 5);
    // console.log(dateIST.setMinutes(dateIST.getMinutes() + 30));

    return Date(1655745870).toLocaleString();
  }
  function convertToWei(hexString) {
    return parseInt(hexString, 16);
  }

  function ListItem(props) {
    return (
      <div>
        <div>Block Height: {block["result"]["number"]}</div>

        <div>Gas Used: {convertToWei(block["result"]["gasUsed"])}</div>
        <div>Gas Limit: {convertToWei(block["result"]["gasLimit"])}</div>
        <div>Burnt Fees: {convertToWei(block["result"]["baseFeePerGas"])}</div>

        <div>Transactions: {block["result"]["transactions"][0]}</div>
      </div>
    );
  }

  const listItems =
    block["result"] != null ? <ListItem></ListItem> : <div></div>;

  return (
    <div>
      Block
      {/* <div>Block Height: {getDateFromTimeStamp()}</div> */}
      {/* <div>Block Height: {block["result"]["number"]}</div> */}
      <div>{listItems}</div>
    </div>
  );
}



