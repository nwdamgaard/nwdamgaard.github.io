
var entry1 = document.getElementById("entry-one");
var entry2 = document.getElementById("entry-two");
var entry3 = document.getElementById("entry-three");
var entry4 = document.getElementById("entry-four");
var state = {
    param1: null,
    param2: null
};
var entryPositions;

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
    state.param1 = entries;
    state.param2 = clickedEntry;

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

function reappear(entries, clickedEntry) {
    var backButton = document.getElementById("back-button");
    backButton.style.display = "none";

    reverseFLIP(entries, clickedEntry);
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

    return offsets;
}

function reverseFLIP(entries, clickedEntry) {
    //first
    var first = cumulativeOffset(clickedEntry);

    //last
    for(var i = 0; i < entries.length; i++) {
        entries[i].style = null;
    }
    var bottomPart = document.getElementById("bottom-part");
    bottomPart.className = "bottom-part-entry-list";
    clickedEntry.className = "entry";
    clickedEntry.style = null;
    var last = cumulativeOffset(clickedEntry);
    //bottomPart.className = "bottom-part-show-entry";
    for(var i = 0; i < entries.length; i++) {
        entries[i].style.display = "none";
    }
    var offset = {top: first.top - last.top,
        left: first.left - last.left};

    //invert
    clickedEntry.style.position = "absolute";
    clickedEntry.style.left = first.left;
    clickedEntry.style.top = first.top;

    //play
    var id = setInterval(moveClickedEntryOver, 10);
    var currentOffset = {left: first.left, top: first.top};
    function moveClickedEntryOver() {
        if(currentOffset.left >= last.left) {
            clearInterval(id);
            setInterval(moveClickedEntryDown, 10);
            
            for(var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                var newEntry = entry.cloneNode(true);
                setAnimationDirectionReverse(newEntry);
                newEntry.style.display = "inherit";
                newEntry.style.position = "absolute";
                newEntry.style.left = entryPositions[i].left;
                newEntry.style.top = entryPositions[i].top;
                playAnimation(newEntry, "running");
                entry.parentNode.replaceChild(newEntry, entry);
                entries[i] = newEntry;
            }
        } else {
            var newPos = currentOffset.left - (offset.left / 100);
            clickedEntry.style.left = newPos;
            currentOffset.left = newPos;
        }
    }
    function moveClickedEntryDown() {
        if(currentOffset.top >= last.top) {
            clearInterval(id);

            clickedEntry.style = null;
            for(var i = 0; i < entries.length; i++) {
                entries[i].style = null;
            }
        } else {
            var newPos = currentOffset.top - (offset.top / 100);
            clickedEntry.style.top = newPos;
            currentOffset.top = newPos;
        }
    }

    var entryBody = document.getElementById(clickedEntry.id + "-body");
    var newBody = entryBody.cloneNode(true);
    setAnimationDirectionReverse(newBody);
    newBody.style.opacity = "0";
    entryBody.parentNode.replaceChild(newBody, entryBody);
    setTimeout(function() {newBody.style.display = "none"}, 1000);
}

function FLIP(entries, clickedEntry) {
    //first
    var first = cumulativeOffset(clickedEntry);

    //last
    for(var i = 0; i < entries.length; i++) {
        entries[i].style.display = "none";
    }
    var bottomPart = document.getElementById("bottom-part");
    bottomPart.className = "bottom-part-show-entry";
    var last = cumulativeOffset(clickedEntry);
    bottomPart.className = "bottom-part-entry-list";
    for(var i = 0; i < entries.length; i++) {
        entries[i].style.display = "inherit";
    }
    var offset = {top: first.top - last.top,
                    left: first.left - last.left};
    
    entryPositions = freezePositions(entries);

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
            entryBody.style.display = "inherit";
        } else {
            var newPos = currentOffset.top - (offset.top / 100);
            clickedEntry.style.top = newPos;
            currentOffset.top = newPos;
        }
    }
    function moveClickedEntryOver() {
        if(currentOffset.left <= last.left) {
            clearInterval(id);
            clickedEntry.style.position = "inherit";
            var backButton = document.getElementById("back-button");
            backButton.style.display = "inherit";
        } else {
            var newPos = currentOffset.left - (offset.left / 100);
            clickedEntry.style.left = newPos;
            currentOffset.left = newPos;
        }
    }
    clickedEntry.classList.add("clickedEntry");
    bottomPart.className = "bottom-part-show-entry";
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

function setAnimationDirectionReverse(entry) {
    entry.style.animationDirection = "reverse";
    entry.style.webkitAnimationDirection = "reverse";
}

function backToEntryList() {
    reappear(state.param1, state.param2);
}