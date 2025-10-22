import imageKeyboardResponse from '@jspsych/plugin-image-keyboard-response'

export let  imageRoutine =(jsPsych)=>( {
    type: imageKeyboardResponse,
    stimulus: ()=>jsPsych.evaluateTimelineVariable("image"),
    choices: "NO_KEYS",
    trial_duration: 750

})