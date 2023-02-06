import React, { useState, useEffect } from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
import { AppConfiguration } from "../Constants";

export default function Address() {
  var [balance, setBalance] = useState("");
  const params = useParams();

  console.log("got address", params.address); // 👉️
  async function getBalanceOfAddress(address) {
    // console.log("Given block number is" + "0x" + number);
    var blockData = {};
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 1,
      }),
    };

    await fetch(AppConfiguration.networkURL, requestOptions)
      .then((response) => response.json())
      .then((returnedJSON) => {
        // console.log(parseInt(returnedJSON["result"], 16) / 10 ** 18);

        setBalance(
          (parseInt(returnedJSON["result"], 16) / 10 ** 18).toString() + "ETH"
        );
        // blockData = returnedJSON;
        // setBlock(returnedJSON); // console.log("from blocks arr", blockData["result"]["hash"]);
      });

    // if (blockData["result"] != null) {
    //   return blockData;
    // }
  }

  useEffect(() => {
    // Update the document title using the browser API

    getBalanceOfAddress(params.address);
  }, []);
  return (
    <div>
      <div>Address</div>
      <div>{balance}</div>
    </div>
  );
}
