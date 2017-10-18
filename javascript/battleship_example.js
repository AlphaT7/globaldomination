'use strict';

/* --- D E F I N E    V A R I A B L E S --- */

var shipmatrix = [[], [], [], [], []],
    battleshipArray = shipmatrix[0],
    submarineArray = shipmatrix[1],
    cruisemissilesubArray = shipmatrix[2],
    aircraftcarrierArray = shipmatrix[3],
    lifejacketArray = shipmatrix[4],
    shipcount = Number("0"),
    shiplimit,
    selectedcell,
    targetcell,
    enemyshipcount,
    gamestarted,
    gameover = false,
    airstrikeX = 1,
    airstrikeY = 1,
    fb = new Firebase("https://fiery-torch-4107.firebaseio.com"),
    currentuser,
    currentopponent = "null",
    opponentpending = "null",
    opponentreply = "null",
    availability = "Available",
    shiplocation = "",
    shiplocationarray = "",
    columns = ('a,b,c,d,e,f,g,h,i,j,l,m,n,o,p,q,u,r,s,t').split(","),
    opencoordinates = [],
    scattershotX = 1,
    cruisemissileX = 1,
    cruisemissileY = 1,
    
    scattershotcount = 0,
    cruisemissilecount = 0,
    torpedocount = 0,
    airstrikecount = 0,
    singleshotcount = 0,
    
    scattershotpercent = 0,
    cruisemissilepercent = 0,
    torpedopercent = 0,
    airstrikepercent = 0,
    singleshotpercent = 0
    

/* --- D O C U M E N T    R E A D Y    F U N C T I O N --- */

$("document").ready(function () {

    //$('#version').html("Version: " + battlematrix.version);

    var container = document.getElementById('matrix_content');
    var opponent = document.getElementById('matrix_opponent');
    shiplimit = $("#numberofships").val(); // needed here because it can only get #numberofships value after the document is ready.

    $(".cellClass").attr('unselectable', 'on');
    $(".cellClass").css('user-select', 'none');
    //$(".cellClass").on('selectstart', false);

    (function selfCellGrid() {
        var j = 1;

        while (j <= 20) {
            var i = 0;
            var h = 1;
            while (i <= 19) {

                var div_cell = document.createElement("div");
                div_cell.id = h + "-" + j;
                div_cell.className = "cellClass";
                div_cell.innerHTML = columns[i] + j;
                div_cell.setAttribute("unselectable", "on");
                container.appendChild(div_cell);
                i++;
                h++;
            }

            var end_of_row = document.createElement("br");
            container.appendChild(end_of_row);

            j++;
        }
    })();

    (function opponentCellGrid() {
        var j = 1;

        while (j <= 20) {
            var i = 0;
            var h = 1;
            while (i <= 19) {

                var div_cell = document.createElement("div");
                div_cell.id = "O-" + h + "-" + j;
                div_cell.className = "cellClass";
                div_cell.innerHTML = columns[i] + j;
                div_cell.setAttribute("unselectable", "on");
                opencoordinates[opencoordinates.length] = div_cell.id; // creates an array of all of the opponent coordinates to be used with scattershot;
                opponent.appendChild(div_cell);
                i++;
                h++;
            }

            var end_of_row = document.createElement("br");
            opponent.appendChild(end_of_row);

            j++;
        }
    })();

    /* --- M O U S E    E V E N T S --- */

    // Right click menu for the firing options

    $("body").bind("contextmenu", function (e) { return false; }); //disable right click outside of the grid

    var currentMousePos = { x: 0, y: -1 };

    jQuery(function ($) {
        $(document).mousemove(function (event) {
            currentMousePos.x = event.pageX;
            currentMousePos.y = event.pageY;
        });
    });

    $(".cellClass").click(function () {
        if ($(this).parent().attr("id") == "matrix_opponent" && gameover == false && gamestarted == "started") { // if it's the enemy grid, then...
            targetcell = this.id;
            $("#fireweapon_header").html(" - " + this.innerHTML + " - ");
            if (((this.id).split("-")[2]) > 10) {
                var invertedaxis = Number(currentMousePos.y) + Number($('#fireweapon').height() - 350);
                $("#rightclickmenu").css({ top: invertedaxis, left: currentMousePos.x, position: 'absolute', display: 'block', 'z-index': '20' });
            } else {
                $("#rightclickmenu").css({ top: currentMousePos.y, left: currentMousePos.x, position: 'absolute', display: 'block', 'z-index': '20' });
            }
            $("#rightclickmenu").toggleClass("hidden");
            return false;
        } else if ($(this).parent().attr("id") == "matrix_content") { // else if it's my grid then...
            if (gamestarted != "started") {
                $("#selectship_header").html(" - " + this.innerHTML + " - ");
                if (((this.id).split("-")[1]) > 10) {
                    var invertedaxis = (currentMousePos.y + $('#selectship').height() - 400);
                    $("#rightclickships").css({ top: invertedaxis, left: currentMousePos.x, position: 'absolute', display: 'block', 'z-index': '20' });
                } else {
                    var invertedaxis = (currentMousePos.y);
                    $("#rightclickships").css({ top: invertedaxis, left: currentMousePos.x, position: 'absolute', display: 'block', 'z-index': '20' });
                }
                $("#rightclickships").toggleClass("hidden");
                selectedcell = this.id;
                return false;
            }
        } //else { alert("The game has already started."); }
    });

    $("#battleship_v, #battleship_h, #submarine_v, #submarine_h, #cruise_missile_sub_v, #cruise_missile_sub_h, #aircraft_carrier_v, #aircraft_carrier_h, #lifejacket").mouseup(function () {
        selectShipType(this.id, selectedcell); $("#rightclickships").addClass("hidden");
    });

    /* --- S E T    C L I C K    E V E N T S --- */

    $("#clear_battleship").click(function () { clearShips("clear_battleship"); });

    $("#clear_submarine").click(function () { clearShips("clear_submarine"); });

    $("#clear_cruisemissilesub").click(function () { clearShips("clear_cruisemissilesub"); });

    $("#clear_aircraftcarrier").click(function () { clearShips("clear_aircraftcarrier"); });

    $("#clear_lifejacket").click(function () { clearShips("clear_lifejacket"); });

    $("#clear_allships").click(function () { clearShips("all"); });

    $("#settings_button").click(function () { $("#settings_bg").show(); $("#settings_container").fadeIn("slow"); });

    $("#settings_bg").click(function () { $("#settings_bg").fadeOut("slow"); $("#settings_container").fadeOut("slow"); });

    $("#mygrid").click(function () { $("#matrix_opponent").hide(); $("#matrix_content").show(); $("#rightclickmenu").hide(); $("#ebattleshipcount_shell").hide(); $("#battleshipcount_shell").show(); }); // hide mygrid and show enemygrid and shipcount

    $("#enemygrid").click(function () { $("#matrix_content").hide(); $("#matrix_opponent").show(); $("#rightclickships").hide(); $("#ebattleshipcount_shell").show(); $("#battleshipcount_shell").hide(); }); // hide enemygrid and show mygrid and shipcount

    for (var i = 1; i <= 7; i++) { // Set "onclick" events for the settings buttons;
        $("#button_group" + i).click(function () { selectSettingsGroup(this.id); });
    }

    $("#button_group2").click(function () { $("#settings_bg").fadeOut("slow"); $("#settings_container").fadeOut("slow"); });

    $("#returntogame").click(function () { $("#settings_bg").fadeOut("slow"); $("#settings_container").fadeOut("slow"); });

    //$("#button_group3").click(function(){ /*listEnemyGrid();*/ });

    $("#chatbox").keypress(function (e) {
        if (e.keyCode == 13 && e.shiftKey) {
            $("#chatbox").val($("#chatbox").val() + "\n");
        } else if (e.which == 13) {
            if (currentopponent != "null") {
                fb.child("users").child(currentuser).child("chat").push({ chat: "<b>" + currentuser + " @ " + timeStamp() + "</b><br>" + $("#chatbox").val() });
                fb.child("users").child(currentopponent).child("chat").push({ chat: "<b>" + currentuser + " @ " + timeStamp() + "</b><br>" + $("#chatbox").val() });
                $("#chatbox").val("");
            } else { alert("Please create a new grid and select an opponent before using the chat system."); $("#chatbox").val(""); }
        }
        //return false;
    });

    $('#newgridsubmit').click(function () {

        fb.child("users").once('value', function (dataSnapshot) {
            if (dataSnapshot.hasChild($('#mygridname').val()) == true) { alert("This user-name is taken."); }
            else {

                if ($('#mygridname').val() != '' && $('#shiplayout').html() == "Completed") {

                    currentuser = $('#mygridname').val();
                    $("#config-mygrid").html(currentuser);

                    fb.child("users").child($('#mygridname').val()).set({
                        userid: $('#mygridname').val(),
                        numberofships: $("#numberofships").val(),
                        opponent: currentopponent,
                        opponentpending: opponentpending,
                        opponentreply: opponentreply,
                        availability: availability,
                        playerturn: "null",
                        opponentshot: "null",
                        hitormiss: "null",
                        msgalert: "null",
                        enemyshipcount: "null",
                        chat: "null",
                        gameover: "false",
                        gridpercent: "null",
                        gameturn: "null"
                    });

                    fb.child("users").child(currentuser).child("chat").on("child_added", function (snapshot) {
                        var container = document.getElementById("chat_results");
                        var chatitem = snapshot.val();
                        var chat_div = document.createElement("div");
                        if (chatitem.chat.search(currentuser) == "-1") { chat_div.className = "chatdiv_O"; }
                        else { chat_div.className = "chatdiv"; }
                        chat_div.innerHTML = chatitem.chat;
                        container.appendChild(chat_div);
                        container.scrollTop = container.scrollHeight; //scroll to the bottom
                    });

                    fb.child("users").child(currentuser).on('child_changed', function (snapshot) {

                        switch (snapshot.key()) {

                            case "opponentpending":
                                var r = confirm(snapshot.val() + " has challenged you to a battle! Do you accept?");
                                if (r == true) { //x = "You pressed OK!";
                                    currentopponent = snapshot.val();
                                    fb.child("users").child(currentuser).update({
                                        opponent: currentopponent,
                                        playerturn: "false",
                                        availability: "false"
                                    });

                                    fb.child("users").child(currentopponent).update({
                                        opponent: currentuser,
                                        opponentreply: currentuser + " has accepted your challenge!",
                                        playerturn: "true",
                                        availability: "false"
                                    });

                                    fb.child("users").child(currentopponent).update({
                                        enemyshipcount: opponentshipcountarray() // send over ship count to the opponent
                                    });

                                    $("#config-enemygrid").html(currentopponent);

                                    gamestarted = "started";

                                    $("#hidenewgame").hide();
                                    $("#newgamestarted").toggleClass("hidden");

                                } else { //x = "You pressed Cancel!";
                                    currentopponent = snapshot.val();
                                    fb.child("users").child(currentopponent).update({ opponentreply: currentuser + " has declined your challenge. Please choose another opponent." });
                                }
                                break;

                            case "opponentreply":
                                if (snapshot.val().search("accepted") != -1) {
                                    fb.child("users").child(currentuser).child("opponent").once("value", function (data) {
                                        $("#config-enemygrid").html(data.val());
                                        currentopponent = data.val();
                                    });

                                    fb.child("users").child(currentopponent).update({
                                        enemyshipcount: opponentshipcountarray()
                                    });

                                    gamestarted = "started";

                                    $("#hidenewgame").hide();
                                    $("#newgamestarted").toggleClass("hidden");
                                }
                                alert(snapshot.val());
                                break;

                            case "playerturn":
                                if (snapshot.val() == "true") {
                                    if (gameover == false) {
                                        $("#playerturn").html("Your Turn");
                                        $("#playerturn").css("background-color", "#449D44");
                                    }
                                } else {
                                    if (gameover == false) {
                                        $("#playerturn").html("Opponents Turn");
                                        $("#playerturn").css("background-color", "#D9534F");
                                    }
                                }
                                break;

                            case "opponentshot":
                                fireweapon(snapshot.val());
                                break;

                            case "hitormiss":
                                hitormiss(snapshot.val());
                                break;

                            case "msgalert":
                                if (snapshot.val() != "null") {
                                    alert(snapshot.val());
                                }
                                break;

                            case "enemyshipcount":
                                opponentshipcount(snapshot.val());
                                break;

                            case "gameover":
                                if (snapshot.val() == "true") {
                                    gameover = "true";
                                    $("#playerturn").html("Victory!");
                                    $("#playerturn").css("background-color", "#3071A9");
                                }
                                break;
                            case "gridpercent":
                                    $("#metrics-mygridpercent").html(snapshot.val());
                                    gridpercentbar("#metrics-mygridpercent_bg", snapshot.val() + "%");  //fills up percentage grid with color based on current percentage
                                break;
                        }
                    });

                    alert("Save Successfull!");
                    $("#newgridsubmit").remove();
                    //$( "#success").fadeIn( "slow" );
                    //setTimeout(function(){$( "#success").fadeOut( "slow" );}, 3000);
                } else {
                    if ($('#mygridname').val() == '') { $('#mygridname_shell').addClass('shadowed'); }
                    if ($('#shiplayout').html() == 'Incomplete') { $('#shiplayout_shell').addClass('shadowed'); }
                }
            }
        });
    });

    $("#mygridname").keydown(function () { $('#mygridname_shell').removeClass('shadowed'); });

    $("#numberofships").change(function () {
        shiplimit = $('#numberofships').val();
        $("#config-numberofships").html(shiplimit);
        if (shipcount < shiplimit) { $('#shiplayout').html("Incomplete"); }
        else if (shipcount == shiplimit) { $('#shiplayout').html('Completed'); $("#shiplayout_shell").removeClass("shadowed"); }
        //else if(shipcount > shiplimit){ $('#numberofships').val('20'); 
        //alert('You cannot set the ship limit to less than the number of ships on the grid.');
        //$('#shiplayout').html('Incomplete');
        // } 
    }); // Keep the above commented code; may need to  uncomment it at some point.

    $("#resetmygrid").click(function () {
        var x;
        if (confirm("This will reset your entire grid (not the enemy grid) and all current settings. Are you sure?") == true) {
            x = "You pressed OK!";
            location.reload();
        } else {
            x = "You pressed Cancel!";
        }
    });

    /* --- F I R E    W E A P O N --- */
    $("#singleshot").click(function () { prepweapon("singleshot"); $("#rightclickmenu").addClass("hidden"); });
    $("#torpedo_ltr").click(function () { prepweapon("torpedo_ltr"); $("#rightclickmenu").addClass("hidden"); });
    $("#torpedo_rtl").click(function () { prepweapon("torpedo_rtl"); $("#rightclickmenu").addClass("hidden"); });
    $("#torpedo_ttb").click(function () { prepweapon("torpedo_ttb"); $("#rightclickmenu").addClass("hidden"); });
    $("#torpedo_btt").click(function () { prepweapon("torpedo_btt"); $("#rightclickmenu").addClass("hidden"); });
    $("#airstrike").click(function () { prepweapon("airstrike"); $("#rightclickmenu").addClass("hidden"); });
    $("#scattershot").click(function () { prepweapon("scattershot"); $("#rightclickmenu").addClass("hidden"); });
    $("#nuke").click(function () { prepweapon("nuke"); $("#rightclickmenu").addClass("hidden"); });


    /* --- I C O S A H E D R O N    J S --- */

    function icosahedron() {

    // workaround for chrome bug: http://code.google.com/p/chromium/issues/detail?id=35980#c12
    if (window.innerWidth === 0) { window.innerWidth = parent.innerWidth; window.innerHeight = parent.innerHeight; }

    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    animate();

        function init() {
            
            //camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
            camera = new THREE.PerspectiveCamera(75, 300 / 300, 1, 1000);
            camera.position.z = 500;

            scene = new THREE.Scene();

            geometry = new THREE.IcosahedronGeometry(200, 1);
            material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, wireframeLinewidth: 1 });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(200, 200);
            //renderer.setSize(window.innerWidth, window.innerHeight);

            document.getElementById('icosahedron').appendChild(renderer.domElement);

        }

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x = Date.now() * 0.00005;
            mesh.rotation.y = Date.now() * 0.0001;
            renderer.render(scene, camera);
        }
    };

    icosahedron();

/* --- D 3    P I E    C H A R T --- */ 

d3piechart();

}); // end of $("document").ready() starting on line# 24;

/* --- F U N C T I O N S --- */

function selectShipType(shipType, cell) {
    exitSelectShipType: {

        var shiplimit = $("#numberofships").val();
        var shipgrid;
        var i;

        switch (shipType) {

            case "battleship_v":

                if (cell.split("-")[1] > 18) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {

                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        shiplocationarray[shiplocationarray.length] = shiplocation;
                        $(shiplocation).addClass("battleship-green");
                    }
                    battleshipArray[battleshipArray.length] = shiplocationarray;
                    $("#battleshipscount").html(battleshipArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --");
                }
                break;
            case "battleship_h":
                if (cell.split("-")[0] > 18) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        shiplocationarray[shiplocationarray.length] = shiplocation;
                        $("#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1]).addClass("battleship-green");
                    }
                    battleshipArray[battleshipArray.length] = shiplocationarray;
                    $("#battleshipscount").html(battleshipArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --");
                }
                break;
            case "submarine_v":
                if (cell.split("-")[1] > 17) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        shiplocationarray[shiplocationarray.length] = shiplocation;
                        $("#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i))).addClass("submarine-green");
                    }
                    submarineArray[submarineArray.length] = shiplocationarray;
                    $("#submarinescount").html(submarineArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --");
                }
                break;
            case "submarine_h":
                if (cell.split("-")[0] > 17) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        shiplocationarray[shiplocationarray.length] = shiplocation;
                        $("#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1]).addClass("submarine-green");
                    }
                    submarineArray[submarineArray.length] = shiplocationarray;
                    $("#submarinescount").html(submarineArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --");
                }
                break;
            case "cruise_missile_sub_v":
                if(cruisemissilesubArray.length == 2){alert("You have reached the maximum number of this ship type available."); break exitSelectShipType;}
                if (cell.split("-")[0] > 19 || cell.split("-")[1] > 18) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    var column2 = Number(shipgrid[0]) + Number(1);
                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }

                        shiplocation = "#" + column2 + "-" + (Number(shipgrid[1]) + Number(i));
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        shiplocation = "#" + column2 + "-" + (Number(shipgrid[1]) + Number(i));
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        $("#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i))).addClass("cruisemissilesub-green");
                        $("#" + column2 + "-" + (Number(shipgrid[1]) + Number(i))).addClass("cruisemissilesub-green");
                    }
                    cruisemissilesubArray[cruisemissilesubArray.length] = shiplocationarray;
                    $("#cruisemissilesubscount").html(cruisemissilesubArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --");
                }
                break;
            case "cruise_missile_sub_h":
                if(cruisemissilesubArray.length == 2){alert("You have reached the maximum number of this ship type available."); break exitSelectShipType;}
                if (cell.split("-")[0] > 18 || cell.split("-")[1] > 19) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    var row2 = Number(shipgrid[1]) + Number(1);
                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }

                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + row2;
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 2; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + row2;
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        $("#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1]).addClass("cruisemissilesub-green");
                        $("#" + (Number(shipgrid[0]) + Number(i)) + "-" + row2).addClass("cruisemissilesub-green");
                    }
                    cruisemissilesubArray[cruisemissilesubArray.length] = shiplocationarray;
                    $("#cruisemissilesubscount").html(cruisemissilesubArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --");
                }
                break;
            case "aircraft_carrier_v":
                if (cell.split("-")[0] > 19 || cell.split("-")[1] > 17) {
                    alert("Out of Bounds");
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    var column2 = Number(shipgrid[0]) + Number(1);
                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }

                        shiplocation = "#" + column2 + "-" + (Number(shipgrid[1]) + Number(i));
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i));
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        shiplocation = "#" + column2 + "-" + (Number(shipgrid[1]) + Number(i));
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        $("#" + shipgrid[0] + "-" + (Number(shipgrid[1]) + Number(i))).addClass("aircraftcarrier-green");
                        $("#" + column2 + "-" + (Number(shipgrid[1]) + Number(i))).addClass("aircraftcarrier-green");
                    }
                    aircraftcarrierArray[aircraftcarrierArray.length] = shiplocationarray;
                    $("#aircraftcarrierscount").html(aircraftcarrierArray.length); //set the count to display
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --")
                }
                break;
            case "aircraft_carrier_h":
                if (cell.split("-")[0] > 17 || cell.split("-")[1] > 19) {
                    alert("Out of Bounds")
                } else if (shipcount < shiplimit) {
                    shipgrid = cell.split("-");
                    shiplocationarray = [];

                    var row2 = Number(shipgrid[1]) + Number(1);
                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }

                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + row2;
                        if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }
                    }

                    for (i = 0; i <= 3; i++) {
                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1];
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        shiplocation = "#" + (Number(shipgrid[0]) + Number(i)) + "-" + row2;
                        shiplocationarray[shiplocationarray.length] = shiplocation;

                        $("#" + (Number(shipgrid[0]) + Number(i)) + "-" + shipgrid[1]).addClass("aircraftcarrier-green");
                        $("#" + (Number(shipgrid[0]) + Number(i)) + "-" + row2).addClass("aircraftcarrier-green");
                    }
                    aircraftcarrierArray[aircraftcarrierArray.length] = shiplocationarray;
                    $("#aircraftcarrierscount").html(aircraftcarrierArray.length); //set the count to display 
                    totalships();
                } else {
                    alert("-- Ship Limit Reached --")
                }
                break;
            case "lifejacket":
                if (shipcount < shiplimit) {
                    shiplocationarray = [];

                    shiplocation = "#" + cell;
                    if (checkShipLocation(shiplocation) == "true") { alert("One or more coordinates already used."); break exitSelectShipType; }

                    shiplocationarray[shiplocationarray.length] = shiplocation;
                    $("#" + cell).addClass("lifejacket-green");

                    lifejacketArray[lifejacketArray.length] = shiplocationarray;
                    $("#lifejacketscount").html(lifejacketArray.length); //set the count to display
                    totalships();
                    break;
                } else {
                    alert("-- Ship Limit Reached --")
                }
        }
    }
}

function checkShipLocation(new_targetcell) {
    exitcheckShipLocation: {
        for (var j = 0; j < shipmatrix.length; j++) {
            if (shipmatrix[j].length != 0) { // cycle through the shipmatrix array and see if any coordinates are in place
                for (var i = 0; i < shipmatrix[j].length; i++) {
                    if (shipmatrix[j][i].indexOf(new_targetcell) != "-1") { return "true"; break exitcheckShipLocation; } // if it's a hit return "true", other wise continue;
                }
            }
        }
    }
}


function selectSettingsGroup(pressedbutton) {// "Tab" structure to change the tab group visible depending on which settings button is pressed;
    var button;
    var i;
    for (i = 1; i <= 7; i++) {
        button = 'button_group' + i;

        if (button == pressedbutton) {
            $("#settings_group" + i).attr("class", "settings_group");
        } else {
            $("#settings_group" + i).attr("class", "hidden");
        }
    }
}

function clearShips(ship_type) {

    switch (ship_type) {

        case "clear_battleship":
            $(".battleship-green").removeClass("battleship-green");
            while (battleshipArray.length > 0) { battleshipArray.pop(); }
            $("#battleshipscount").html(battleshipArray.length);
            totalships();
            break;

        case "clear_submarine":
            $(".submarine-green").removeClass("submarine-green");
            while (submarineArray.length > 0) { submarineArray.pop(); }
            $("#submarinescount").html(submarineArray.length);
            totalships();
            break;

        case "clear_cruisemissilesub":
            $(".cruisemissilesub-green").removeClass("cruisemissilesub-green");
            while (cruisemissilesubArray.length > 0) { cruisemissilesubArray.pop(); }
            $("#cruisemissilesubscount").html(cruisemissilesubArray.length);
            totalships();
            break;

        case "clear_aircraftcarrier":
            $(".aircraftcarrier-green").removeClass("aircraftcarrier-green");
            while (aircraftcarrierArray.length > 0) { aircraftcarrierArray.pop(); }
            $("#aircraftcarrierscount").html(aircraftcarrierArray.length);
            totalships();
            break;

        case "clear_lifejacket":
            $(".lifejacket-green").removeClass("lifejacket-green");
            while (lifejacketArray.length > 0) { lifejacketArray.pop(); }
            $("#lifejacketscount").html(lifejacketArray.length)
            totalships();
            break;

        case "all":
            $(".battleship-green").removeClass("battleship-green");
            while (battleshipArray.length > 0) { battleshipArray.pop(); }
            $("#battleshipscount").html(battleshipArray.length);

            $(".submarine-green").removeClass("submarine-green");
            while (submarineArray.length > 0) { submarineArray.pop(); }
            $("#submarinescount").html(submarineArray.length);

            $(".cruisemissilesub-green").removeClass("cruisemissilesub-green");
            while (cruisemissilesubArray.length > 0) { cruisemissilesubArray.pop(); }
            $("#cruisemissilesubscount").html(cruisemissilesubArray.length);

            $(".aircraftcarrier-green").removeClass("aircraftcarrier-green");
            while (aircraftcarrierArray.length > 0) { aircraftcarrierArray.pop(); }
            $("#aircraftcarrierscount").html(aircraftcarrierArray.length);

            $(".lifejacket-green").removeClass("lifejacket-green");
            while (lifejacketArray.length > 0) { lifejacketArray.pop(); }
            $("#lifejacketscount").html(lifejacketArray.length)

            totalships();

            break;
    }
}

function opponentshipcount(enemyshipcountArray) {
    enemyshipcountArray = enemyshipcountArray.split(",");
    $("#ebattleshipscount").html(enemyshipcountArray[0]);
    $("#esubmarinescount").html(enemyshipcountArray[1]);
    $("#ecruisemissilesubscount").html(enemyshipcountArray[2]);
    $("#eaircraftcarrierscount").html(enemyshipcountArray[3]);
    $("#elifejacketscount").html(enemyshipcountArray[4]);
    $("#eshipstotal").html(Number(enemyshipcountArray[0]) + Number(enemyshipcountArray[1]) + Number(enemyshipcountArray[2]) + Number(enemyshipcountArray[3]) + Number(enemyshipcountArray[4]));
}

function opponentshipcountarray() {
    enemyshipcount = battleshipArray.length + "," + submarineArray.length + "," + cruisemissilesubArray.length + "," + aircraftcarrierArray.length + "," + lifejacketArray.length;
    return enemyshipcount;
}

function myshipcount() {
    $("#battleshipscount").html(battleshipArray.length);
    $("#submarinescount").html(submarineArray.length);
    $("#cruisemissilesubscount").html(cruisemissilesubArray.length);
    $("#aircraftcarrierscount").html(aircraftcarrierArray.length);
    $("#lifejacketscount").html(lifejacketArray.length);
}

function totalships() {
    shipcount = Number(battleshipArray.length) + Number(submarineArray.length) + Number(cruisemissilesubArray.length) + Number(aircraftcarrierArray.length) + Number(lifejacketArray.length);
    $("#shipstotal").html(shipcount);
    if (shipcount == $("#numberofships").val()) { $("#shiplayout").html("Completed"); $('#shiplayout_shell').removeClass('shadowed'); } else { $("#shiplayout").html("Incomplete"); }
}

function prepweapon(weapon_type) {
    exitprepweapon: {

        switch (weapon_type) {

            case "singleshot":
               // if(lifejacketArray.length == 0){alert("You do not have any Life Jackets to fire this weapon type."); break exitprepweapon;}
               // commented out the above line of code; want this weapon to be available regardless of ship available.
                fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                    if (data.val() == "false") {
                        alert("Please wait for your turn.");
                    } else {
                        
                        if(opencoordinates.indexOf(targetcell) != "-1"){
                            opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                        }

                        $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                        updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                        gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage

                        var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                        fb.child("users").child(currentopponent).update({
                            opponentshot: "singleshot," + new_targetcell
                        });
                    }
                });

                break;

            case "torpedo_ltr":
                if(submarineArray.length == 0){alert("You do not have any Submarines to fire this weapon type."); break exitprepweapon;}
                fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                    if (data.val() == "false") {
                        alert("Please wait for your turn.");
                    } else {
                        
                        if(opencoordinates.indexOf(targetcell) != "-1"){
                            opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                        }

                        $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                        updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                        gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage
                        
                        var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                        fb.child("users").child(currentopponent).update({
                            opponentshot: "torpedo_ltr," + new_targetcell
                        });
                    }
                });

                break;

            case "torpedo_rtl":
                if(submarineArray.length == 0){alert("You do not have any Submarines to fire this weapon type."); break exitprepweapon;}
                fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                    if (data.val() == "false") {
                        alert("Please wait for your turn.");
                    } else {
                        
                        if(opencoordinates.indexOf(targetcell) != "-1"){
                            opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                        }
                        
                        $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                        updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                        gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage
                        
                        var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                        fb.child("users").child(currentopponent).update({
                            opponentshot: "torpedo_rtl," + new_targetcell
                        });
                    }
                });

                break;

            case "torpedo_ttb":
                if(submarineArray.length == 0){alert("You do not have any Submarines to fire this weapon type."); break exitprepweapon;}
                fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                    if (data.val() == "false") {
                        alert("Please wait for your turn.");
                    } else {
                        
                        if(opencoordinates.indexOf(targetcell) != "-1"){
                            opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                        }
                        
                        $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                        updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                        gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage
                        
                        var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                        fb.child("users").child(currentopponent).update({
                            opponentshot: "torpedo_ttb," + new_targetcell
                        });
                    }
                });

                break;

            case "torpedo_btt":
                if(submarineArray.length == 0){alert("You do not have any Submarines to fire this weapon type."); break exitprepweapon;}
                fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                    if (data.val() == "false") {
                        alert("Please wait for your turn.");
                    } else {
                        
                        if(opencoordinates.indexOf(targetcell) != "-1"){
                            opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                        }
                        
                        $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                        updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                        gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage
                        
                        var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                        fb.child("users").child(currentopponent).update({
                            opponentshot: "torpedo_btt," + new_targetcell
                        });
                    }
                });

                break;

            case "airstrike":
                if(aircraftcarrierArray.length == 0){alert("You do not have any Aircraft Carriers to fire this weapon type."); break exitprepweapon;}
                var targetcellX = targetcell.split("-")[1],
                    targetcellY = targetcell.split("-")[2],
                    bounds = Number(airstrikeX) + Number(airstrikeY);

                if(opencoordinates.indexOf(targetcell) != "-1"){
                    opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                }
                
                $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage
/*
                console.log("TargetCell: " + targetcell);
                console.log("TargetCellX: " + targetcellX);
                console.log("TargetCellY: " + targetcellY);
                console.log("Bounds: " + bounds);
*/
                //if (targetcellX + 3 > 20 && airstrikeX == 1 && airstrikeY == 1 || targetcellY + 3 > 20 && airstrikeX == 1 && airstrikeY == 1) { alert("Out of bounds."); break exitprepweapon; }
                //if ((targetcellX + 3) > 20 && bounds == 2 || (targetcellY + 3) > 20 && bounds == 2) { alert("Out of bounds."); break exitprepweapon; }

                fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                    if (data.val() == "false") {
                        alert("Please wait for your turn.");
                    } else {
                        var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                        fb.child("users").child(currentopponent).update({
                            opponentshot: "airstrike," + new_targetcell
                        });
                    }
                });

                break;
                
            case "scattershot":
                if(battleshipArray.length == 0){alert("You do not have any Battleships to fire this weapon type."); break exitprepweapon;} 
                if(opencoordinates.length > 4){
                    if(scattershotX > 1){
                        targetcell = opencoordinates[Math.floor(Math.random() * opencoordinates.length)];
                    }
                    
                    if(opencoordinates.indexOf(targetcell) != "-1"){
                        opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                    }
                    
                    $("#metrics-enemygridpercent").html(calculatepercentage()); // calculate the grid percentage used and displays it 
                    updategridpercentage(); // update the firebase "gridpercentage" field to be updated on the opponents grid
                    gridpercentbar("#metrics-enemygridpercent_bg", calculatepercentage());  //fills up percentage grid with color based on current percentage

                    fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                        if (data.val() == "false") {
                            alert("Please wait for your turn.");
                        } else {
                            
                            if(opencoordinates.indexOf(targetcell) != "-1"){
                                opencoordinates.splice(opencoordinates.indexOf(targetcell), 1);
                            }
    
                            var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                            fb.child("users").child(currentopponent).update({
                                opponentshot: "scattershot," + new_targetcell
                            });
                        }
                    });
                    scattershotX++;
                } else {
                    alert("Not enough open coordinates to use this weapon type.");
                }
                break;
                
            case "nuke":
                if(cruisemissilesubArray.length == 0){alert("You do not have any Cruise Missile Subs to fire this weapon type."); break exitprepweapon;}
                else if(cruisemissilesubArray.length > 1){alert("A nuke missile may only be fired when the Cruise Missile Sub is the last ship on the grid."); break exitprepweapon;}
                
                if(cruisemissilesubArray.length == 1 && battleshipArray.length == 0 && submarineArray.length == 0 && aircraftcarrierArray.length == 0 && lifejacketArray.length == 0){
                    alert("Nuke Fired")
                    

                    var targetcellX = targetcell.split("-")[1],
                        targetcellY = targetcell.split("-")[2];
                        
                    if(cruisemissileX == 1 && cruisemissileY == 1){
                        targetcell = "#O-1-1";
                    } else if(cruisemissileX <= 20) {
                        cruisemissileX ++;
                        
                    } else if(cruisemissileX == 21 && cruisemissileY < 21) {
                        cruisemissileX = 1;
                        cruisemissileY ++;
                    }
                    
                    
                    /*
                    var x = 0;
                    var y = 0;
                    function shifter(){
                        if(x <= 512){
                            drawWall(x,y)
                            x += 16;
                            shifter();
                        } else if( x <= 528 && y < 548){
                            x = 0;
                            y+= 16;
                            drawWall(x,y)
                            shifter();
                        }
                    }
                    */
/*    


                    fb.child("users").child(currentuser).child("playerturn").once("value", function (data) {
                        if (data.val() == "false") {
                            alert("Please wait for your turn.");
                        } else {
                            var new_targetcell = "#" + targetcell.split("-")[1] + "-" + targetcell.split("-")[2]; // changes from the Opponent grid cell to My grid cell.
                            fb.child("users").child(currentopponent).update({
                                opponentshot: "airstrike," + new_targetcell
                            });
                        }
                    });
*/                } else {{alert("A nuke missile may only be fired when the Cruise Missile Sub is the last ship on the grid."); break exitprepweapon;}}
                break;
        }
    }
}

function fireweapon(data) {
    exitfireweapon: {
        var dataarray = data.split(",");
        var weapon_type = dataarray[0];

        switch (weapon_type) {

            case "singleshot":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)

                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array

                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "singleshot,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss
                    fb.child("users").child(currentopponent).update({
                        hitormiss: "singleshot,miss," + new_targetcell
                    });
                    
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }

                break;

            case "torpedo_ltr":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)

                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array

                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_ltr,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss
                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_ltr,miss," + new_targetcell
                    });
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }

                break;

            case "torpedo_rtl":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)

                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array

                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_rtl,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss
                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_rtl,miss," + new_targetcell
                    });
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }

                break;

            case "torpedo_ttb":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)

                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array

                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_ttb,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss
                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_ttb,miss," + new_targetcell
                    });
                    
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }
                

                break;

            case "torpedo_btt":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)

                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array

                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_btt,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss
                    fb.child("users").child(currentopponent).update({
                        hitormiss: "torpedo_btt,miss," + new_targetcell
                    });
                    
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }

                break;

            case "airstrike":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)

                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array

                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "airstrike,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss
                    fb.child("users").child(currentopponent).update({
                        hitormiss: "airstrike,miss," + new_targetcell
                    });
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }

                break;
                
            case "scattershot":

                var new_targetcell = dataarray[1];

                var targetarray = checkShipArray(new_targetcell).split(",");
                //targetarray = "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell)
                
                if (targetarray[0] == "hit") {

                    $(dataarray[1]).addClass("shothit");
                    $(dataarray[1]).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    shipmatrix[targetarray[1]][targetarray[2]].splice(targetarray[3], 1); //removes the ship coordinate from it's array;

                    if (shipmatrix[targetarray[1]][targetarray[2]].length == 0) {

                        shipmatrix[targetarray[1]].splice(targetarray[2], 1); //remove array item from the ship array
                        
                        if (gameOver() == true) {
                            fireweaponmsg("gameover");
                            fb.child("users").child(currentopponent).update({
                                gameover: "true"
                            });
                            gameover = "true";
                            $("#playerturn").html("Game Over");
                            $("#playerturn").css("background-color", "#3071A9")
                            alert("Your fleet has been destroyed! Game Over.")
                        } else {
                            fireweaponmsg(targetarray[1]);
                        }
                    }

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "scattershot,hit," + new_targetcell,
                        enemyshipcount: opponentshipcountarray()
                    });

                    myshipcount();
                    totalships();

                } else { // it's a miss

                    fb.child("users").child(currentopponent).update({
                        hitormiss: "scattershot,miss," + new_targetcell
                    });
                    if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(dataarray[1]).addClass("shotmiss");
                    }
                }

                break;
            default:
                alert("default");
                break;

        }
    }
}

function fireweaponmsg(shiptypehit) {
    var shiptype;
    var msg;

    switch (shiptypehit) {
        case "gameover":
            msg = "All enemy ships are destroyed! You win!";
            fb.child("users").child(currentopponent).update({ "msgalert": msg });
            break;

        case "0":
            shiptype = "Battleship";
            msg = shiptype + " destroyed!";
            fb.child("users").child(currentopponent).update({ "msgalert": msg });
            fb.child("users").child(currentopponent).update({ "msgalert": "null" });
            break;

        case "1":
            shiptype = "Submarine";
            msg = shiptype + " destroyed!";
            fb.child("users").child(currentopponent).update({ "msgalert": msg });
            fb.child("users").child(currentopponent).update({ "msgalert": "null" });
            break;

        case "2":
            shiptype = "Cruise Missile Sub";
            msg = shiptype + " destroyed!";
            fb.child("users").child(currentopponent).update({ "msgalert": msg });
            fb.child("users").child(currentopponent).update({ "msgalert": "null" });
            break;

        case "3":
            shiptype = "Aircraft Carrier";
            msg = shiptype + " destroyed!";
            fb.child("users").child(currentopponent).update({ "msgalert": msg });
            fb.child("users").child(currentopponent).update({ "msgalert": "null" });
            break;

        case "4":
            shiptype = "Life Jacket";
            msg = shiptype + " destroyed!";
            fb.child("users").child(currentopponent).update({ "msgalert": msg });
            fb.child("users").child(currentopponent).update({ "msgalert": "null" });
            break;

        default:
            console.log("default");
            break;
    }
}

function hitormiss(data) {

    var dataarray = data.split(","),
        weapon_type = dataarray[0],
        coordinate = "#O-" + dataarray[2].substr(1);

    switch (weapon_type) {

        case "singleshot":
            if (dataarray[1] == "hit") {
                $(coordinate).addClass("shothit");
                $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                
                fb.child("users").child(currentuser).update({ playerturn: "false" });
                fb.child("users").child(currentopponent).update({ playerturn: "true" });
                $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                resetd3piechart("singleshot"); // update the metrics pie chart

            } else {
                if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                    $(coordinate).addClass("shotmiss");
                }
                fb.child("users").child(currentuser).update({ playerturn: "false" });
                fb.child("users").child(currentopponent).update({ playerturn: "true" });
                $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                resetd3piechart("singleshot"); // update the metrics pie chart
            }

            break;

        case "torpedo_ltr":
            var coords = data.split(",")[2],
                x = Number(coords.substring(1, coords.length).split("-")[0]) + 1,
                y = Number(coords.split("-")[1]);

            if (dataarray[1] == "hit") {
                $(coordinate).addClass("shothit");
                $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                
                fb.child("users").child(currentuser).update({ playerturn: "false" });
                fb.child("users").child(currentopponent).update({ playerturn: "true" });
                $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                resetd3piechart("torpedo"); // update the metrics pie chart

            } else {
                if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                    $(coordinate).addClass("shotmiss");
                }

                if (x != 21) { //if x + 1 does not exeed the grid, set target cell and fire again;
                    targetcell = "O-" + x.toString() + "-" + y.toString();
                    prepweapon("torpedo_ltr");
                } else { // else if it is the end of the grid, end the turn.
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("torpedo"); // update the metrics pie chart
                }
            }
            break;
        case "torpedo_rtl":
            var coords = data.split(",")[2],
                x = Number(coords.substring(1, coords.length).split("-")[0]) - 1,
                y = Number(coords.split("-")[1]);

            if (dataarray[1] == "hit") {
                $(coordinate).addClass("shothit");
                $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                
                fb.child("users").child(currentuser).update({ playerturn: "false" });
                fb.child("users").child(currentopponent).update({ playerturn: "true" });
                $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                resetd3piechart("torpedo"); // update the metrics pie chart

            } else {
                if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                    $(coordinate).addClass("shotmiss");
                }

                if (x != 0) { //if x - 1 does not exeed the grid, set target cell and fire again;
                    targetcell = "O-" + x.toString() + "-" + y.toString();
                    prepweapon("torpedo_rtl");
                } else { // else if it is the end of the grid, end the turn.
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("torpedo"); // update the metrics pie chart
                }
            }
            break;
        case "torpedo_ttb":
            var coords = data.split(",")[2],
                x = Number(coords.substring(1, coords.length).split("-")[0]),
                y = Number(coords.split("-")[1]) + 1;

            if (dataarray[1] == "hit") {
                $(coordinate).addClass("shothit");
                $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                
                fb.child("users").child(currentuser).update({ playerturn: "false" });
                fb.child("users").child(currentopponent).update({ playerturn: "true" });
                $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                resetd3piechart("torpedo"); // update the metrics pie chart

            } else {
                if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                    $(coordinate).addClass("shotmiss");
                }
                
                if (y != 21) { //if y + 1 does not exeed the grid, set target cell and fire again;
                    targetcell = "O-" + x.toString() + "-" + y.toString();
                    prepweapon("torpedo_ttb");
                } else { // else if it is the end of the grid, end the turn.
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("torpedo"); // update the metrics pie chart
                }
            }
            break;
        case "torpedo_btt":
            var coords = data.split(",")[2],
                x = Number(coords.substring(1, coords.length).split("-")[0]),
                y = Number(coords.split("-")[1]) - 1;

            if (dataarray[1] == "hit") {
                $(coordinate).addClass("shothit");
                $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                
                fb.child("users").child(currentuser).update({ playerturn: "false" });
                fb.child("users").child(currentopponent).update({ playerturn: "true" });
                $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                resetd3piechart("torpedo"); // update the metrics pie chart

            } else {
                if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                    $(coordinate).addClass("shotmiss");
                }
                if (y != 0) { //if y - 1 does not exeed the grid, set target cell and fire again;
                    targetcell = "O-" + x.toString() + "-" + y.toString();
                    prepweapon("torpedo_btt");
                } else { // else if it is the end of the grid, end the turn.
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("torpedo"); // update the metrics pie chart
                }
            }
            break;
        case "airstrike":
            var coords = data.split(",")[2],
                x = Number(coords.substring(1, coords.length).split("-")[0]),
                y = Number(coords.split("-")[1]);
/*
            console.log("data: " + data);
            console.log("coords: " + coords);
            console.log("x: " + x);
            console.log("y: " + y);
            console.log("airstrikeX: " + airstrikeX);
            console.log("airstrikeY: " + airstrikeY);
            console.log(" ");
*/
            if (dataarray[1] == "hit") {
                $(coordinate).addClass("shothit");
                $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                
                if (airstrikeX < 3 && airstrikeY == 1) {
                    targetcell = "O-" + (x + 1).toString() + "-" + y.toString();
                    prepweapon("airstrike");
                    airstrikeX++;
                } else if (airstrikeX == 3 && airstrikeY == 1) {
                    targetcell = "O-" + (x - 2).toString() + "-" + (y + 1).toString();
                    prepweapon("airstrike");
                    airstrikeX = 1;
                    airstrikeY++;
                } else if (airstrikeX < 3 && airstrikeY == 2) {
                    targetcell = "O-" + (x + 1).toString() + "-" + y.toString();
                    prepweapon("airstrike");
                    airstrikeX++;
                } else if (airstrikeX == 3 && airstrikeY == 2) {
                    targetcell = "O-" + (x - 2).toString() + "-" + (y + 1).toString();
                    prepweapon("airstrike");
                    airstrikeX = 1;
                    airstrikeY++;
                } else if (airstrikeX < 3 && airstrikeY == 3) {
                    targetcell = "O-" + (x + 1).toString() + "-" + y.toString();
                    prepweapon("airstrike");
                    airstrikeX++;
                } else if (airstrikeX == 3 && airstrikeY == 3) { // else end the turn;
                    airstrikeX = 1;
                    airstrikeY = 1;
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("airstrike"); // update the metrics pie chart
                }

            } else if (dataarray[1] == "miss") {
                if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                    $(coordinate).addClass("shotmiss");
                }

                if (airstrikeX < 3 && airstrikeY == 1) {
                    targetcell = "O-" + (x + 1).toString() + "-" + y.toString();
                    prepweapon("airstrike");
                    airstrikeX++;
                } else if (airstrikeX == 3 && airstrikeY == 1) {
                    targetcell = "O-" + (x - 2).toString() + "-" + (y + 1).toString();
                    prepweapon("airstrike");
                    airstrikeX = 1;
                    airstrikeY++;
                } else if (airstrikeX < 3 && airstrikeY == 2) {
                    targetcell = "O-" + (x + 1).toString() + "-" + y.toString();
                    prepweapon("airstrike");
                    airstrikeX++;
                } else if (airstrikeX == 3 && airstrikeY == 2) {
                    targetcell = "O-" + (x - 2).toString() + "-" + (y + 1).toString();
                    prepweapon("airstrike");
                    airstrikeX = 1;
                    airstrikeY++;
                } else if (airstrikeX < 3 && airstrikeY == 3) {
                    targetcell = "O-" + (x + 1).toString() + "-" + y.toString();
                    prepweapon("airstrike");
                    airstrikeX++;
                } else if (airstrikeX == 3 && airstrikeY == 3) { // else end the turn;
                    airstrikeX = 1;
                    airstrikeY = 1;
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("airstrike"); // update the metrics pie chart
                }
            }
            break;
            
            case "scattershot":
                if (dataarray[1] == "hit") {
                    $(coordinate).addClass("shothit");
                    $(coordinate).data( "hit", true ); // add custom html attribute to the target if it's a hit so it can be flagged to avoid changing to a miss from a future shot.
                    
                    if(scattershotX <= 15){
                        prepweapon("scattershot");
                    } else {
                        fb.child("users").child(currentuser).update({ playerturn: "false" });
                        fb.child("users").child(currentopponent).update({ playerturn: "true" });
                        $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                        scattershotX = 1;
                    }
    
                } else {
                    if($(coordinate).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.if($(dataarray[1]).data("hit") != true){ // check custom html attribute "hit" if not equal to true, than color the target cell as a miss.
                        $(coordinate).addClass("shotmiss");
                    }

                    if(scattershotX <= 15){
                        prepweapon("scattershot");
                    } else {
                    fb.child("users").child(currentuser).update({ playerturn: "false" });
                    fb.child("users").child(currentopponent).update({ playerturn: "true" });
                    $("#metrics-mynumberofturns").html(Number($("#metrics-mynumberofturns").html()) + 1);
                    resetd3piechart("scattershot"); // update the metrics pie chart
                    scattershotX = 1;
                    }
                }
            break;
    }
}

function checkShipArray(new_targetcell) {
    exitcheckshiparray: {

        for (var j = 0; j < shipmatrix.length; j++) {
            if (shipmatrix[j].length != 0) { // cycle through the shipmatrix array and see if any coordinates are a hit
                for (var i = 0; i < shipmatrix[j].length; i++) {
                    if (shipmatrix[j][i].indexOf(new_targetcell) != "-1") { return "hit," + j + "," + i + "," + shipmatrix[j][i].indexOf(new_targetcell); break exitcheckshiparray; } // if it's a hit return "true", other wise continue;
                }
            }
        }
        return "miss"; break exitcheckshiparray;
    }
}

function gameOver() {
    if (shipmatrix[0].length == 0 && shipmatrix[1].length == 0 && shipmatrix[2].length == 0 && shipmatrix[3].length == 0 && shipmatrix[4].length == 0) {
        return true;
    } else {
        return false;
    }
}

/* --- S E T    P L A Y E R S  --- */

var usersRef = fb.child("users");

usersRef.on("child_changed", function (snapshot) { // removes players from list who are not listed as available; those who are paired up already;
    var user = snapshot.key();
    usersRef.child(user).child("availability").once('value', function (dataSnapshot) {
        if (dataSnapshot.val() == "false") {
            user = "#" + user + "-user";
            $(user).remove();
        }
    });
});

usersRef.on("child_added", function (snapshot) { //lists all available players; filters and does not show unavailable players;
    if (snapshot.key() != currentuser) {
        usersRef.child(snapshot.key()).child("availability").once('value', function (dataSnapshot) {
            if (dataSnapshot.val() != "false") {

                var usercontainer = document.createElement("div");
                usercontainer.className = "row usercontainer";
                usercontainer.id = snapshot.key() + "-user"; // id = user input for grid name
                usercontainer.onclick = function () { chooseOpponent(snapshot.key()); };
                document.getElementById("settings_group3_list").appendChild(usercontainer);

                var userdiv = document.createElement("div");
                userdiv.className = "col-md-5 text-left";
                userdiv.innerHTML = snapshot.key(); // display grid name
                usercontainer.appendChild(userdiv);

                var usernumberofships = document.createElement("div");
                usernumberofships.className = "col-md-4 text-left";
                usernumberofships.innerHTML = snapshot.val().numberofships;
                usercontainer.appendChild(usernumberofships);

                var usernumberofships = document.createElement("div");
                usernumberofships.className = "col-md-3 text-left";
                usernumberofships.innerHTML = snapshot.val().availability;
                usercontainer.appendChild(usernumberofships);
            }
        });
    }
});

function chooseOpponent(opponent) {

    var opponentnumberofships;

    fb.child("users").child(opponent).child("numberofships").once("value", function (data) {
        opponentnumberofships = Number(data.val());
    })

    if (shipcount == opponentnumberofships) {
        fb.child("users").child(opponent).update({
            opponentpending: currentuser
        });
    } else {
        alert("Please choose an opponent with an equal number of ships as yours. To change your number of ships, you will need to reset your grid.");
    }
}

/* --- O N    E X I T --- */

window.onbeforeunload = function () { // this function removes the user from the online db when the window exits.
    fb.child("users/" + currentuser).remove();
};

/* --- O N    U S E R    R E M O V E D --- */

fb.child("users").on("child_removed", function (snapshot) {
    var user = snapshot.val();
    var deletedUser = user.userid + "-user";
    if ($("#" + deletedUser)) {
        $("#" + deletedUser).remove();
    }
});

/**
* Return a timestamp with the format "m/d/yy h:MM:ss TT"
* @type {Date}
*/

function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // Create an array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

    // Create an array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    // Determine AM or PM suffix based on the hour
    var suffix = (time[0] < 12) ? "AM" : "PM";

    // Convert hour from military time
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }
    // Return the formatted string
    //return date.join("/") + " " + time.join(":") + " " + suffix;
    return time.join(":") + " " + suffix;
}

/* --- S L I M    S C R O L L I N G    J S --- */

$(function () {
    $('#chat_results').slimScroll({ height: '250px', alwaysVisible: false, railVisible: false, railColor: '#333', start: 'bottom' });
    $('#settings_group3_list').slimScroll({ height: '108px', alwaysVisible: true, railVisible: true, railColor: '#333', start: 'bottom' });
});

/* --- C A L C U L A T E    G R I D    P E R C E N T A G E --- */

function calculatepercentage(){
    return (((400 - Number(opencoordinates.length))/400)*100) + "%";
}

function updategridpercentage(){
    fb.child("users").child(currentopponent).update({
        gridpercent: calculatepercentage()
    });
}

function gridpercentbar(gridchoice,percentage){// updates the grid percentage on the metrics tab
    $(gridchoice).css("width", percentage);
}

/* --- D 3    P I E    C H A R T --- */ 

function d3piechart(){
    var w = 250;
    var h = 250;
    var r = h/2;
    var x = 0;
    var color = d3.scale.category20c();
    var data = [];
    var shottypearray = [scattershotcount, torpedocount, cruisemissilecount, airstrikecount, singleshotcount];
    var shottypeobjectsarray = [{"label":"Scatter", "value": scattershotpercent},
                {"label":"Torpedo", "value": torpedopercent}, 
                {"label":"Missile", "value": cruisemissilepercent},
                {"label":"Airstrike", "value": airstrikepercent},
                {"label":"Single", "value": singleshotpercent}];
    
    for(var i = 0; i <=4; i++){
        if(shottypearray[i] != 0){
            data[x] = shottypeobjectsarray[i];
            x ++;
        }
    }
    console.table(data);
    x = 0;
    
    
    /*var data = [{"label":"Scatter", "value": scattershotpercent}, 
                {"label":"Torpedo", "value": torpedopercent}, 
                {"label":"Missile", "value": cruisemissilepercent},
                {"label":"Airstrike", "value": airstrikepercent},
                {"label":"Single", "value": singleshotpercent}];
    */
    
    var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
    var pie = d3.layout.pie().value(function(d){return d.value;});
    
    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);
    
    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d) {
            // log the result of the arc generator to show how cool it is :)
            //console.log(arc(d));
            return arc(d);
        });
    
    // add the text
    arcs.append("svg:text").attr("transform", function(d){
    			d.innerRadius = 0;
    			d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
        return data[i].label;}
    		);
    		
}

function resetd3piechart(shottype){ // resets the pie chart with current statistics;
    
    switch (shottype) {
        case "scattershot":
             scattershotcount ++;
            break;
        case "nuke":
            cruisemissilecount ++;
            break;
        case "torpedo":
            torpedocount ++;
            break;
        case "airstrike":
            airstrikecount ++;
            break;
        case "singleshot":
            singleshotcount ++;
            break;
    }
    
    var totalcount = scattershotcount + cruisemissilecount + torpedocount + airstrikecount + singleshotcount;

    scattershotpercent = scattershotcount / totalcount;
    cruisemissilepercent = cruisemissilecount / totalcount;
    torpedopercent = torpedocount / totalcount;
    airstrikepercent = airstrikecount / totalcount;
    singleshotpercent = singleshotcount / totalcount;

    $("#chart").html("");
    d3piechart();
}



/* --- M I S C    J S --- */

/*
var settings = {};
i = 1;
settings[1] = $( "#mygridname" );
alert(settings[i].val());
settings[i].val('test');

function execute(someFunction, value){
  someFunction(value);
}

execute(alert,"test2");
*/

/*
$(".cellClass").bind("contextmenu",function(e){
  return false;
});
*/