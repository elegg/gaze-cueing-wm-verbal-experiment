import * as  Survey  from 'survey-js-ui';
import "survey-core/survey-core.min.css";


function consentFor(title, value){

    return {
    "type": "boolean",
    "name": title,
    "title":value ,
    "valueTrue": "Yes",
    "valueFalse": "No",
    "renderAs": "checkbox",
    isRequired:true
  }
}

let initialChecks = [
 
  {
    id:"anonymity-check",
  text:"I understand that all personal information will remain confidential and that all efforts will be made to ensure I cannot be identified (except as might be required by law)"
  },
  {
    id:"future-research-check",
    text:"I agree that data gathered in this study may be stored anonymously and securely, and may be used for future research",
},
{
  id:"voluntary-participation",
text:"I understand that my participation is voluntary and that I am free to withdraw at any time without giving a reason."
},
{
  id:"colour-blindness-check",
  text:"I confirm that I do not have any form of colour blindness"
}
]

let finalChecks = [
{
    id:"read-sheet-check",
    text:"I confirm that I have read and understand the Participant Information Sheet."
  },
  {
    id:"final-agree-check", 
    text:"I agree to take part in this study."
}
]


const surveyJson = {
    
pages:[
  {"elements": [
        {type:'page',

         elements:[
    {
      "name": "information-sheet",
      "type": "html",
      "html": `<h3>Participant Information Sheet</h3>
        <p>Before you decide to take part in this study it is important for you to understand why the research is being done and what it will involve. Please take time to read the following information carefully and discuss it with others if you wish. A member of the team can be contacted if there is anything that is not clear or if you would like more information. Take time to decide whether or not you wish to take part.</p>
        <p>The study investigates the effect of certain stimuli (faces) on short term memory. You will take part in a task where you briefly see some letters. After a short break you will be shown a letter and have to decide if it was one of the letters you just saw</p>
        <p>Participation in the study is entirely voluntary and you can withdraw at any point. The results of the study may be written up or presented at conferences. Your participation will remain confidential, and if individual data is presented there will be no means of identifying the individuals involved.</p>
        <p>If you would like to know more about the study or have any questions you can contact Edward <a href="mailto:edward.legg@uniri.hr">(edward.legg@uniri.hr)</a> for further information.</p>

       <p><strong> Main researcher:  </strong>
 <br>Dr. Edward Legg, Lecturer, Division of Cognitive Sciences, Faculty of Humanities and Social Sciences, University of Rijeka, email: edward.legg@uniri.hr  </p>

 <p><strong>Research Collaborators:  </strong>
<br>Doc. dr. sc. Ljerka Ostojić, Department of Psychology, Faculty of Humanities and Social Sciences, University of Rijeka, email: lj.ostojic@uniri.hr  
<br>Vinoprasath Shivakumar, Division of Cognitive Sciences, Faculty of Humanities and Social Sciences, University of Rijeka, email: vshivakumar@uniri.hr  </p>

        `
    },
    
]}
]},
{
    type:"panel",
"questionTitleLocation": "left",
"questionTitleWidth": "90%",

 elements:[
{

      "name": "consent-sheet",
      "type": "html",
      "html": `<h3>Consent Form</h3>`,

},
    ...initialChecks.map(({id, text})=>consentFor(id, text)),
    ...finalChecks.map(({id, text})=>consentFor(id, text)),




  ],
  


},

], "questionTitleLocation": "bottom",
  "clearInvisibleValues": "onHidden",
  "completeText": "Continue to Experiment",
  "widthMode": "static"}

;


let consentForm = (jatos)=>{
    const survey = new Survey.Model(surveyJson);

    if(jatos){
  window.onbeforeunload = function() { return "Are you sure you want to leave?"; }


  survey.completedHtml =""

survey.onComplete.add((survey, options)=>{
  window.onbeforeunload = function() {  }

  jatos.submitResultData({...survey.data, 
    PROLIFIC_PID:jatos.urlQueryParameters?.PROLIFIC_PID || "NONE",
    STUDY_ID: jatos.urlQueryParameters?.STUDY_ID || "NONE",
    SESSION_ID: jatos.urlQueryParameters?.SESSION_ID || "NONE",
    screen:[window.innerWidth, window.innerHeight]
  

  }, jatos.startNextComponent)



})
    }


survey.render(document.body);


}

export default consentForm