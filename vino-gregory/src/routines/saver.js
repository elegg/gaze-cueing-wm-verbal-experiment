import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
//import { isResponseCorrect, evaluateTrialResponses } from '../evaluateResponses.js'
// need to change to being conditional for final block => provide message about how many trials the participant has completed



export default function saveData({ jatos, jsPsych, block, callback = () => { } }){

   return { type: htmlButtonResponse,
    stimulus: `Saving Data...`,
    on_load: () => {
        let button = document.getElementsByClassName("hidden-button")[0]
        let appendData = () => jatos.appendResultData(jsPsych.data.get().ignore('stimulus').trials)
            .then(callback)
            .then(() => { button.click() })

        let submitData = () => jatos.submitResultData(jsPsych.data.get().ignore('stimulus').trials)
            .then(callback)
            .then(() => { button.click() })

        if (block === "practice") {

            submitData()
                .catch(() => {alert("Error in Connection to server")
                })         
        }
        else {
            appendData()
                .catch(() => {alert("Error in Connection to server")}
                )
        }
    },
    choices: ["Load"],
    button_html: (choice) => `<button class="hidden-button"${choice}</button>`
}
}