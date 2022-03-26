function add (a,b){
    return parseFloat((a+b).toFixed(5));
}

function sub (a,b){
    return parseFloat((a-b).toFixed(5));
}

function mul (a,b){
    return parseFloat((a*b).toFixed(5));
}

function div (a,b){
    if(b==0){
        alert("Dividing by zero");
        return a;
    }
    return parseFloat((a/b).toFixed(5));
}

function mod (a,b){
    if((b==0)||(String(a).includes("."))){
        alert("Modulus by 0 OR a floating point number");
        return a;
    }
    return parseFloat((a%b).toFixed(5));
}

function pow (a,b){
    return parseFloat((a**b).toFixed(5));
}

function oper (a,b,op){
    switch(op){
        case "+":
            return add(a,b);
            break;
        
        case "-":
            return sub(a,b);
            break;

        case "*":
            return mul(a,b);
            break;

        case "/":
            return div(a,b);
            break;

        case "%":
            return mod(a,b);
            break;

        case "^":
            return pow(a,b);
            break;

        default:
            return "ERROR";
            break;
    }
}

var num1 = "";
var num2 = "";
var op = "";
var numflag = 0;
var dotflag = 0;
var opflag = 1;
var expflag = 0;

function clrscr (){
    num1 = "";
    num2 = "";
    op = "";
    numflag = 0;
    dotflag = 0;
    opflag = 1;
    expflag = 0;

    res.textContent="--";
    exp.textContent="--";
}

var exp = document.querySelector("#exp");
var res = document.querySelector("#res");

var dot = document.querySelector("#dot");
var equals = document.querySelector("#equals");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

var numbutton = document.querySelectorAll(".num");
var opbutton = document.querySelectorAll(".op");

numbutton.forEach((num)=>{
    num.addEventListener("click",(e)=>{
        if(numflag==0){
            if(num1.length>=6){
                alert("Only 6 digit numbers");
                return;
            }
            num1 += e.target.innerText;
        }
        else{
            if(num2.length>=6){
                alert("Only 6 digit numbers");
                return;
            }
            num2 += e.target.innerText;
        }

        opflag = 0;

        if(res.textContent=="--"){
            res.textContent="";
        }

        res.textContent+=e.target.innerText;
    })
})

opbutton.forEach((operation)=>{
    operation.addEventListener("click",(e)=>{
        var ch = res.textContent.slice(-1);

        if(ch=="."){
            alert("Nothing after the floating point");
            return;
        }

        if(opflag==1){
            alert("Already one operation OR no number");
            return;
        }

        if(expflag == 1){
            exp.textContent=res.textContent;
            num1=String(oper(parseFloat(num1),parseFloat(num2),op));
            if((num1.length>10)||(num1.includes("Infinity"))){
                alert("Calculator Reset. Result too large - "+num1);
                clrscr();
                return;
            }
            res.textContent=num1;
            num2="";

        }
        
        opflag = 1;
        numflag = 1;
        dotflag = 0;
        expflag = 1;

        op = e.target.innerText;

        res.textContent+=e.target.innerText;
    })
})

dot.addEventListener("click",()=>{
    if(dotflag==1){
        alert("Already one decimal");
        return;
    }

    dotflag = 1;
    
    if(numflag==0){
        num1 += ".";
    }
    else{
        num2 += ".";
    }

    if(res.textContent=="--"){
        res.textContent="";
    }

    res.textContent+=".";
})

equals.addEventListener("click",()=>{
    var ch = res.textContent.slice(-1);

    if(ch=="."){
        alert("Nothing after the floating point");
        return;
    }

    if((ch=="+")||(ch=="-")||(ch=="*")||(ch=="/")||(ch=="%")||(ch=="^")){
        alert("Nothing after the operator");
        return;
    }

    if(expflag == 1){
        exp.textContent=res.textContent;
        num1=String(oper(parseFloat(num1),parseFloat(num2),op));
        if((num1.length>10)||(num1.includes("Infinity"))){
            alert("Calculator Reset. Result too large : "+num1);
            clrscr();
            return;
        }
        res.textContent=num1;
        num2="";
    }
    
    if(num1.includes(".")){
        dotflag = 1;
    }
    else{
        dotflag = 0;
    }
    opflag = 0;
    expflag = 0;
    numflag = 0;
})

clear.addEventListener("click",clrscr)

back.addEventListener("click",()=>{
    if(res.textContent=="--"){
        return;
    }

    var ch = res.textContent.slice(-1);

    if((ch=="+")||(ch=="-")||(ch=="*")||(ch=="/")||(ch=="%")||(ch=="^")){
        res.textContent=res.textContent.substring(0,res.textContent.length-1);
        opflag = 0;
        numflag = 0;

        if(num1.includes(".")){
            dotflag = 1;
        }
        else{
            dotflag = 0;
        }
        
        expflag = 0;

        op = "";
    }

    else{
        if(numflag==0){
            res.textContent=res.textContent.substring(0,res.textContent.length-1);
            num1=num1.substring(0,num1.length-1);

            if(num1==""){
                clrscr();
                return;
            }

            if(num1.includes(".")){
                dotflag = 1;
            }
            else{
                dotflag = 0;
            }
        }
        else{
            res.textContent=res.textContent.substring(0,res.textContent.length-1);
            num2=num2.substring(0,num2.length-1);

            if(num2.includes(".")){
                dotflag = 1;
            }
            else{
                dotflag = 0;
            }
        }
    }
})