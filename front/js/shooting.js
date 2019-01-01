"use strict"
var canvas, ctx;
var FPS=30;
var MSPF=1000/FPS;
var img_player;
var img_enemy;
var player_x,player_y;
var ENEMIES=10;
var enemies_x = new Array(ENEMIES);
var enemies_y=new Array(ENEMIES);
var KEYS=new Array(256);
var enemies_hp=new Array(ENEMIES);
var player_hp;
for(var i=0;i<KEYS.length;i++){
    KEYS[i]=false;
}

var movePlayer=function(){ //プレイヤーを動かす

    if(player_hp<=0){
	return;
    }
    
    var SPEED=2;
    var RIGHT=39;
    var LEFT=37;
    
    if(KEYS[RIGHT]){
	player_x+=SPEED;
    }
    if(KEYS[LEFT]){
	player_x-=SPEED;
    }
    if(player_x<0){
	player_x=0;
    }else if((player_x+img_player.width)>canvas.width){
	player_x=canvas.width-player.width;
    }
};

var moveEnemies=function(){//敵を動かす
    var SPEED=2;
    for(var i=0;i<ENEMIES;i++){
	if(enemies_hp[i]<=0){
	    continue;
	}

	// 敵キャラのy座標を少し増やす
        enemies_y[i] += SPEED;

        // 敵キャラが下画面にはみ出た場合は上に戻す
        if (enemies_y[i] > canvas.height) {
            enemies_y[i] = -img_enemy.height;
            // せっかくなので x座標を再度ランダムに設定
            enemies_x[i] = Math.random() * (canvas.width - img_enemy.width);
        }
    }
};
var redraw=function(){//画面にオブジェクトを表示
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(player_hp>0){
	ctx.drawImage(img_player,player_x,player_y);
    }
    for(var i=0;i<ENEMIES;i++){
	if(enemies_hp[i]>0){
	    ctx.drawImage(img_enemy,enemies_x[i],enemies_y[i]);
	}
    }
};
var hitCheck=function(x1,y1,obj1,x2,y2,obj2){//当たり判定
    var cx1, cy1, cx2, cy2, r1, r2, d;
    // 中心座標の取得
    cx1 = x1 + obj1.width/4;
    cy1 = y1 + obj1.height/4;
    cx2 = x2 + obj2.width/4;
    cy2 = y2 + obj2.height/4;
    // 半径の計算
    r1 = (obj1.width+obj1.height)/8;
    r2 = (obj2.width+obj2.height)/8;
    // 中心座標同士の距離の測定
    // Math.sqrt(d) -- dのルートを返す
    // Math.pow(x, a) -- xのa乗を返す
    d = Math.sqrt(Math.pow(cx1-cx2, 2) + Math.pow(cy1-cy2, 2));
    // 当たっているか判定
    // ちなみに `return r1+r2 > d;` とだけ書いてもOK
    if(r1 + r2 > d) {
        // 当たってる
        return true;
    } else {
        // 当たっていない
        return false;
    }
};

var mainloop=function(){//メインループ文
    var startTime=new Date();
    movePlayer();
    moveEnemies();

    if(player_hp>0){
	for(var i=0;i<ENEMIES;i++){
	    if(enemies_hp[i]>0){
		if(hitCheck(player_x,player_y,img_player,
			    enemies_x[i],enemies_y[i],img_enemy)){
		    player_hp-=1;
		    enemies_hp[i]-=1;
		}
	    }
	}
    }
    
    

    redraw();
    var deltaTime=(new Date())-startTime;
    var interval=MSPF-deltaTime;
    if(interval>0){
	setTimeout(mainloop,interval);
    }else{
	mainloop();
    }
};

window.onkeydown=function(e){
    KEYS[e.keyCode]=true;
};
window.onkeyup=function(e){
    KEYS[e.keyCode]=false;
};

window.onload = function(){

    canvas=document.getElementById('screen');
    ctx=canvas.getContext('2d');
    img_player=document.getElementById('player');

    img_enemy=document.getElementById('enemy');

    player_x=(canvas.width - player.width)/2;
    player_y=(canvas.height - player.height)-20;
    player_hp=10;
    ctx.drawImage(img_player,player_x,player_y);
    for(var i=0;i<ENEMIES;i++){
	enemies_x[i]=Math.random()*(canvas.width-enemy.width);
	enemies_y[i]=Math.random()*(canvas.height-enemy.height);
	enemies_hp[i]=2;
    }

    mainloop();
};
