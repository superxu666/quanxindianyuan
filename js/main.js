jQuery(document).ready(function($) {
	tabshow();
	productshow();
	mv.toBanner();
	bannerCarousel();
});

// 产品中心
function productshow() {

	// var navli = $('#nav ul').find('layerpro');
	// var navwin = $('#nav .pro-win');
	// navli.mouseover(function() {
	// 	navwin.show();
	// });

	// navli.mouseout(function() {
	// 	navwin.hide();
	// });

	var navli = $('#nav ul').find('.layerpro');
	var navwin = $('#nav .pro-win');
	var timer = null;

	$('#nav ul .layerpro,#nav .pro-win')
		.on('mouseover', function() {
			clearTimeout(timer);
			navwin.css({
				"display": "block"
			});


		})
		.on('mouseout', function() {
			timer = setTimeout(function() {
				navwin.css({
					"display": "none"
				});
			}, 10)
		})

};


function tabshow() {

	var nav = document.getElementById("nav");
	var tab_t = nav.getElementsByClassName("win-l")[0];
	var tab_t_li = tab_t.getElementsByTagName("a");
	var tab_c_li = nav.getElementsByClassName("win-r");

	var len = tab_t_li.length;
	var i = 0;

	for (i = 0; i < len; i++) {

		tab_t_li[i].index = i;
		tab_t_li[i].onmouseover = function() {

			for (i = 0; i < len; i++) {
				tab_t_li[i].className = "";
				tab_c_li[i].className = "win-r hide cearfix";
			}
			tab_c_li[this.index].className = "win-r cearfix";
		};
	}
};