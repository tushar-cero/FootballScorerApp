//------------------GLOBAL VARIABLES------------------

var minutes=0;

//------------------NAME INPUT/OUTPUT------------------
    

var score = 0;
var arrA = new Array();
var data_base_A = new Array();

function inputFunA(e)
{
    var name_entered = (document.getElementById('Scorer_Name')).value;
    name_entered = cleanString(name_entered);

    if(name_entered == ''){
        return;
    }
    else{
        data_base_A.push(`${name_entered} ${minutes}"`);
        dataBaseToArray_A();
    }
    display_A();
    console.log('DataBase Array for Team A is '+data_base_A);
}
function dataBaseToArray_A(e)
{
    arrA = [];
    for(var i=0; i<data_base_A.length; i++)
    {
        var position = binarySearch(arrA, data_base_A[i]);
        if(position == -1){
            arrA.push(data_base_A[i]);
        }
        else{
            var minuteToBeAddedA = data_base_A[i].split(' ');
            var myLength = minuteToBeAddedA.length - 1;
            arrA[position] = arrA[position] + ' ' + minuteToBeAddedA[myLength];
        }
    }
}
function display_A()
{
    var Display_Area = document.getElementById('Display_Area_A');
    var scorecard = document.getElementById('scoreboardA');
    Display_Area.innerHTML = '';

    for(var i=0; i<arrA.length; i++)
    {
        var newName = document.createElement("p");
        newName.innerHTML = arrA[i];
        newName.className = 'newEntry';
        Display_Area.appendChild(newName);
    }
    score = whatIsTheScore(arrA);
    scorecard.innerHTML = score;
    console.log('Display Array for Team A is '+arrA);
}
function undoA(e)
{
    data_base_A.pop();
    dataBaseToArray_A();
    display_A();
}

// --- X ---

var arrB = new Array();
var data_base_B = new Array();

function inputFunB(e)
{
    var name_entered = (document.getElementById('Scorer_Name')).value;
    name_entered = cleanString(name_entered);
    
    if(name_entered == ''){
        return;
    }
    else{
        data_base_B.push(`${name_entered} ${minutes}"`);
        dataBaseToArray_B();
    }
    display_B();
    console.log('DataBase Array for Array B is '+data_base_B);
}
function dataBaseToArray_B(e)
{
    arrB = [];
    for(var i=0; i<data_base_B.length; i++)
    {
        var position = binarySearch(arrB, data_base_B[i]);
        if(position == -1){
            arrB.push(data_base_B[i]);
        }
        else{
            var minuteToBeAddedB = data_base_B[i].split(' ');
            var myLength = minuteToBeAddedB.length - 1;
            arrB[position] = arrB[position] + ' ' + minuteToBeAddedB[myLength];
        }
    }
}
function display_B()
{
    var Display_Area = document.getElementById('Display_Area_B');
    var scorecard = document.getElementById('scoreboardB');
    Display_Area.innerHTML = '';

    for(var i=0; i<arrB.length; i++)
    {
        var newName = document.createElement("p");
        newName.innerHTML = arrB[i];
        newName.className = 'newEntry';
        Display_Area.appendChild(newName);
    }
    score = whatIsTheScore(arrB);
    scorecard.innerHTML = score;
    console.log('Display Array for Team B '+arrB);
}
function undoB(e)
{
    data_base_B.pop();
    dataBaseToArray_B();
    display_B();
}


function whatIsTheScore(array)
{
    var score = 0;
    for(var i=0; i<array.length; i++)
    {
        var arrForEach = array[i].split(' ');
        //score = score + arrForEach.length - 1;
        for(var j=0; j<arrForEach.length; j++)
        {
            if(arrForEach[j].length==3 && arrForEach[j].charAt(2)=='"')
                score++;
            else if(arrForEach[j].length==2 && arrForEach[j].charAt(1)=='"')
                score++;
        }
    }
    return score;
}
function binarySearch(array, key)
{
    for(var i=0; i<array.length; i++)
    {
        var arrForEach = array[i].split(' ');
        var keyarr = key.split(' ');
        if(arrForEach[0]==keyarr[0]) 
        {
            return i; 
        }       
    }
    return -1;
}
function cleanString(myString)
{
    myString = myString.trim();

    if( hasLowerCase(myString.charAt(0)) )
    {
        myString = myString.charAt(0).toUpperCase() + myString.substring(1);
    }

    return myString;
}
function hasLowerCase(str)
{
    if(str.toUpperCase() != str){
        return true;
    }
    else{
        return false;    
    }
}

//------------------CARD WINDOW POP------------------

var foul_div = document.getElementById('Popup');

function closeWindow(e) {
    foul_div.className = 'hide';
}

function fullRedScreen(e) {
    foul_div.className = 'redcard';
    foul_div.scrollIntoView();
}

function fullYellowScreen(e) {
    foul_div.className = 'yellowcard';
    foul_div.scrollIntoView();
}

//------------------TIMERS------------------

var funCallVar = 0;
function counters(e)
{
    if((funCallVar)%2==0)
        startCounter(this);
    else
        stopCounter(this);
}
function startCounter(e)
{
    funCallVar++;
    clearID = window.setInterval(timerUpdate, 1000);
}
var timerEl = document.getElementById('StartButton');
var time = 0;
function timerUpdate(e)
{
    timerEl.innerHTML = '00:00';
    time++;
    var seconds = time%60;
    minutes = Math.floor(time/60);
    if(seconds<10){
        seconds = '0' + seconds;
    }
    if(minutes<10){
        minutes = '0' + minutes;
    }
    timerEl.innerHTML = `${minutes}:${seconds}`;
}

function stopCounter(e)
{
    funCallVar++;
    window.clearInterval(clearID);
}

//------------------ASK PERMISSION BEFORE REFRESH------------------

window.onbeforeunload = function (e) 
{
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};