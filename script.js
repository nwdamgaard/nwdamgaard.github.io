
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
    //first
    var first = cumulativeOffset(clickedEntry);

    //last
    var bottomPart = document.getElementById("bottom-part");
    bottomPart.className = "bottom-part-clicked-entry";
    var last = cumulativeOffset(clickedEntry);
    bottomPart.className = "bottom-part-entry-list";
    var offset = {top: first.top - last.top,
                    left: first.left - last.left};
    var transform = "translate(" + offset.left + ", " + offset.top + ")";
    console.log(offset);
    
    //invert
    clickedEntry.style.position = "absolute";
    clickedEntry.style.left = first.left;
    clickedEntry.style.top = first.top;

    //play
    var id = setInterval(moveClickedEntry, 10);
    var currentOffset = {left: first.left, top: first.top};
    function moveClickedEntry() {
        if(clickedEntry.style.left == last.left && clickedEntry.style.top == last.top) {
            clearInterval(id);
        } else {
            currentOffset.top -= offset.top;
            currentOffset.left -= offset.left;
            clickedEntry.style.left = currentOffset.left;
            clickedEntry.style.top = currentOffset.top;
        }
    }
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