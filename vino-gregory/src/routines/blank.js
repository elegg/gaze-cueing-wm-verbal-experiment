import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'


export let blankRoutine= {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: 500

}