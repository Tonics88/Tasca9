function calcularAnys(val) {
    document.getElementById("mesosAnys").innerHTML = (val)+" mesos seran "+parseInt(val/12)+" anys";
    if (val%12){
        document.getElementById("mesosAnys").innerHTML += " i "+(val%12)+" mesos"
    } 
}