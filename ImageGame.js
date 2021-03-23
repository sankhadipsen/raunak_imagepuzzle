var game = new Object();
game.tiles = Array.from(document.getElementsByClassName('tile')); //is our board
game.folders = ["pug","dog","begema","earth"]; //while randoming pictures
game.gameStarted = false;
game.img = {1:"1.jpg", //for setting the board up
		  	2:"2.jpg",
		    3:"3.jpg",
	        4:"4.jpg",
            5:"5.jpg",
            6:"6.jpg",
       	    7:"7.jpg",
       	    8:"8.jpg",
       	    9:""};
game.blanktile = document.getElementById('blank'); //the blank tile
game.winCondition = Array.from(document.getElementsByClassName('tile')); //current game condition will be checked against this
game.helpenabled = false;
game.frame = document.getElementById('frame');
game.wrapper = document.getElementById('wrapper');
game.slectImg = document.getElementsByClassName('imgsel');
game.options = document.getElementById('changeimage');

function setPuzzleImage(foldername){ //adding images to every tile in the game

if(foldername == undefined) {

	var slectFolder  = Math.floor((Math.random() * 4));
	var folder = game.folders[slectFolder];
	game.frame.style.backgroundImage = "url('"+"Resources/Images/"+folder+"/"+"frame.jpg"+"')"
	
	for(var i =0; i<game.tiles.length;i++) {
			var	tileImg = i+1;
			game.tiles[i].style.backgroundImage = "url('"+"Resources/Images/"+folder+"/"+game.img[tileImg]+"')"
	}

	}

else {

	game.frame.style.backgroundImage = "url('"+"Resources/Images/"+foldername+"/"+"frame.jpg"+"')"
	for(var i=0;i<game.tiles.length;i++) {
		var tileImg = i+1;
		game.tiles[i].style.backgroundImage = "url('"+"Resources/Images/"+foldername+"/"+game.img[tileImg]+"')"
											
	}

	}	

	}




function addClickEvent(){ //adding click event to each tile

	for(var i=0;i<game.tiles.length-1;i++){

		game.tiles[i].addEventListener('click',function(){

			shiftPuzzle(this);
			win();

	});



    }

    //reset button
    //shuffle button

    for(var i=0;i<game.slectImg.length;i++){

    	game.slectImg[i].addEventListener('click',function () {

    			game.tiles = Array.from(document.getElementsByClassName('tile'));
    			setPuzzleImage(this.name);
    			setTiles(game);
    			game.wrapper.style.display="none";

    	});

    }

    game.options.addEventListener('click',function () {
    	// body...

    	game.wrapper.style.display = "inline-block";


    });

	}


	function shuffle(array){ //shuffle is part of set tiles

		var a = Math.floor(((Math.random()*150)+150));
		//console.log(a);
		var bot_right = [-3,-1];
		var bot_left = [-3,1];
		var top_right = [3,-1];
		var top_left = [3,1];
		var middle_right = [-1,-3,3];
		var middle_left = [1,3,-3];
		var middle_top = [1,-1,3];
		var middle_bot = [1,-1,-3];
		var middle = [1,3,-3,-1];
		var moves;
		for(var i = 0;i<a;i++) {
				
			var position = Array.prototype.indexOf.call(array,game.blanktile);

			if(position == 0){
				
				moves = top_left;  	

			}

			if (position == 1) {

				moves = middle_top;	

			}

			if(position == 2){

				moves = top_right;

			}

			if(position == 3){


				moves = middle_left;

			}

			if(position == 4){
				moves = middle;
			}

			if(position == 5){
				moves = middle_right;
			}
			if (position == 6) {
				moves = bot_left;
			}
			if (position == 7) {
				moves = middle_bot
			}
			if (position == 8) {
				moves = bot_right;
			}

			move = moves[Math.floor(Math.random()*moves.length)];
			//console.log(moves)
			//console.log(move);
			console.log(position);
			array[position] = array[position+move];
			array[position+move] = game.blanktile;

		}

		return array



	}
	
function setTiles(gameobj){


	var a = gameobj.tiles

	a = shuffle(a);

	var set = [[a[0],a[1],a[2]],[a[3],a[4],a[5]],[a[6],a[7],a[8]]];


	for(var i =0; i<3;i++){


		position = (Array.prototype.indexOf.call(set[0],set[0][i]))*113
		set[0][i].style.top = "0px";
		set[0][i].style.left = position.toString()+"px";

}

	for(var i =0; i<3;i++){


		position = (Array.prototype.indexOf.call(set[1],set[1][i]))*113
		set[1][i].style.top = "113px";
		set[1][i].style.left = position.toString()+"px";

}

	for(var i =0; i<3;i++){


		position = (Array.prototype.indexOf.call(set[2],set[2][i]))*113
		set[2][i].style.top = "226px";
		set[2][i].style.left = position.toString()+"px";

}


	}




function shiftPuzzle(tile){

		if (isRight(tile)){

			moveRight(tile);

		}

		else if (isLeft(tile)) {

			moveLeft(tile);

		}

		else if (isTop(tile)){


			moveTop(tile);

		}

		else if (isDown(tile)){

			moveDown(tile)

		}

}

function isRight(tile){

	var position = Array.prototype.indexOf.call(game.tiles,tile);
	console.log(position);
	blank_position = position + 1;
	if(Object.is(game.tiles[blank_position],game.blanktile) && position!=5 && position!=2 && position!=8){

		return true;

	}

}

function moveRight(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
var current_posX = tile.style.left;
var res = current_posX.split('px')[0];
current = eval(res);
tile.style.left = (current+113).toString()+"px";


var blank_position = Array.prototype.indexOf.call(game.tiles,game.blanktile);
var current_blank_posX = game.blanktile.style.left;
var res_blank = current_blank_posX.split('px')[0];
var current_blank = eval(res_blank);
game.blanktile.style.left = (current_blank-113).toString()+"px"; 

//game.tiles = Array.from(game.tiles);
game.tiles[blank_position] = game.tiles[position]
game.tiles[position] = game.blanktile; 

}

function isLeft(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
	blank_position = position - 1;
	if(Object.is(game.tiles[blank_position],game.blanktile) &&  position!=0 && position!=3 && position!=6){

		return true;

	}
}

function moveLeft(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
var current_posX = tile.style.left;
var res = current_posX.split('px')[0];
current = eval(res);
tile.style.left = (current-113).toString()+"px";


var blank_position = Array.prototype.indexOf.call(game.tiles,game.blanktile);
var current_blank_posX = game.blanktile.style.left;
var res_blank = current_blank_posX.split('px')[0];
var current_blank = eval(res_blank);
game.blanktile.style.left = (current_blank+113).toString()+"px"; 

//game.tiles = Array.from(game.tiles);
game.tiles[blank_position] = game.tiles[position]
game.tiles[position] = game.blanktile;


}

function isTop(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
blank_position = position-3;
if (Object.is(game.tiles[blank_position],game.blanktile)) {

return true;

}




}

function moveTop(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
var current_posY = tile.style.top;
var res = current_posY.split('px')[0];
current = eval(res);
tile.style.top = (current-113).toString()+"px";

var blank_position = Array.prototype.indexOf.call(game.tiles,game.blanktile);
var current_blank_posY = game.blanktile.style.top;
var res_blank = current_blank_posY.split('px')[0];
var current_blank = eval(res_blank);
game.blanktile.style.top = (current_blank + 113).toString()+"px";

game.tiles[blank_position] = game.tiles[position]
game.tiles[position] = game.blanktile;


}

function isDown(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
blank_position = position+3;
if (Object.is(game.tiles[blank_position],game.blanktile)) {

return true;

}}

function moveDown(tile){

var position = Array.prototype.indexOf.call(game.tiles,tile);
var current_posY = tile.style.top;
var res = current_posY.split('px')[0];
current = eval(res);
tile.style.top = (current+113).toString()+"px";

var blank_position = Array.prototype.indexOf.call(game.tiles,game.blanktile);
var current_blank_posY = game.blanktile.style.top;
var res_blank = current_blank_posY.split('px')[0];
var current_blank = eval(res_blank);
game.blanktile.style.top = (current_blank - 113).toString()+"px";

game.tiles[blank_position] = game.tiles[position]
game.tiles[position] = game.blanktile;

}

function isEqual(currentboard,winboard){

for(var i = 0; i<currentboard.length;i++){

if(currentboard[i]!=winboard[i]){

return false

}

}

return true;
}



function win() {
	// body...

	if(isEqual(game.tiles,game.winCondition)){

		setTimeout(function(){ alert("You win!"); }, 500);

	}


}


(function (global) {
	// body...

	setPuzzleImage();
	addClickEvent();
	setTiles(global);
	




}(game));

function shownumbers(){

var help = document.getElementsByClassName('number');
if(game.helpenabled){
	game.helpenabled =false;
	for(var i=0;i<help.length;i++){
		help[i].style.display = "none";
	

}
}
else{
	game.helpenabled = true
	for(var i=0;i<help.length;i++){
		help[i].style.display = "inline-block";

}
	}

}