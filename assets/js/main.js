$(document).ready(function () {
  // GSAP প্লাগইন রেজিস্টার
  gsap.registerPlugin(ScrollTrigger);

  // ১. মোবাইল মেনু ওপেন/ক্লোজ (Toggle)
  $("#menuToggle").on("click", function () {
    $("#mobileMenu").toggleClass("hidden").fadeToggle(200);
    $(this).attr("aria-expanded", function (i, attr) {
      return attr === "true" ? "false" : "true";
    });
  });

  // মেনুর কোনো লিংকে ক্লিক করলে মেনু বন্ধ হওয়া
  $(".mobile-nav-link").on("click", function () {
    $("#mobileMenu").addClass("hidden");
  });

  // ২. ল্যাঙ্গুয়েজ ড্রপডাউন টগল
  $(".languages__current").on("click", function (e) {
    e.preventDefault();
    $(".languages__wrap").toggleClass("hidden");
  });

  // বাইরে কোথাও ক্লিক করলে ড্রপডাউন বন্ধ হওয়া
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".languages").length) {
      $(".languages__wrap").addClass("hidden");
    }
  });

  // ৩. Explore বাটনে ক্লিক করলে স্মুথ স্ক্রোল
  $(".exploreBtn").on("click", function (e) {
    const target = $(this).attr("href");
    if (target && target.startsWith("#") && $(target).length) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        700,
      );
    }
  });

  // ৪. GSAP হিরো টাইটেল এন্ট্রান্স অ্যানিমেশন
  gsap.from(".hero-title-line", {
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out",
  });
});
