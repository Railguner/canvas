var now = 1;
document.getElementById('item-1').style.top = 0;
for (var i = 1; i <= 7; i++) {
(
	function(i){
		document.getElementById('hover-' + i).addEventListener('click',function(){
			if (i==now) {
			} else {
				document.getElementById('item-' + i).setAttribute('class','slider slidein');
				document.getElementById('item-' + now).setAttribute('class','slider slideout');
				now = i;
			}
	})
})(i);
}
