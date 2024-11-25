window.addEventListener('scroll', function() {
    const header = document.querySelector('.page-header'); // 対象の要素のIDを指定
    const profile = document.getElementById('profile-section');

    const pageTop = document.querySelector('.page-top');
  
    if (window.pageYOffset === 0) {
      header.classList.add('no-scroll'); // クラスを追加
      pageTop.classList.remove('show'); // クラスを追加
    } else {
      header.classList.remove('no-scroll'); // クラスを削除
      pageTop.classList.add('show'); // クラスを削除
    }
    if (window.scrollY >= profile.offsetTop) {
      header.classList.add('mixBlendMode-off');
    } else {
      header.classList.remove('mixBlendMode-off');
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
// コピーライト年設定
function setCopyRight() {
  const currentDateElement = document.getElementById('current-date');
  const today = new Date(); // 現在の年月日を取得
  const formattedYear = today.getFullYear(); // 年のみを取得
  currentDateElement.textContent = formattedYear;
}

// splide処理
function setSplide() {
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
}

// MoreButton設定処理
function setMoreButton() {
  if (window.innerWidth <= 640) {
    clickMoreButton('news-more','news-content','news-more-area', 'translate(-50%, -120px')
    clickMoreButton('live-more','live-content','live-more-area', 'translate(-50%, -150px')
  } else {
    clickMoreButton('news-more','news-content','news-more-area', 'translate(-50%, -140px')
    clickMoreButton('live-more','live-content','live-more-area', 'translate(-50%, -170px')
  }
}

function setScrollEventProc(target, trigger, className) {
  const targetProc = document.querySelector(target); // 対象の要素のIDを指定
  const triggerProc = document.getElementById(trigger);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targetProc.classList.add(className);
      } else {
        targetProc.classList.remove(className)
      }
    })
  })

  observer.observe(triggerProc)
}

function setScrollEvent() {
  setScrollEventProc('.sns-nav', 'footer-nav', 'visible')
}

function setPageTopButton() {
  const pageTop = document.querySelector('.page-top');
  pageTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // スムーズにトップへスクロール
  });
}

function fadeInSection() {
  const options = {
    root: null,
    rootMargin: '-200px 0px 0px 0px', // ビューポートの上端から200px上の位置で監視開始
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, options);
  
  // 監視対象の要素を取得 (例: 全てのsection要素)
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

window.onload = function () {
  // const video = document.getElementById('movie-intro-video');
  // const movieArea = document.getElementById('movie-intro')

  // video.addEventListener('ended', () => {
  //   movieArea.style.opacity = '0';
  // });


  const flyerImages = document.querySelectorAll('.flyer-image');
  const overlay = document.getElementById('overlay');

  const closeBtn = document.querySelector('.close');

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.removeChild(closeButton);
    overlay.removeChild(overlay.querySelector('img'));
  });

  flyerImages.forEach(image => {
    image.addEventListener('click', () => {
      overlay.style.display = 'block';
      imageOverlay = image.cloneNode()
      imageOverlay.classList.add('flyer-image-proc');
      overlay.appendChild(imageOverlay);
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  setCopyRight();
  setSplide();
  setMoreButton();
  setScrollEvent();
  setPageTopButton();
  fadeInSection();
})