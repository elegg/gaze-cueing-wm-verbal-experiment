export default function textRender(text, el){
    const div = document.createElement("div")
    div.innerHTML =text
    el.append(div)
 
 
 }
 