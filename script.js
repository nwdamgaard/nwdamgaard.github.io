
var entry1 = document.getElementById("entry-one");
var entry2 = document.getElementById("entry-two");
var entry3 = document.getElementById("entry-three");
var entry4 = document.getElementById("entry-four");

function clickEntry1 () {
    playAnimation(entry2);
    playAnimation(entry3);
    playAnimation(entry4);

    setTimeout(function() {
        entry2.style.display = "none";
        entry3.style.display = "none";
        entry4.style.display = "none";
    }, 800);
}

function clickEntry2 () {
    playAnimation(entry1);
    playAnimation(entry3);
    playAnimation(entry4);

    setTimeout(function() {
        entry1.style.display = "none";
        entry3.style.display = "none";
        entry4.style.display = "none";
    }, 800);
}

function clickEntry3 () {
    playAnimation(entry1);
    playAnimation(entry2);
    playAnimation(entry4);

    setTimeout(function() {
        entry1.style.display = "none";
        entry2.style.display = "none";
        entry4.style.display = "none";
    }, 800);
}

function clickEntry4 () {
    playAnimation(entry2);
    playAnimation(entry3);
    playAnimation(entry1);

    setTimeout(function() {
        entry2.style.display = "none";
        entry3.style.display = "none";
        entry1.style.display = "none";
    }, 800);
}

function playAnimation(entry) {
    entry.style.webkitAnimationPlayState = "running";
    entry.style.animationPlayState = "running";
}