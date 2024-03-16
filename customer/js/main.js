// Khi tài liệu được tải xong
document.addEventListener("DOMContentLoaded", function() {
    // Khi người dùng cuộn trang
    window.onscroll = function() {
        scrollFunction();
    };
});

// Hiển thị hoặc ẩn nút "Back to Top" dựa trên vị trí cuộn của trang
function scrollFunction() {
    let btn = document.getElementById("back-to-top-btn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// Cuộn lên đầu trang từ từ
function scrollToTop() {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - (currentScroll / 10));
    }
}
