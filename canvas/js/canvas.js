var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


	ctx.strokeStyle="#FFFFFF";

	var nodes = [];
	var edges = [];

/*window.onresize = function(){

}*/


		for(var i = 1; i <= 100; i++) {
			var node = {
				x : Math.random()*c.width,
				y : Math.random()*c.height,
				vx : Math.random()*1-0.5,
				vy : Math.random()*1-0.5
			}
			nodes.push(node);
		}

		nodes.forEach(function(a){
			nodes.forEach(function(b){
				if (a==b) {
					return;
				} else {
					var edge = {
						from : a,
						to : b
					}
					addEdges(edge);
				}
			})
		});

		function addEdges(edge){
			var flag = false;
			edges.forEach(function(e){
				if (e.from==edge.from&&e.to==edge.to) {
					flag = true;
				} else if(e.from==edge.to&&e.to==edge.from){
					flag = true;
				}
			})
			if (!flag) {
				edges.push(edge);
			}
		}


		function render(){

			ctx.globalAlpha = 1;
			nodes.forEach(function(e){
				ctx.beginPath();
				ctx.arc(e.x,e.y,1,0,2*Math.PI);

				ctx.fill();
				ctx.stroke();
			})

			edges.forEach(function(e){

				var l = Math.sqrt(Math.pow((e.from.x-e.to.x),2)+Math.pow((e.from.y-e.to.y),2));

				var threshold = c.clientWidth/10;
				if (l>threshold) {
					return;
				} else {
					ctx.lineWidth = (1.0 - l/threshold)* 2.5;
　　				ctx.globalAlpha = 1.0 - l/threshold;
					ctx.beginPath();
					ctx.moveTo(e.from.x,e.from.y);
					ctx.lineTo(e.to.x,e.to.y);
					ctx.stroke();
				}
			});


		}

		function step() {
			nodes.forEach(function(e){
				e.x = e.x + e.vx;
				e.y = e.y + e.vy;


				function clamp(min,max,value){
					if (value>max) {
						return max;
					} else if (value<min) {
						return min;
					} else {
						return value;
					}
				}
				if (e.x<=0||e.x>=c.clientWidth) {
					e.vx = e.vx*(-1);
					e.x = clamp(0,c.clientWidth,e.x);
				}
				if (e.y<=0||e.y>=c.clientHeight) {
					e.vy = e.vy*(-1);
					e.y = clamp(0,c.clientHeight,e.y)
				}
			})
			ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
			render();
			window.requestAnimationFrame(step);
		}

step();
