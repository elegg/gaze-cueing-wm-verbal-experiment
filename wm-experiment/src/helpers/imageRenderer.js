export default function imageRender(src, el){
    const img = document.createElement("img")
    img.src =src
    img.className = "instruct-image"
    el.append(img)
 
 }
 