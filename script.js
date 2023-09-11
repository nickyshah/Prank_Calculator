const allBtns = [...document.getElementsByClassName("btn")]

// console.log(allBtns)

let strToDisplay = ""

const displayElm = document.querySelector(".display")

const display = (str) => {
    displayElm.innerText = str || "0.00"
}


// console.log(displayElm)
const operators = ["+", "-", "*","/", "%"]

let lastOperator = ""
const audio = new Audio("./sound.wav")


allBtns.forEach((btn) =>{
    
    btn.addEventListener("click", () => { 
        displayElm.style.background = ""
        displayElm.style.color = ""
        displayElm.classList.remove("prank")
        const val = btn.innerText

        if (val === "AC"){
            strToDisplay = ""
            display(strToDisplay)
            return
        }
        if (val === "C"){
            strToDisplay= strToDisplay.slice(0, -1)
            return display(strToDisplay)
        }

        if (val === "="){
                const lastChar = strToDisplay[strToDisplay.length-1]
        
                if (operators.includes(lastChar)){
                    // removes the last character from the
                    strToDisplay= strToDisplay.slice(0, -1)
                }
            
            return total()
        }

        if (operators.includes(val)){
            lastOperator = val
            const lastChar = strToDisplay[strToDisplay.length-1]

            if (operators.includes(lastChar)){
                strToDisplay= strToDisplay.slice(0, -1)
            }
        }

    if(val === "."){
        // if(strToDisplay.includes("."))
        // return    //won't work cuz after operator this wont work cuz its already been used once.
        const indexOfLastOperator = strToDisplay.lastIndexOf(lastOperator)

        const lastNumberSet = strToDisplay.slice(indexOfLastOperator)

        // alert(indexOfLastOperator)

        if(lastNumberSet.includes(".")){
            return
        }

        if(!lastOperator  && strToDisplay.includes(".")){
            return
        }
    }

        strToDisplay += val

       display(strToDisplay)
    })
})


const total = () => {

    const extraVal = randomNumber()
    if(extraVal){
        audio.play()
        displayElm.style.background = "red"
        displayElm.style.color = "white"
        displayElm.classList.add("prank")
    }

    const ttl = eval(strToDisplay) + extraVal
    display(ttl)
    strToDisplay = ttl.toString()
}

const randomNumber = () => {
    const num = Math.round(Math.random() * 10)
    return num < 3 ? num : 0
}