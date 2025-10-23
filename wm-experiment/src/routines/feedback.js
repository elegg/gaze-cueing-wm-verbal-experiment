/*import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'

import { isResponseCorrect } from '../evaluateResponses.js'
export let feedbackRoutine = ({jsPsych, audio})=>( {
    type: htmlKeyboardResponse,
    stimulus: () => {

        let data = jsPsych.data.get().filter({ screen:"dot_room" }).trials
        let lastTrial = data[data.length - 1]

        let msg = "You didn't respond."



        if (!lastTrial.response) {
            return `<p class='trial-prompt'>${msg}</p>`
        }
       msg = isResponseCorrect(lastTrial) ? "Correct!" : "Wrong"
       
        return `<p class='trial-prompt'>${msg}</p>`

    },
    choices: "NO KEYS",
    trial_duration: 1000,
    on_load:()=> audio.pauseSound()


})

*/