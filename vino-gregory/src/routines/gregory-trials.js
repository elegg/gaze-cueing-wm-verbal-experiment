
import PsychophysicsPlugin from '../../jspsych-psychophysics/dist/index.js'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 450

const [CENTER_X, CENTER_Y] =[ CANVAS_WIDTH/2 , CANVAS_HEIGHT/2]

const [GRID_OFFSET_X, GRID_OFFSET_Y] = [180, 40]

const INTERNAL_GRID_SPACING = 80

// trial times 

// fixation: 1000
// direct gaze: 750
// shifted gaze: ---
// soa 500
// grid 200ms
// fixation 1000
// test 3000


const FIXATION_ONE_TIME = [0, 1000]
const DIRECT_GAZE_TIME = [1000, 1750]
const SHIFTED_GAZE_TIME = [1750, 2400]
const ENCODING_TIME = [2250, 2400]
const FIXATION_TWO_TIME = [2400, 3400]
const RECALL_TEST = [3400, 6400]


const fixation =(start,finish)=>({
    obj_type:"cross",
    line_length:40,
    line_width:4,
    show_start_time:start,
    show_end_time:finish
    
})

const gridPositions = {
    left:[
        {x:CENTER_X-(GRID_OFFSET_X+INTERNAL_GRID_SPACING), y:CENTER_Y+GRID_OFFSET_Y},
        {x:CENTER_X-(GRID_OFFSET_X), y:CENTER_Y+GRID_OFFSET_Y},
        {x:CENTER_X-(GRID_OFFSET_X+INTERNAL_GRID_SPACING), y:CENTER_Y-GRID_OFFSET_Y},
        {x:CENTER_X-(GRID_OFFSET_X), y:CENTER_Y-GRID_OFFSET_Y}



    ],
    right:[
        {x:CENTER_X+(GRID_OFFSET_X+INTERNAL_GRID_SPACING), y:CENTER_Y+GRID_OFFSET_Y},
        {x:CENTER_X+(GRID_OFFSET_X), y:CENTER_Y+GRID_OFFSET_Y},
        {x:CENTER_X+(GRID_OFFSET_X+INTERNAL_GRID_SPACING), y:CENTER_Y-GRID_OFFSET_Y},
        {x:CENTER_X+(GRID_OFFSET_X), y:CENTER_Y-GRID_OFFSET_Y}
    ]
}


// appear not to be able to set StartX and StartY with timeline variable
// workaround is to specify all 8 grid slots
// [note] is feasible but need to update the parameters in the jspsych-psychophysics plugin to be 

function gridElement(jsPsych, pos, index , start, finish){

   return { 
    obj_type:"text",
    text_color:()=>jsPsych.evaluateTimelineVariable("grid")[index]["color"],
    show_start_time: start,
    show_end_time:finish,
    fontWeight:800,
    fontSize:"48px",
    content:()=>jsPsych.evaluateTimelineVariable("grid")[index]["letter"],
    startX: pos.x,
    startY: pos.y

   }
}

function constructGrid(jsPsych, positions, start, finish){

    let gridElements = []

    for(let i =0; i<8; i++){
        let side = "left"
        let index = i
        if(i>3){
            side = "right"
            index = i-4
        }
        let pos = positions[side][index]

        gridElements.push(gridElement(jsPsych, pos,  i, start, finish))

    }

    return gridElements

}




export const image_object =(jsPsych, key, start, off)=> {
   return  {

        obj_type: 'image',
        file: ()=>jsPsych.evaluateTimelineVariable(key),
        show_start_time: start,
        show_end_time:off,
        startX: CENTER_X, // location in the canvas
        startY: CENTER_Y,
        image_width: 180
    }
}


const testItem =(jsPsych, start, finish)=>{
    return { 
        obj_type:"text",
        text_color:()=>{return jsPsych.evaluateTimelineVariable("target")["color"]},
        show_start_time: start,
        show_end_time:finish,
        fontWeight:800,
        fontSize:"48px",
        content:()=>jsPsych.evaluateTimelineVariable("target")["letter"],
        startX: CENTER_X,
        startY: CENTER_Y
    
       }
    }

    const feedback =(jsPsych)=>{
        return { 
            obj_type:"text",
            text_color:"black",
            show_start_time: 0,
            show_end_time:750,
            fontWeight:400,
            fontSize:"36px",
            content:()=>{
                let last_trial = jsPsych.data.getLastTrialData().trials[0]

                if(!last_trial.response){
                    return "Too slow!"
                }

                if(last_trial.target_type ==="valid" && last_trial.response==="ArrowUp" || last_trial.target_type ==="invalid" && last_trial.response ==="ArrowDown"){
                    return "Correct!"
                }

                return "Wrong!"
            },
            startX: CENTER_X,
            startY: CENTER_Y
        
           }
        }


export let line =(jsPsych, variables, block)=>{

    let trial = {
        timeline:[{
    type: PsychophysicsPlugin,
    response_type:"key",
    response_start_time:RECALL_TEST[0],
    choices:["ArrowUp", "ArrowDown"],
    trial_duration:6300,

    stimuli: [ 
        fixation(FIXATION_ONE_TIME[0], FIXATION_ONE_TIME[1]),
        image_object(jsPsych, "image1", DIRECT_GAZE_TIME[0], DIRECT_GAZE_TIME[1]),
        image_object(jsPsych, "image2", SHIFTED_GAZE_TIME[0], SHIFTED_GAZE_TIME[1]),
       ...constructGrid(jsPsych, gridPositions, ENCODING_TIME[0], ENCODING_TIME[1]),
       fixation(FIXATION_TWO_TIME[0], FIXATION_TWO_TIME[1]),
       testItem(jsPsych, RECALL_TEST[0], RECALL_TEST[1]),
    ],
    
    data: {
       'image1': jsPsych.timelineVariable("image1"),
        'image2': jsPsych.timelineVariable("image2"),
        'grid_items':jsPsych.timelineVariable("grid"),
        'target':jsPsych.timelineVariable("target"),
        'gaze_direction':jsPsych.timelineVariable("gaze_direction"),
        'grid_position':jsPsych.timelineVariable("grid_position"),
        'target_type':jsPsych.timelineVariable("target_type"),
        'block':jsPsych.timelineVariable("block"),
        'face':jsPsych.timelineVariable("face"),
        
        window:()=>({dimensions:[window.innerHeight, window.innerWidth], isFullscreen:document.fullscreenElement?.nodeName || false})

    }
    ,
    canvas_height: 450,
    canvas_width:800,
    background_color:"white"

},
{
    type: PsychophysicsPlugin,
    response_type:"key",
    trial_duration:500,
    stimuli:[
    feedback(jsPsych)
    ],
    canvas_height: 450,
    canvas_width:800,
    background_color:"white",
    choices:"NO_KEYS"

} 



],
timeline_variables:variables
    }



/*
    
    if(block ==="practice"){
 trial.timeline.push({
    type: PsychophysicsPlugin,
    response_type:"key",
    trial_duration:750,
    stimuli:[
    feedback(jsPsych)
    ],
    canvas_height: 450,
    canvas_width:800,
    background_color:"white",
    choices:"NO_KEYS"

} )
    }
    */

    return trial

}