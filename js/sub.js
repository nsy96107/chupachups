$(document).ready(function(){ // 실행틀 시작
  AOS.init();
  
  // story tap
  $(".story-tap-con li").hide();

  $(".story-tap-btn li").eq(0).addClass("active");
  $(".story-tap-con li").eq(0).show();

  $(".story-tap-btn li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    
    /* 순서를 가져오는 index(); - 사용자가 선택한 li의 순번을 기억 */
    var indexNum = $(this).index();
    $(".story-tap-con li").eq(indexNum).fadeIn().siblings().hide();
  });

  // m-story swiper
  var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
  });

  // qna 슬라이드
  $(".a-list").hide();

  $(".q-list > li").click(function(){

    if($(this).children(".a-list").css("display") == "none"){
      $(".a-list").slideUp(500);
      $(this).children(".a-list").slideDown(500);

      $(".q-list > li").children("span").removeClass("active");
      $(this).children("span").addClass("active");
    }
    else{
      $(".a-list").slideUp(500);
      $(".q-list > li").children("span").removeClass("active");
    }
  });

  // candy1 스와이퍼
  var candy1 = new Swiper(".candy1 .swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // candy2 스와이퍼
  var candy2 = new Swiper(".candy2 .swiper-container", {
    effect: "fade",
  });

  // candy1, candy2 연동
  candy1.controller.control = candy2;
  candy2.controller.control = candy1;

  // jelly1 스와이퍼
  var jelly1 = new Swiper(".jelly1 .swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // jelly2 스와이퍼
  var jelly2 = new Swiper(".jelly2 .swiper-container", {
    effect: "fade",
  });

  // jelly1, jelly2 연동
  jelly1.controller.control = jelly2;
  jelly2.controller.control = jelly1;

  // soda1 스와이퍼
  var soda1 = new Swiper(".soda1 .swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // soda2 스와이퍼
  var soda2 = new Swiper(".soda2 .swiper-container", {
    effect: "fade",
  });

  // soda1, soda2 연동
  soda1.controller.control = soda2;
  soda2.controller.control = soda1;

  // modal 창
  $(".candy .modal").hide();

  $(".candy .info").click(function(){
    $(".candy .modal").fadeIn();
  });
  $(".candy .close").click(function(){
    $(".candy .modal").fadeOut();
  });


  $(".jelly .modal").hide();

  $(".jelly .info").click(function(){
    $(".jelly .modal").fadeIn();
  });
  $(".jelly .close").click(function(){
    $(".jelly .modal").fadeOut();
  });


  $(".soda .modal").hide();

  $(".soda .info").click(function(){
    $(".soda .modal").fadeIn();
  });
  $(".soda .close").click(function(){
    $(".soda .modal").fadeOut();
  });

  $(".swiper-button-next").click(function(){
    $(".modal").hide();
  });
  $(".swiper-button-prev").click(function(){
    $(".modal").hide();
  });
}); // 실행틀 끝