
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

    FLIP(entries, clickedEntry);

    setTimeout(function() {
        for(var i = 0; i < entries.length; i++) {
            entries[i].style.display = "none";
        }
    }, 800);
}

function freezePositions(elements) {
    var offsets = [];
    for(var i = 0; i < elements.length; i++) {
        offsets.push(cumulativeOffset(elements[i]));
    }

    for(var i = 0; i < elements.length; i++) {
        elements[i].style.position = "absolute";
        elements[i].style.top = offsets[i].top;
        elements[i].style.left = offsets[i].left;
    }
}

function FLIP(entries, clickedEntry) {
    //first
    var first = cumulativeOffset(clickedEntry);

    //last
    for(var i = 0; i < entries.length; i++) {
        entries[i].style.display = "none";
    }
    var bottomPart = document.getElementById("bottom-part");
    bottomPart.className = "bottom-part-clicked-entry";
    var last = cumulativeOffset(clickedEntry);
    bottomPart.className = "bottom-part-entry-list";
    for(var i = 0; i < entries.length; i++) {
        entries[i].style.display = "inherit";
    }
    var offset = {top: first.top - last.top,
                    left: first.left - last.left};
    var transform = "translate(" + offset.left + ", " + offset.top + ")";
    
    freezePositions(entries);

    //invert
    clickedEntry.style.position = "absolute";
    clickedEntry.style.left = first.left;
    clickedEntry.style.top = first.top;

    //play
    var id = setInterval(moveClickedEntryUp, 10);
    var currentOffset = {left: first.left, top: first.top};
    function moveClickedEntryUp() {
        if(currentOffset.top <= last.top) {
            clearInterval(id);
            id = setInterval(moveClickedEntryOver, 10);
            var entryBody = document.getElementById(clickedEntry.id + "-body");
            playAnimation(entryBody, "running");
        } else {
            var newPos = currentOffset.top - (offset.top / 100);
            clickedEntry.style.top = newPos;
            currentOffset.top = newPos;
        }
    }
    function moveClickedEntryOver() {
        if(currentOffset.left <= last.left) {
            clearInterval(id);
        } else {
            var newPos = currentOffset.left - (offset.left / 100);
            clickedEntry.style.left = newPos;
            currentOffset.left = newPos;
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