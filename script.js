
var entry1 = document.getElementById("entry-one");
var entry2 = document.getElementById("entry-two");
var entry3 = document.getElementById("entry-three");
var entry4 = document.getElementById("entry-four");

function clickEntry1 () {
    disappear([entry2, entry3, entry4]);
}

function clickEntry2 () {
    disappear([entry1, entry3, entry4]);
}

function clickEntry3 () {
    disappear([entry1, entry2, entry4]);
}

function clickEntry4 () {
    disappear([entry1, entry2, entry3]);
}

function disappear(entries) {
    for(var i = 0; i < entries.length; i++) {
        playAnimation(entries[i]);
    }

    setTimeout(function() {
        for(var i = 0; i < entries.length; i++) {
            entries[i].style.display = "none";
        }
    }, 800);
}

function playAnimation(entry) {
    entry.style.webkitAnimationPlayState = "running";
    entry.style.animationPlayState = "running";
}