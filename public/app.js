const welcome = document.getElementById("welcome")

Begin = async display => {
    const intro = await fetch('/messages')
    const answer = await intro.json()
    welcome.textContent = answer[Math.floor(Math.random()*answer.length)].rawdata
}

Begin()

const button = document.getElementById("send")
        button.addEventListener('click', async event => {
            const rawdata = document.getElementById("textbox").value
            const processeddata = {rawdata}
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
        })