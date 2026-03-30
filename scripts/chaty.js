/**
 * Chaty Chat Widget - CMLocals Style
 * Floating social contact buttons (bottom-left)
 * All elements use position:fixed so trigger button NEVER moves
 */
(function () {
  "use strict";

  var channels = [
    {
      name: "LINE",
      label: "LINE",
      url: "https://line.me/R/ti/p/@greennanothai",
      color: "#00B900",
      svg: '<svg viewBox="0 0 39 39" xmlns="http://www.w3.org/2000/svg"><circle cx="19.5" cy="19.5" r="19.5" fill="#00B900"/><g transform="translate(19.5, 19.5) scale(1.4)"><circle r="8" fill="white"/><path d="M-1 2 Q-3 3 -3.5 2 L-3.5 1 Q-3.5 0 -3 0 L3 0 Q3.5 0 3.5 1 L3.5 2 Q3 3 1 2 Z" fill="white"/><text x="0" y="1.5" text-anchor="middle" font-size="4" font-weight="bold" fill="#00B900" font-family="Arial">LINE</text></g></svg>'
    },
    {
      name: "Phone",
      label: "Call",
      url: "tel:+6653430396",
      color: "#6BA86F",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#6BA86F"/><rect x="12" y="10" width="15" height="20" rx="2" ry="2" stroke="white" stroke-width="1.5" fill="none"/><circle cx="19.5" cy="27" r="1" fill="white"/></svg>'
    },
    {
      name: "Facebook_Messenger",
      label: "Facebook",
      url: "https://m.me/greenanothai",
      color: "#0084FF",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#0084FF"/><path d="M19.5 9.5C13.701 9.5 9 13.748 9 19.074c0 3.014 1.474 5.702 3.778 7.456V30l3.294-1.81c.878.244 1.81.376 2.778.376 5.799 0 10.5-4.248 10.5-9.574S25.299 9.5 19.5 9.5zm1.04 12.878l-2.674-2.852-5.22 2.852 5.74-6.096 2.74 2.852 5.154-2.852-5.74 6.096z" fill="white"/></svg>'
    },
    {
      name: "Email",
      label: "Email",
      url: "mailto:greennanothai@gmail.com",
      color: "#A5D610",
      svg: '<svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19.4395" cy="19.4395" r="19.4395" fill="#A5D610"/><path d="M9 14c0-1.104.896-2 2-2h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H11c-1.104 0-2-.896-2-2V14z" stroke="white" stroke-width="1.5" fill="none"/><path d="M11 14l8 6 8-6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'
    }
  ];

  var isMobile = window.innerWidth <= 480;
  var iconSize = isMobile ? 32 : 42;
  var itemGap = isMobile ? 8 : 10;
  var bottomOffset = 40;
  var leftOffset = 20;

  var triggerSvg =
    '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="#6BA86F"/>' +
    '<path d="M26.4 13H13.6C12.72 13 12 13.72 12 14.6V23.4C12 24.28 12.72 25 13.6 25H16L19.5 28L23 25H26.4C27.28 25 28 24.28 28 23.4V14.6C28 13.72 27.28 13 26.4 13Z" fill="white"/>' +
    '<circle cx="15.5" cy="19" r="1.25" fill="#6BA86F"/>' +
    '<circle cx="19.5" cy="19" r="1.25" fill="#6BA86F"/>' +
    '<circle cx="23.5" cy="19" r="1.25" fill="#6BA86F"/>' +
    '</svg>';

  var closeSvg =
    '<svg width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="19.5" cy="19.5" r="19.5" fill="#6BA86F"/>' +
    '<path d="M25 14L14 25M14 14L25 25" stroke="white" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  function createWidget() {
    var isOpen = false;
    var autoCloseTimer = null;
    var channelEls = [];
    var tooltipTimeout = null;

    // Create tooltip
    var tooltipEl = document.createElement("div");
    var tooltipLeft = leftOffset + iconSize + 10;
    var tooltipBottom = bottomOffset + iconSize / 2;
    tooltipEl.style.cssText = [
      "position:fixed",
      "z-index:10008",
      "background:rgba(0,0,0,0.9)",
      "color:#fff",
      "padding:6px 10px",
      "border-radius:6px",
      "font-family:'DM Sans', system-ui, sans-serif",
      "font-size:12px",
      "white-space:nowrap",
      "pointer-events:none",
      "opacity:0",
      "transition:opacity 0.2s ease",
      "bottom:" + tooltipBottom + "px",
      "left:" + tooltipLeft + "px",
      "transform:translateY(50%)"
    ].join(";");
    tooltipEl.textContent = "Contact Us";
    document.body.appendChild(tooltipEl);

    var triggerEl = document.createElement("div");
    triggerEl.id = "chaty-trigger";
    triggerEl.style.cssText = [
      "position:fixed",
      "bottom:" + bottomOffset + "px",
      "left:" + leftOffset + "px",
      "width:" + iconSize + "px",
      "height:" + iconSize + "px",
      "border-radius:50%",
      "cursor:pointer",
      "z-index:10010",
      "line-height:0",
      "transition:transform 0.2s ease"
    ].join(";");
    triggerEl.innerHTML = triggerSvg;

    triggerEl.onmouseenter = function() {
      triggerEl.style.transform = "scale(1.1)";
      if (!isOpen) openWidget();
    };
    triggerEl.onmouseleave = function() { triggerEl.style.transform = "scale(1)"; };

    document.body.appendChild(triggerEl);

    channels.forEach(function(ch, idx) {
      var itemEl = document.createElement("div");
      var stackBottom = bottomOffset + iconSize + itemGap + idx * (iconSize + itemGap);

      itemEl.style.cssText = [
        "position:fixed",
        "bottom:" + bottomOffset + "px",
        "left:" + leftOffset + "px",
        "width:" + iconSize + "px",
        "height:" + iconSize + "px",
        "border-radius:50%",
        "z-index:10009",
        "opacity:0",
        "pointer-events:none",
        "line-height:0",
        "transition:bottom 0.3s ease, opacity 0.3s ease"
      ].join(";");

      var link = document.createElement("a");
      link.href = ch.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", ch.label);
      link.style.display = "block";
      link.style.width = iconSize + "px";
      link.style.height = iconSize + "px";
      link.style.borderRadius = "50%";
      link.style.lineHeight = "0";
      link.innerHTML = ch.svg;

      var svgEl = link.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", iconSize);
        svgEl.setAttribute("height", iconSize);
      }

      itemEl.appendChild(link);
      document.body.appendChild(itemEl);

      var channelItem = { el: itemEl, bottom: stackBottom, label: ch.label };
      channelEls.push(channelItem);

      // Add custom tooltip for this channel (positioned beside the icon, vertically centered)
      (function(item) {
        itemEl.addEventListener("mouseenter", function() {
          tooltipEl.textContent = item.label;
          tooltipEl.style.bottom = (item.bottom + iconSize / 2) + "px";
          tooltipEl.style.opacity = "1";
        });
        itemEl.addEventListener("mouseleave", function() {
          tooltipEl.style.opacity = "0";
        });
      })(channelItem);
    });

    function openWidget() {
      isOpen = true;
      triggerEl.innerHTML = closeSvg;

      channelEls.forEach(function(item, idx) {
        item.el.style.transitionDelay = (idx * 0.06) + "s";
        item.el.style.bottom = item.bottom + "px";
        item.el.style.opacity = "1";
        item.el.style.pointerEvents = "auto";
      });

      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      autoCloseTimer = setTimeout(function() {
        if (isOpen) closeWidget();
      }, 30000);
    }

    function closeWidget() {
      isOpen = false;
      triggerEl.innerHTML = triggerSvg;

      channelEls.forEach(function(item) {
        item.el.style.transitionDelay = "0s";
        item.el.style.bottom = "-" + (iconSize + 10) + "px";
        item.el.style.opacity = "0";
        item.el.style.pointerEvents = "none";
      });

      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = null;
      }
    }

    triggerEl.onclick = function(e) {
      e.stopPropagation();
      if (isOpen) {
        closeWidget();
      } else {
        openWidget();
      }
    };

    document.addEventListener("click", function(e) {
      if (isOpen && !triggerEl.contains(e.target)) {
        var onChannel = channelEls.some(function(item) {
          return item.el.contains(e.target);
        });
        if (!onChannel) {
          closeWidget();
        }
      }
    });

    // Show "Contact Us" when mouse in bottom-left 30% of screen
    document.addEventListener("mousemove", function(e) {
      var inZone = e.clientX < window.innerWidth * 0.3 && e.clientY > window.innerHeight * 0.7;

      if (inZone && !isOpen) {
        tooltipEl.textContent = "Contact Us";
        tooltipEl.style.bottom = bottomOffset + iconSize / 2 + "px";
        tooltipEl.style.opacity = "1";
      } else if (!isOpen) {
        tooltipEl.style.opacity = "0";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
