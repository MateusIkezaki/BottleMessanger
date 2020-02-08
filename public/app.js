const welcome = document.getElementById("welcome")
const next = document.getElementById("next")
const author = document.getElementById("author")
var canproceed = true

const Begin = async display => {
    const intro = await fetch('/messages')
    const answer = await intro.json()
    const contentid = Math.floor(Math.random()*answer.length)
    welcome.textContent = answer[contentid].rawdata
    author.textContent = `- ${answer[contentid].nickname}`
}

const ChangeMessage = () => {
    next.addEventListener('click', () => {
        if(canproceed)
        {
            welcome.style.opacity = 0
            next.style.opacity = 0
            author.style.opacity = 0
            window.setTimeout('welcome.style.opacity = 1; next.style.opacity = 1; author.style.opacity = 1; Begin()', 2000)
            window.setTimeout('canproceed = true', 4000)
            canproceed = false
        }  
    })
}

Begin()
ChangeMessage()

const button = document.getElementById("send")
        button.addEventListener('click', async event => {
            const rawdata = document.getElementById("textbox").value
            const nickname = document.getElementById("nameplace").value
            if(rawdata != '')
            {
                const processeddata = {rawdata, nickname}
            
                console.log(processeddata)
                console.log(JSON.stringify(processeddata))
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(processeddata)
                }
                const message = await fetch('/messages', options)
                document.getElementById("textbox").value = ""
                const response = await message.json()
                console.log(response)
                alert("Bottle sent successfully!")
            }
            else
            {
                alert("Please fill the textbox below")
            }
            
        })