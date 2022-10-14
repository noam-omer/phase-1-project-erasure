

function delayedPrintHW{
    setTimeout(printHW, 10000)
}

function printHW(){
    console.log('Hello World')

}

window.addEventListener('load', delayedPrintHW)