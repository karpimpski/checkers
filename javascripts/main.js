var board = document.querySelector('#board');
var numbers = ['one','two','three','four','five','six','seven','eight'];
var letters = ['a','b','c','d','e','f','g','h'];
var colors = ['red','black'];
addRows();
addColumns();
addPieces();
addListeners();

var activePiece = "";
var activePieceList = "";
var activeColor = "";

function addRows(){
	for(var i = 0; i < 8; i++){
		board.innerHTML += "<div class='row "+numbers[i]+"'></div>";
	}
}

function addColumns(){
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var color = "black";
			if(i%2 == 0 && j%2 == 0 || i%2 == 1 && j%2 == 1){
				color = 'red';
			}
			document.querySelector('.row.'+numbers[i]+'').innerHTML += '<div class="square '+letters[j]+' '+color+'"></div>';
		}
	}
}

function addPieces(){
	for(var i = 0; i < document.querySelectorAll('.square').length; i++){
		var square = document.querySelectorAll('.square')[i];
		var color = 'black';
		if(numbers.indexOf(square.parentElement.classList[1]) > 4){
			color = 'red';
		}
		if(square.parentElement.classList[1] != 'four' && square.parentElement.classList[1] != 'five' && square.classList[2] == 'black'){
			square.innerHTML = '<div class="'+color+' piece"></div>';
		}
	}
}

function addListeners(){
	for(var i = 0; i < document.querySelectorAll('.square').length; i++){
    (function () {
      var square = document.querySelectorAll('.square')[i];
			if(square.classList[2] == 'black'){
				square.addEventListener("click", function(){
					var squareList = square.parentElement.classList + " " + square.classList;
					var squareRow = squareList.split(" ")[1];
					var squareColumn = squareList.split(" ")[3];
					
					if(activePiece == ""){
				    setActivePiece(square);			    
				  }
				  else{
				  	activePieceRow = activePieceList.split(" ")[1];
				  	activePieceColumn = activePieceList.split(" ")[3];
				  	if(Math.abs(numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow)) == 1 && square.querySelector('div') == null){
				  		activePiece.innerHTML = "";
				  		square.innerHTML = "<div class='"+activeColor+" piece'></div>";
				  		resetActivePiece();
				  	}
				  }
				});
			}
    }());
	}
}

function setActivePiece(s){
	if(s.children.length > 0){
		activePiece = s;
		activePieceList = activePiece.parentElement.classList + " " + activePiece.classList;
		activeColor = s.querySelector('div').classList[0];
	}
}

function resetActivePiece(){
	activePiece = "";
	activePieceList = "";
	activeColor = "";
}