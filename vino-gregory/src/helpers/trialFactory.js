


export class Sampler {
    constructor(array) {
        this.array = array
        this.stateArray = []
    }

    length() {
        return this.array.length
    }

    multiple(x) {

        let out = []
        for (let i = 0; i < x; i++) {
            out = out.concat(this.array)

        }
        return new Sampler(out)

    }

    _generateLoopingSample() {

        this.stateArray = this._sampleWithoutReplacementIndex(this.length())
    }

    nextLoopSample() {

        if (this.stateArray.length) {
            return this.array[this.stateArray.pop()]

        }
        else {
            this._generateLoopingSample()
            return this.array[this.stateArray.pop()]
        }
    }




    sampleWithReplacement(x) {

        let res = []
        for (let i = 0; i < x; i++) {
            let idx = Math.floor(Math.random() * this.array.length)

            res.push(this.array[idx])
        }


        return res
    }
    _sampleWithoutReplacementIndex(x) {
        let res = []


        while (res.length < x) {
            let idx = Math.floor(Math.random() * this.array.length)

            if (!res.includes(idx)) {
                res.push(idx)
            }
        }

        return res

    }


    sampleWithoutReplacement(x) {

        let res = []
        let shuffled_idxs = this._sampleWithoutReplacementIndex(x)

        for (let i = 0; i < shuffled_idxs.length; i++) {
            res.push(this.array[shuffled_idxs[i]])
        }

        return res

    }

    maxRepeating(max, isRepeatTest) {

        let shuffled = this.sampleWithoutReplacement(this.array.length)
        let items = shuffled.map((_, i) => i)

        let unhandled = []

        let res = []

        while (items.length || unhandled.length) {

            if (items.length <= 0) {
                items = res.concat(unhandled)
                unhandled = []
                res = []
            }

            let idx = items.pop()

            let repeats = 0

            let previousNToCheck = max < res.length ? max : res.length
            for (let i = 0; i < previousNToCheck; i++) {
                let prev_item = res[res.length - (i + 1)]

                if (isRepeatTest(shuffled[prev_item], shuffled[idx])) {
                    repeats += 1
                }
            }

            if (repeats >= max) {
                unhandled.push(idx)

                continue

            } else {

                res.push(idx)
            }

        }

        return res.map(idx => shuffled[idx])

    }
}


function permutations(arrs) {

    //let dims = arrs.map(arr=>arr.length-1)

    let pos = new Array(arrs.length).fill(0)

    let outputs = []

    let isAtEnd = false

    while (!isAtEnd) {
        let output = []


        for (let i = 0; i < pos.length; i++) {
            output.push(arrs[i][pos[i]])
        }

        outputs.push(output)


        let finished = 0
        for (let i = 0; i < pos.length; i++) {
            if (pos[i] < arrs[i].length - 1) {
                pos[i] += 1
                for (let j = 0; j < i; j++) {
                    pos[j] = 0
                }
                isAtEnd = false
                break

            }
            else {
                finished += 1
            }
        }

        if (finished >= arrs.length) {
            break
        }
    }


    return outputs


}


let FACES = ["a", "b", "c", "d", "e", "f"]
let GAZE_DIRECTIONS = ["left", "right"]
let GRID_POSITION = ["left", "right"]
let TARGET_TYPE = ["valid", "invalid"]
let LETTERS = "BCDFGHKLMNPRST".split("") // medium to high freq consonants from https://www.sciencedirect.com/science/article/pii/S0001691822000257#f0020
let COLORS = ["black"]

class ExperimentFactory {
    constructor(faces, gaze_directions, grid_positions, target_types, letters, colors) {
        this.faces = faces
        this.face_files = {}
        this.gaze_directions = gaze_directions
        this.grid_positions = grid_positions
        this.target_types = target_types
        this.letters = new Sampler(letters)
        this.colors = new Sampler(colors)
        this.blankGrid = ["", "", "", ""].map(letter => ({ letter:letter, color: "white" }))
        this.template = []

    }

    constructTrialTemplate() {

        let perms = this._permutations([this.faces, this.gaze_directions, this.grid_positions, this.target_types])

        this.template = perms.map(arr => ({ face: arr[0], gaze_direction: arr[1], grid_position: arr[2], target_type: arr[3] }))

    }

    attachFaces(obj){
        this.face_files=obj
    }

    generateTimelineVariables(block) {


        let res = []

        for (let i = 0; i < this.template.length; i++) {

            let timelineVariable = this._constructSingleTimeLineVariable(this.template[i])

            res.push({...this.template[i], ...timelineVariable, block})


        }

        return new Sampler(res).sampleWithoutReplacement(res.length)


    }

    generatePractice(){

        let pool = this.generateTimelineVariables("practice")

        let trials = []

        console.log(pool[2])
        let faces_valid = new Set()
        let faces_invalid = new Set()

        let valid = 0

        let i = 0

        while(trials.length<12 && i <pool.length){
            let template = pool[i]
            

            if (faces_valid.size <6 && (template.target_type ==="valid" && !(faces_valid.has(template.face)))){
                faces_valid.add(template.face)
                trials.push(template)
            }
            if (template.target_type ==="invalid" && !(faces_invalid.has(template.face)) && faces_invalid.size <6){
                faces_invalid.add(template.face)
                trials.push(template)
            }



            i++
        }
       return trials


    }

    _constructSingleTimeLineVariable(templateItem){

        let stimuli = this.letters.sampleWithoutReplacement(5).map(letter => ({ letter, color: "black" }))

        let grid_stimuli = stimuli.slice(0, 4)
        let invalid_target = stimuli[4]

        let grid = []

        // handle Grid Location
        if (templateItem.grid_position === "right") {

            grid = this.blankGrid.concat(grid_stimuli)

        }
        else {

            grid = grid_stimuli.concat(this.blankGrid)
        }


        // handle Target Type

        let selected = invalid_target
        if(templateItem.target_type==="valid"){

            let opts = new Sampler(grid_stimuli)
            selected = opts.sampleWithReplacement(1)[0]

        }

        let images  = this._select_face_files(templateItem)


    return {...templateItem, grid, target:selected, ...images}
    }

    _select_face_files(template){
        
        let face = template.face
        let direction = template.gaze_direction

        let opts = {
            center:0,
            left:1,
            right:2
        }


        return {image1:this.face_files[face][0], image2:this.face_files[face][opts[direction]]}
    }

    _permutations(arrs) {

        //let dims = arrs.map(arr=>arr.length-1)

        let pos = new Array(arrs.length).fill(0)

        let outputs = []

        let isAtEnd = false

        while (!isAtEnd) {
            let output = []


            for (let i = 0; i < pos.length; i++) {
                output.push(arrs[i][pos[i]])
            }

            outputs.push(output)


            let finished = 0
            for (let i = 0; i < pos.length; i++) {
                if (pos[i] < arrs[i].length - 1) {
                    pos[i] += 1
                    for (let j = 0; j < i; j++) {
                        pos[j] = 0
                    }
                    isAtEnd = false
                    break

                }
                else {
                    finished += 1
                }
            }

            if (finished >= arrs.length) {
                break
            }
        }


        return outputs


    }

    imagesForLoading(){

        return this.faces.flatMap(face=>this.face_files[face])
    }






}


 let e = new ExperimentFactory(FACES, GAZE_DIRECTIONS, GRID_POSITION, TARGET_TYPE, LETTERS, COLORS)
e.constructTrialTemplate()

export default e
