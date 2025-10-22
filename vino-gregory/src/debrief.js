
import {marked} from 'marked'

import md from './assets/debrief.md'
import "../src/main.css";
import "../src/jspsych.css";
import textRender from './helpers/textRender.js';


export const debriefText = marked.parse(md)


function redirectLink(){

   let div = document.createElement("div")
   div.className = "redirect-widget"
   let text = document.createElement("p").innerText = "Clicking will return you to Prolific"

   let button =  document.createElement("button")
   button.className="redirect-link"
   button.innerText = "Confirm Completion"

   button.onclick=()=>{
      window.onbeforeunload = function() { }

      jatos.endStudyAndRedirect("https://app.prolific.com/submissions/complete?cc=CUBM9P78");
   }

   div.append(button)
   div.append(text)
   document.body.append(div)


}



export default function createPlot(data){

   document.body.click()
   window.onbeforeunload = function() { return "Are you sure you want to leave?"; }


const div = document.createElement("div")
div.className="instructions"
textRender(debriefText, div)

document.body.append(div)

redirectLink()






}

