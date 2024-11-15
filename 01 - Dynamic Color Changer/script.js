var changeColorBtn = document.querySelector('.btn');

function getBackgroundColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return 'rgb(${r}, ${g}, ${b})'
}


changeColorBtn.addEventListener('click', () =>{
    document.body.style.backgroundColor = getBackgroundColor()
    console.log("done")   ;
     console.log(getBackgroundColor())
} )