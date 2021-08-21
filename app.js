var quizStartBtn = document.getElementsByClassName('quizStartBtn');
var quizForm = document.getElementsByClassName('quizForm');
var quizBtn = document.getElementById("quizBtn");


var setUserName = document.getElementById("setUserName")
var setEmail = document.getElementById("setEmail")

var Name = document.getElementById("Name");
var Email = document.getElementById("Email");
var Phone = document.getElementById("Phone");
var Institute = document.getElementById("Institute");
// On Submit
function onSubmit() {

    if (Name.value == '' || Email.value == '' || Phone.value == '' || Institute.value == '') {
        alert('Oops! Form must be filled');
    }

 else{
        quizStartBtn[0].classList.remove("hide")
        quizForm[0].classList.add("hide");

        setUserName.innerText = `Name: ${Name.value}`
        setEmail.innerText = `Email: ${Email.value}`
 } 

}

const dbRef = firebase.database();
var arr = [];
dbRef.ref("/Questions").on("child_added",(snap) => {
    let ques = snap.val();
    arr.push(ques);

}
)

//Questions and options

var quizQuestions;
setTimeout(()=>{
 quizQuestions = [
    {
        num: arr[0].num,
        question: arr[0].Question,
        Option: {
            a: arr[0].Options.a,
            b: arr[0].Options.b,
            c: arr[0].Options.c,
            d: arr[0].Options.d

        },
        answer: arr[0].answer
    },
    {
        num: arr[1].num,
        question: arr[1].Question,
        Option: {
            a: arr[1].Options.a,
            b: arr[1].Options.b,
            c: arr[1].Options.c,
            d: arr[1].Options.d

        },
        answer: arr[1].answer
    },
    {
        num:  arr[2].num,
        question: arr[2].Question,
        Option: {
            a: arr[2].Options.a,
            b: arr[2].Options.b,
            c: arr[2].Options.c,
            d: arr[2].Options.d

        },
        answer: arr[2].answer
    }
    ,
    {
        num:  arr[3].num,
        question: arr[3].Question,
        Option: {
            a: arr[3].Options.a,
            b: arr[3].Options.b,
            c: arr[3].Options.c,
            d: arr[3].Options.d

        },
        answer: arr[3].answer
    }
    ,
    {
        num:  arr[4].num,
        question: arr[4].Question,
        Option: {
            a: arr[4].Options.a,
            b: arr[4].Options.b,
            c: arr[4].Options.c,
            d: arr[4].Options.d

        },
        answer: arr[4].answer
    },
    {
        num:  arr[5].num,
        question: arr[5].Question,
        Option: {
            a: arr[5].Options.a,
            b: arr[5].Options.b,
            c: arr[5].Options.c,
            d: arr[5].Options.d

        },
        answer: arr[5].answer
    },
    {
        num:  arr[6].num,
        question: arr[6].Question,
        Option: {
            a: arr[6].Options.a,
            b: arr[6].Options.b,
            c: arr[6].Options.c,
            d: arr[6].Options.d

        },
        answer: arr[6].answer
    }
]
},6000);


var wordingScore = document.getElementById("wordingScore");
var rightCount = document.getElementById("rightCount")
var wrongCount = document.getElementById("wrongCount")
var resultMainBox = document.getElementById("resultMainBox")



var optionUl = document.getElementsByClassName('optionUl');
var optionLists = document.getElementsByClassName("option");
var QuestBox = document.getElementsByClassName("QuestBox")
var count = 0;
var Quizquestion = document.getElementById('Quizquestion');
var quesNum = document.getElementById("quesNum")
var nextQuest = document.getElementById("nextQuest")
var score = 0;
var marks = 0;

//Quiz Start Button
quizBtn.onclick = function () {
    quizStartBtn[0].classList.add("hide");
    QuestBox[0].classList.remove("hide");
    quesChange(0)
    queCounter(1)

    nextQuest.style.display = "none"
    for (var i = 0; i < optionLists.length; i++) {
        optionLists[i].setAttribute("onclick", "optionSelected(this)")
    }

    //Timer
    var count = 50;
    var interval = setInterval(function () {
        document.getElementById('count').innerHTML = "Time left: " + count;
        count--;
        if (count === 0) {
            clearInterval(interval);
            document.getElementById('count').innerHTML = 'Time over';
            QuestBox[0].classList.add("hide");
            resultMainBox.classList.remove("hide")

        }

    }, 1000);

}

// Next Question 
let que_numb = 1
function nextQuestion() {
    count++
    que_numb++;
    if (count < quizQuestions.length) {
        quesChange(count)
        queCounter(que_numb);


        nextQuest.style.display = "none"
    }
    else {
        QuestBox[0].classList.add("hide");

        resultMainBox.classList.remove("hide")



    }

}

function quesChange(index) {

    Quizquestion.innerText = quizQuestions[index].question
    optionLists[0].innerHTML = quizQuestions[index].Option.a
    optionLists[1].innerHTML = quizQuestions[index].Option.b
    optionLists[2].innerHTML = quizQuestions[index].Option.c
    optionLists[3].innerHTML = quizQuestions[index].Option.d

    ////REMOVE Options Background/////
    for (var i = 0; i < optionLists.length; i++) {
        optionLists[i].classList.remove("success")
        optionLists[i].classList.remove("wrong")
    }
    ////REMOVE CLICK disabled  Background/////
    for (var i = 0; i < optionLists.length; i++) {
        optionLists[i].classList.remove("disabled")
    }
}
//Result Box or Question Check 
const resultBox = document.querySelector(".resultBox");
const scoreText = resultBox.querySelector(".score_text");

function optionSelected(answer) {
    // console.log(answer.innerHTML)
    if (answer.innerHTML === quizQuestions[count].answer) {
        console.log("correct")
        nextQuest.style.display = "block"
        answer.classList.add("success")
        score += 1;
        marks += 5;
        console.log(score)

        
        if (score > 3) { // if user scored more than 3
            //creating a new span tag and passing the user score number and total question number
            let scoreTag = '<span>  <p> ' + ' <p>' +'Name: ' + Name.value + '</p>' + '<p> and congrats! 🎉, You got ' + score + ' out of ' + quizQuestions.length + '</p>' + '<p> And your marks is ' + marks + ' out of 35 ' + '</p></span>';
            scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text

        }
        else if (score > 1) { // if user scored more than 1
            let scoreTag = '<span>  <p>' + ' <p>'+'Name: ' + Name.value + '</p>' + '  <p> and nice 😎, You got ' + score + ' out of ' + quizQuestions.length + '</p>' + ' <p> And your marks is ' + marks + ' out of 35'  +  '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    
        else { // if user scored less than 1
            let scoreTag = '<span>  <p>' + '<p>'+'Name: ' + Name.value + '</p>' + ' <p> and sorry 😐, You got only ' + score + ' out of ' + quizQuestions.length +'</p>' + ' <p> And your marks is ' + marks + ' out of 35 '  +  '</p></span>';
            scoreText.innerHTML = scoreTag;
        }



    }
    else {
        console.log("block")
        if(score==0){
            let scoreTag = '<span>  <p>' + '<p>'+'Name: ' + Name.value + '</p>' + ' <p>  Fail 😐, You got only ' + score + ' out of ' + quizQuestions.length +'</p>' + ' <p> And your marks is ' + marks + ' out of 35 '  +  '</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        nextQuest.style.display = "block"
        answer.classList.add("wrong")


        for (var i = 0; i < optionLists.length; i++) {

            if (optionLists[i].innerHTML === quizQuestions[count].answer) {
                optionLists[i].classList.add("success")
                // console.log(answer.innerHTML)
            }
        }
    }



    ///User select one option all option is block/////
    for (var i = 0; i < optionLists.length; i++) {
        optionLists[i].classList.add("disabled")
    }


}

// Question Number
const bottom_ques_counter = document.querySelector(" .total_que");

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>' + index + '  of ' + quizQuestions.length + ' Questions</p></span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}


