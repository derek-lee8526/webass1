const MAX_SIZE = 7;
let score = 0;
let level = 5;
let difficulty = level;
let panes = [];
let correct = 0;
let order = [];
let tile = [];
let player_list = [];
let grid_iterations = 1;

let game = document.getElementById("the_game");
let reload_btn = document.createElement("button");
let btns = document.getElementById("ctrl_btns");
let a_tag = document.createElement("a");
let tn;

// Terminate button
let term = document.createElement("button");
term.className = "btn btn-danger";
tn = document.createTextNode("Terminate");
term.appendChild(tn);
btns.appendChild(term);

let audio = new Audio('./audio/swoosh.mp3');

// Status label
let passfail = document.createElement("div");
passfail.id = "passfail";
document.body.insertBefore(passfail, document.getElementById("ctrl_btns"));
document.getElementById("passfail").innerHTML = INSESSION;

// Score display
let score_label = document.createElement("div");
score_label.id = "score_lbl";
document.body.insertBefore(score_label, document.getElementById("passfail"));
document.getElementById("score_lbl").innerHTML = SCORELBL + score;

// Store score
function terminating() {
    if (confirm(ARE_YOU_SURE)) {
        localStorage.setItem("score", JSON.stringify(score));
        if (score > 0) {
            localStorage.setItem("iterations", JSON.stringify(grid_iterations));
        }
        window.location.href = "./summary";
    }
}

function load_tile(num) {
    tile = [];
    
    for (let i = num; i > 0; --i) {
        tile.push("");
    }
}

function rand_gen(min, max) {
    if (min > max)
        return -1;
    if (min == max)
        return min;
    return Math.floor((Math.random() * max) + min);
}

function set_grid() {
    reload_btn.removeEventListener('click', reset);
    let fc_inner;
    let fc_front;
    let fc_back;

    for (let i = 0; i < (level * level); ++i) {
        panes.push(document.createElement("div"));
        panes[i].className = "grid-item flip-card";
        
        fc_inner = document.createElement("div");
        fc_front = document.createElement("div");
        fc_back = document.createElement("div");

        fc_inner.className = "flip-card-inner";
        fc_front.className = "flip-card-front";
        fc_back.className = "flip-card-back";

        panes[i].appendChild(fc_inner);
        fc_inner.appendChild(fc_front);
        fc_inner.appendChild(fc_back);

        if ((rand_gen(1, level) == 1) && tile.length != 0) {
            let tmp = rand_gen(0, tile.length - 1);
            tn = document.createTextNode(tile[tmp]);
            tile.splice(tmp, 1);

        } else {
            tn = document.createTextNode("X");
        }

        fc_back.appendChild(tn);
        document.getElementById("the_game").appendChild(panes[i]);
    }

    let i = 0;
    while (tile.length != 0) {
        if (panes[i].textContent == "X") {
            panes[i].childNodes[0].childNodes[1].textContent = tile[0];
            tile.splice(0, 1);
        }
        ++i;
    }
}

function reset() {
    panes = [];
    order = [];
    correct = 0;
    ++grid_iterations;
    passfail.innerHTML = NEWGRID;
    passfail.style.color = "blue";
    game.innerHTML = "";
    set_classname();
    load_tile(difficulty);
    set_grid();
    setTimeout(reveal_order, 1000);
    setTimeout(rotating, 3000 + difficulty * 1000);
    setTimeout(function() {
        passfail.innerHTML = INSESSION;
        passfail.style.color = "black";
    }, 2000 + difficulty * 1000);
}

function upgrade() {
    if (level == 5) {
        if (difficulty == 5 || difficulty == 4)
            ++difficulty;
        else
            ++level;
    } else if (level == 6) {
        if (difficulty == 6 || difficulty == 5)
            ++difficulty;
        else
            ++level;
    } else {
        if (difficulty < 10)
            ++difficulty;
    }
}

function downgrade() {
    if (level == 5) {
        if (difficulty == 5 || difficulty == 6)
            --difficulty;
    } else if (level == 6) {
        if (difficulty == 6 || difficulty == MAX_SIZE)
            --difficulty;
        else {
            --level;
            ++difficulty;
        }
    } else if (level == MAX_SIZE) {
        if (difficulty == 6) {
            --level;
            ++difficulty;
        } else
            --difficulty;
    }
}

function flipping() {
    this.classList.toggle('is-flipped');
    this.removeEventListener('click', flipping);
    if (this.textContent == "X") {
        reload_btn.removeEventListener('click', reset);
        let tmp = document.getElementsByClassName("flip-card-inner");
        downgrade();
        for (let i = 0; i < tmp.length; ++i)
            tmp[i].removeEventListener('click', flipping);
        setTimeout(reset, 3000);
        --score;
        passfail.innerHTML = WRONG;
        passfail.style.color = "red";
        if (score <= 0) {
            setTimeout(function() {
                localStorage.setItem("score", JSON.stringify(score));
                alert(GAME_OVER);
                window.location.href = "./Summary.html";
            }, 1000);    
        }
    } else {
        order.push(parseInt(this.textContent));
        ++score;
        ++correct;
        if (correct == difficulty) {
            reload_btn.removeEventListener('click', reset);
            let tmp = document.getElementsByClassName("flip-card-inner");
    
            upgrade();
    
            for (let i = 0; i < tmp.length; ++i)
                tmp[i].removeEventListener('click', flipping);
            setTimeout(reset, 3000);
        }
    }

    document.getElementById("score_lbl").innerHTML = SCORELBL + score;
}

function set_classname() {
    game.className = "grid-container" + level;
}

function reveal_flip() {
    this.classList.toggle('is-flipped');
}

function rotating() {
    playsound();
    game.classList.toggle('is-rotated');
    for (let i = 0; i < panes.length; ++i) {
        panes[i].style.transform = 'rotate(-90deg)';
    }

    reload_btn.addEventListener('click', reset);
}

function set_listeners() {
    for (let i = 0; i < panes.length; ++i)
        panes[i].childNodes[0].addEventListener( 'click', flipping);

    term.addEventListener('click', terminating);
}

function reveal_order() {
    let tmp = [];
    
    for (let i = 0; i < panes.length; ++i) {
        if (panes[i].textContent != "X") {
            tmp.push(panes[i].childNodes[0]);
        }
    }

    term.removeEventListener('click', terminating);

    for (let i = 0; i < tmp.length; ++i) {
        tmp[i].classList.toggle('is-flipped');
    }

    setTimeout(function() {
        for (let i = 0; i < tmp.length; ++i)
        tmp[i].classList.toggle('is-flipped');
    }, 1000 * level);

    setTimeout(set_listeners, 1000 * level + 1000);
}

// Run right at the start only
(function starting(){
    set_classname();
    load_tile(level);
    set_grid();
    setTimeout(reveal_order, 1000);

    setTimeout(rotating, 7000);
})();

function playsound() {
    audio.play();
}

tn = document.createTextNode(RELOAD);
reload_btn.appendChild(tn);
reload_btn.className = "btn btn-info";
document.getElementById("ctrl_btns").appendChild(reload_btn);
