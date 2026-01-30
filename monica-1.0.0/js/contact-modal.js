document.addEventListener("DOMContentLoaded", function() {

    const openBtn = document.getElementById("openContactModal");
    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".contact-modal__close");
    const overlay = document.querySelector(".contact-modal__overlay");

    if (!openBtn || !modal) return;

    openBtn.addEventListener("click", function() {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

});