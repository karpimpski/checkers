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

var canMove = false;

function addListeners(){
	for(var i = 0; i < document.querySelectorAll('.square').length; i++){
    (function () {
      var square = document.querySelectorAll('.square')[i];
			if(square.classList[2] == 'black'){
				square.addEventListener("click", function(){
					var squareList = square.parentElement.classList + " " + square.classList;
					var squareRow = squareList.split(" ")[1];
					var squareColumn = squareList.split(" ")[3];
					
					if(this.children.length > 0 && findColor(this) == currentColor && (activePiece == '' || canMove == false)){
				    setActivePiece(square);			    
				  }
				  else{
				  	var activePieceRow = activePieceList.split(" ")[1];
				  	var activePieceColumn = activePieceList.split(" ")[3];
				  	if(isValidMove(square)){
				  		movePiece(activePiece, square, activePieceRow, activePieceColumn, squareRow, squareColumn);
				  	}
				  }
				});
			}
    }());
	}
}

function movePiece(old, n, activePieceRow, activePieceColumn, squareRow, squareColumn){
	n.innerHTML = old.innerHTML;
	old.innerHTML = "";
	if(Math.abs(numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow)) == 2 && 
		 Math.abs(letters.indexOf(activePieceColumn) - letters.indexOf(squareColumn)) == 2){
		var middleSquare = findMiddleSquare(activePieceRow, squareRow, activePieceColumn, squareColumn);
		middleSquare.innerHTML = "";
	}
	if(canMove == false){
		canMakeKing(n);
		resetActivePiece();
	}
	else{
		setActivePiece(n);
	}
}

function canMakeKing(s){
	if(findColor(s) == 'black' && findRow(s) == 'eight'){
		makeKing(s);
	}
	else if(findColor(s) == 'red' && findRow(s) == 'one'){
		makeKing(s);
	}
}

function isKing(s){
	if(s.children && s.children[0].innerHTML == 'K'){
		return true;
	}
}

function makeKing(s){
	s.children[0].innerHTML = "K";
}

function findColor(s){
	return s.children[0].classList[0];
}

function isValidMove(square, active = activePiece){
	var activePieceRow = findRow(active);
	var squareRow = findRow(square);
	var activePieceColumn = findColumn(active);
	var squareColumn = findColumn(square);
	var oppositeColor = '';
	activeColor == 'black' ? oppositeColor = 'red' : oppositeColor = 'black';
	var middleSquare = findMiddleSquare(activePieceRow, squareRow, activePieceColumn, squareColumn);
	if(activeColor == 'black'){
		var rowDifference = -1;
	}
	else{
		rowDifference = 1;
	}
	if((numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow) == rowDifference ||
	    isKing(activePiece) && Math.abs(numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow)) == 1) && 
		 Math.abs(letters.indexOf(activePieceColumn) - letters.indexOf(squareColumn)) == 1 && square.children.length == 0 &&
		 canMove == false){
		canMove = false;
		return true;
	}
	else if(square && middleSquare && middleSquare.children[0] && 
				  (numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow) == rowDifference * 2 ||
				  isKing(activePiece) && Math.abs(numbers.indexOf(activePieceRow) - numbers.indexOf(squareRow)) == 2) && 
				  Math.abs(letters.indexOf(activePieceColumn) - letters.indexOf(squareColumn)) == 2 && square.children.length == 0 &&
				  findColor(middleSquare) == oppositeColor){
		alert(middleSquare.classList);
		if(canJump(square)){
			canMove = true;
		}
		else{
			canMove = false;
		}
		return true;
	}

	return false;
}

function canJump(s){
	var squareRow = findRow(s);
	var squareColumn = findColumn(s);
	var downLeft = findSquare(numbers[numbers.indexOf(squareRow) + 2], letters[letters.indexOf(squareColumn) - 2]);
	var downRight = findSquare(numbers[numbers.indexOf(squareRow) + 2], letters[letters.indexOf(squareColumn) + 2]);
	var upLeft = findSquare(numbers[numbers.indexOf(squareRow) - 2], letters[letters.indexOf(squareColumn) - 2]);
	var upRight = findSquare(numbers[numbers.indexOf(squareRow) - 2], letters[letters.indexOf(squareColumn) + 2]);
	if((activeColor == 'black' || isKing(activePiece)) && isValidMove(downLeft, s)){
		alert("Double");
		return true;
	}
	else if((activeColor == 'black' || isKing(activePiece)) && isValidMove(downRight, s)){
		alert("Double");
		return true;
	}
	else if((activeColor == 'red' || isKing(activePiece)) && isValidMove(upLeft, s)){
		alert("Double");
		return true;
	}
	else if((activeColor == 'red' || isKing(activePiece)) && isValidMove(upRight, s)){
		alert("Double");
		return true;
	}
	return false;
}

function findRow(s){
	if(s){
		return s.parentElement.classList[1];
	}
}

function findColumn(s){
	if(s){
		return s.classList[1];
	}
}

function findSquare(row, column){
	return document.querySelector('.row.' + row + ' div.square.' + column);
}

function findMiddleSquare (activePieceRow, squareRow, activePieceColumn, squareColumn){
	var activeRowIndex = numbers.indexOf(activePieceRow);
	var squareRowIndex = numbers.indexOf(squareRow);
	var middleRow = numbers[Math.abs((activeRowIndex + squareRowIndex)/2)];
	
	var activeColumnIndex = letters.indexOf(activePieceColumn);
	var squareColumnIndex = letters.indexOf(squareColumn);
	var middleColumn = letters[Math.abs((activeColumnIndex + squareColumnIndex)/2)];

	return findSquare(middleRow, middleColumn);
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