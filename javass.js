window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-visual");
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 100) {
    header.style.height = "50vh";  // 영상 줄이기
    navbar.classList.remove("hidden");  // 내비게이션 보이기
  } else {
    header.style.height = "100vh";
    navbar.classList.add("hidden");
  }
});




document.getElementById("fighterImage").onclick = function(){
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = this.src;
}

document.querySelector(".close").onclick = function() {
  document.getElementById("imageModal").style.display = "none";
}





document.getElementById("fighterImage2").onclick = function(){
    var modal = document.getElementById("imageModal2");
    var modalImg = document.getElementById("modalImg2");
    modal.style.display = "block";
    modalImg.src = this.src;
}

document.querySelector(".close2").onclick = function() {
  document.getElementById("imageModal2").style.display = "none";
}



const imgs = document.querySelectorAll(".mySwiper2 .swiper-slide img");

imgs.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    swiper2.autoplay.stop();
  });
  img.addEventListener("mouseleave", () => {
    swiper2.autoplay.start();
  });
});




 const modal = document.getElementById("video-modal");
  const closeBtn = document.querySelector(".close3");
  const iframe = modal.querySelector("iframe");

  const in2 = document.getElementById("in2");

  // 영상 원래 주소 (autoplay 없이)
  const baseURL = "https://www.youtube.com/embed/kUYCTGoHB88?mute=1&autoplay=1&clip=UgkxcaRhG7FEWjOnooCAS2DhGcRVMZAwMIVq&clipt=ELafEhj98BI";

  in2.addEventListener("click", () => {
    iframe.src = baseURL;         // autoplay=1로 바꿔서 재생
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";             // 정지
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = "";           // 정지
    }
  });