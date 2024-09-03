function fetchAPI() {
    fetch("https://random-word-api.vercel.app/api?words=1&length=7").then(res => {
            if (!res.ok) {
                alert("Error occured. Please Retry");
                window.location.href="/";
            }
            return res.json();
        }).then(data => {
            word = data[0].toUpperCase();
            update();
        }).catch(error => {
            console.error("Error fetching word: ", error);
            alert("Error occured. Please Retry");
            // window.location.href="/";
        });
}

word = "";
const keys = document.querySelectorAll(".key");
const rulez = document.querySelector(".rules");

uniquechars = [];
attempts = 7;
guessed = [];

wordDiv = document.getElementById("word");

function update() {
    if(word===undefined) { return; }

    if(!uniquechars.length) {    
        for (char of word) {
            if(uniquechars.indexOf(char)<0) {
                uniquechars.push(char);
            }
        }
    }
    
    wordDiv.innerHTML = "";
    for(i=0; i<word.length; i++) {
        char = word.charAt(i);
        if(isGuessed(char)) {
            wordDiv.innerHTML += `<span class="character">${word.charAt(i)}</span>`;
        }
        else {
            wordDiv.innerHTML += `<span class="character">-</span>`;
        }
    }

    if(attempts === 0) {
        setTimeout( () => {
            mainCont = document.querySelector(".container");
            mainCont.innerHTML = `<div class="end-msg">
                            <h2>😞 Game Over 😞<br>Attempts Exhausted<br>Your word was "${word}"</h2>
                            <div class="play-button" onclick="window.location.href='/game'">Play Again</div>
                            </div>`;
        }, 250);
    }

    if(uniquechars.length>0 && (uniquechars.length === guessed.length)) {
        setTimeout( () => {
            mainCont = document.querySelector(".container");
            mainCont.innerHTML = `<div class="end-msg">
                            <h2>🎉 Congratulations 🎉<br>Your word was "${word}"</h2>
                            <div class="play-button" onclick="window.location.href='/game'">Play Again</div>
                            </div>`;
        }, 1000);
    }

    document.querySelector(".attempts").innerHTML = `You have <strong>${attempts}</strong> attempts left`;
}

function isGuessed(char) {
    for (ele of guessed) {
        if (char === ele) {
            return 1;
        }
    }
    return 0;
}

function isInWord(char) {
    for(i=0; i<word.length; i++) {
        if(char===word.charAt(i)) {
            return 1;
        }
    }
    return 0;
}

function handleKeyPress(keyElement) {
    key = keyElement.innerHTML;
    if(isInWord(key)) {
        keyElement.style.color = "#fff";
        keyElement.style.background = "#19c241";
        guessed.push(key);
    }
    else {
        keyElement.disabled = true;
        attempts-=1;
    }
    
    update();
}

function showRules() {
    document.querySelector('body').style.background = "#ddd";
    document.querySelectorAll('button').forEach((ele) => {
        ele.style.background = "#ddd";
    });
    rulez.style.visibility = "visible";
}

function hideRules() {
    document.querySelector('body').style.background = "#f0f0f0";
    document.querySelectorAll('button').forEach((ele) => {
        ele.style.background = "#fff";
    });
    rulez.style.visibility = "hidden";
}

window.onload = () => {
    word = fetchAPI();
    
    keys.forEach(key => {
        key.addEventListener("click", ()=> {
            handleKeyPress(key);
        });
    });
};