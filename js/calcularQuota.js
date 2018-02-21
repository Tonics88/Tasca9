//Objecte que feim servir per centralitzar totes les dades necessaries per fer el càlcul.
hipoteca={
    mes:0,
    any:0,
    capital: 0,
    interes: 0,
    termini: 1,//Per defecte donam l'opció mínima d'un mes.
    cuota: function() {
        return ((this.capital*this.interes/12)/(100*(1-Math.pow(1+this.interes/(12*100),this.termini*-1)))).toFixed(2);
    },//La cuota es una funció que es calcula a partir dels valors anteriors.
    avis:true//Boleà necessaari per impedir que únicament es mostri un 'confirm' si ens deixen pitjada una tecla al camp Capital i sobrepasam el milió.
}

function calcularInici(val) {
    //Obtenim la data actual (ens interesa el dia i mes)
    var avui = new Date();
    var dd = avui.getDate();
    var mm = avui.getMonth()+1; //Gener es el 0
   
    //Del camp de la data inicial triada separam mes i any.
    hipoteca.mes=parseInt(val.substr(5));
    hipoteca.any=parseInt(val.substr(0, 4));
    
    //Si avui no es dia primer i hem triat començar aquest mes obligam a que es comenci el següent mes.
    if (dd!=1 && hipoteca.mes==mm){
        //Si es decembre incrementam any
        if (hipoteca.mes==12){
            hipoteca.any++;
        }
        //Incrementam el mes en 1 i amb MOD obligam que sempre el nombre es trobi entre 1 i 12.
        hipoteca.mes=(hipoteca.mes%12+1);
        //Per tenir el mateix format que ens dona el formulari afegim 0 si el mes es menor a 10.
        if(hipoteca.mes<10) {
            var mm = '0'+hipoteca.mes;
        }
        //Insertam a 'value' la nova data i així el client podrà veure el mes triat canviat.
        document.getElementById("inici").value=(hipoteca.any+'-'+mm);
    }
    //Actualitzam el resultat final cada pic que hi ha un canvi.
    resultatCuota();
}

function calcularCapital(val) {
    //Comprovació de si el capital triat es troba entre els disponibles.
    if (val>0 && val<=1000000){
        hipoteca.capital=val;
        valOk("capital");//Indicam en color verd el camp si es correcte.
        //Actualitzam el resultat final cada pic que hi ha un canvi.
        resultatCuota();
    } else {
        //Si no es correcte, si la cantitat es major indicarem el màxim posible i si el vol...
        if (val>1000000){
            valNoOk("capital");//Indicam en color vermell el camp si es incorrecte.
            document.getElementById("capital").value=1000000;
            //Aquí feim servir el bolea per assegurar que entram unicament un pic.
            if (hipoteca.avis){
                hipoteca.avis=false;
                setTimeout(maxCapital,100);//Esperam 100ms per donar temps al navegador a indicar de color vermell el camp.
                
            }
        //...sino es que es inferior a 0 i borram la dada per donar l'impressió de que no es deixa introduïr.
        } else {
            document.getElementById("capital").value="";
            hipoteca.capital=0;
        }
    }
    
}

function maxCapital(){
    //Aquesta funció si hem introduït un nombre mallor al posible ens demanarà si volem el màxim posible.
    if (confirm("El capital no pot ser superior a 1 milió d'euros.\nVols un milió?")){
        document.getElementById("capital").value=1000000;
        hipoteca.capital=1000000;
        valOk("capital");//Indicam en color verd el camp si es correcte.
    } else {
        document.getElementById("capital").value="";
        hipoteca.capital=0;
    }
    hipoteca.avis=true;
    
}

function calcularInteres(val) {
    //Només acceptam l'interes positiu
    if (parseFloat(val)>=0){
        hipoteca.interes=val;
        valOk("interes");//Indicam en color verd el camp si es correcte.
        //Actualitzam el resultat final cada pic que hi ha un canvi.
        resultatCuota();
    } else {
        //Anam borrant el camp per fer l'efecte que no es posible introduïr nombres negatius.
        valNoOk("interes");//Indicam en color vermell el camp si es incorrecte.
        hipoteca.interes=0;
        document.getElementById("interes").value="";
    }
}

function calcularTermini(val) {
    //El termini es introduït en messos però anam fent la conversió en temps real a anys i messos.
    hipoteca.termini=val;
    //Per facilitar triar un plaç exactament al 'range' afegim un '+' i in '-' que quan son pitjats incrementen o decrementen en 1 els messos.
    document.getElementById("mesosAnys").innerHTML = '<spam onclick="incrementarMes(1)"> + </spam>'+(hipoteca.termini)+'<spam onclick="incrementarMes(-1)"> - </spam>'+" mesos seran "+parseInt(hipoteca.termini/12)+" anys";
    if (val%12){
        document.getElementById("mesosAnys").innerHTML += " i "+(val%12)+" mesos"
    }
    //Actualitzam el resultat final cada pic que hi ha un canvi.
    resultatCuota();
}

function incrementarMes(x) {
    //Depenent si es crida la funció de '+' o '-' sumam 1 o -1 i tornam a calcular el termini per fer el canvi en temps real.
    hipoteca.termini=parseInt(hipoteca.termini)+x;
    calcularTermini(hipoteca.termini);
}

function resultatCuota (){
    //Mostram la cuota sempre que sigui superior a 0 i no sigui infinita.
    if (parseFloat(hipoteca.cuota())>0 && hipoteca.cuota()!="Infinity"){
        document.getElementById("resultat").innerHTML = " "+hipoteca.cuota()+" €";
    }
    //Càlcul del mes de la darrera cuota.
    var mes=(hipoteca.mes+((hipoteca.termini-1)%12))%12;
    if (!mes){
        mes=12;
    }
    document.getElementById("final").innerHTML = " Mes "+mes+" del "+(hipoteca.any+parseInt(hipoteca.termini/12));
}

function valNoOk(text){
    //Indicam el camp en color vermell de la ID del nom que hem passat a la funció.
    document.getElementById(text).setAttribute("class", "form-control is-invalid");
    document.getElementById(text+"_text").setAttribute("class", "invalid-feedback");
}

function valOk(text){
    //Indicam el camp en color verd de la ID del nom que hem passat a la funció.
    document.getElementById(text).setAttribute("class", "form-control is-valid");
    document.getElementById(text+"_text").setAttribute("class", "form-text text-muted");
}
