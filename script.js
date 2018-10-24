
var entry1 = document.getElementById("entry-one");
var entry2 = document.getElementById("entry-two");
var entry3 = document.getElementById("entry-three");
var entry4 = document.getElementById("entry-four");

function clickEntry1 () {
    disappear([entry2, entry3, entry4], entry1);
}

function clickEntry2 () {
    disappear([entry1, entry3, entry4], entry2);
}

function clickEntry3 () {
    disappear([entry1, entry2, entry4], entry3);
}

function clickEntry4 () {
    disappear([entry1, entry2, entry3], entry4);
}

function disappear(entries, clickedEntry) {
    for(var i = 0; i < entries.length; i++) {
        playAnimation(entries[i], "running");
    }

    clickedEntry.classList.add("entryToTopLeft");
    playAnimation(clickedEntry, "running");

    FLIP(clickedEntry);

    setTimeout(function() {
        for(var i = 0; i < entries.length; i++) {
            entries[i].style.display = "none";
        }
    }, 800);
}

function FLIP(clickedEntry) {
    var first = cumulativeOffset(clickedEntry);
    clickedEntry.classList.add("clickedEntry");
};

var cumulativeOffset = function(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

function playAnimation(entry, state) {
    entry.style.webkitAnimationPlayState = state;
    entry.style.animationPlayState = state;
}