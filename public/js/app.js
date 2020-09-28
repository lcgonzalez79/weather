console.log("Running on the client side")

/* fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=> {
        console.log(data)

    })
}) */



const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    address='/weather?search='+location


    messageOne.textContent='Loading....'
    messageTwo.textContent=''

    fetch(address).then((response)=>{
        response.json().then((data) => {
            if(data.error) {
/*                 console.log(data.error)
 */                messageOne.textContent=data.error
            }
            else{
           /*  console.log(data.forecast)
            console.log(data.location)
            console.log(data.address) */
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast.description+' with temperature of '+data.forecast.temperature+' celsius and feels like '+data.forecast.feels+'. Humidity is '+data.forecast.humidity
            }
        })
    })

    console.log(location)
})