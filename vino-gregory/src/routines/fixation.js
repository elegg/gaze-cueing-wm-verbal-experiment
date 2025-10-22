import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'


export let fixationRoutine = {
    type: htmlKeyboardResponse,
    stimulus: `<p class='trial-prompt'>+<p>`,
    choices: "NO_KEYS",
    trial_duration: 750

}