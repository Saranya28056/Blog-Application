document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".read-more").forEach(button => {
      button.addEventListener("click", function() {
          let shortContent = this.previousElementSibling.querySelector(".dots");
          let fullContent = this.previousElementSibling.querySelector(".full-content");

          if (fullContent.style.display === "none") {
              fullContent.style.display = "inline";
              shortContent.style.display = "none";
              this.innerHTML = '<i class="fa-solid fa-angle-up"></i> Read Less';
          } else {
              fullContent.style.display = "none";
              shortContent.style.display = "inline";
              this.innerHTML = '<i class="fa-solid fa-angle-down"></i> Read More';
          }
      });
  });
});
