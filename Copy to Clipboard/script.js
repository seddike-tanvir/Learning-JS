// var txt = document.querySelector('.text').value;
// var txts = String(txt);

// document.write(txts);

// var txtFromBox = document.querySelector('.txtBox').Value;

let btn = document.querySelector('.btn');
let output = document.querySelector('.output');

btn.onclick = function(){ 
    let closest = btn.closest(".text");
    let outputText = (closest).innerHTML;
    output.innerHTML = (outputText);
    navigator.clipboard.writeText(outputText);
    setTimeout(() => {
        output.innerHTML = ("");
    }, 2000)
}
