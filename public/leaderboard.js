window.onload = function() {
    fetch('/leaderboard/score').then((res) => res.json())
    .then((data)=> 
    {
        for(let i = 0; i < data.length; i++)
        {
            this.addUser(data[i].name,data[i].score)
        }
    })
    .catch((err) =>console.log(err))
}

function addUser(user,score) {
    let board = document.getElementById('leaderboard')
    let addScore = board.insertRow(0)
    
    let cell1 = addScore.insertCell(0)
    let cell2 = addScore.insertCell(1)

    cell1.innerHTML = user
    cell2.innerHTML = score
}

function restart() {
    window.location.href = './'
}