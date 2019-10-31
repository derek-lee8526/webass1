let score = localStorage.getItem("score");
document.getElementById('score').innerHTML = score


function back() {
    window.location.href = './'
    localStorage.clear()
}


function sendData() {
    name = document.getElementById('name').value

    let bodyContent ={
        user: name,
        userScore: score
    }

    fetch('/summary/score', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bodyContent)
    }).then(()=>console.log("success"))
    .catch((err)=> console.log(err))
    window.location.href = "./leaderboard"
}