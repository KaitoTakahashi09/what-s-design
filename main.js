"use strict"

const els = {
  opening: document.querySelector(".opening"),
  collegeName: document.querySelector(".collegeName"),
  intro: document.querySelector(".intro"),
  leadText: document.querySelector(".leadText"),
  openedText: document.querySelector(".openedText"),
  pers_containers: document.querySelectorAll(".pers-container"),
  pers_items: document.querySelectorAll(".pers-container > *"),
  doors: document.querySelectorAll(".door"),
  leadDrags: document.querySelectorAll(".leadDrag"),
  main:document.querySelector("main"),
};

const vis = {
  opacity: (el, sw) => {
    if (sw == "on") {
      el.classList.remove("hidden");
    } else if (sw == "off") {
      el.classList.add("hidden");
    }
  },
  display: (el, sw) => {
    if (sw == "on") {
      el.classList.remove("inactive");
    } else if (sw == "off") {
      el.classList.add("inactive");
    }
  },
};

window.addEventListener("resize", () => {
  location.reload();
});

setTimeout(() => {
  vis.opacity(els.opening, "off");
  vis.opacity(els.collegeName, "on");
  setTimeout(() => {
    vis.display(els.opening, "off")
  }, 3200);
}, 50);

const door_rect_int = els.doors[0].getBoundingClientRect();

els.doors.forEach((door, i) => {
  door.onmousedown = (e) => {
    if (e.button == 0) {
      const width = door.offsetWidth;
      const door_rect = door.getBoundingClientRect();
      const door_x = e.clientX - door_rect.left;
      vis.display(els.leadDrags[i], "off");
  
      function drag(e) {
        let door_left = e.clientX - door_x;
        if (door_left > door_rect_int.left + width) {
          door.style.left = door_rect_int.left + width * 1.5 + "px";
        } else if (door_left < door_rect_int.left) {
          door.style.left = door_rect_int.left + width/2 + "px";
        } else {
          door.style.left = door_left + width/2 + "px";
        }
  
        if (door_left > door_rect_int.left + width * 0.3) {
          Array.from(els.pers_containers[i].children).forEach((pers_item, index) => {
            pers_item.style.transition = `opacity 0.4s ${index * 0.05}s`
            vis.opacity(pers_item, "on");
          })
        } else {
          Array.from(els.pers_containers[i].children).forEach((pers_item, index) => {
            pers_item.style.transition = `opacity 0.4s ${(5 - index) / 20}s`
            vis.opacity(pers_item, "off");
          })
        }
      }
      document.addEventListener("mousemove", drag);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", drag);
        if (parseInt(door.style.left, 10) !== parseInt(door_rect_int.left + width * 1.5, 10)) {
          vis.display(els.leadDrags[i], "on");
        } else {
          door.onmousedown = () => {};
          function opened(el) {
            el.classList.add("opened");
          } 
          opened(els.pers_containers[i]);
          opened(door);
          if (i == 0) {
            vis.opacity(els.leadText, "off");
            vis.opacity(els.openedText, "on");
            opened(els.openedText);
            opened(els.intro);
            setTimeout(() => {
              vis.display(els.intro, "off");
              vis.display(els.main, "on");
              setTimeout(() => {
                vis.opacity(els.main, "on");
              }, 50);
            }, 3300);
          } else {
            opened(els.main);
            setTimeout(() => {
              window.location.href = 'coso.html';
            }, 3300);
          }
        }
      }
    }
  }  
});