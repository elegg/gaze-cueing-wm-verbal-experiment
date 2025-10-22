import {marked} from 'marked'
import textRender from './helpers/textRender.js';
import imageRender from './helpers/imageRenderer.js';


import md from './assets/instructions.md'
import md2 from './assets/instructions2.md'

import "../src/main.css";
import "../src/jspsych.css";

import image from './assets/instructions.png'


let intro1 = marked.parse(md)
let intro2 = marked.parse(md2)


function redirectLink(jatos){

    let div = document.createElement("div")
    div.className = "redirect-widget"
    let text = document.createElement("p").innerText = "You will not be able to return to this page"
 
    let button =  document.createElement("button")
    button.className="redirect-link"
    button.innerText = "Start Experiment"
 
    button.onclick=()=>{
       window.onbeforeunload = function() { }
 
       jatos.startNextComponent()
    }
 
    div.append(button)
    div.append(text)
    document.body.append(div)
 
 
 }
 
 
 
 export default function createInstructions(data){
 
    document.body.click()
    window.onbeforeunload = function() { return "Are you sure you want to leave?"; }
 
 
 const div = document.createElement("div")
 div.className="instructions"
 textRender(intro1, div)
 imageRender(image, div)
 textRender(intro2, div)

 document.body.append(div)
 redirectLink(jatos)
 

 }