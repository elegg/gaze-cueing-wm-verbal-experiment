import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'






export let fullScreenToggle  = {
    type: htmlKeyboardResponse,
    stimulus: `<h2>Press "F" to Enter Full Screen Mode.</h2>
    <p>This experiment should be done in full screen mode. Your cursor will also disappear.</p>
    <p>You can leave fullscreen mode at any point using the Escape Key and re-enter with the "F" key.</p>
    <br>
    <p>To begin the experiment you will take part in a practice trial</p>
    <p>Press the Space Key to start.</p>`,
    
     

    choices: " ",
    on_load:()=>{


    document.addEventListener("fullscreenchange",(e)=>{

        if(!document.fullscreenElement){
            document.body.style.cursor="default"


        }
    } )

    document.addEventListener("keydown", (e)=>{
        e.preventDefault()
        if(e.key ==="f" && !document.fullscreenElement){
            document.body.style.cursor="none"

            document.body.requestFullscreen()
        }
        
    })

    }
    

}
