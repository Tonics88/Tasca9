hipoteca={
    mes:0,
    any:0,
    capital: 0,
    interes: 0,
    termini: 1,
    cuota: function() {
        return ((this.capital*this.interes/12)/(100*(1-Math.pow(1+this.interes/(12*100),this.termini*-1)))).toFixed(2);
    },
    avis:true
}

function calcularInici(val) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Gener es el 0
    
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
    
    resultatCuota();
}

function calcularCapital(val) {
    
    if (val>0 && val<=1000000){
        hipoteca.capital=val;
        valOk("capital");
        resultatCuota();
    } else {
        
        if (val>1000000){
            valNoOk("capital");
            document.getElementById("capital").value=1000000;
            if (hipoteca.avis){
                hipoteca.avis=false;
                setTimeout(maxCapital,100);
                
            }
        } else {
            document.getElementById("capital").value="";
            hipoteca.capital=0;
        }
    }
    
}

function maxCapital(){
    
    if (confirm("El capital no pot ser superior a 1 milió d'euros.\nVols un milió?")){
        document.getElementById("capital").value=1000000;
        hipoteca.capital=1000000;
        valOk("capital");
    } else {
        document.getElementById("capital").value="";
        hipoteca.capital=0;
    }
    hipoteca.avis=true;
    
}

function calcularInteres(val) {
    if (parseFloat(val)>=0){
        hipoteca.interes=val;
        valOk("interes");
        resultatCuota();
    } else {
        valNoOk("interes");
        hipoteca.interes=0;
        document.getElementById("interes").value="";
    }
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
    var mes=(hipoteca.mes+((hipoteca.termini-1)%12))%12;
    if (!mes){
        mes=12;
    }
    document.getElementById("final").innerHTML = " Mes "+mes+" del "+(hipoteca.any+parseInt(hipoteca.termini/12));
}

function valNoOk(text){
    document.getElementById(text).setAttribute("class", "form-control is-invalid");
    document.getElementById(text+"_text").setAttribute("class", "invalid-feedback");
}

function valOk(text){
    document.getElementById(text).setAttribute("class", "form-control is-valid");
    document.getElementById(text+"_text").setAttribute("class", "form-text text-muted");
}
