
import {initJsPsych} from 'jspsych'

import {line} from './routines/gregory-trials.js'
import preload from '@jspsych/plugin-preload';


import faces from './helpers/imageElements.js'
import trialFactory from './helpers/trialFactory.js'


import style from '../src/jspsych.css'
import style2 from '../src/main.css'
import { pause, feedbackPause } from './routines/pause.js';
import { fullScreenToggle } from './routines/fullScreenToggle.js';
import saveData from './routines/saver.js';




var jsPsych = initJsPsych();


function loadResults() {

    window.onbeforeunload = function() {  }

    let trial_data = jsPsych.data.get().ignore("stimulus").trials

    if (jatos) {
        
       return jatos.uploadResultFile(trial_data, "experiment-log.json")
            .then(jatos.startNextComponent)

    }
    
}


trialFactory.attachFaces(faces)


let practice = trialFactory.generatePractice()
let block1 = trialFactory.generateTimelineVariables("block-1")
let block2 = trialFactory.generateTimelineVariables("block-2")
let block3 = trialFactory.generateTimelineVariables("block-3")
let block4 = trialFactory.generateTimelineVariables("block-4")

const preloadFiles = {
    type: preload,
    images: trialFactory.imagesForLoading()
  
}



export default function run (jatos){
    window.onbeforeunload = function() { return "Are you sure you want to leave?"; }

    jsPsych.run({
        timeline:[
            preloadFiles,
            fullScreenToggle,
            line(jsPsych, practice, "practice"),
            saveData({jatos, jsPsych, block:"practice"}),
            feedbackPause({jsPsych, block:"practice", message:"You completed the practice section!"}),
            line(jsPsych, block1),
            saveData({jatos, jsPsych, block:"block-1"}),
            feedbackPause({jsPsych, block:"block-1", message:"You've completed 1 of the 4 main sections!"}),

            line(jsPsych, block2),
            saveData({jatos, jsPsych, block:"block-2"}),
            feedbackPause({jsPsych, block:"block-2", message:"You've completed 2 of the 4 main sections!"}),

            line(jsPsych, block3),
            saveData({jatos, jsPsych, block:"block-3"}),
            feedbackPause({jsPsych, block:"block-3", message:"You've completed 3 of the 4 main sections!"}),

            line(jsPsych, block4),
            saveData({jatos, jsPsych, block:"block4", callback:loadResults}),


        ],
        
    })

}