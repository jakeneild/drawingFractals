createCanvas(2500, .7, .6, 100);

var delayInMilliseconds = 5000; //1 second

var arg1 = 2500;
var arg2 = .7;
var arg3 = .6;
var arg4 = 100;
var counter = 0;

for(i = 0; i < 2; i++){  //can't get this working smoothly.  Maybe my computer just isn't powerful enough?
    arg1 = arg1 + 100;
    //arg2 = arg2 - .5;
    //arg3 = arg3 + .5;
    setTimeout(function() {
        document.body.innerHTML = "";
        createCanvas(arg1, arg2, arg3, arg4);
      }, delayInMilliseconds);
}




function createCanvas(a, b, c, d){
    console.log("canvas" + counter);
    var maxIterations = d; //100
    var magnificationFactor = a; //2900
    var panX = b; //.7
    var panY = c; //.6

    var myCanvas = document.createElement("canvas");
    myCanvas.width=600;
    myCanvas.height=600;
    document.body.appendChild(myCanvas);
    var ctx = myCanvas.getContext("2d");


    function checkIfBelongsToMandelbrotSet(x,y) {
        var realComponentOfResult = x;
        var imaginaryComponentOfResult = y;
        for(var i = 0; i < maxIterations; i++) {
            var tempRealComponent = realComponentOfResult * realComponentOfResult
                                    - imaginaryComponentOfResult * imaginaryComponentOfResult
                                    + x;
            var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                                    + y;
            realComponentOfResult = tempRealComponent;
            imaginaryComponentOfResult = tempImaginaryComponent;

            // Return a number as a percentage
            if(realComponentOfResult * imaginaryComponentOfResult > 5) 
                return (i/maxIterations * 100);
        }
        return 0;   // Return zero if in set        
    }  

    for(var x=0; x < myCanvas.width; x++) {
    for(var y=0; y < myCanvas.height; y++) {
        var belongsToSet = 
                checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, 
                                            y/magnificationFactor - panY);
        if(belongsToSet == 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(x,y, 1,1); // Draw a black pixel
        } else {
            ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
            ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
        }               
    } 
    }
    counter++;
}


