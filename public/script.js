console.log('Hello');
//nav toggle
let links = document.querySelectorAll('.links');

links.forEach(link => {
    link.addEventListener('click', () =>{
        links.forEach(item => item.classList.remove('active'))
        link.classList.add('active');
    })
})

