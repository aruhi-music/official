window.onload = function () {
    // Scrollアイコン表示
    let fadeInTarget = document.querySelectorAll('.fade-in');
    fadeInTarget[0].classList.add('scroll-in');
    // スクロールしたら非表示
    var text = document.getElementById('text');
    window.addEventListener('scroll', function(){
    text.classList.add('fadeout');
    setTimeout(function(){ 
        text.style.display = "none"; 
    }, 1000);
    }, false);
    // メニュークリック時にスクロール
    $(function(){
        $('a[href^=#]').click(function(){
            var speed = 500;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;
        });
    });
    //スクロール量を取得する関数
    function getScrolled() {
        return ( window.pageYOffset !== undefined ) ? window.pageYOffset: document.documentElement.scrollTop;
    }
            
    //トップに戻るボタンの要素を取得
    var topButton = document.getElementById( 'js-scroll-fadein' );
                
    //ボタンの表示・非表示
    window.onscroll = function() {
        ( getScrolled() > 500 ) ? topButton.classList.add( 'is-fadein' ): topButton.classList.remove( 'is-fadein' );
    };
                
    //トップに移動する関数
    function scrollToTop() {
        var scrolled = getScrolled();
        window.scrollTo( 0, Math.floor( scrolled / 2 ) );
        if ( scrolled > 0 ) {
        window.setTimeout( scrollToTop, 30 );
        }
    };
                
    //イベント登録
    topButton.onclick = function() {
        scrollToTop();
    };

    // ハンバーガーメニュー処理
    $(function () {
        $('.js-btn').on('click', function () {        // js-btnクラスをクリックすると、
          $('.menu , .btn-line').toggleClass('open'); // メニューとバーガーの線にopenクラスをつけ外しする
        })
      });

    // クリックで閉じる
    $('.menu a[href^="#"]').on('click', function () {
        $('.js-btn').click();
    });

    // スクロール表示アニメーション
    ScrollReveal().reveal('.scroll-fade',{
        duration: 1600, // アニメーションの完了にかかる時間
        origin: 'bottom', // どこから現れるか
        distance: '50px'
    });
};