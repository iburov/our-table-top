//(Use these comments to find and replace)
// JosephusProblem
// ott-josephus-problem

import React from "react";
import "./JosephusProblem.scss";
import { connect } from "react-redux";

let getWinningPosition = (n) => {
  //sequential path
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  let i = arr.indexOf(1);
  while (arr.length !== 1) {
    let num = arr[i];
    arr.splice((i + 1) % arr.length, 1);
    i = arr.length <= arr.indexOf(num) + 1 ? 0 : arr.indexOf(num) + 1;
  }

  //binary path
  let binary = (n >>> 0).toString(2);
  let arr_binary = binary.split("");
  arr_binary.push(arr_binary[0]);
  arr_binary.splice(0, 1);
  let res_binary = arr_binary.join("");
  let result_from_binary = parseInt(res_binary, 2);

  return {
    n: n,
    result: arr[0],
    binary: binary,
    res_binary: res_binary,
    result_from_binary: result_from_binary,
  };
};

let arr = [];
for (let i = 1; i < 100; i++) {
  arr.push(getWinningPosition(i));
}

let results = arr.map((el, i) => {
  return (
    <div key={i} className="result col-4 border">
      <div>{`number of soldiers: ${el.n}`}</div>
      <div>{`result: ${el.result}`}</div>
      <div>{`binary number of soldiers: ${el.binary}`}</div>
      <div>{`binary reslut: ${el.res_binary}`}</div>
      <div>{`binary result converted to decimal: ${el.result_from_binary}`}</div>
    </div>
  );
});

class JosephusProblem extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="ott-josephus-problem">
        <h1>Josephus Problem</h1>
        <div className="row">{results}</div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(JosephusProblem);
