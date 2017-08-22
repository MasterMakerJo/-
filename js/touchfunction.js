$('.page-box').on('touchstart touchmove',function(e){
	switch (e.type){
		case 'touchstart':
		     startY = e.originalEvent.touches[0].clientY;
			break;
		case 'touchmove':
		    var endY = e.originalEvent.touches[0].clientY;
		    if(this.animating == true)return;
		    if(endY-startY<0){
		    	this.animating =true;
		    	nextPage(this);
		    }
		    break;
		default:
			break;
	}
})
function nextPage(pageBox){
	var pages = pageBox.querySelectorAll('.page');
	var pageCount = pages.length;
	var currentIndex = $(pageBox).children(":not(.hidden)").index();
	if(currentIndex==pageCount-1)return;
	$(pages[currentIndex]).addClass('fadeout').next().removeClass('hidden').addClass('fadein');
	$(pages[currentIndex]).on('webkitAnimationEnd',function(){
		$(this).removeClass('fadeout').addClass('hidden').next().removeClass('fadein');
		$(this).off('webkitAnimationEnd');
		pageBox.animating = false;
	})
}
function nextBox(className,callBack){
	var $currentBox = $('.page-box:not(.hidden)');
	var $nextBox = $('.page-box.'+className);
	$currentBox.addClass('fadeout');
	$currentBox.on('webkitAnimationEnd',function(){
		$currentBox.addClass('hidden').removeClass('fadeout');
		$nextBox.removeClass('hidden').addClass('fadein');
		$nextBox.on('webkitAnimationEnd',function(){
			$(this).removeClass('fadein');
			$(this).off('webkitAnimationEnd');
			callBack && callBack();
		})
		$currentBox.off('webkitAnimationEnd');
	})
}
