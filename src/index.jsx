import React from "react";
import ReactDom from "react-dom/client";
import * as $ from "jquery";
import Post from "@model/post";
import "@css/style.css";
import "@/less/style.less";
import "@/sass/style.scss";
import "@/sass/style.scss";
import logo from "@assets/webpack-logo.png";
import "@model/lodash";

const App = () => (
  <div className="container">
    <h1>Webpack training</h1>
    <div className="webpack-logo" />
    <pre />
    <div className="less-demo">
      <h2>Less</h2>
    </div>
    <div className="scss-demo">
      <h2>Scss</h2>
    </div>
    <div className="sass-demo">
      <h2>Sass</h2>
    </div>
  </div>
);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);

const post = new Post("Webpack Post Title", logo);
$("pre").addClass("code").html(post.toString());
$("pre").html(post.toString());

async function start() {
  return await new Promise((r) => setTimeout(() => r("Async done."), 2000));
}

start().then((res) => console.log(res));
