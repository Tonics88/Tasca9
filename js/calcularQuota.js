hipoteca={
    mes:0,
    any:0,
    capital: 0,
    interes: 0,
    termini: 0,
    cuota: function() {
        return ((this.capital*this.interes/12)/(100*(1-Math.pow(1+this.interes/(12*100),this.termini*-1)))).toFixed(2);
    }
}

function calcularInici(val) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Gener es el 0
    console.log(typeof(dd))
    console.log(dd);
    
    hipoteca.mes=parseInt(val.substr(5));
    hipoteca.any=parseInt(val.substr(0, 4));
    
    if (dd!=1 && hipoteca.mes==mm){
        if (hipoteca.mes==12){
            hipoteca.any++;
        }
        hipoteca.mes=(hipoteca.mes%12+1);
        if(hipoteca.mes<10) {
            var mm = '0'+hipoteca.mes;
        }
        console.log(mm);
        document.getElementById("inici").value=(hipoteca.any+'-'+mm);
    }
    console.log(typeof(hipoteca.mes));
    console.log(hipoteca.mes);
    console.log(typeof(hipoteca.any));
    console.log(hipoteca.any);
    
    
    
    
    console.log(val);
    resultatCuota();
}

function calcularCapital(val) {
    if (val<=1000000){
        hipoteca.capital=val;
        resultatCuota();
    } else {
        
    }
    
}

function calcularInteres(val) {
    hipoteca.interes=val;
    resultatCuota();
}

function calcularTermini(val) {
    hipoteca.termini=val;
    document.getElementById("mesosAnys").innerHTML = (val)+" mesos seran "+parseInt(val/12)+" anys";
    if (val%12){
        document.getElementById("mesosAnys").innerHTML += " i "+(val%12)+" mesos"
    }
    resultatCuota();
}

function resultatCuota (){
    if (parseFloat(hipoteca.cuota())>0 && hipoteca.cuota()!="Infinity"){
        document.getElementById("resultat").innerHTML = " "+hipoteca.cuota()+" €";
    }
    document.getElementById("final").innerHTML = " Mes "+(hipoteca.mes+parseInt(hipoteca.termini))%12+" del "+(hipoteca.any+parseInt(hipoteca.termini/12));
}