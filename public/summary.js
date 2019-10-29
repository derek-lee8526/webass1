function back() {
    window.location.href = './'
}

score = localStorage.getItem("score");
document.getElementById('score').innerHTML = score