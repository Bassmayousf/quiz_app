// selectors
let questionCount = document.querySelector(".count span");
let quizArea = document.querySelector(".quiz-area");
let quizAnswers = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bulletsContainer = document.querySelector(".bullets");
let bullets = document.querySelector(".bullets .spans "); 
let bul = document.querySelector(".answers-area .answer " )
let countdown = document.querySelector(".countdown");
let results = document.querySelector(".results");

// set setting
let currentIndex=0;
let rightAnswrs =0;
let countdownClearInterval;

// Main Function

function genertQuetions(){
    let myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = function(){
            if (this.readyState===4 && this.status===200){
                let questionsObject = JSON.parse(this.responseText);
                let qCount=questionsObject.length;
                let thequestion= questionsObject
                // let theRIght=thequestion[currentIndex]["right_answer"];

                questionCount.innerHTML=qCount;
                creatBullets(qCount)
                addQuestion(thequestion,qCount);
                countdownf(10,qCount);

                changeBullets(qCount)
                submitButton.onclick=function(){
                let theRIght=thequestion[currentIndex]["right_answer"];

                    currentIndex++;
                    checkRightAns(theRIght,qCount)
                    quizArea.innerHTML=""
                    quizAnswers.innerHTML="";
                    addQuestion(thequestion,qCount)
                    changeBullets(qCount);
        clearInterval(countdownClearInterval);

                countdownf(10,qCount);
                    showResults(qCount)
                }  
            }
        }
        myRequest.open("Get","Htmal-question.json",true);
        myRequest.send();
}
// Generate main functions
genertQuetions();

// Functions of projects
function creatBullets(count){
    console.log("he")
    for(let i=0;i<count;i++){
        let bulletsSpan=document.createElement("span");
        bullets.appendChild(bulletsSpan);
    }
}
function changeBullets(count){
let allspans = document.querySelectorAll(".bullets .spans span");
    let arryspan =Array.from(allspans);
    arryspan.forEach((span,index)=>{
        if(index===currentIndex){
        span.classList.add("on")
        }
    });
}
function addQuestion(obj,count){
    if(currentIndex<count){ 
    let tit = document.createElement("h2");
    let tittext= document.createTextNode(obj[currentIndex]["title"]);
    tit.appendChild(tittext);
    quizArea.append(tit);
    for(let i = 1;i<=4;i++){ 
        let minDiv=document.createElement("div");
        minDiv.className="answer"
        let inputradio = document.createElement("input");
        inputradio.name="question";
        inputradio.id=`answer_${i}`;
        inputradio.dataset.answer=obj[currentIndex][`answer_${i}`];
        inputradio.type="radio";
        if(i===1){
            inputradio.checked=true;
        }
        let labal=document.createElement("label");
        labal.htmlFor=`answer_${i}`;
        let labalTxt= document.createTextNode(obj[currentIndex][`answer_${i}`]);
        labal.appendChild(labalTxt);
        minDiv.append(inputradio , labal);
        quizAnswers.append(minDiv)
        }
        
    }
}
function checkRightAns(rAnswer, count){
    let answers =document.getElementsByName("question");
    let choosenAnswer;
    for(let i = 0;i<answers.length;i++){
        if (answers[i].checked){
        choosenAnswer = answers[i].dataset.answer;
        console.log(choosenAnswer)
            console.log(rightAnswrs)

        }
        
    }
    if(rAnswer===choosenAnswer){
            
            rightAnswrs++;
            // console.log(rightAnswrs)
        }
}
function countdownf(duration,count){
    if(currentIndex < count){
        let seconds , minuts
        countdownClearInterval=setInterval(() => {
            minuts = parseInt(duration/60);
            seconds=parseInt(duration%60);
            minuts= minuts<10?`0${minuts}`:minuts;
            seconds= seconds<10?`0${seconds}`:seconds;
            countdown.innerHTML=`${minuts} : ${seconds}`

            if(--duration<0){ 
        clearInterval(countdownClearInterval);
        submitButton.click();
        }
        }, 1000);
        
    }
}
function showResults(count){
    let result ;
    if(currentIndex===count){
        quizArea.remove();
        quizAnswers.remove();
        submitButton.remove();
        bulletsContainer.remove();
        if(rightAnswrs>count / 2 && rightAnswrs<count){
            result=`<span class="good">goooood</span> AllAnswers Arenot Right`
        }
        else if(rightAnswrs===count){
            result=`<span class="perfect">perfect</span> AllAnswers Are Right`

        }
        else{
            result=`<span class="bad">really baaaaaaaf</span> AllAnswers Are Rwong`

        }
    

        results.innerHTML=result;
        results.style.padding="15px"
    }
}