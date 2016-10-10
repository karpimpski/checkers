var board = document.querySelector('#board');
var numbers = ['one','two','three','four','five','six','seven','eight'];
var letters = ['a','b','c','d','e','f','g','h'];
var colors = ['red','black'];
var activePiece = "";
var activePieceList = "";
var activeColor = "";
setUp();
addListeners();
var currentColor = 'black';

function addListeners(){
	for(var i = 0; i < document.querySelectorAll('.square').length; i++){
    (function () {
      var square = document.querySelectorAll('.square')[i];
			if(square.classList[2] == 'black'){
				square.addEventListener("click", function(){
					var squareList = square.parentElement.classList + " " + square.classList;
					var squareRow = squareList.split(" ")[1];
					var squareColumn = squareList.split(" ")[3];
					
					if(this.children.length > 0 && this.children[0].classList[0] == currentColor){
				    setActivePiece(square);			    
				  }
				  else{
				  	activePieceRow = activePieceList.split(" ")[1];
				  	activePieceColumn = activePieceList.split(" ")[3];
				  	if(isValidMove(activePieceRow, squareRow, activePieceColumn, squareColumn, square)){
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

function isValidMove(activePieceRow, squareRow, activePieceColumn, squareColumn, square){
	var activeColor = activePiece.children[0].classList[0];
	if(activeColor == 'black'){
		var rowDifference = -1;
	}
	else{
		rowDifference = 1;
	}
	if(numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow) == rowDifference && 
		 Math.abs(letters.indexOf(activePieceColumn) - letters.indexOf(squareColumn)) == 1 && square.children.length == 0){
		return true;
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
	currentColor == 'black' ? currentColor = 'red' : currentColor = 'black';
}

function setUp(){ 
	addRows();
	addColumns();
	addPieces();
}

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