const red = document.querySelector('.red')
const white = document.querySelector('.white')

white.addEventListener('click', () =>{
    red.style.display = "flex"
    white.style.display = "none"
})

red.addEventListener('click', () =>{
    white.style.display = 'flex'
    red.style.display = 'none'
})