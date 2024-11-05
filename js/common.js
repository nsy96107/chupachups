$(document).ready(function(){ // 실행틀 시작

  // 검색창 열기
  $(".dim").hide();
  $(".search").hide();

  $(".btn-search").click(function(){

    $(".dim").fadeIn();
    $(".search").slideDown();
  });

  // 검색창 닫기
  $(".search-close").click(function(){

    $(".dim").fadeOut();
    $(".search").slideUp();
  });

  // 모바일 메뉴 열림
  $(".mgnb-wrap").hide();
  
  $(".ham").click(function(){

    $(".mgnb-wrap").fadeIn();
  });

  // 모바일 메뉴 닫힘
  $(".mgnb-close").click(function(){
    $(".mgnb-wrap").fadeOut();
  });

  $(window).on('resize', function(){
    $(".mgnb-wrap").hide();
  })
}); // 실행틀 끝