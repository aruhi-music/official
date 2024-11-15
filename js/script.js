window.addEventListener('scroll', function() {
    const header = document.querySelector('.page-header'); // 対象の要素のIDを指定
    const profile = document.getElementById('profile-section');
    const footerNav = document.getElementById('footer-nav');
    const snsNav = document.querySelector('.sns-nav'); // 対象の要素のIDを指定
  
    if (window.pageYOffset === 0) {
      header.classList.add('no-scroll'); // クラスを追加
    } else {
      header.classList.remove('no-scroll'); // クラスを削除
    }
    if (window.scrollY >= profile.offsetTop) {
      header.classList.add('mixBlendMode-off');
    } else {
      header.classList.remove('mixBlendMode-off');
    }
    if (window.scrollY + window.innerHeight >= footerNav.offsetTop) {
      snsNav.classList.add('visible');
      // console.log(window.scrollY);
      // console.log(window.innerHeight);
      console.log(footerNav.offsetTop);
    } else {
      snsNav.classList.remove('visible');
    }
});
// モーダルの閉じるボタン位置調整
function setCloseButtonLeft(closeButtonStyle) {
  if (window.innerWidth <= 640) {
    closeButtonStyle.top = '0px';
    const image = document.querySelector('.flyer-image-proc')
  
    const screenHeight = window.innerHeight;
    const imageHeight = image.offsetHeight;
    const topPosition = (screenHeight - imageHeight) / 2 - 30;
  
    closeButtonStyle.top = topPosition + 'px';
  } else {
    closeButtonStyle.left = '0px';
    const image = document.querySelector('.flyer-image-proc')
  
    const screenWidth = window.innerWidth;
    const imageWidth = image.offsetWidth;
    const leftPosition = (screenWidth - imageWidth) / 2 + imageWidth;
  
    closeButtonStyle.left = leftPosition + 'px';
  }
}
// MORE VIEWボタン押下時の制御
function clickMoreButton(more,content,moreArea,transform) {
  const moreProc = document.getElementById(more);
  const moreAreaProc = document.getElementById(moreArea);
  contentQuery = '.' + content;
  const contentProc = document.querySelector(contentQuery);
  const height = contentProc.scrollHeight + 'px';
  const targetContent = document.getElementById(content);
  const transformProc = transform
  moreProc.addEventListener('click', () => {
    if (contentProc.style.maxHeight === height) {
      if (window.innerWidth <= 640) {
        moreAreaProc.style.height = '80px'
        moreAreaProc.style.transform = 'translate(-50%, -180px)';
      } else {
        moreAreaProc.style.height = '100px'
        moreAreaProc.style.transform = 'translate(-50%, -200px)';
      }
      moreAreaProc.style.width = '100vw'
      contentProc.style.maxHeight = '750px'
      moreAreaProc.style.borderRadius = '0'
      moreAreaProc.style.backgroundColor = 'rgba(0, 51, 78, 0.75)'
      moreProc.innerText = 'MORE VIEW.'
      targetContent.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (window.innerWidth <= 640) {
        moreAreaProc.style.height = '40px'
        moreAreaProc.style.width = '90px'
      } else {
        moreAreaProc.style.height = '50px'
        moreAreaProc.style.width = '120px'
      }
      contentProc.style.maxHeight = height
      moreAreaProc.style.borderRadius = '20px'
      moreAreaProc.style.backgroundColor = 'rgba(0, 51, 78, 1)'
      moreAreaProc.style.transform = transformProc;
      moreProc.innerText = 'CLOSE.'
    }
  })
}
window.onload = function () {
  // const video = document.getElementById('movie-intro-video');
  // const movieArea = document.getElementById('movie-intro')

  // video.addEventListener('ended', () => {
  //   movieArea.style.opacity = '0';
  // });
  // コピーライト年設定
  const currentDateElement = document.getElementById('current-date');
  const today = new Date(); // 現在の年月日を取得
  const formattedYear = today.getFullYear(); // 年のみを取得
  currentDateElement.textContent = formattedYear;

  // splide処理
  new Splide(".splide", {
    type: "loop", // ループあり
    arrows: true, // 矢印非表示
    pagination: false, // ページネーション非表示
    autoplay: true,
    interval: number = 5000,
    breakpoints: { // 767px以下のスタイル
      639: {
        arrows: false,
        pagination: true,
      },
    },
  }).mount();

  const flyerImages = document.querySelectorAll('.flyer-image');
  const overlay = document.getElementById('overlay');

  flyerImages.forEach(image => {
    image.addEventListener('click', () => {
      overlay.style.display = 'block';
      imageOverlay = image.cloneNode()
      imageOverlay.classList.add('flyer-image-proc');
      overlay.appendChild(imageOverlay);

      const closeButton = document.createElement('span');
      closeButton.classList.add('close');
      overlay.appendChild(closeButton);

      setCloseButtonLeft(closeButton.style);

      closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        overlay.removeChild(closeButton);
        overlay.removeChild(overlay.querySelector('img'));
      });
    });
  });
  if (window.innerWidth <= 640) {
    clickMoreButton('news-more','news-content','news-more-area', 'translate(-50%, -120px')
    clickMoreButton('live-more','live-content','live-more-area', 'translate(-50%, -150px')
  } else {
    clickMoreButton('news-more','news-content','news-more-area', 'translate(-50%, -140px')
    clickMoreButton('live-more','live-content','live-more-area', 'translate(-50%, -170px')
  }
}