var db; 
var dataWS = '';
var IdUsuario = '';
var language = '';
var page = 0;
var version = 0;
var classApp = '';
var idLesson = '';
var sqlLesson;
var resultConsult ='';
var titleLesson = '';
var lessonQuarter = '';
var lessonDate = '';
var blessedWeek = '';

var months = [{
"month": "January", "quarter" : "2nd Quarter"},{"month": "February", "quarter" : "2nd Quarter"},{"month": "March", "quarter" : "2nd Quarter"},
{"month": "April", "quarter" : "2nd Quarter"},{"month": "May", "quarter" : "3rd Quarter"},{"month": "June", "quarter" : "3rd Quarter"},
{"month": "July", "quarter" : "3er Quarter"},{"month": "August", "quarter" : "3rd Quarter"},{"month" : "September", "quarter" : "1st Quarter"},
{"month" : "October", "quarter" : "1st Quarter"},{"month": "November", "quarter" : "1st Quarter"},{"month" : "December", "quarter" : "1st Quarter"}];

var currentDate, totalNotes = 0;
var options = {collapsible: true, event: "tap", activate: accFocus,heightStyle: "content", icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    
    init();
}

function init() {
	
    document.addEventListener("backbutton", onBackKeyDown, false);
    
    if(page ==''){
         if($("#page").attr("data-index") == "home"){
            page=1;
        }
    }
    
    if(page == 1){
        console.log("eventos de pagina 1");
        queryLessons();
    }
    else{
        if(page == 2){
          console.log("pagina 2 listado lesson");  
            queryVersionApp();
            
            $.mobile.loading( 'show', {
        		text: "",
        		textVisible: "false",
        		theme: "b",
        		html: ""
        	});
        }else{
            if(page == 3){
                console.log("pagina 3 detalle lesson");
                
                $.mobile.loading( 'show', {
        		text: "",
        		textVisible: "false",
        		theme: "b",
        		html: ""
        	    });
                
             queryContentOutline(idLesson);   
              
            }else{
                if(page == 4){
                    console.log("pagina 4 today");
                    queryVersionApp();
                    
                    // 
                }else{
                    if(page == 5){
                        console.log("pagina 5 notes");
                        queryNote();
                        //eventsNotes();
                    }else{
                        if(page==6){
                            cargarURl();
                            
                        }
                    }
                }
            }
        }
    }
}
 

function onBackKeyDown(e) {
     
     if(page == 1)
     {
         function checkButtonSelection(param){
            console.log("opciones atras"+ param );
             if(param == 2)
             {
                 navigator.app.exitApp();
             }   
         }       
          e.preventDefault();
          navigator.notification.confirm(
          "Are sure you want to exit the app?",
          checkButtonSelection,
          'EXIT',
          'Cancel,OK');
     }else
         {
            if(page == 2)
            {
                page = 1;
                $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
                init(); 
            }else{
                if(page == 3)
                {
                     page = 2;
                     $("#page").attr("data-index","lessons");
                     $.mobile.changePage( "lessons.html", { transition: "slideup", reloadPage: true });
                     init();
                }else{
                    if(page == 4){
                        page = 1;
                        $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
                        init();        
                    }else{
                        if(page == 5){
                            //page = 1;
                            //$.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
                            //init();          
                        }
                    }
                }
            }
        }
 }

function eventsCalendar(){
    
    console.log("cargo los eventos del calendar");
    $('.home').tap(function(event){
		//event.preventDefault();
		console.log("evento del home desde calendar");
        page = 1;
        $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
        $("#page").attr("data-index","home");
        init();
	});
    
    $('.content').tap(function(event){
		event.preventDefault();
        console.log("tap lessons desde calendar");
        page = 2;
        $.mobile.changePage( "lessons.html", { transition: "slideup", reloadPage: true });
        $("#page").attr("data-index","lessons");
		//window.location='lessons.html';
        init();
	});  
    
    $('.notes').tap(function(event){
		event.preventDefault();
        console.log("tap notes desde calendar");
        page = 5;
        $.mobile.changePage( "notes.html", { transition: "slideup", reloadPage: true });
        $("#page").attr("data-index","notes");
		//window.location='lessons.html';
        init();
	});
    
    $('.backHome').tap(function(event){
		//event.preventDefault();
		console.log("evento del back desde lessonsssss");
        page = 1;
        $("#page").attr("data-index","lessons");
        $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
        init();
	});
    
    $('.noAuth').tap(function(event){
		//event.preventDefault();
		//alert("Avaliable in the Premion version");
        //messageGoPro();
        function checkButtonSelection(param){
             if(param == 2)
             {
                 //console.log("Le dio comprar");
                 //page = 6;
                 //$.mobile.changePage( "browser.html", { transition: "slideup", reloadPage: true });
                 cargarURl();
             }    
         }       
          event.preventDefault();
          navigator.notification.confirm(
          "Not avaliable in FREE version, you want to buy the app? ",
          checkButtonSelection,
          'Information',
          'Cancel,Buy');
        
	});
    
}

function cargarURl(){
    
    page = 1;
    $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
    $("#page").attr("data-index","home");
    init();
    //var ref = window.open(encodeURI('http://lesson.no-ip.info/?email=@gmail.com'), '_blank', 'location=no');
    //ref.addEventListener('loadstart', function(event) {  });
    //ref.addEventListener('loadstop', function(event) {  });
    //ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    //ref.addEventListener('exit', function(event) { 
    
        //console.log("cerro el navegador");
        
        
    //});
    //eventsHome();
    
}

function eventsHome(){
     
    console.log("eventos de home cargados");
    
    $('.content').tap(function(event){
		event.preventDefault();
        console.log("tap lessons");
        page = 2;
        $.mobile.changePage( "lessons.html", { transition: "slideup", reloadPage: true });
        $("#page").attr("data-index","lessons");
		//window.location='lessons.html';
        init();
	});  
    
    $('.home').tap(function(event){
		event.preventDefault();
        console.log("tap home desde home");
        
	});
    
    $('.calendar').tap(function(event){
		event.preventDefault();
        console.log("tap calendar desde home");
        page = 4;
        $.mobile.changePage( "today.html", { transition: "slideup", reloadPage: true });
        $("#page").attr("data-index","today");
        init();
	});
    
    
    $('.notes').tap(function(event){
		event.preventDefault();
        console.log("tap notes desde home");
        page = 5;
        $.mobile.changePage( "notes.html", { transition: "slideup", reloadPage: true });
        $("#page").attr("data-index","notes");
		//window.location='lessons.html';
        init();
	});
    
}
function queryLessons(){

    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM lessons';
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length == 0) {
                           console.log("No hay lesson sincronizadas");
                           
                            $.mobile.loading( 'show', {
							text: "Downloading data",
							textVisible: "false",
							theme: "b",
							html: ""
							});

                           queryDataUser();
                    }else{
                    	
                        setTimeout(function() {
                         console.log("The lessson is already syncronizadas");
                        eventsHome();
                      }, 500);
                        
                        
                    }
                },errorHandler);
            },errorHandler,nullHandler);
}

function queryDataUser(){

	db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM userData';
        transaction.executeSql(sql, [],function(transaction, result) {
                    console.log("resultados "+result.rows.length);
                    if (result.rows.length == 1) {
                          
                           var row = result.rows.item(0);
                           IdUsuario = row.id;
                           language = row.language;
                           console.log("usuario "+IdUsuario+"  languaje es"+language);
                           ApiRequestLessons(language);

                    }else{
                    	console.log("Error in the query of userData");
                    }

                },errorHandler);
            },errorHandler,nullHandler);
}

function ApiRequestLessons(language){

	var url = "http://dry-dawn-9293.herokuapp.com/lessons/language/"+language;
    $.ajaxSetup({
        type: "GET",
        dataType: "json"
    });

    $.ajax({
    	
    	url: url,
        success: function(data) {
           dataWS = data;
           db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
           console.log("success API lessons");
           db.transaction(InsertLessons, errorCB, successCB);

        },
        error: function(xhr, status, error) {
            console.log("error en la consulta de lessons");
        }
    });
}

function InsertLessons(tx){
	var countLesson = 0;
	
    $.each(dataWS, function(k,v){
			
            sqlLesson= 'INSERT OR REPLACE INTO lessons (week, title, date, memory_verse, verse, conclusion, question1, question2, out1, out2, intro, bible_pass) VALUES ('+v.week+',"'+ v.title+'","'+v.date+'","'+v.memory_verse+'","'+v.verse+'","'+v.conclusion+'","'+v.questions[0]+'","'+v.questions[1]+'","'+v.outline[0]+'","'+v.outline[1]+'","'+v.introduction+'","'+v.bible_passage+'")';
            
			sqlBlessedWeek = 'INSERT OR REPLACE INTO blessed_week(week_id, mon, tue, wed, thu, fri, sat, sun) VALUES('+v.week+',"'+v.blessed_week[0]+'","'+v.blessed_week[1]+'","'+v.blessed_week[2]+'","'+v.blessed_week[3]+'","'+v.blessed_week[4]+'","'+v.blessed_week[5]+'","'+v.blessed_week[6]+'" )';
			
            tx.executeSql(sqlBlessedWeek);
        
			for(var i=0; i<v.content.length; i++){
			    for(var j=0; j<v.content[i].length; j++){
					sqlContenOutline = 'INSERT INTO content_outline(week_id, out, content) VALUES('+v.week+","+(i+1)+',"'+v.content[i][j]+'")';
					tx.executeSql(sqlContenOutline);		
				}
			}
			
			tx.executeSql(sqlLesson);
			countLesson++;

		});
		
		$.mobile.loading( 'hide' );
		console.log("number of lessons "+countLesson);
        eventsHome();
}

// Contenido Lessons

function queryVersionApp(){

    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM userData';
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length == 1) {
                        var row = result.rows.item(0);
                    	version = row.version;
                    	if(page == 2){
                            if(version == 0){
                        		console.log("version gratis");
                        		classApp = 'free';
                        		queryFindLessons();
                    	    }else{
                        		classApp = 'pro';
                        		console.log("version paga");
                                queryFindLessons();
                    	    }    
                        }if(page == 4){
                            queryBlesedWeek();
                        }
                        
                          
                    }else{
                    	    console.log("No USERS");
                        }

                },errorHandler);
            },errorHandler,nullHandler);
}

function queryFindLessons(){
	
	db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM lessons ORDER BY week';
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length > 0) {
                        console.log("cantidad de semanas "+result.rows.length);
                        
                        Date.prototype.getWeek = function() {
                        var onejan = new Date(this.getFullYear(), 0, 1);
                        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 0) / 7);
                        }
                        
                        Date.prototype.getWeekOfMonth = function(exact) {
                                
                                var month = this.getMonth()
                                , year = this.getFullYear()
                                , firstWeekday = new Date(year, month, 1).getDay()
                                , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
                                , offsetDate = this.getDate() + firstWeekday - 1
                                , index = 0 // start index at 0 or 1, your choice
                                , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
                                , week = index + Math.floor(offsetDate / 7)
                            ;
                            if (exact || week < 2 + index) return week;
                            return week === weeksInMonth ? index + 5 : week;
                        }
                        
                        var fecha = new Date();
                        var i=0;
                        var dias = 7;
                        fecha.setDate(fecha.getDate() - (fecha.getDay() + 7) % 7);
                        //console.log(fecha);
                        var lastweekDate = new Date("2013-12-31");
                        var lastweek = lastweekDate.getWeek();
                        var semana = fecha.getWeek()-1;
                        console.log("semana inicial "+semana);
                        console.log("semana ultima "+lastweek);
                        var countLesson = fecha.getWeekOfMonth();
                        var mesActual='';
                        var anoActual ='';
                        
	                    while(i<lastweek){
	                    	
                            mesActual = fecha.getMonth()+1;
                            anoActual = fecha.getYear();
                            
                            if(i==0){
                                $('#listLessons').append('<li data-role="list-divider" data-theme="b"></li>');
                                $('#listLessons').append('<li data-role="list-divider">'+months[mesActual-1].month+', '+fecha.getFullYear()+' - '+months[mesActual-1].quarter+
                                                         '<span class="ui-li-count">'+weeksinMonth(mesActual-1,anoActual)+' Lessons</span>'+
                                                         '</li>');
                            }
	                    	
                            $('#listLessons').append('<li id="'+result.rows.item(semana).week+'" class="'+classApp+'" data-lesson="'+countLesson+'" data-date="'+months[mesActual-1].month+'-'+fecha.getDate()+'-'+fecha.getFullYear()+'" data-quarter="'+months[mesActual-1].quarter+'" ><a href="#"'+
							'>'+
							'<img src="images/calendar_dates_icons/sep_01.png" />'+
							'<h3>' + result.rows.item(semana).title  + '</h3>' +
							'<p>' + result.rows.item(semana).out1 + '</p>' +
							'<p>' + result.rows.item(semana).out1 + '</p>' +
							'<p class="ui-li-aside"><strong>Lesson ' + (countLesson) + '</strong></p></a></li>');
                            
                            
                            fecha.setDate(fecha.getDate() + dias);
                            if(mesActual == fecha.getMonth()+1){
                                countLesson++;
                            }else{
                                countLesson = 1;
                                var n = fecha.getMonth();
                                $('#listLessons').append('<li data-role="list-divider" data-theme="b"></li>');
                                $('#listLessons').append('<li data-role="list-divider">'+months[n].month+', '+fecha.getFullYear()+' - '+months[n].quarter+
                                                         '<span class="ui-li-count">'+weeksinMonth(n,fecha.getFullYear())+' Lessons</span>'+
                                                         '</li>');
                                if(anoActual != fecha.getYear()){
                                    semana = 0;
                                }
                            }
                            semana++;
                            i++;
    	                }
    	                $('#listLessons').listview('refresh');
    	                eventDetailLesson();
    	                $.mobile.loading( 'hide' );
                    }else{
                    	console.log("No lessons");
                    }

                },errorHandler);
            },errorHandler,nullHandler);
}

 function weeksinMonth(m, y){
    year= y;
    var mes;
    cont = 0;
    var d= new Date(year, m, 1);
    mes = d.getMonth();
    d.setDate(d.getDate() - (d.getDay() + 7) % 7);
    if(mes == d.getMonth())
    {
      cont++;
    }else
    {
      d.setDate(d.getDate() + 7);
      cont++;
    }

    while(mes == d.getMonth())
    {
      d.setDate(d.getDate() + 7);
      cont++;
      
    }
    return cont-1;     
}

function queryContentOutline(id){
    
    console.log("consultacontenidoOutline "+id);
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM content_outline where week_id='+id+' ORDER BY week_id';
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length > 0) {
	                    resultConsult = result;
                        queryLesson(idLesson, resultConsult);
                    }else{
                    	console.log("NO content for lesson"+id);
                    }
                   
                },errorHandler);
            },errorHandler,nullHandler);
}

function queryLesson(id, resultConsult){
    
   //console.log("contenido del html");
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM lessons where week='+idLesson;
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length == 1) {
	                    var row = result.rows.item(0);
                        $('#lesson').text('LESSON 0'+titleLesson);
	                    $('#quarter').text(lessonQuarter);
                        $('#title').text(row.title);
                        $('#date').html('<strong>'+lessonDate+'</strong>');
                        $('#memory_verse').html('<b>MEMORY VERSE TEXT</b><br>"'+row.memory_verse+'"- <strong>'+row.verse+'</strong>');
                        $('#bible_pass').html('<span class="ui-li-aside"><img src="images/Bible_small.png" /></span><br><b>BIBLE PASSAGE:</b><br>'+row.bible_pass);
                        $('#introducion').html('<b><u>INTRODUCTION</u></b><br>'+row.intro);
                        $('#out').html('<br><b>1. '+row.out1+'</b><br><b>2.'+row.out2+'</b>')    
                        $('#question').html('<b>QUESTIONS</b><hr><p>'+row.question1+'</p><hr><p>'+row.question2+'</p>');
                        $('#conclusion').html('<b>CONCLUSION</b><hr><p style="white-space:pre-line">'+row.conclusion+'</p>');
				    
                        for(var i=0; i<resultConsult.rows.length; i++){
	                    	var content = resultConsult.rows.item(i);
                            if(content.out == 1)
                            {
                                htmlOut1+='<p style="white-space:pre-line">'+content.content+'</p>';
                            
                            }else{
                                htmlOut2+='<p style="white-space:pre-line">'+content.content+'</p>';        
                            }
                        }
                        
                        $('#outline1').html('<b>'+row.out1+'</b><hr>'+htmlOut1);
                        $('#outline2').html('<b>'+row.out2+'</b><hr>'+htmlOut2);
    
                        
                        eventDetailLesson();
                    }else{
                    	console.log("No lessons "+idLesson);
                    }

                },errorHandler);
            },errorHandler,nullHandler);

}



function eventDetailLesson(){

    $('.backLessons').tap(function(event){
		//event.preventDefault();
		console.log("evento del back desde detalle lesson");
        page = 2;
        $("#page").attr("data-index","lessons");
        $.mobile.changePage( "lessons.html", { transition: "slide", reloadPage: true });
        init();
	});
    
    $('.free').tap(function(event){
		
        function checkButtonSelection(param){
             if(param == 2)
             {
                 console.log("Le dio comprar");
                 //page = 6;
                 //$.mobile.changePage( "browser.html", { transition: "slideup", reloadPage: true });
                 cargarURl();
             }   
         }       
          event.preventDefault();
          navigator.notification.confirm(
          "Not avaliable in FREE version, you want to buy the app? ",
          checkButtonSelection,
          'Information',
          'Cancel,Buy');
	});
        

	$('.pro').tap(function(event){
		event.preventDefault();
		console.log("SI tienes acceso a este contenido");
        idLesson = $(this).attr('id');
        titleLesson = $(this).attr('data-lesson');
        lessonQuarter = $(this).attr('data-quarter');
        lessonDate = $(this).attr('data-date');
        page = 3;
        $.mobile.changePage( "detailLesson.html", { transition: "slide", reloadPage: true });
        init();
	});
    
    $('.home').tap(function(event){
		//event.preventDefault();
		console.log("evento del home desde lessonsssss");
        page = 1;
        $("#page").attr("data-index","lessons");
        $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
        init();
	});
    
     $('.calendar').tap(function(event){
		event.preventDefault();
        console.log("tap calendar desde lesson");
        page = 4;
         $("#page").attr("data-index","today");
        $.mobile.changePage( "today.html", { transition: "slide", reloadPage: true });
        init();
	});
    
    $('.backHome').tap(function(event){
		//event.preventDefault();
		console.log("evento del back desde lessonsssss");
        page = 1;
        $("#page").attr("data-index","lessons");
        $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
        init();
	});
    
    $('.content').tap(function(event){
		event.preventDefault();
		console.log("evento del home desde lesson");
	});
    
    $('.search').tap(function(event){
		event.preventDefault();
		console.log("evento del home desde lesson");
	});
    
    $('.notes').tap(function(event){
		event.preventDefault();
        console.log("tap notes desde lesson");
        page = 5;
        $.mobile.changePage( "notes.html", { transition: "slideup", reloadPage: true });
        $("#page").attr("data-index","notes");
        init();
	});
}

function eventsNotes(){
    
    
    //$('#date').attr('value', getFormatD(new Date()));
    
    $('.home').tap(function(event){
		//event.preventDefault();
		console.log("evento del home desde notes");
        page = 1;
        $("#page").attr("data-index","lessons");
        $.mobile.changePage( "home.html", { transition: "slide", reloadPage: true });
        init();
	});
    
     $('.calendar').tap(function(event){
		event.preventDefault();
        console.log("tap calendar desde notes");
        page = 4;
         $("#page").attr("data-index","today");
        $.mobile.changePage( "today.html", { transition: "slide", reloadPage: true });
        init();
	});
    
    $(".saveNote").on('tap', function(e) {
        e.preventDefault();
        if(!$('#noteTitle').val()  || !$('#text').val())
            alert('All fields are requiered')
        else{
            //alert("campos completos");
            db.transaction(insertNote, errorCB, function(){});
        }
    });
    
    $('.content').tap(function(event){
		//event.preventDefault();
		console.log("evento de lesson desde notes");
        page = 2;
        $("#page").attr("data-index","lessons");
        $.mobile.changePage( "lessons.html", { transition: "slide", reloadPage: true });
        init();
	});
    
     
    if($.mobile.activePage[0].id == 'payment'){
        
    }
}

function queryBlesedWeek(){
    
    
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 0) / 7);
    }
    var fecha = new Date();
    fecha.setDate(fecha.getDate() - (fecha.getDay() + 7) % 7);
    var semana = fecha.getWeek();
    
    db.transaction(function(transaction) {
      var sql = 'SELECT * FROM blessed_week where week_id='+semana;
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length > 0) {
                       blessedWeek = result;
                       if(version == 1){
                         queryOutlineWeek(semana,blessedWeek);       
                       }else{
                           showLessonWeek(blessedWeek, semana);
                       }
                    }else{
                    	console.log("NO blesed week for "+semana);
                    }
                   
                },errorHandler);
            },errorHandler,nullHandler);
}

function showLessonWeek(blessedWeek, week){
    
    var fecha = new Date();
    fecha.setDate(fecha.getDate() - (fecha.getDay() + 7) % 7);
    
    $('#pro').hide();
    
    $('#blessedWeek').append('<li data-role="list-divider" data-theme="b"></li>'+
                             '<li data-role="list-divider">Week-'+week+
                             '<span class="ui-li-count">'+months[fecha.getMonth()].quarter+'</span>'+
                             '</li>');
    
    $('#blessedWeek').append('<li class="noAuth"><a href="#"><img src="images/calendar_dates_icons/sunday.png" />'+
                             '<h3>SUNDAY</h3><p>'+blessedWeek.rows.item(0).sun+'</p>'+
                             '<p class="ui-li-aside"><strong>Go Lesson</strong></p></a></li>'+
                             '<li data-role="list-divider" data-theme="b"></li>');
    
    $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/monday.png" />'+
                             '<h3>MONDAY</h3><p>'+blessedWeek.rows.item(0).mon+'</p>'+
                             '<p class="ui-li-aside"><strong>Monday</strong></p></li>'); 
    
    $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/tuesday.png" />'+
                             '<h3>TUESDAY</h3><p>'+blessedWeek.rows.item(0).tue+'</p>'+
                             '<p class="ui-li-aside"><strong>Tuesday</strong></p></li>'); 
    
    $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/wednesday.png" />'+
                             '<h3>WEDNESDAY</h3><p>'+blessedWeek.rows.item(0).wed+'</p>'+
                             '<p class="ui-li-aside"><strong>Wednesday</strong></p></li>');
    
    $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/thursday.png" />'+
                             '<h3>THURSDAY</h3><p>'+blessedWeek.rows.item(0).thu+'</p>'+
                             '<p class="ui-li-aside"><strong>Thursday</strong></p></li>'); 
    
    $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/friday.png" />'+
                             '<h3>FRIDAY</h3><p>'+blessedWeek.rows.item(0).fri+'</p>'+
                             '<p class="ui-li-aside"><strong>Friday</strong></p></li>'+
                             '<li data-role="list-divider" data-theme="b"></li>');
    
    $('#blessedWeek').listview('refresh');
    
    eventsCalendar();
    
}

function queryOutlineWeek(week, blessedWeek){
    
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM content_outline where week_id='+week+' ORDER BY out';
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length > 0) {
	                    resultConsult = result;
                        queryLessonWeek(week, blessedWeek, resultConsult);
                    }else{
                    	console.log("NO content for lesson"+id);
                    }
                   
                },errorHandler);
            },errorHandler,nullHandler);
    
}

function queryLessonWeek(week, blessedWeek, resultConsult){
    
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    Date.prototype.getWeekOfMonth = function(exact) {
        var month = this.getMonth()
            , year = this.getFullYear()
            , firstWeekday = new Date(year, month, 1).getDay()
            , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
            , offsetDate = this.getDate() + firstWeekday - 1
            , index = 0 // start index at 0 or 1, your choice
            , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
            , week = index + Math.floor(offsetDate / 7)
        ;
        if (exact || week < 2 + index) return week;
        return week === weeksInMonth ? index + 5 : week;
    }
    
    var LessonNumber = '';
    var fecha = new Date();
    fecha.setDate(fecha.getDate() - (fecha.getDay() + 7) % 7);
    LessonNumber = fecha.getWeekOfMonth();
    
    db.transaction(function(transaction) {
      
      var sql = 'SELECT * FROM lessons where week='+week;
        transaction.executeSql(sql, [],function(transaction, result) {
                    if (result.rows.length == 1) {
	                    var row = result.rows.item(0);
                        var htmlOut1='';
                        var htmlOut2='';
                        $('#lesson').text('LESSON 0'+LessonNumber);
	                    $('#quarter').text(months[fecha.getMonth()].quarter);
                        $('#title').text(row.title);
                        $('#date').html('<strong>'+months[fecha.getMonth()].month+'-'+fecha.getDate()+'-'+fecha.getFullYear()+'</strong>');
                        $('#memory_verse').html('<b>MEMORY VERSE TEXT</b><br>"'+row.memory_verse+'"- <strong>'+row.verse+'</strong>');
                        $('#bible_pass').html('<span class="ui-li-aside"><img src="images/Bible_small.png" /></span><br><b>BIBLE PASSAGE:</b><br>'+row.bible_pass);
                        $('#introducion').html('<b><u>INTRODUCTION</u></b><br>'+row.intro);
                        $('#out').html('<br><b>1. '+row.out1+'</b><br><b>2.'+row.out2+'</b>')    
                        $('#question').html('<b>QUESTIONS</b><hr><p>'+row.question1+'</p><hr><p>'+row.question2+'</p>');
                        $('#conclusion').html('<b>CONCLUSION</b><hr><p style="white-space:pre-line">'+row.conclusion+'</p>');
				    
                        for(var i=0; i<resultConsult.rows.length; i++){
	                    	var content = resultConsult.rows.item(i);
                            if(content.out == 1)
                            {
                                htmlOut1+='<p style="white-space:pre-line">'+content.content+'</p>';
                            
                            }else{
                                htmlOut2+='<p style="white-space:pre-line">'+content.content+'</p>';        
                            }
                        }
                        
                        $('#outline1').html('<b>'+row.out1+'</b><hr>'+htmlOut1);
                        $('#outline2').html('<b>'+row.out2+'</b><hr>'+htmlOut2);
    
                        $('#blessedWeek').append('<li data-role="list-divider" data-theme="b"></li>'+
                                                 '<li data-role="list-divider">Week-'+week+
                                                 '<span class="ui-li-count">'+months[fecha.getMonth()].quarter+'</span>'+
    	                                         '</li>');
                        
                        $('#blessedWeek').append('<li><a href="#"><img src="images/calendar_dates_icons/sunday.png" />'+
                                                 '<h3>SUNDAY</h3><p>'+blessedWeek.rows.item(0).sun+'</p></a></li>'+
                                                 '<li data-role="list-divider" data-theme="b"></li>');
                        
                        $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/monday.png" />'+
                                                 '<h3>MONDAY</h3><p>'+blessedWeek.rows.item(0).mon+'</p>'+
                                                 '<p class="ui-li-aside"><strong>Monday</strong></p></li>'); 
    			        
                        $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/tuesday.png" />'+
                                                 '<h3>TUESDAY</h3><p>'+blessedWeek.rows.item(0).tue+'</p>'+
                                                 '<p class="ui-li-aside"><strong>Tuesday</strong></p></li>'); 
                        
                        $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/wednesday.png" />'+
                                                 '<h3>WEDNESDAY</h3><p>'+blessedWeek.rows.item(0).wed+'</p>'+
                                                 '<p class="ui-li-aside"><strong>Wednesday</strong></p></li>');
                        
                        $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/thursday.png" />'+
                                                 '<h3>THURSDAY</h3><p>'+blessedWeek.rows.item(0).thu+'</p>'+
                                                 '<p class="ui-li-aside"><strong>Thursday</strong></p></li>'); 
                        
                        $('#blessedWeek').append('<li><img src="images/calendar_dates_icons/friday.png" />'+
                                                 '<h3>FRIDAY</h3><p>'+blessedWeek.rows.item(0).fri+'</p>'+
                                                 '<p class="ui-li-aside"><strong>Friday</strong></p></li>'+
                                                 '<li data-role="list-divider" data-theme="b"></li>');
                        
                        $('#blessedWeek').listview('refresh');
                        
                        eventsCalendar();
                    }else{
                    	console.log("No lessons "+idLesson);
                    }

                },errorHandler);
            },errorHandler,nullHandler);

    
}

function getFormatD(d) {
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var y = d.getFullYear();
    /*var hh = d.getHours();
    var m = d.getMinutes();
    var dd = "AM";
    if (hh >= 12) {
        hh -= 12;
        dd = "PM";
    }
    if (hh == 0) {
        hh = 12;
    }
    m = m<10?"0"+m:m;
    hh = hh<10?"0"+hh:hh;*/
    //return (month <= 9 ? '0' + month : month) + '/' + (day <= 9 ? '0' + day : day) + '/' + y + ' - ' + hh +':'+ m +' ' + dd;
    return (month <= 9 ? '0' + month : month) + '/' + (day <= 9 ? '0' + day : day) + '/' + y
}

function insertNote(db) {
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
        transaction.executeSql('INSERT INTO note (date, title, content) VALUES (?,?,?)',
                [getFormatD(new Date()), $('#noteTitle').val(),$('#text').val()], function(){
                                addNote(totalNotes,getFormatD(new Date()), $('#noteTitle').val(),$('#text').val())
                                totalNotes++;
                                $('#noteTitle').val('')
                                $('#text').val('')
                                //$('#date').attr('value', getFormatD(new Date()));
                                },
                errorHandler);
    });
}

function accFocus( event, ui ) {
    //alert(event.currentTarget)
}

function addNote(index,date,title,content){
    //$('#accordion').prepend('<h3 id="title'+index+'">'+title+'</h3><div><label for="date'+index+'">Note date</label><br><text id="date'+index+'" readonly>'+date+'</text><br><br><label for="title'+index+'">Note title</label><input maxlength="25" placeholder="Less than 25 characters please" id="title'+index+'" readonly value="'+title+'"/><br><br><label for="text'+index+'">Note content</label><br><textarea id="text'+index+'" maxlength="750" placeholder="Write your notes here" readonly>'+content+'</textarea><input type="button" id="edit'+index+'" class="editB" value="Edit"><input type="button" id="delete'+index+'" value="Delete"></div>').accordion('destroy').accordion({collapsible: true});
    $('#listNotes').prepend('<div data-role="collapsible" id="note'+index+'" data-collapsed="false">'+
                           '<h3>'+title+' - '+date+'</h3><label for="noteTitle'+index+'" class="ui-input-text">Note title</label>'+
                           '<div antes class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-d">'+
                           '<input name="noteTitle" id="noteTitle'+index+'" maxlength="15" placeholder="Less than 15 characters please" type="text" readonly value="'+title+'" class="ui-input-text ui-body-d"/></div>'+
                           '<label for="text'+index+'" class="ui-input-text" >Note content</label>'+
                           '<textarea id="text'+index+'" maxlength="750" placeholder="Write your notes here" readonly class="ui-input-text ui-body-d ui-corner-all ui-shadow-inset">'+content+'</textarea>'+
                           '<div data-demo-html="true">'+
                           '<p>'+
                           '<a href="#" id="edit'+index+'" data-role="button" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-hover-c"><span class="ui-btn-inner"><span class="ui-btn-text">Edit</span></span></a>'+
                           '<a href="#" id="delete'+index+'" data-role="button" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-hover-c"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span></span></a>'+
                           '</p>'+
                           '</div>').collapsibleset('refresh');
                           
    
    $('#listNotes').collapsibleset('refresh');       
    
    $('#edit'+index).on('tap', function() {
        if($(this).find('span').find('span').html() === 'Edit'){
            $('input#noteTitle'+index).removeAttr('readonly')
            $('#text'+index).removeAttr('readonly')
            $(this).find('span').find('span').html('Save')
        }
        else{
            if(!$('input#noteTitle'+index).val() || !$('#text'+index).val()){
                alert('Please complete all fields before saving')
            }
            else{
                currentDate = getFormatD(new Date())
                editNote(index,$('input#noteTitle'+index).val(),$('#text'+index).val())
                //$($('#edit'+index).closest('div').prev('h3')).html('<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>'+$('input#title'+index).val())
                $('#note'+index).find('h3').find('.ui-btn-text').html($('input#noteTitle'+index).val()+' - '+getFormatD(new Date()))
                //$('#date'+index).html(getFormatD(new Date()))
                $('input#noteTitle'+index).attr('readonly','true');
                $('#text'+index).attr('readonly','true');
                $(this).find('span').find('span').html('Edit')
            }
        }
});
    
    $('#delete'+index).on('tap', function(e) {
        e.preventDefault();
        navigator.notification.confirm(
        "Are sure you want to delete this note?",
        checkButtonSelection,
        'Delete Note',
        'No,Yes');
        function checkButtonSelection(param){
            if(param == 2){
                deleteNote(index)
                var parent = $('#delete'+index).closest('div');
                var head = parent.prev('h3');
                //parent.add(head).fadeOut('slow',function(){$(this).remove();});
                $('#note'+index).fadeOut('slow',function(){$(this).remove();});
            }
        }
    });
}

function queryNote(){
    
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
      var sql = 'SELECT * FROM note';
        transaction.executeSql(sql, [],function(transaction, result) {
                 if (result.rows.length > 0) {
                    totalNotes = result.rows.length;
                     setTimeout(function() {
                     for (var i=0; i<result.rows.length; i++){
                        addNote(result.rows.item(i).note_id,result.rows.item(i).date,result.rows.item(i).title,result.rows.item(i).content);
                        /*$('#listNotes').append('<div data-role="collapsible" id="'+result.rows.item(i).note_id+'" data-collapsed="false">'+
                           '<h3>'+result.rows.item(i).title+' date: '+result.rows.item(i).date+'</h3><label for="noteTitle'+result.rows.item(i).note_id+'" class="ui-input-text">Note title</label>'+
                           '<div antes class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-d">'+
                           '<input name="noteTitle" id="noteTitle'+result.rows.item(i).note_id+'" type="text" readonly value="'+result.rows.item(i).title+'" class="ui-input-text ui-body-d"/></div>'+
                           '<label for="text'+result.rows.item(i).note_id+'" class="ui-input-text" >Note content</label>'+
                           '<textarea id="text" maxlength="750" readonly class="ui-input-text ui-body-d ui-corner-all ui-shadow-inset">'+result.rows.item(i).content+'</textarea>'+
                           '<div data-demo-html="true">'+
                           '<p>'+
                           '<a href="#" id="edit"'+result.rows.item(i).note_id+'  data-role="button" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-hover-c"><span class="ui-btn-inner"><span class="ui-btn-text">Edit</span></span></a>'+
                           '<a href="#" id="delete"'+result.rows.item(i).note_id+'  data-role="button" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-hover-c"><span class="ui-btn-inner"><span class="ui-btn-text">Delete</span></span></a>'+
                           '</p>'+
                           '</div>').collapsibleset('refresh');*/
                    }
                                         
                    
                    console.log("SI HAY NOTAS EN LA BD "+totalNotes);
                         eventsNotes();
                    }, 500);  
                    
                        
                   
                 }else{
                     setTimeout(function() {
                         console.log("NO HAY NOTAS EN LA BD");
                         eventsNotes();
                      }, 500);
                     
                     
                  }   
                
                },errorHandler);
            },errorHandler,nullHandler);
}

function deleteNote(index){
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
                        var sql = 'DELETE FROM note WHERE note_id = '+index;
                        transaction.executeSql(sql, [],function(transaction, result) {},errorHandler);
                    },errorHandler,nullHandler);
}

function editNote(index,title,content){
    db = openDatabase("sundayApp", "1.0", "Sunday School DB", 1000000);
    db.transaction(function(transaction) {
                        var sql = 'UPDATE note SET title = "' + title + '",content = "' + content + '",date = "' + currentDate + '" WHERE note_id = ' + index;
                        transaction.executeSql(sql, [],function(transaction, result) {},errorHandler);
                    },errorHandler,nullHandler);
}

function showPaypal(){
    
}
