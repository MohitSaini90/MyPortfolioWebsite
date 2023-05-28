console.log('Hello');
//nav toggle
let links = document.querySelectorAll('.links');

links.forEach(link => {
    link.addEventListener('click', () =>{
        links.forEach(item => item.classList.remove('active'))
        link.classList.add('active');
    })
})

//toggle navbar in mobile view

const togglebtn=document.querySelector('.toggle-btn');
const ul= document.querySelector('.nav-links-container');
togglebtn.addEventListener('click',() => {
    togglebtn.classList.toggle('active');
    ul.classList.toggle('active');
})