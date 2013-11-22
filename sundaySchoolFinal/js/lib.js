/*
//------------Browser-----------------
window.location.hash="no-back-button";
window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
window.onhashchange=function(){window.location.hash="no-back-button";}
//-----------Android ----------------
document.addEventListener("backbutton", onBackButton, false);
function onBackButton() {
}
*/
var dateToday = new Date();
var monthToday = dateToday.getMonth() + 1;

//For daily or today's file
var strFileToday = 'L' + monthToday + dateToday.getDate() + dateToday.getFullYear() + '.htm';

//For weekly file
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 0) / 7);
    //where "0" represents Sunday for the Sunday School Lessons to load automatically on app launch and "7" represents the days of the week
}

//String Values
var weekFileYearTxt = 'wk' + dateToday.getWeek() + dateToday.getFullYear() + '.txt';
var weekFileYearHtm = 'wk' + dateToday.getWeek() + dateToday.getFullYear() + '.htm';

$(document).ready(function() {
    $("#button1").click(function() {
        // $("#div1").load("demo_test-Copy(1).txt");
    });
    $("#div11").load(weekFileYearTxt);
    //});
    $("#button3").click(function() {
        $("#div3").load("demo_test-Copy(3).txt");
    });
    $("#button4").click(function() {
        $("#div4").load("demo_test-Copy(4).txt");
    });
    $("#button5").click(function() {
        $("#div5").load("demo_test-Copy(5).txt");
    });

    $("#calendar").click(function() {
        $("#SundayLessonDiv").load(strFileToday);
        $("#blessedWeek").load(weekFileYearHtm);
        //$("#appCalendar").load("calendarPicker.htm");
    });

    $("#L1").click(function() {
        $("#TodayLessonDiv").load("lesson.htm");
    });
    //$("#L1").click(function(){$("#TodayLessonDiv").load(L912013.txt);});
    $("#L2").click(function() {
        $("#TodayLessonDiv").load(L982013.txt);
    });
    $("#L3").click(function() {
        $("#TodayLessonDiv").load(L9152013.txt);
    });
    $("#L4").click(function() {
        $("#TodayLessonDiv").load(L9222013.txt);
    });
    $("#L5").click(function() {
        $("#TodayLessonDiv").load(L9292013.txt);
    });
    $("#L6").click(function() {
        $("#TodayLessonDiv").load(L1062013.txt);
    });
    $("#L7").click(function() {
        $("#TodayLessonDiv").load(L10132013.txt);
    });
    $("#L8").click(function() {
        $("#TodayLessonDiv").load(L10202013.txt);
    });
    $("#L9").click(function() {
        $("#TodayLessonDiv").load(L10272013.txt);
    });
    $("#L10").click(function() {
        $("#TodayLessonDiv").load(L1132013.txt);
    });
    $("#L11").click(function() {
        $("#TodayLessonDiv").load(L11102013.txt);
    });
    $("#L12").click(function() {
        $("#TodayLessonDiv").load(L11172013.txt);
    });
    $("#L13").click(function() {
        $("#TodayLessonDiv").load(L11242013.txt);
    });
    $("#L14").click(function() {
        $("#TodayLessonDiv").load(L1212013.txt);
    });
    $("#L15").click(function() {
        $("#TodayLessonDiv").load(L1282013.txt);
    });
    $("#L16").click(function() {
        $("#TodayLessonDiv").load(L12152013.txt);
    });
    $("#L17").click(function() {
        $("#TodayLessonDiv").load(L12222013.txt);
    });
    $("#L18").click(function() {
        $("#TodayLessonDiv").load(L12292013.txt);
    });
    $("#L19").click(function() {
        $("#TodayLessonDiv").load(L152014.txt);
    });
    $("#L20").click(function() {
        $("#TodayLessonDiv").load(L1122014.txt);
    });
    $("#L21").click(function() {
        $("#TodayLessonDiv").load(L1192014.txt);
    });
    $("#L22").click(function() {
        $("#TodayLessonDiv").load(L1262014.txt);
    });
    $("#L23").click(function() {
        $("#TodayLessonDiv").load(L222014.txt);
    });
    $("#L24").click(function() {
        $("#TodayLessonDiv").load(L292014.txt);
    });
    $("#L25").click(function() {
        $("#TodayLessonDiv").load(L2162014.txt);
    });
    $("#L26").click(function() {
        $("#TodayLessonDiv").load(L2232014.txt);
    });
    $("#L27").click(function() {
        $("#TodayLessonDiv").load(L322014.txt);
    });
    $("#L28").click(function() {
        $("#TodayLessonDiv").load(L392014.txt);
    });
    $("#L29").click(function() {
        $("#TodayLessonDiv").load(L3162014.txt);
    });
    $("#L30").click(function() {
        $("#TodayLessonDiv").load(L3232014.txt);
    });
    $("#L31").click(function() {
        $("#TodayLessonDiv").load(L3302014.txt);
    });
    $("#L32").click(function() {
        $("#TodayLessonDiv").load(L462014.txt);
    });
    $("#L33").click(function() {
        $("#TodayLessonDiv").load(L4132014.txt);
    });
    $("#L34").click(function() {
        $("#TodayLessonDiv").load(L4202014.txt);
    });
    $("#L35").click(function() {
        $("#TodayLessonDiv").load(L4272014.txt);
    });
    $("#L36").click(function() {
        $("#TodayLessonDiv").load(L542014.txt);
    });
    $("#L37").click(function() {
        $("#TodayLessonDiv").load(L5112014.txt);
    });
    $("#L38").click(function() {
        $("#TodayLessonDiv").load(L5182014.txt);
    });
    $("#L39").click(function() {
        $("#TodayLessonDiv").load(L5252014.txt);
    });
    $("#L40").click(function() {
        $("#TodayLessonDiv").load(L612014.txt);
    });
    $("#L41").click(function() {
        $("#TodayLessonDiv").load(L682014.txt);
    });
    $("#L42").click(function() {
        $("#TodayLessonDiv").load(L6152014.txt);
    });
    $("#L43").click(function() {
        $("#TodayLessonDiv").load(L6222014.txt);
    });
    $("#L44").click(function() {
        $("#TodayLessonDiv").load(L6292014.txt);
    });
    $("#L45").click(function() {
        $("#TodayLessonDiv").load(L762014.txt);
    });
    $("#L46").click(function() {
        $("#TodayLessonDiv").load(L7132014.txt);
    });
    $("#L47").click(function() {
        $("#TodayLessonDiv").load(L7202014.txt);
    });
    $("#L48").click(function() {
        $("#TodayLessonDiv").load(L7272014.txt);
    });
    $("#L49").click(function() {
        $("#TodayLessonDiv").load(L832014.txt);
    });
    $("#L50").click(function() {
        $("#TodayLessonDiv").load(L8102014.txt);
    });
    $("#L51").click(function() {
        $("#TodayLessonDiv").load(L8172014.txt);
    });
    $("#L52").click(function() {
        $("#TodayLessonDiv").load(L8242014.txt);
    });
    $("#L53").click(function() {
        $("#TodayLessonDiv").load(L8312014.txt);
    });


});
