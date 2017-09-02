

// banner轮播图
function bannerCarousel(){
//    var timer = null;
//	var pic = $("#banner .banner-pic").find("li");
	//    console.log(pic[0]);
//    
//    $("#banner .indicator span").each(function(i){
//        $(this).click(function(){
//            console.log(this);
//            
//        });
//    });
	
	var oul = document.getElementsByClassName("pics")[0];
	if (!oul) {return;}
	var ali = oul.getElementsByTagName("li");
	if (!ali) {return;}

	oul.innerHTML += oul.innerHTML;
	oul.style.width = ali.length * ali[0].offsetWidth + "px";

	var iNow = 0;

	function auto () {

		if (iNow == ali.length / 2) {

			iNow = 0;
			oul.style.left = 0;

		}

		move(oul, -iNow * ali[0].offsetWidth, -(iNow + 1) * ali[0].offsetWidth);

		iNow++;
	};

	setInterval(auto, 3000);

	function move(obj, old, now){

		clearInterval(obj.timer);

		obj.timer = setInterval(function(){

			var iSpeed = (now - old)/10;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (now == old) {
				clearInterval(obj.timer);
			} else {
				old += iSpeed;
				obj.style.left = old + 'px';
			}

		}, 30);

	};
};

var mv = {};
mv.tools = {};

mv.tools.getStyle = function(obj, attr){

	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}	
};

mv.tools.getByClass = function(oParent, sClass){
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];

	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className == sClass) {
			arr.push(aEle[i]);
		}

	}

	return arr;

};

// 透明度淡入函数
mv.fadeIn = function(obj){

	var iCur = mv.tools.getStyle(obj, 'opacity');
	if (iCur == 1) { 
		return false;
	 }
	 
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iSpeed = 5;
		if (value == 100) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value / 100;
			obj.style.filter = 'alpha(opacity=' + value + ')';
		}
	}, 30);
};
// 透明度淡出函数
mv.fadeOut = function(obj){

	var iCur = mv.tools.getStyle(obj, 'opacity');
	if (iCur == 0) { 
		return false;
	 }

	var value = 100;
	clearInterval(obj.timer);//清除定时器，防止多次点击加速的效果
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if (value == 0) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value / 100;
			obj.style.filter = 'alpha(opacity=' + value + ')';
		}
	}, 30);
};


mv.toBanner = function(){

	var oDd = document.getElementById('banner');
	if (!oDd) {return;}
	var aUl = oDd.getElementsByTagName('ul')[0];
	if (!aUl) {return;}
	var aLi = aUl.getElementsByTagName('li');
	if (!aLi) {return;}


	var iNow = 0;

	var timer = setInterval(auto, 3000);
    
	function auto() {

		if (iNow == aLi.length - 1) {
			iNow = 0;
		} else {
			iNow++;
		}

		for (var i = 0; i < aLi.length; i++) {
			mv.fadeOut(aLi[i]);
		}

		mv.fadeIn(aLi[iNow]);

	}

};

mv.toSel = function(){

	var oSel = document.getElementById('sel1');
	if (!oSel) {return;}
	var aDd = oSel.getElementsByTagName('dd');
	if (!aDd) {return;}
	var aUl = oSel.getElementsByTagName('ul');
	if (!aUl) {return;}
	var aH2 = oSel.getElementsByTagName('h2');
	if (!aH2) {return;}

	for (var i = 0; i < aDd.length; i++) {
		aDd[i].index = i;
		aDd[i].onclick = function(ev){

			var ev = ev || window.event;
			var This = this;

			for (var i = 0; i < aUl.length; i++) {
				aUl[i].style.display = 'none';
			}

			aUl[this.index].style.display = 'block';

			document.onclick = function(){
				aUl[This.index].style.display = 'none';
			};

			ev.cancelBubble = true;

		};
	}

	for (var i = 0; i < aUl.length; i++) {
		aUl[i].index = i;
		(function(ul){

			var aLi = ul.getElementsByTagName('li');

			for (var i = 0; i < aLi.length; i++) {
				aLi[i].onmouseover = function(){
					this.className = 'active';
				};

				aLi[i].onmouseout = function(){
					this.className = '';
				};

				aLi[i].onclick = function(){

					var ev = ev || window.event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;

					this.parentNode.style.display = 'none';

					ev.cancelBubble = true;
				};

			}

		})(aUl[i])
	}
};


