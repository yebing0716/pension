$(document).ready(function () { /* 페이지 숫자 세서 표시하기 */
    // 메인슬라이드
    $('.mainSlide>.scene').each(function (index) {
        if(index==0) {
            $('.mainSlide>.indi').append('<li class="current"></li>')
        }else{
            $('.mainSlide>.indi').append('<li></li>')
        }
    });
    // 카드슬라이드
    $('.cardSlide>.scene').each(function (index) {
        if(index==0) {
            $('.cardSlide>.indi').append('<li class="current"></li>')
        }else{
            $('.cardSlide>.indi').append('<li></li>')
        }
    });
    


    /* 슬라이드 돌리기 */
    // 메인슬라이드
    mainSlide();
    var mainidx = 0, ms, maincnt = $('.mainSlide>.scene').length - 1;
    function mainSlide () {
        ms = setInterval(() => {
            $('.mainSlide>.scene').eq(mainidx).animate({left: '-100%'}).animate({left: '100%'},0);
            $('.mainSlide>.indi>li').eq(mainidx).removeClass('current'); /* 슬라이드 위치표시 */
            mainidx==maincnt?mainidx=0:mainidx++;
            $('.mainSlide>.scene').eq(mainidx).animate({left: 0});
            $('.mainSlide>.indi>li').eq(mainidx).addClass('current'); /* 슬라이드 위치표시 */
        }, 5000);
    }
    // 카드슬라이드
    cardSlide();
    var cardidx = 0, cs, cardcnt = $('.cardSlide>.scene').length - 1;
    function cardSlide () {
        cs = setInterval(() => {
            $('.cardSlide>.scene').eq(cardidx).animate({left: '-100%'}).animate({left: '100%'},0);
            $('.cardSlide>.indi>li').eq(cardidx).removeClass('current');
            cardidx==cardcnt?cardidx=0:cardidx++;
            $('.cardSlide>.scene').eq(cardidx).animate({left: 0});
            $('.cardSlide>.indi>li').eq(cardidx).addClass('current');
        }, 4000);
    }



    /* 슬라이드 hover시 멈추기 & out시 돌리기 */
    // 메인슬라이드
    $('.mainSlide').hover(function(){
        clearInterval(ms);
    }, function(){
        mainSlide();
    });
    // 카드슬라이드
    $('.cardSlide').hover(function(){
        clearInterval(cs);
    }, function(){});



    /* 슬라이드 페이지 넘기기 */
    // 메인슬라이드
    $('.next', '.mainSlide').click(function(){
        $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: '-100%'}, 800).animate({left: '100%'},0);
        $('.mainSlide>.indi>li').eq(mainidx).removeClass('current'); /* 슬라이드 위치표시 */
        mainidx==maincnt?mainidx=0:mainidx++;
        $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: 0}, 800);
        $('.mainSlide>.indi>li').eq(mainidx).addClass('current'); /* 슬라이드 위치표시 */
    });
    $('.prev', '.mainSlide').click(function(){
        $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: '100%'}, 800);
        $('.mainSlide>.indi>li').eq(mainidx).removeClass('current'); /* 슬라이드 위치표시 */
        mainidx==0?mainidx=maincnt:mainidx--;
        $('.mainSlide>.scene').eq(mainidx).stop(false, true).animate({left: '-100%'},0).animate({left: 0}, 800);
        $('.mainSlide>.indi>li').eq(mainidx).addClass('current'); /* 슬라이드 위치표시 */
    });
    // 카드슬라이드
    $('.next', '.cardSlide').click(function(){
        $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: '-100%'}).animate({left: '100%'},0);
        $('.cardSlide>.indi>li').eq(cardidx).removeClass('current');
        cardidx==cardcnt?cardidx=0:cardidx++;
        $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: 0});
        $('.cardSlide>.indi>li').eq(cardidx).addClass('current');
    });
    $('.prev', '.cardSlide').click(function(){
        $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: '100%'});
        $('.cardSlide>.indi>li').eq(cardidx).removeClass('current');
        cardidx==0?cardidx=cardcnt:cardidx--;
        $('.cardSlide>.scene').eq(cardidx).stop(false, true).animate({left: '-100%'},0).animate({left: 0});
        $('.cardSlide>.indi>li').eq(cardidx).addClass('current');
    });

    /* 슬라이드 페이지 웹에서 클릭드레그로 넘기기 & 모바일에서 터치드레그로 넘기기 */
    // 메인슬라이드
    var flag = 1;
    var startX;
    $('.mainSlide').on('mousedown touchstart', function(e){
        if($(window).width()<768) {
            startX = e.originalEvent.touches[0].pageX;
        }else{
            startX = e.pageX;
        }        
    });
    $('.mainSlide').on('mouseup touchend', function(e){
        if($(window).width()<768) {
            var endX = e.originalEvent.changedTouches[0].pageX;
        }else{
            var endX = e.pageX;
        }
        var dist = endX - startX;
        if(dist>0&&Math.abs(dist)>=200&&flag==1){
            flag = 0;
            $('.prev', '.mainSlide').trigger('click');
            toggleFlag();
        }
        if(dist<0&&Math.abs(dist)>=200&&flag==1){
            flag = 0;
            $('.next', '.mainSlide').trigger('click');
            toggleFlag();
        }
    });

    function toggleFlag(){
        setTimeout(() => {
        flag = 1;
    }, 800);};

    $(document).on('mouseup', function(){
        $('.movingBox').off('mousemove');
    });
    // 카드슬라이드
    var flag = 1;
    var startX;
    $('.cardSlide').on('mousedown touchstart', function(e){
        if($(window).width()<768) {
            startX = e.originalEvent.touches[0].pageX;
        }else{
            startX = e.pageX;
        }        
    });
    $('.cardSlide').on('mouseup touchend', function(e){
        if($(window).width()<768) {
            var endX = e.originalEvent.changedTouches[0].pageX;
        }else{
            var endX = e.pageX;
        }
        var dist = endX - startX;
        if(dist>0&&Math.abs(dist)>=200&&flag==1){
            flag = 0;
            $('.prev', '.cardSlide').trigger('click');
            toggleFlag();
        }
        if(dist<0&&Math.abs(dist)>=200&&flag==1){
            flag = 0;
            $('.next', '.cardSlide').trigger('click');
            toggleFlag();
        }
    });

    function toggleFlag(){
        setTimeout(() => {
        flag = 1;
    }, 800);};

    $(document).on('mouseup', function(){
        $('.movingBox').off('mousemove');
    });



    //Item Slide 돌리기
    var itemW = $('.item', '.itemSlide').width()+10;
    var itemcnt = $('.item', '.itemSlide').length - 1;
    $('.item', '.itemSlide').each(function(index){
        $(this).css({left: index*itemW});
    });

    itmeSlide();
    var is;
    function itmeSlide() {
        is = setInterval(() => {
            $('.item', '.itemSlide').each(function(){
                $(this).animate({left: '-='+itemW});
                if(parseInt($(this).css('left')) == 0) { /* parseInt = 정수로 변환 / css(left)에는 px단위로 실수가 입력돼 있는데 자바는 정수만 취급하기 때문에 괄호로 싸서 정수화 시켜야 됨 */
                    $(this).animate({left: itemW*itemcnt}, 0);
                }
            });
        }, 3000);
    }



    //movingBox 클드레그로 박스 움직이기
    //$('.movingBox').on('mousedown', function(){ /* 클 */
        //$(this).on('mousemove', function(event){ /* 드레그 이동 */
            //$(this).css({left: event.pageX-50, top: event.pageY-50});
       // });
    //});


    //지정된 화면이 보일때 나타내기
    $(document).scroll(function(){
        var top = $(this).scrollTop();
        if(top>=500) {
            $('.goTop').fadeIn();
        }else{
            $('.goTop').fadeOut();
        }
    });

});