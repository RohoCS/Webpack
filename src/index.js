import * as $ from 'jquery';
import '@css/style.css';
import Post from "@/post";
// import json from './assets/data'
import logo from '@assets/plus.png'

const post = new Post('Webpack Post Title', logo)

// console.log('Post to string:', post.toString())
$("pre").html(post.toString());
console.log('JSON:', json)