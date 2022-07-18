// import React from 'react'
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Block from "./Pages/Block";
import SearchBar from "./Components/SearchBar";
import TX from "./Pages/TX";
import { TimeHelper } from "./TimeHelper";
import Footer from "./Components/Footer";
export default function App() {
  const navigate = useNavigate();
  var [blocks, setBlocks] = useState([]);
  var [searchText, setsearchText] = useState("");

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

  function searchGivenElement(searchText) {
    console.log("On click search button");
    console.log(searchText);

    if (validateInputAddresses(searchText)) {
      navigate("/address/" + searchText);
    } else if (isValidTXHash(searchText)) {
      navigate("/tx/" + searchText);
    }else{
      console.log("not a valid address or hash");
    }
  }
  function validateInputAddresses(address) {
    return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
  }

  function isValidTXHash(hash) {
    return /^0x([A-Fa-f0-9]{64})$/.test(hash);
  }
  function ListItem(props) {
    const value = props.value;
    const blockNumber = parseInt(props.blockNumber, 16);
    return (
      <li>
        <Link to={"/block/" + blockNumber.toString()}>Block-{blockNumber}</Link>

        <div>{props.time}</div>
        <div>{value}</div>
      </li>
    );
  }
  function getTime(hexString) {
    var current = new Date();
    var int = parseInt(hexString, 16);

    return TimeHelper.timeDifference(current, new Date(int * 1000)).toString();
  }
  const listItems =
    blocks.length > 0 ? (
      blocks.map((number) => (
        // Correct! Key should be specified inside the array.
        <ListItem
          key={number["result"]["hash"]}
          value={number["result"]["miner"]}
          time={getTime(number["result"]["timestamp"])}
          blockNumber={number["result"]["number"]}
        />
      ))
    ) : (
      <div>No list</div>
    );
  return (
    // console.log("Rendering the APP"),
    <div>
      <div className="text-center py-5">ETH Explorer</div>
      <SearchBar searchButtonTap={searchGivenElement}></SearchBar>
      {/* <input
        value={searchText}
        type="text"
        onChange={(event) => setsearchText(event.target.value)}
        placeholder="Search for names.."
      ></input>
      <button onClick={() => searchGivenElement()}>Search</button> */}
      <div className="flex align-center justify-center">Latest Blocks</div>

      <div className="flex align-center justify-center">
        <ul>{listItems}</ul>
      </div>

      <Footer />
      {/* <div className="flex align-center justify-center">Footer is Here now</div> */}
    </div>
  );
}
