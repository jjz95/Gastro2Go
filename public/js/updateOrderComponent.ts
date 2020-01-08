import { json } from "express/lib/express"
//\d+$
const iloscInputs = document.getElementsByClassName('ilosc')
for (let i = 0; i < iloscInputs.length; i++) {
    // let inputId = this.id.replace('ilosc', '')
    iloscInputs[i].addEventListener('input', function (evt) {
        let ilosc = this.value
        let numId = this.id.toString().replace('ilosc', '')

        let cena = document.getElementById(`cena${numId}`).innerHTML
        let numIlosc = parseFloat(ilosc.toString())
        let numCena = parseFloat(cena.toString())

        let waga = document.getElementById(`waga${numId}`).innerHTML
        let numWaga = parseFloat(waga.toString())

        document.getElementById(`cena-ilosc${numId}`).innerHTML = (numCena * numIlosc).toString()
        document.getElementById(`waga-ilosc${numId}`).innerHTML = (numWaga * numIlosc).toString()


    });
}


function updateProducts(){
    fetch(`${window.location.href.replace(/\/\d+(\?)?$/, '')}/updateproduct`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({

        })
    }).then(response => {
        // window.location.reload()
        console.log(response)
    }).catch(e =>
        console.log(e)
    )
}

function test() {
    alert("1");
    console.log('1')
}
window.onload = test;