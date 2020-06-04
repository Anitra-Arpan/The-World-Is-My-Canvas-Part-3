var database;

var drawing = [] ;

var currentPath = [] ;

var isDrawing = false ;

function setup () {
     var canvas = createCanvas(500,500) ;
     canvas.mousePressed(startPath);
     canvas.parent('canvascontainer');
     canvas.mouseReleased(endPath); 

    var saveButton = select ('#saveButton');
    saveButton . mousePressed(saveDrawing);  

    var clearButton = select ('#clearButton');
    clearButton . mousePressed(clearDrawing);  
    
     // Your web app's Firebase configuration
     var firebaseConfig = {
        apiKey: "AIzaSyC0Db79Pc0QHq06UdJOr072kHAhx6en_BU",
        authDomain: "the-world-is-my-canvas-bdbbf.firebaseapp.com",
        databaseURL: "https://the-world-is-my-canvas-bdbbf.firebaseio.com",
        projectId: "the-world-is-my-canvas-bdbbf",
        storageBucket: "the-world-is-my-canvas-bdbbf.appspot.com",
        messagingSenderId: "976646827136",
        appId: "1:976646827136:web:99868e4fbbdbb48bf8ca65"
      };

      firebase.initializeApp(firebaseConfig);
    database = firebase.database();

}


function startPath (){
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}


function endPath(){
    isDrawing = false ; 
}


function draw () {
    background("pink"); 

    if (isDrawing) { 
        var point = {
            x: mouseX , 
            y: mouseY 
        } 

        currentPath.push(point);
    }

    

    stroke ( 0 );
    strokeWeight(5);
    noFill();
    
    for(var i = 0 ; i < drawing.length ; i++){
        var path = drawing [i];
        beginShape();
        for(var j = 0 ; j < path.length ; j++){
             vertex( path[j].x , path[j].y);
        }
        endShape();
    }
   
}


function saveDrawing () {
    var ref = database.ref('drawings');
    
    var data = {
        name : "Iris" ,
        drawings : drawing
    }

    var result = ref.push ( data , dataSent) ;
    console . log ( result . key ) ;

    function dataSent ( err , status ) {
        console . log (status);
    }

}


function clearDrawing () {
    drawing = [] ;
}