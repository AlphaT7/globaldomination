/*global google*/
/*global Firebase*/

var fb =  new Firebase("https://global-domination.firebaseio.com/");

/* --------------- C O N T I N E N T    M A P    L I S T S --------------- */

var africa_list = [
    {display: "Choose a Sub-Continent", value: ""},
    {display: "Africa", value: "002"},
    {display: "&nbsp;&nbsp;&nbsp; Northern Africa", value: "Northern Africa,015"},
    {display: "&nbsp;&nbsp;&nbsp; Western Africa", value: "Western Africa,011"},
    {display: "&nbsp;&nbsp;&nbsp; Middle Africa", value: "Middle Africa,017"},
    {display: "&nbsp;&nbsp;&nbsp; Eastern Africa", value: "Eastern Africa,014"},
    {display: "&nbsp;&nbsp;&nbsp; Southern Africa", value: "Southern Africa,018"}
];

var europe_list = [
    {display: "Choose a Sub-Continent", value: ""},
    {display: "Europe", value: "150"},
    {display: "&nbsp;&nbsp;&nbsp; Northern Europe", value: "Northern Europe,154"},
    {display: "&nbsp;&nbsp;&nbsp; Western Europe", value: "Western Europe,155"},
    {display: "&nbsp;&nbsp;&nbsp; Eastern Europe", value: "Eastern Europe,151"},
    {display: "&nbsp;&nbsp;&nbsp; Southern Eurpope", value: "Southern Eurpope,039"}
];

var americas_list = [
    {display: "Choose a Sub-Continent", value: ""},
    {display: "Americas", value: "019"},
    {display: "&nbsp;&nbsp;&nbsp; Northern America", value: "Northern America,021"},
    {display: "&nbsp;&nbsp;&nbsp; Caribbean", value: "Caribbean,029"},
    {display: "&nbsp;&nbsp;&nbsp; Central America", value: "Central America,013"},
    {display: "&nbsp;&nbsp;&nbsp; South America", value: "South America,005"},
];

var asia_list = [
    {display: "Choose a Sub-Continent", value: ""},
    {display: "Asia", value: "142"},
    {display: "&nbsp;&nbsp;&nbsp; Central Asia", value: "Central Asia,143"},
    {display: "&nbsp;&nbsp;&nbsp; Eastern Asia", value: "Eastern Asia,142"},
    {display: "&nbsp;&nbsp;&nbsp; Southern Asia", value: "Southern Asia,034"},
    {display: "&nbsp;&nbsp;&nbsp; South-Eastern Asia", value: "South-Eastern Asia,035"},
    {display: "&nbsp;&nbsp;&nbsp; Western Asia", value: "Western Asia,145"}
];

var oceania_list = [
    {display: "Choose a Sub-Continent", value: ""},
    {display: "Oceania", value: "009"},
    {display: "&nbsp;&nbsp;&nbsp; Australia and New Zealand", value: "Australia and New Zealand,053"},
    {display: "&nbsp;&nbsp;&nbsp; Melanesia", value: "Melanesia,054"},
    {display: "&nbsp;&nbsp;&nbsp; Micronesia", value: "Micronesia,057"},
    {display: "&nbsp;&nbsp;&nbsp; Polynesia", value: "Polynesia,061"},
];

/* --------------- S U B - C O N T I N E N T    M A P    L I S T S --------------- */

/* --- A F R I C A    L I S T S --- */
var northern_africa_list = [
    {display: "Choose a Country", value: ""},
    {display: "Northern Africa", value: "Northern Africa,015"},
    {display: "&nbsp;&nbsp;&nbsp; Algeria", value: "Algeria,DZ"},
    {display: "&nbsp;&nbsp;&nbsp; Egypt", value: "Egypt,EG"},
    {display: "&nbsp;&nbsp;&nbsp; Western Sahara", value: "Western Sahara,EH"},
    {display: "&nbsp;&nbsp;&nbsp; Libya", value: "Libya,LY"},
    {display: "&nbsp;&nbsp;&nbsp; Morocco", value: "Morocco,MA"},
    {display: "&nbsp;&nbsp;&nbsp; Sudan", value: "Sudan,SD"},
    {display: "&nbsp;&nbsp;&nbsp; Tunisia", value: "Tunisia,TN"},
];

var western_africa_list = [
    {display: "Choose a Country", value: ""},
    {display: "Western Africa", value: "Western Africa,011"},
    {display: "&nbsp;&nbsp;&nbsp; Burkina Faso", value: "Burkina Faso,BF"},
    {display: "&nbsp;&nbsp;&nbsp; Benin", value: "Benin,BJ"},
    {display: "&nbsp;&nbsp;&nbsp; Côte d'Ivoire", value: "Côte d'Ivoire,CI"},
    {display: "&nbsp;&nbsp;&nbsp; Cabo Verde", value: "Cabo Verde,CV"},
    {display: "&nbsp;&nbsp;&nbsp; Ghana", value: "Ghana,GH"},
    {display: "&nbsp;&nbsp;&nbsp; Gambia", value: "Gambia,GM"},
    {display: "&nbsp;&nbsp;&nbsp; Guinea", value: "Guinea,GN"},
    {display: "&nbsp;&nbsp;&nbsp; Guinea-Bissau", value: "Guinea-Bissau,GW"},
    {display: "&nbsp;&nbsp;&nbsp; Liberia", value: "Liberia,LR"},
    {display: "&nbsp;&nbsp;&nbsp; Mali", value: "Mali,ML"},
    {display: "&nbsp;&nbsp;&nbsp; Mauritania", value: "Mauritania,MR"},
    {display: "&nbsp;&nbsp;&nbsp; Niger", value: "Niger,NE"},
    {display: "&nbsp;&nbsp;&nbsp; Nigeria", value: "Nigeria,NG"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Helena, Ascension and Tristan da Cunha", value: "Saint Helena, Ascension and Tristan da Cunha,SH"},
    {display: "&nbsp;&nbsp;&nbsp; Sierra Leone", value: "Sierra Leone,SL"},
    {display: "&nbsp;&nbsp;&nbsp; Senegal", value: "Senegal,SN"},
    {display: "&nbsp;&nbsp;&nbsp; Togo", value: "Togo,TG"},
];

var middle_africa_list = [
    {display: "Choose a Country", value: ""},
    {display: "Middle Africa", value: "Middle Africa,017"},
    {display: "&nbsp;&nbsp;&nbsp; Angola", value: "Angola,AO"},
    {display: "&nbsp;&nbsp;&nbsp; Chad", value: "Chad,TD"},
    {display: "&nbsp;&nbsp;&nbsp; Congo", value: "Congo,CD"},
    {display: "&nbsp;&nbsp;&nbsp; Central African Republic", value: "Central African Republic,CF"},
    {display: "&nbsp;&nbsp;&nbsp; Cameroon", value: "Cameroon,CM"},
    {display: "&nbsp;&nbsp;&nbsp; Gabon", value: "Gabon,GA"},
    {display: "&nbsp;&nbsp;&nbsp; Equatorial Guinea", value: "Equatorial Guinea,GQ"},
    {display: "&nbsp;&nbsp;&nbsp; Sao Tome and Principe", value: "Sao Tome and Principe,ST"},
    {display: "&nbsp;&nbsp;&nbsp; Chad", value: "Chad,TD"},
    {display: "&nbsp;&nbsp;&nbsp; Zaire", value: "Zaire,ZR"},
];

var eastern_africa_list = [
    {display: "Choose a Country", value: ""},
    {display: "Eastern Africa", value: "Eastern Africa,014"},
    {display: "&nbsp;&nbsp;&nbsp; Burundi", value: "Burundi,BI"},
    {display: "&nbsp;&nbsp;&nbsp; Djibouti", value: "Djibouti,DJ"},
    {display: "&nbsp;&nbsp;&nbsp; Eritrea", value: "Eritrea,ER"},
    {display: "&nbsp;&nbsp;&nbsp; Ethiopia", value: "Ethiopia,ET"},
    {display: "&nbsp;&nbsp;&nbsp; Kyrgyzstan", value: "Kyrgyzstan,KE"},
    {display: "&nbsp;&nbsp;&nbsp; Comoros", value: "Comoros,KM"},
    {display: "&nbsp;&nbsp;&nbsp; Madagascar", value: "Madagascar,MG"},
    {display: "&nbsp;&nbsp;&nbsp; Mauritius", value: "Mauritius,MU"},
    {display: "&nbsp;&nbsp;&nbsp; Malawi", value: "Malawi,MW"},
    {display: "&nbsp;&nbsp;&nbsp; Mayotte", value: "Mayotte,YT"},
    {display: "&nbsp;&nbsp;&nbsp; Mozambique", value: "Mozambique,MZ"},
    {display: "&nbsp;&nbsp;&nbsp; Réunion", value: "Réunion,RE"},
    {display: "&nbsp;&nbsp;&nbsp; Rwanda", value: "Rwanda,RW"},
    {display: "&nbsp;&nbsp;&nbsp; Seychelles", value: "Seychelles,SC"},
    {display: "&nbsp;&nbsp;&nbsp; Somalia", value: "Somalia,SO"},
    {display: "&nbsp;&nbsp;&nbsp; Tanzania", value: "Tanzania,TZ"},
    {display: "&nbsp;&nbsp;&nbsp; Uganda", value: "Uganda,UG"},
    {display: "&nbsp;&nbsp;&nbsp; Zambia", value: "Zambia,ZM"},
    {display: "&nbsp;&nbsp;&nbsp; Zimbabwe", value: "Zimbabwe,ZW"},

];

var southern_africa_list = [
    {display: "Choose a Country", value: ""},
    {display: "Southern Africa", value: "Southern Africa,018"},
    {display: "&nbsp;&nbsp;&nbsp; Botswana", value: "Botswana,BW"},
    {display: "&nbsp;&nbsp;&nbsp; Lesotho", value: "Lesotho,LS"},
    {display: "&nbsp;&nbsp;&nbsp; Namibia", value: "Namibia,NA"},
    {display: "&nbsp;&nbsp;&nbsp; South Africa", value: "South Africa,ZA"},
    {display: "&nbsp;&nbsp;&nbsp; Swaziland", value: "Swaziland,SZ"},

];

/* --- E U R O P E    L I S T S --- */

var northern_europe_list = [
    {display: "Choose a Country", value: ""},
    {display: "Northern Europe", value: "Northern Europe,150"},
    {display: "&nbsp;&nbsp;&nbsp; Åland Islands", value: "Åland Islands,AX"},
    {display: "&nbsp;&nbsp;&nbsp; Guernsey", value: "Guernsey,GG"},
    {display: "&nbsp;&nbsp;&nbsp; Jersey", value: "Jersey,JE"},
    {display: "&nbsp;&nbsp;&nbsp; Denmark", value: "Denmark,DK"},
    {display: "&nbsp;&nbsp;&nbsp; Estonia", value: "Estonia,EE"},
    {display: "&nbsp;&nbsp;&nbsp; Finland", value: "Finland,FI"},
    {display: "&nbsp;&nbsp;&nbsp; Faroe Islands", value: "Faroe Islands,FO"},
    {display: "&nbsp;&nbsp;&nbsp; United Kingdom of Great Britain and Northern Ireland", value: "United Kingdom of Great Britain and Northern Ireland,GB"},
    {display: "&nbsp;&nbsp;&nbsp; Ireland", value: "Ireland,IE"},
    {display: "&nbsp;&nbsp;&nbsp; Isle of Man", value: "Isle of Man,IM"},
    {display: "&nbsp;&nbsp;&nbsp; Iceland", value: "Iceland,IS"},
    {display: "&nbsp;&nbsp;&nbsp; Lithuania", value: "Lithuania,LT"},
    {display: "&nbsp;&nbsp;&nbsp; Latvia", value: "Latvia,LV"},
    {display: "&nbsp;&nbsp;&nbsp; Norway", value: "Norway,NO"},
    {display: "&nbsp;&nbsp;&nbsp; Sweden", value: "Sweden,SE"},
    {display: "&nbsp;&nbsp;&nbsp; Svalbard and Jan Mayen", value: "Svalbard and Jan Mayen,SV"},

];

var western_europe_list = [
    {display: "Choose a Country", value: ""},
    {display: "Western Europe", value: "Western Europe,155"},
    {display: "&nbsp;&nbsp;&nbsp; Austria", value: "Austria,AT"},
    {display: "&nbsp;&nbsp;&nbsp; Belgium", value: "Belgium,BE"},
    {display: "&nbsp;&nbsp;&nbsp; Switzerland", value: "Switzerland,CH"},
    {display: "&nbsp;&nbsp;&nbsp; Germany", value: "Germany,DE"},
    {display: "&nbsp;&nbsp;&nbsp; France", value: "France,FR"},
    {display: "&nbsp;&nbsp;&nbsp; Liechtenstein", value: "Liechtenstein,LI"},
    {display: "&nbsp;&nbsp;&nbsp; Luxembourg", value: "Luxembourg,LU"},
    {display: "&nbsp;&nbsp;&nbsp; Monaco", value: "Monaco,MC"},
    {display: "&nbsp;&nbsp;&nbsp; Netherlands", value: "Netherlands,NL"},
   
];

var eastern_europe_list = [ 
    {display: "Choose a Country", value: ""},
    {display: "Eastern Europe", value: "Eastern Europe,151"},
    {display: "&nbsp;&nbsp;&nbsp; Bulgaria", value: "Bulgaria,BG"},
    {display: "&nbsp;&nbsp;&nbsp; Belarus", value: "Belarus,BY"},
    {display: "&nbsp;&nbsp;&nbsp; Czech Republic", value: "Czech Republic,CZ"},
    {display: "&nbsp;&nbsp;&nbsp; Hungary", value: "Hungary,HU"},
    {display: "&nbsp;&nbsp;&nbsp; Moldova, Republic of", value: "Moldova Republic of,MD"},
    {display: "&nbsp;&nbsp;&nbsp; Poland", value: "Poland,PL"},
    {display: "&nbsp;&nbsp;&nbsp; Romania", value: "Romania,RO"},
    {display: "&nbsp;&nbsp;&nbsp; Russian Federation", value: "Russian Federation,RU"},
    {display: "&nbsp;&nbsp;&nbsp; Slovakia", value: "Slovakia,SK"},
    {display: "&nbsp;&nbsp;&nbsp; Ukraine", value: "Ukraine,UA"},
    
];    

var southern_europe_list = [ 
    {display: "Choose a Country", value: ""},
    {display: "Southern Europe", value: "Southern Europe,039"},
    {display: "&nbsp;&nbsp;&nbsp; Andorra", value: "Andorra,AD"},
    {display: "&nbsp;&nbsp;&nbsp; Albania", value: "Albania,AL"},
    {display: "&nbsp;&nbsp;&nbsp; Bosnia and Herzegovina", value: "Bosnia and Herzegovina,BA"},
    {display: "&nbsp;&nbsp;&nbsp; Spain", value: "Spain,ES"},
    {display: "&nbsp;&nbsp;&nbsp; Gibraltar", value: "Gibraltar,GI"},
    {display: "&nbsp;&nbsp;&nbsp; Greece", value: "Greece,GR"},
    {display: "&nbsp;&nbsp;&nbsp; Croatia", value: "Croatia,HR"},
    {display: "&nbsp;&nbsp;&nbsp; Italy", value: "Italy,IT"},
    {display: "&nbsp;&nbsp;&nbsp; Montenegro", value: "Montenegro,ME"},
    {display: "&nbsp;&nbsp;&nbsp; Macedonian", value: " Macedonian,MK"},
    {display: "&nbsp;&nbsp;&nbsp; Malta", value: "Malta,MT"},
    {display: "&nbsp;&nbsp;&nbsp; Serbia", value: "Serbia,RS"},
    {display: "&nbsp;&nbsp;&nbsp; Portugal", value: "Portugal,PT"},
    {display: "&nbsp;&nbsp;&nbsp; Slovenia", value: "Slovenia,SI"},
    {display: "&nbsp;&nbsp;&nbsp; San Marino", value: "San Marino,SM"},
    {display: "&nbsp;&nbsp;&nbsp; Vatican City", value: "Vatican City,VA"},
    {display: "&nbsp;&nbsp;&nbsp; Vanuatu", value: "Vanuatu,YU"},

];

/* --- A M E R I C A S    L I S T S --- */

var northern_america_list = [
    {display: "Choose a Country", value: ""},
    {display: "Northern America", value: "Northern America,021"},
    {display: "&nbsp;&nbsp;&nbsp; Bermuda", value: "Bermuda,BM"},
    {display: "&nbsp;&nbsp;&nbsp; Canada", value: "Canada,CA"},
    {display: "&nbsp;&nbsp;&nbsp; Greenland", value: "Greenland,GL"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Pierre and Miquelon", value: "Saint Pierre and Miquelon,PM"},
    {display: "&nbsp;&nbsp;&nbsp; United States of America", value: "United States of America,US"},

 ];
 
var caribbean_list = [ 
    {display: "Choose a Country", value: ""},
    {display: "Caribbean", value: "Caribbean,029"},
    {display: "&nbsp;&nbsp;&nbsp; Antigua and Barbuda", value: "Antigua and Barbuda,AG"},
    {display: "&nbsp;&nbsp;&nbsp; Anguilla", value: "Anguilla,AI"},
    {display: "&nbsp;&nbsp;&nbsp; Netherlands Antilles", value: "Netherlands Antilles,AN"},
    {display: "&nbsp;&nbsp;&nbsp; Aruba", value: "Aruba,AW"},
    {display: "&nbsp;&nbsp;&nbsp; Barbados", value: "Barbados,BB"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Barthélemy", value: "Saint Barthélemy,BL"},
    {display: "&nbsp;&nbsp;&nbsp; Bahamas", value: "Bahamas,BS"},
    {display: "&nbsp;&nbsp;&nbsp; Cuba", value: "Cuba,CU"},
    {display: "&nbsp;&nbsp;&nbsp; Dominica", value: "Dominica,DM"},
    {display: "&nbsp;&nbsp;&nbsp; Dominican Republic", value: "Dominican Republic,DO"},
    {display: "&nbsp;&nbsp;&nbsp; Grenada", value: "Grenada,GD"},
    {display: "&nbsp;&nbsp;&nbsp; Guadeloupe", value: "Guadeloupe,GP"},
    {display: "&nbsp;&nbsp;&nbsp; Haiti", value: "Haiti,HT"},
    {display: "&nbsp;&nbsp;&nbsp; Jamaica", value: "Jamaica,JM"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Kitts and Nevis", value: "Saint Kitts and Nevis,KN"},
    {display: "&nbsp;&nbsp;&nbsp; Cayman Islands", value: "Cayman Islands,KY"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Lucia", value: "Saint Lucia,LC"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Martin", value: "Saint Martin,MF"},
    {display: "&nbsp;&nbsp;&nbsp; Martinique", value: "Martinique,MQ"},
    {display: "&nbsp;&nbsp;&nbsp; Montserrat", value: "Montserrat,MS"},
    {display: "&nbsp;&nbsp;&nbsp; Puerto Rico", value: "Puerto Rico,PR"},
    {display: "&nbsp;&nbsp;&nbsp; Turks and Caicos Islands", value: "Turks and Caicos Islands,TC"},
    {display: "&nbsp;&nbsp;&nbsp; Trinidad and Tobago", value: "Trinidad and Tobago,TT"},
    {display: "&nbsp;&nbsp;&nbsp; Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines,VC"},
    {display: "&nbsp;&nbsp;&nbsp; Virgin Islands", value: "Virgin Islands,VG"},
    {display: "&nbsp;&nbsp;&nbsp; Virgin Islands, U.S.", value: "Virgin Islands, U.S.,VI"},

];

var central_america_list = [ 
    {display: "Choose a Country", value: ""},
    {display: "Central America", value: "Central America,013"},
    {display: "&nbsp;&nbsp;&nbsp; Belize", value: "Belize,BZ"},
    {display: "&nbsp;&nbsp;&nbsp; Costa Rica", value: "Costa Rica,CR"},
    {display: "&nbsp;&nbsp;&nbsp; Guatemala", value: "Guatemala,GT"},
    {display: "&nbsp;&nbsp;&nbsp; Honduras", value: "Honduras,HN"},
    {display: "&nbsp;&nbsp;&nbsp; Mexico", value: "Mexico,MX"},
    {display: "&nbsp;&nbsp;&nbsp; Nicaragua", value: "Nicaragua,NI"},
    {display: "&nbsp;&nbsp;&nbsp; Panama", value: "Panama,PA"},
    {display: "&nbsp;&nbsp;&nbsp; El Salvador", value: "El Salvador,SV"},
    
];

var south_america_list = [ 
    {display: "Choose a Country", value: ""},
    {display: "South America", value: "South America,005"},
    {display: "&nbsp;&nbsp;&nbsp;Argentina", value: "Argentina,AR"},
    {display: "&nbsp;&nbsp;&nbsp; Bolivia", value: "Bolivia,BO"},
    {display: "&nbsp;&nbsp;&nbsp; Brazil", value: "Brazil,BR"},
    {display: "&nbsp;&nbsp;&nbsp; Chile", value: "Chile,CL"},
    {display: "&nbsp;&nbsp;&nbsp; Colombia", value: "Colombia,CO"},
    {display: "&nbsp;&nbsp;&nbsp; Ecuador", value: "Ecuador,EC"},
    {display: "&nbsp;&nbsp;&nbsp; Falkland Islands", value: "Falkland Islands,FK"},
    {display: "&nbsp;&nbsp;&nbsp; French Guiana", value: "French Guiana,GF"},
    {display: "&nbsp;&nbsp;&nbsp; Guyana", value: "Guyana,GY"},
    {display: "&nbsp;&nbsp;&nbsp; Peru", value: "Peru,PE"},
    {display: "&nbsp;&nbsp;&nbsp; Paraguay", value: "Paraguay,PY"},
    {display: "&nbsp;&nbsp;&nbsp; Suriname", value: "Suriname,SR"},
    {display: "&nbsp;&nbsp;&nbsp; Uruguay", value: "Uruguay,UY"},
    {display: "&nbsp;&nbsp;&nbsp; Venezuela", value: "Venezuela,VE"},
    
];

/* --- A S I A    L I S T --- */

var central_asia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Central Asia", value: "Central Asia,143"},
    {display: "&nbsp;&nbsp;&nbsp; Turkmenistan", value: "Turkmenistan,TM"},
    {display: "&nbsp;&nbsp;&nbsp; Tajikistan", value: "Tajikistan,TJ"},
    {display: "&nbsp;&nbsp;&nbsp; Kyrgyzstan", value: "Kyrgyzstan,KG"},
    {display: "&nbsp;&nbsp;&nbsp; Uzbekistan", value: "Uzbekistan,UZ"},

];

var eastern_asia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Eastern Asia", value: "Eashtern Asia,142"},
    {display: "&nbsp;&nbsp;&nbsp; China", value: "China,CN"},
    {display: "&nbsp;&nbsp;&nbsp; Hong Kong", value: "Hong Kong,HK"},
    {display: "&nbsp;&nbsp;&nbsp; Japan", value: "Japan,JP"},
    {display: "&nbsp;&nbsp;&nbsp; North Korea", value: "North Korea,KP"},
    {display: "&nbsp;&nbsp;&nbsp; South Korea", value: "South Korea,KR"},
    {display: "&nbsp;&nbsp;&nbsp; Mongolia", value: "Mongolia,MN"},
    {display: "&nbsp;&nbsp;&nbsp; Macao", value: "Macao,MO"},
    {display: "&nbsp;&nbsp;&nbsp; Taiwan", value: "Taiwan,TW"},


];

var southern_asia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Southern Asia", value: "Southern Asia,034"},
    {display: "&nbsp;&nbsp;&nbsp; Afghanistan", value: "Afghanistan,AF"},
    {display: "&nbsp;&nbsp;&nbsp; Bangladesh", value: "Bangladesh,BD"},
    {display: "&nbsp;&nbsp;&nbsp; Bhutan", value: "Bhutan,BT"},
    {display: "&nbsp;&nbsp;&nbsp; India", value: "India,IN"},
    {display: "&nbsp;&nbsp;&nbsp; Iran", value: "Iran, IR"},
    {display: "&nbsp;&nbsp;&nbsp; Sri Lanka", value: "Sri Lanka,LK"},
    {display: "&nbsp;&nbsp;&nbsp; Maldives", value: "Maldives,MV"},
    {display: "&nbsp;&nbsp;&nbsp; Nepal", value: "Nepal,NP"},
    {display: "&nbsp;&nbsp;&nbsp; Pakistan", value: "Pakistan,PK"},
    
];

var south_eastern_asia_list = [
    {display: "Choose a Country", value: ""},
    {display: "South-Eastern Asia", value: "South-Eastern Asia,035"},
    {display: "&nbsp;&nbsp;&nbsp; Brunei Darussalam", value: "Brunei Darussalam,BN"},
    {display: "&nbsp;&nbsp;&nbsp; Indonesia", value: "Indonesia,ID"},
    {display: "&nbsp;&nbsp;&nbsp; Cambodia", value: "Cambodia,KH"},
    {display: "&nbsp;&nbsp;&nbsp; Laos", value: "Laos,LA"},
    {display: "&nbsp;&nbsp;&nbsp; Myanmar", value: "Myanmar,MM"},
    {display: "&nbsp;&nbsp;&nbsp; Malaysia", value: "Malaysia,MY"},
    {display: "&nbsp;&nbsp;&nbsp; Philippines", value: "Philippines,PH"},
    {display: "&nbsp;&nbsp;&nbsp; Singapore", value: "Singapore,SG"},
    {display: "&nbsp;&nbsp;&nbsp; Thailand", value: "Thailand,TH"},
    {display: "&nbsp;&nbsp;&nbsp; Timor-Leste", value: "Timor-Leste,TL"},
    {display: "&nbsp;&nbsp;&nbsp; Viet Nams", value: "Viet Nam,VN"},


];

var western_asia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Western Asia", value: "Western Asia,145"},
    {display: "&nbsp;&nbsp;&nbsp; United Arab Emirates", value: "United Arab Emirates,AE"},
    {display: "&nbsp;&nbsp;&nbsp; Armenia", value: "Armenia,AM"},
    {display: "&nbsp;&nbsp;&nbsp; Azerbaijan", value: "Azerbaijan,AZ"},
    {display: "&nbsp;&nbsp;&nbsp; Bahrain", value: "Bahrain,BH"},
    {display: "&nbsp;&nbsp;&nbsp; Cyprus", value: "Cyprus,CY"},
    {display: "&nbsp;&nbsp;&nbsp; Georgia", value: "Georgia,GE"},
    {display: "&nbsp;&nbsp;&nbsp; Israel", value: "Israel,IL"},
    {display: "&nbsp;&nbsp;&nbsp; Iraq", value: "Iraq,IQ"},
    {display: "&nbsp;&nbsp;&nbsp; Jordan", value: "Jordan,JO"},
    {display: "&nbsp;&nbsp;&nbsp; Kuwait", value: "Kuwait,KW"},
    {display: "&nbsp;&nbsp;&nbsp; Lebanon", value: "Lebanon,LB"},
    {display: "&nbsp;&nbsp;&nbsp; Oman", value: "Oman,OM"},
    {display: "&nbsp;&nbsp;&nbsp; Palestine, State of", value: "Palestine, State of,PS"},
    {display: "&nbsp;&nbsp;&nbsp; Qatar", value: "Qatar,QA"},
    {display: "&nbsp;&nbsp;&nbsp; Saudi Arabia", value: "Saudi Arabia,SA"},
    {display: "&nbsp;&nbsp;&nbsp; Syrian Arab Republic", value: "Syrian Arab Republic,SY"},
    {display: "&nbsp;&nbsp;&nbsp; Turkey", value: "Turkey,TR"},
    {display: "&nbsp;&nbsp;&nbsp; Yemen", value: "Yemen,YE"},
    
];

/* --- O C E A N I A   L I S T --- */

var australia_and_new_zealanda_list = [
    {display: "Choose a Country", value: ""},
    {display: "Australia and New Zealand", value: "Australia and New Zealand,053"},
    {display: "&nbsp;&nbsp;&nbsp; Australia", value: "Australia,AU"},
    {display: "&nbsp;&nbsp;&nbsp; Norfolk Island", value: "Norfolk Island,NF"},
    {display: "&nbsp;&nbsp;&nbsp; New Zealand", value: "New Zealand,NZ"},
];

var melanesia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Melanesia", value: "Melanesia,054"},
    {display: "&nbsp;&nbsp;&nbsp; Fiji", value: "Fiji,FJ"},
    {display: "&nbsp;&nbsp;&nbsp; New Caledonia", value: "New Caledonia,NC"},
    {display: "&nbsp;&nbsp;&nbsp; Papua New Guinea", value: "Papua New Guinea,PG"},
    {display: "&nbsp;&nbsp;&nbsp; Solomon Islands", value: "Solomon Islands,SB"},
    {display: "&nbsp;&nbsp;&nbsp; Vanuatu", value: "Vanuatu,VU"},
];

var micronesia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Micronesia", value: "Micronesia,057"},
    {display: "&nbsp;&nbsp;&nbsp; Micronesia", value: "Micronesia,FM"},
    {display: "&nbsp;&nbsp;&nbsp; Guam", value: "Guam,GU"},
    {display: "&nbsp;&nbsp;&nbsp; Kiribati", value: "Kiribati,KI"},
    {display: "&nbsp;&nbsp;&nbsp; Marshall Islands", value: "Marshall Islands,MH"},
    {display: "&nbsp;&nbsp;&nbsp; Nauru", value: "Nauru,NR"},
    {display: "&nbsp;&nbsp;&nbsp; Palau", value: "Palau,PW"},

];

var polynesia_list = [
    {display: "Choose a Country", value: ""},
    {display: "Polynesia", value: "Polynesia,061"},
    {display: "&nbsp;&nbsp;&nbsp; Argentina", value: "Argentina,AS"},
    {display: "&nbsp;&nbsp;&nbsp; Cook Islands", value: "Cook Islands,CK"},
    {display: "&nbsp;&nbsp;&nbsp; Niue", value: "Niue,NU"},
    {display: "&nbsp;&nbsp;&nbsp; French Polynesia", value: "French Polynesia,PF"},
    {display: "&nbsp;&nbsp;&nbsp; Pitcairn", value: "Pitcairn,PN"},
    {display: "&nbsp;&nbsp;&nbsp; Tokelau", value: "Tokelau,TK"},
    {display: "&nbsp;&nbsp;&nbsp; Tonga", value: "Tonga,TO"},
    {display: "&nbsp;&nbsp;&nbsp; Tuvalu", value: "Tuvalu,TV"},
    {display: "&nbsp;&nbsp;&nbsp; Wallis and Futuna", value: "Wallis and Futuna,WF"},
    {display: "&nbsp;&nbsp;&nbsp; Samoa", value: "Samoa,WS"},
    
];

/* --- document.ready --- */

$( document ).ready(function() {
    
    $('#region_selector').change(function(){ 
        var r_array = $('#region_selector').val().split(',');
        continent_change(r_array[0],r_array[1]);
    });
    $('#subcontinent_selector').change(function(){
        var sc_array = $('#subcontinent_selector').val().split(',');
        subcontinent_change(sc_array[0],sc_array[1]);
    }); 
    $('#country_selector').change(function(){
        var c_array = $('#country_selector').val().split(',');
        country_change(c_array[0],c_array[1]);
    }); 
});
    

function continent_change(continent,region){

    redrawRegionsMap(region);
    
    switch(continent){
    
        case 'africa_list':
            list(africa_list,'subcontinent_selector');
            break;
        case 'europe_list':
            list(europe_list,'subcontinent_selector');
            break;
        case 'americas_list':
            list(americas_list,'subcontinent_selector');
            break;
        case 'asia_list':
            list(asia_list,'subcontinent_selector');
            break;
        case 'oceania_list':
            list(oceania_list,'subcontinent_selector');
            break;
        case 'world_list':
            break;
    }
    
}

function subcontinent_change(continent,region){

    redrawRegionsMap(region);

    var subcontinent = continent.split(",")[0];

    switch(subcontinent){
        
/* --- Africa --- */    

        case 'Northern Africa':
            list(northern_africa_list, 'country_selector');
            break;
            
        case 'Western Africa':
            list(western_africa_list, 'country_selector');
            break;
            
        case 'Middle Africa':
            list(middle_africa_list, 'country_selector');
            break;
            
        case 'Eastern Africa':
            list(eastern_africa_list, 'country_selector');
            break;
            
        case 'Southern Africa':
            list(southern_africa_list, 'country_selector');
            break;
            
/* --- Europe --- */

        case 'Northern Europe':
            list(northern_europe_list, 'country_selector');
            break;
            
        case 'Western Europe':
            list(western_europe_list, 'country_selector');
            break;

        case 'Eastern Europe':
            list(eastern_europe_list, 'country_selector');
            break;
            
        case 'Southern Europe':
            list(southern_europe_list, 'country_selector');
            break;
    
/* --- Americas --- */

        case 'Northern America':
            list(northern_america_list, 'country_selector');
            break;
            
        case 'Caribbean':
            list(caribbean_list, 'country_selector');
            break;

        case 'Central America':
            list(central_america_list, 'country_selector');
            break;
            
        case 'South America':
            list(south_america_list, 'country_selector');
            break;

/* --- Asia --- */

        case 'Central Asia':
            list(central_asia_list, 'country_selector');
            break;
            
        case 'Eastern Asia':
            list(eastern_asia_list, 'country_selector');
            break;

        case 'Southern Asia':
            list(southern_asia_list, 'country_selector');
            break;
            
        case 'South-Eastern Asia':
            list(south_eastern_asia_list, 'country_selector');
            break;
            
        case 'Western Asia':
            list(western_asia_list, 'country_selector');
            break;
            
/* --- Oceania --- */

        case 'Australia and New Zealand':
            list(australia_and_new_zealanda_list, 'country_selector');
            break;
            
        case 'Melanesia':
            list(melanesia_list, 'country_selector');
            break;

        case 'Micronesia':
            list(micronesia_list, 'country_selector');
            break;
            
        case 'Polynesia':
            list(polynesia_list, 'country_selector');
            break;
    }
}

function country_change(subcontinent,region){

    redrawRegionsMap(region,'provinces');

    var country = subcontinent.split(",")[0];

    switch(country){
    
        case 'Northern Africa':
            list(northern_africa_list, 'country_selector');
            break;

    }
}

function list(array_list,selection){

  $("#" + selection).html(''); 
  $(array_list).each(function (i) { 
      $("#" + selection).append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
  });    
}
    
google.load("visualization", "1", {packages:["geochart"]});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    
    $('#regions_div').html('');
    
    var data = google.visualization.arrayToDataTable([
    
    	['Country', 'Popularity'],
    	
    	/* ------------------------ A F R I C A ------------------------ */ // Region: 002
    	
    	/* --- N O R T H    A F R I C A --- */ // Region: 015 
    	
    	['Algeria', 700], // 'DZ'
    	['Egypt', 700], // 'EG'
    	['Western Sahara', 700], // 'EH'
    	['Libya', 700], // 'LY'
    	['Morocco', 700], // 'MA'
    	['Sudan', 700], // 'SD'
    	['Tunisia', 700], // 'TN'
    	
    	/* --- W E S T E R N    A F R I C A --- */ // Region: 011 
    	
    	['Burkina Faso', 700], // 'BF'
    	['Benin', 700], // 'BJ'
    	['Côte d\'Ivoire', 700], // CI
    	['Cabo Verde', 700], // 'CV'
    	['Ghana', 700], // 'GH'
    	['Gambia', 700], // 'GM'
    	['Guinea', 700], // 'GN'
    	['Guinea-Bissau', 700], // 'GW'
    	['Liberia', 700], // 'LR'
    	['Mali', 700], // 'ML'
    	['Mauritania', 700], // 'MR'
    	['Niger', 700], // 'NE'
    	['Nigeria', 700], // 'NG'
    	['Saint Helena, Ascension and Tristan da Cunha', 700], // 'SH'
    	['Sierra Leone', 700], // 'SL' 
    	['Senegal', 700], // 'SN'
    	['Togo', 700], // 'TG'
    	
    	/* --- M I D D L E    A F R I C A --- */ // Region: 017 
    	
    	['Angola', 700], // 'AO'
    	['The Democratic Republic of the Congo', 700], // 'CD'
    	['Zaire', 700], // 'ZR'
    	['Central African Republic', 700], // 'CF'
    	['Congo', 700], // 'CG'
    	['Cameroon', 700], // 'CM'
    	['Gabon', 700], // 'GA'
    	['Equatorial Guinea', 700], // 'GQ'
    	['Sao Tome and Principe', 700], // 'ST'
    	['Chad', 700], // 'TD'
    	
    	/* --- E A S T E R N    A F R I C A --- */ // Region: 014 
    	
    	['Burundi', 700], // 'BI'
    	['Djibouti', 700], // 'DJ'
    	['Eritrea', 700], // 'ER'
    	['Ethiopia', 700], // 'ET'
    	['Kenya', 700], // 'KE'
    	['Comoros', 700], // 'KM'
    	['Madagascar', 700], // 'MG'
    	['Mauritius', 700], // 'MU'
    	['Malawi', 700], // 'MW'
    	['Mozambique', 700], // 'MZ'
    	['Réunion', 700], // 'RE'
    	['Rwanda', 700], // 'RW'
    	['Seychelles', 700], // 'SC'
    	['Somalia', 700], // 'SO'
    	['Tanzania, United Republic of', 700], // 'TZ'
    	['Uganda', 700], // 'UG'
    	['Mayotte', 700], // 'YT'
    	['Zambia', 700], // 'ZM'
    	['Zimbabwe', 700], // 'ZW'
    	
    	/* --- S O U T H E R N    A F R I C A --- */ // Region: 018 
    	
    	['Botswana', 700], // 'BW'
    	['Lesotho', 700], // 'LS'
    	['Namibia', 700], // 'NA'
    	['Swaziland', 700], // 'SZ'
    	['South Africa', 700], // 'ZA'
    	
    	/* ------------------------ E U R O P E ------------------------ */ // Region: 150 
    	
    	/* --- N O R T H E R N    E U R O P E --- */ // Region: 154 
    	
    	['Guernsey', 700], // 'GG'
    	['Jersey', 700], // 'JE'
    	['Åland Islands', 700], // 'AX'
    	['Denmark', 700], // 'DK'
    	['Estonia', 700], // 'EE'
    	['Finland', 700], // 'FI'
    	['Faroe Islands', 700], // 'FO'
    	['United Kingdom of Great Britain and Northern Ireland', 700], // 'GB'
    	['Ireland', 700], // 'IE'
    	['Isle of Man', 700], // 'IM'
    	['Iceland', 700], // 'IS'
    	['Lithuania', 700], // 'LT'
    	['Latvia', 700], // 'LV'
    	['Norway', 700], // 'NO'
    	['Sweden', 700], // 'SE'
    	['Svalbard and Jan Mayen', 700], // 'SJ'
    	
    	/* --- W E S T E R N    E U R O P E --- */ // Region: 155 
    	
    	['Austria', 700], // 'AT'
    	['Belgium', 700], // 'BE'
    	['Switzerland', 700], // 'CH'
    	['Germany', 700], // 'DE'
    	['German Democratic Republic', 700], // 'DD'
    	['France', 700], // 'FR'
    	['France, Metropolitan', 700], // 'FX'
    	['Liechtenstein', 700], // 'LI'
    	['Luxembourg', 700], // 'LU'
    	['Monaco', 700], // 'MC'
    	['Netherlands', 700], // 'NL'
    	
    	/* --- E A S T E R N    E U R O P E --- */ // Region: 151 
    	
    	['Bulgaria', 700], // 'BG'
    	['Belarus', 700], // 'BY'
    	['Czech Republic', 700], // 'CZ'
    	['Hungary', 700], // 'HU'
    	['Moldova, Republic of', 700], // 'MD'
    	['Poland', 700], // 'PL'
    	['Romania', 700], // 'RO'
    	['Russian Federation', 700], // 'RU'
    	['USSR', 700], // 'SU'
    	['Slovakia', 700], // 'SK'
    	['Ukraine', 700], // 'UA'
    	
    	/* --- S O U T H E R N    E U R O P E --- */ // Region: 039 
    	
    	['Andorra', 700], // 'AD'
    	['Albania', 700], // 'AL'
    	['Bosnia and Herzegovina', 700], // 'BA'
    	['Spain', 700], // 'ES'
    	['Gibraltar', 700], // 'GI'
    	['Greece', 700], // 'GR'
    	['Croatia', 700], // 'HR'
    	['Italy', 700], // 'IT'
    	['Montenegro', 700], // 'ME'
    	['Macedonia, the former Yugoslav Republic of', 700], // 'MK'
    	['Malta', 700], // 'MT'
    	['Serbia and Montenegro', 700], // 'CS'
    	['Serbia', 700], // 'RS'
    	['Portugal', 700], // 'PT'
    	['Slovenia', 700], // 'SI'
    	['San Marino', 700], // 'SM'
    	['Holy See', 700], // 'VA'
    	['Yugoslavia', 700], // 'YU'
    	
    	/* ------------------------ A M E R I C A S ------------------------ */ // Region: 019 
    	
    	/* --- N O R T H    A M E R I C A --- */ // Region: 021 
    	
    	['Bermuda', 700], // 'BM'
    	['Canada', 700], // 'CA'
    	['Greenland', 700], // 'GL'
    	['Saint Pierre and Miquelon', 700], // 'PM'
    	['United States', 700], // 'US'
    	
    	/* --- C A R I B B E A N --- */ // Region: 029 
    	
    	['Antigua and Barbuda', 700], // 'AG'
    	['Anguilla', 700], // 'AI'
    	['Netherlands Antilles', 700], // 'AN'
    	['Aruba', 700], // 'AW'
    	['Barbados', 700], // 'BB'
    	['Saint Barthélemy', 700], // 'BL'
    	['Bahamas', 700], // 'BS'
    	['Cuba', 700], // 'CU'
    	['Dominica', 700], // 'DM'
    	['Dominican Republic', 700], // 'DO'
    	['Grenada', 700], // 'GD'
    	['Guadeloupe', 700], // 'GP'
    	['Haiti', 700], // 'Haiti'
    	['Jamaica', 700], // 'JM'
    	['Saint Kitts and Nevis', 700], // 'KN'
    	['Cayman Islands', 700], // 'KY'
    	['Saint Lucia', 700], // 'LC'
    	['Saint Martin (French part)', 700], // 'MF'
    	['Martinique', 700], // 'MQ'
    	['Montserrat', 700], // 'MS'
    	['Puerto Rico', 700], // 'PR'
    	['Turks and Caicos Islands', 700], // 'TC'
    	['Trinidad and Tobago', 700], // 'TT'
    	['Saint Vincent and the Grenadines', 700], // 'VC'
    	['Virgin Islands, British', 700], // 'VG'
    	['Virgin Islands, U.S.', 700], // 'VI'
    	
    	/* --- C E N T R A L    A M E R I C A --- */ // Region: 013 
    	
    	['Belize', 700], // 'BZ'
    	['Costa Rica', 700], // 'CR'
    	['Guatemala', 700], // 'GT'
    	['Honduras', 700], // 'HN'
    	['Mexico', 700], // 'MX'
    	['Nicaragua', 700], // 'NI'
    	['Panama', 700], // 'PA'
    	['El Salvador', 700], // 'SV'
    	
    	/* --- S O U T H    A M E R I C A --- */ // Region: 005 
    	
    	['Argentina', 700], // 'RA'
    	['Bolivia', 700], // 'BO'
    	['Brazil', 700], // 'BR'
    	['Chile', 700], // 'CL'
    	['Columbia', 700], // 'CO'
    	['Ecuador', 700], // 'EC'
    	['Falkland Islands', 700], // 'FK'
    	['French Guiana', 700], // 'GF'
    	['Guyana', 700], // 'GY'
    	['Paraguay', 700], // 'PY'
    	['Peru', 700], // 'PE'
    	['Suriname', 700], // 'SR'
    	['Uruguay', 700], // 'UY'
    	['Venezuela', 700], // 'VE'
    	
    	/* ------------------------ A S I A ------------------------ */ // Region: 142 
    	
    	/* --- C E N T R A L    A S I A --- */ // Region: 143 
    	
    	['Turkmenistan', 700], // 'TM'
    	['Tajikistan', 700], // 'TJ'
    	['Kyrgyzstan', 700], // 'KG'
    	['Kazakhstan', 700], // 'KZ'
    	['Uzbekistan', 700], // 'UZ'
    	
    	/* --- E A S T E R N    A S I A --- */ // Region: 030 
    	
    	['China', 700], // 'CN'
    	['Hong Kong', 700], // 'HK'
    	['Japan', 700], // 'JP'
    	['Korea, Democratic People\'s Republic of', 700], // 'KP'
    	['Korea, Republic of', 700], // 'KR'
    	['Mongolia', 700], // 'MN'
    	['Macao', 700], // 'MO'
    	['Taiwan, Province of China', 700], // 'TW'
    	
    	/* --- S O U T H E R N    A S I A --- */ // Region: 034           
    	
    	['Afghanistan', 700], // 'AF'
    	['Bangladesh', 700], // 'BD'
    	['Bhutan', 700], // 'BT'
    	['India', 700], // 'IN'
    	['Iran, Islamic Republic of', 700], // 'IR'
    	['Sri Lanka', 700], // 'LK'
    	['Maldives', 700], // 'MV'
    	['Nepal', 700], // 'NP'
    	['Pakistan', 700], // 'PK'
    	
    	/* --- S O U T H     E A S T E R N    A S I A --- */ // Region: 035 
    	
    	['Brunei Darussalam', 700], // 'BN'
    	['Indonesia', 700], // 'ID'
    	['Cambodia', 700], // 'KH'
    	['Lao People\'s Democratic Republic', 700], // 'LA'
    	['Myanmar', 700], // 'MM'
    	['Burma', 700], // 'BM'
    	['Malaysia', 700], // 'MY'
    	['Philippines', 700], // 'PH'
    	['Singapore', 700], // 'SG'
    	['Thailand', 700], // 'TH'
    	['Timor-Leste', 700], // 'TL'
    	['East Timor', 700], // 'TP'
    	['Viet Nam', 700], // 'VT'
    	
    	/* --- W E S T E R N    A S I A --- */ // Region: 145 
    	
    	['United Arab Emirates', 700], // 'AE'
    	['Armenia', 700], // 'AM'
    	['Azerbaijan', 700], // 'AZ'
    	['Bahrain', 700], // 'BH'
    	['Cyprus', 700], // 'CY'
    	['Georgia', 700], // 'GE'
    	['Israel', 700], // 'IL'
    	['Iraq', 700], // 'IQ'
    	['Jordan', 700], // 'JO'
    	['Kuwait', 700], // 'KW'
    	['Lebanon', 700], // 'LB'
    	['Oman', 700], // 'OM'
    	['Palestine, State of', 700], // 'PS'
    	['Qatar', 700], // QA
    	['Saudi Arabia', 700], // 'SA'
    	['Neutral Zone', 700], // 'NT'
    	['Syrian Arab Republic', 700], // 'SY'
    	['Turkey', 700], // 'TR'
    	['Yemen', 700], // 'YE'
    	['Yemen, Democratic', 700], // 'YE'
    	
    	/* ------------------------ O C E A N I A ------------------------ */ // Region: 009 
    	
    	/* --- A U S T R A I L I A / N E W Z E A L A N D --- */ // Region: 053 
    	
    	['Austrailia', 700], // 'AU'
    	['Norfolk Island', 700], // 'NF'
    	['New Zealand', 700], // 'NZ'
    	
    	/* --- M E L A N E S I A --- */ // Region: 054 
    	
    	['Fiji', 700], // 'FJ'
    	['New Caledonia', 700], // 'NC'
    	['Papua New Guinea', 700], // PG
    	['Solomon Islands', 700], // 
    	['Vanuatu', 700], // 'SB'
    	
    	/* --- M I C R O N E S I A --- */ // Region: 057 
    	
    	['Micronesia, Federated States of', 700], // 'FM'
    	['Guam', 700], // 'GU'
    	['Kiribati', 700], // 'KI'
    	['Marshall Islands', 700], // 'MH'
    	['Northern Mariana Islands', 700], // MP
    	['Nauru', 700], // 'NR'
    	['Palau', 700], // 'PW'
    	
    	/* --- P O L Y N E S I A --- */ // Region: 061 
    	
    	['American Samoa', 700], // 'AS'
    	['Cook Islands', 700], // 'CK'
    	['French Polynesia', 700], // 'PF'
    	['Pitcairn', 700], // 'PN'
    	['Tokelau', 700], // 'TK'
    	['Tonga', 700], // 'TO'
    	['Tuvalu', 700], // 'TV'
    	['Wallis and Futuna', 700], // 'WF'
    	['Samoa', 700], // 'WS'
    	
    	/* ------------------------ I N D I V I D U A L    C O U N T R I E S ------------------------ */
    	
    	/* --- U N I T E D    S T A T E S    O F   A M E R I C A --- */ //Region
		['Alaska', 700], // 'US-AK'
    	['Alabama', 700], // 'US-AL'
    	['Arkansas', 700], // 'US-AR'
//    	['American Samoa', 700], // 'US-AS'
    	['Arizona', 700], // 'US-AZ'
    	['California', 700], // 'US-CA'
    	['Colorado', 700], // 'US-CO'
    	['Connecticut', 700], // 'US-CT'
//    	['District of Columbia', 700] // 'US-DC'
    	['Delaware', 700], // 'US-DE'
    	['Florida', 700], // 'US-FL'
    	['Georgia', 700], // 'US-GA'
    	['Guam', 700], // 'US-GU'
    	['Hawaii', 700], // 'US-HI'
    	['Iowa', 700], // 'US-IA'
    	['Idaho', 700], // 'US-ID'
    	['Illinois', 700], // 'US-IL'
    	['Indiana', 700], // 'US-IN'
    	['Kansas', 700], // 'US-KS'
    	['Kentucky', 700], // 'US-KY'
    	['Louisiana', 700], // 'US-LA'
    	['Massachusetts', 700], // 'US-MA'
    	['Maryland', 700], // 'US-MD'
    	['Maine', 700], // 'US-MI'
    	['Michigan', 700], // 'US-CO'
    	['Minnesota', 700], // 'US-MN'
    	['Missouri', 700], // 'US-MO'
//    	['Northern Mariana Islands', 700], // 'US-MP'
    	['Mississippi', 700], // 'US-MS'
    	['Montana', 700], // 'US-MT'
    	['North Carolina', 700], // 'US-NC'
    	['North Dakota', 700], // 'US-ND'
    	['Nebraska', 700], // 'US-NE'
    	['New Hampshire', 700], // 'US-NH'
    	['New Jersey', 700], // 'US-NJ'
    	['New Mexico', 700], // 'US-NM'
    	['Nevada', 700], // 'US-NV'
    	['New York', 700], // 'US-NY'
    	['Ohio', 700], // 'US-OH'
    	['Oklahoma', 700], // 'US-OK'
    	['Oregon', 700], // 'US-OR'
//    	['Puerto Rico', 700], // 'US-PR'
//    	['District of Columbia', 700], // 'US-DC'
    	['Rhode Island', 700], // 'US-RI'
    	['South Carolina', 700], // 'US-SC'
    	['South Dakota', 700], // 'US-SD'
    	['Tennessee', 700], // 'US-TN'
    	['Texas', 700], // 'US-TX'
//    	['United States Minor Outlying Islands', 700], // 'US-UM'
    	['Utah', 700], // 'US-UT'
    	['Virginia', 700], // 'US-VA'
    	['Virgin Islands, U.S.', 700], // 'US-VI'
    	['Vermont', 700], // 'US-VT'
    	['West Virginia', 700], // 'US-WV'
    	['Wisconsin', 700], // 'US-WI'
    	['Wyoming', 700], // 'US-WY'
//    	['American Samoa', 700], // 'US-AS'
//      ['United States Minor Outlying Islands', 700], // 'US-UM'
    	['Alabama', 700], // 'US-AL'
    	['Arkansas', 700], // 'US-AR'
//    	['American Samoa', 700], // 'US-AS'
    	['Arizona', 700], // 'US-AZ'
    	['Washington', 700], // 'US-WA'
    	['Pennsylvania', 700] // 'US-PA'

    ]);
    
    var options = {
    /*
      region: 'world',
      resolution: '',
      defaultColor: 'blue'
    */
     backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },
     colorAxis:  {minValue: 0, maxValue: 49,  colors: ['#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E',]},
     legend: 'none',	
     backgroundColor: {fill:'#FFFFFF',stroke:'#FFFFFF' ,strokeWidth:0 },	
     datalessRegionColor: '#f5f5f5',
     displayMode: 'regions', 
     enableRegionInteractivity: 'true', 
     resolution: 'provinces',
     sizeAxis: {minValue: 1, maxValue:1,minSize:10,  maxSize: 10},
     region:'US',
     keepAspectRatio: true,
     width:600,
     height:400,
     tooltip: {textStyle: {color: '#444444'}, trigger:'hover'}	
    };
    
    function selectHandler() {
      var selection = chart.getSelection();
      var message = '';
      for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null && item.column != null) {
          var str = data.getFormattedValue(item.row, item.column);
          //message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
          message = str;
        } else if (item.row != null) {
          var str = data.getFormattedValue(item.row, 0);
          //message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
          message = str;
          
        } else if (item.column != null) {
          var str = data.getFormattedValue(0, item.column);
          //message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
          message = str;
        }
      }
      if (message == '') {
        message = 'nothing';
      }
      //alert('You selected ' + message);
      $("#cp_title").html(message);
      displayregiontitle(message);
    }
    /*
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(data, options);
    */
    
    var chart = new google.visualization.GeoChart(document.getElementById('visualization')); 
    google.visualization.events.addListener(chart, 'select', function() {
        var selection = chart.getSelection();
        if (selection.length == 1) {
            var selectedRow = selection[0].row;
            var selectedRegion = data.getValue(selectedRow, 0);
            //if(ivalue[selectedRegion] != '') { alert(ivalue[selectedRegion]); }
        }
    });
    chart.draw(data, options);    
    
}

function redrawRegionsMap(region,resolution) {
    
    $('#regions_div').html('');
    
    var data = google.visualization.arrayToDataTable([
    
    	['Country', 'Popularity'],
    	
    	/* ------------------------ A F R I C A ------------------------ */ // Region: 002
    	
    	/* --- N O R T H    A F R I C A --- */ // Region: 015 
    	
    	['Algeria', 700], // 'DZ'
    	['Egypt', 700], // 'EG'
    	['Western Sahara', 700], // 'EH'
    	['Libya', 700], // 'LY'
    	['Morocco', 700], // 'MA'
    	['Sudan', 700], // 'SD'
    	['Tunisia', 700], // 'TN'
    	
    	/* --- W E S T E R N    A F R I C A --- */ // Region: 011 
    	
    	['Burkina Faso', 700], // 'BF'
    	['Benin', 700], // 'BJ'
    	['Côte d\'Ivoire', 700], // CI
    	['Cabo Verde', 700], // 'CV'
    	['Ghana', 700], // 'GH'
    	['Gambia', 700], // 'GM'
    	['Guinea', 700], // 'GN'
    	['Guinea-Bissau', 700], // 'GW'
    	['Liberia', 700], // 'LR'
    	['Mali', 700], // 'ML'
    	['Mauritania', 700], // 'MR'
    	['Niger', 700], // 'NE'
    	['Nigeria', 700], // 'NG'
    	['Saint Helena, Ascension and Tristan da Cunha', 700], // 'SH'
    	['Sierra Leone', 700], // 'SL' 
    	['Senegal', 700], // 'SN'
    	['Togo', 700], // 'TG'
    	
    	/* --- M I D D L E    A F R I C A --- */ // Region: 017 
    	
    	['Angola', 700], // 'AO'
    	['The Democratic Republic of the Congo', 700], // 'CD'
    	['Zaire', 700], // 'ZR'
    	['Central African Republic', 700], // 'CF'
    	['Congo', 700], // 'CG'
    	['Cameroon', 700], // 'CM'
    	['Gabon', 700], // 'GA'
    	['Equatorial Guinea', 700], // 'GQ'
    	['Sao Tome and Principe', 700], // 'ST'
    	['Chad', 700], // 'TD'
    	
    	/* --- E A S T E R N    A F R I C A --- */ // Region: 014 
    	
    	['Burundi', 700], // 'BI'
    	['Djibouti', 700], // 'DJ'
    	['Eritrea', 700], // 'ER'
    	['Ethiopia', 700], // 'ET'
    	['Kenya', 700], // 'KE'
    	['Comoros', 700], // 'KM'
    	['Madagascar', 700], // 'MG'
    	['Mauritius', 700], // 'MU'
    	['Malawi', 700], // 'MW'
    	['Mozambique', 700], // 'MZ'
    	['Réunion', 700], // 'RE'
    	['Rwanda', 700], // 'RW'
    	['Seychelles', 700], // 'SC'
    	['Somalia', 700], // 'SO'
    	['Tanzania, United Republic of', 700], // 'TZ'
    	['Uganda', 700], // 'UG'
    	['Mayotte', 700], // 'YT'
    	['Zambia', 700], // 'ZM'
    	['Zimbabwe', 700], // 'ZW'
    	
    	/* --- S O U T H E R N    A F R I C A --- */ // Region: 018 
    	
    	['Botswana', 700], // 'BW'
    	['Lesotho', 700], // 'LS'
    	['Namibia', 700], // 'NA'
    	['Swaziland', 700], // 'SZ'
    	['South Africa', 700], // 'ZA'
    	
    	/* ------------------------ E U R O P E ------------------------ */ // Region: 150 
    	
    	/* --- N O R T H E R N    E U R O P E --- */ // Region: 154 
    	
    	['Guernsey', 700], // 'GG'
    	['Jersey', 700], // 'JE'
    	['Åland Islands', 700], // 'AX'
    	['Denmark', 700], // 'DK'
    	['Estonia', 700], // 'EE'
    	['Finland', 700], // 'FI'
    	['Faroe Islands', 700], // 'FO'
    	['United Kingdom of Great Britain and Northern Ireland', 700], // 'GB'
    	['Ireland', 700], // 'IE'
    	['Isle of Man', 700], // 'IM'
    	['Iceland', 700], // 'IS'
    	['Lithuania', 700], // 'LT'
    	['Latvia', 700], // 'LV'
    	['Norway', 700], // 'NO'
    	['Sweden', 700], // 'SE'
    	['Svalbard and Jan Mayen', 700], // 'SJ'
    	
    	/* --- W E S T E R N    E U R O P E --- */ // Region: 155 
    	
    	['Austria', 700], // 'AT'
    	['Belgium', 700], // 'BE'
    	['Switzerland', 700], // 'CH'
    	['Germany', 700], // 'DE'
    	['German Democratic Republic', 700], // 'DD'
    	['France', 700], // 'FR'
    	['France, Metropolitan', 700], // 'FX'
    	['Liechtenstein', 700], // 'LI'
    	['Luxembourg', 700], // 'LU'
    	['Monaco', 700], // 'MC'
    	['Netherlands', 700], // 'NL'
    	
    	/* --- E A S T E R N    E U R O P E --- */ // Region: 151 
    	
    	['Bulgaria', 700], // 'BG'
    	['Belarus', 700], // 'BY'
    	['Czech Republic', 700], // 'CZ'
    	['Hungary', 700], // 'HU'
    	['Moldova, Republic of', 700], // 'MD'
    	['Poland', 700], // 'PL'
    	['Romania', 700], // 'RO'
    	['Russian Federation', 700], // 'RU'
    	['USSR', 700], // 'SU'
    	['Slovakia', 700], // 'SK'
    	['Ukraine', 700], // 'UA'
    	
    	/* --- S O U T H E R N    E U R O P E --- */ // Region: 039 
    	
    	['Andorra', 700], // 'AD'
    	['Albania', 700], // 'AL'
    	['Bosnia and Herzegovina', 700], // 'BA'
    	['Spain', 700], // 'ES'
    	['Gibraltar', 700], // 'GI'
    	['Greece', 700], // 'GR'
    	['Croatia', 700], // 'HR'
    	['Italy', 700], // 'IT'
    	['Montenegro', 700], // 'ME'
    	['Macedonia, the former Yugoslav Republic of', 700], // 'MK'
    	['Malta', 700], // 'MT'
    	['Serbia and Montenegro', 700], // 'CS'
    	['Serbia', 700], // 'RS'
    	['Portugal', 700], // 'PT'
    	['Slovenia', 700], // 'SI'
    	['San Marino', 700], // 'SM'
    	['Holy See', 700], // 'VA'
    	['Yugoslavia', 700], // 'YU'
    	
    	/* ------------------------ A M E R I C A S ------------------------ */ // Region: 019 
    	
    	/* --- N O R T H    A M E R I C A --- */ // Region: 021 
    	
    	['Bermuda', 700], // 'BM'
    	['Canada', 700], // 'CA'
    	['Greenland', 700], // 'GL'
    	['Saint Pierre and Miquelon', 700], // 'PM'
    	['United States', 700], // 'US'
    	
    	/* --- C A R I B B E A N --- */ // Region: 029 
    	
    	['Antigua and Barbuda', 700], // 'AG'
    	['Anguilla', 700], // 'AI'
    	['Netherlands Antilles', 700], // 'AN'
    	['Aruba', 700], // 'AW'
    	['Barbados', 700], // 'BB'
    	['Saint Barthélemy', 700], // 'BL'
    	['Bahamas', 700], // 'BS'
    	['Cuba', 700], // 'CU'
    	['Dominica', 700], // 'DM'
    	['Dominican Republic', 700], // 'DO'
    	['Grenada', 700], // 'GD'
    	['Guadeloupe', 700], // 'GP'
    	['Haiti', 700], // 'Haiti'
    	['Jamaica', 700], // 'JM'
    	['Saint Kitts and Nevis', 700], // 'KN'
    	['Cayman Islands', 700], // 'KY'
    	['Saint Lucia', 700], // 'LC'
    	['Saint Martin (French part)', 700], // 'MF'
    	['Martinique', 700], // 'MQ'
    	['Montserrat', 700], // 'MS'
    	['Puerto Rico', 700], // 'PR'
    	['Turks and Caicos Islands', 700], // 'TC'
    	['Trinidad and Tobago', 700], // 'TT'
    	['Saint Vincent and the Grenadines', 700], // 'VC'
    	['Virgin Islands, British', 700], // 'VG'
    	['Virgin Islands, U.S.', 700], // 'VI'
    	
    	/* --- C E N T R A L    A M E R I C A --- */ // Region: 013 
    	
    	['Belize', 700], // 'BZ'
    	['Costa Rica', 700], // 'CR'
    	['Guatemala', 700], // 'GT'
    	['Honduras', 700], // 'HN'
    	['Mexico', 700], // 'MX'
    	['Nicaragua', 700], // 'NI'
    	['Panama', 700], // 'PA'
    	['El Salvador', 700], // 'SV'
    	
    	/* --- S O U T H    A M E R I C A --- */ // Region: 005 
    	
    	['Argentina', 700], // 'RA'
    	['Bolivia', 700], // 'BO'
    	['Brazil', 700], // 'BR'
    	['Chile', 700], // 'CL'
    	['Columbia', 700], // 'CO'
    	['Ecuador', 700], // 'EC'
    	['Falkland Islands', 700], // 'FK'
    	['French Guiana', 700], // 'GF'
    	['Guyana', 700], // 'GY'
    	['Paraguay', 700], // 'PY'
    	['Peru', 700], // 'PE'
    	['Suriname', 700], // 'SR'
    	['Uruguay', 700], // 'UY'
    	['Venezuela', 700], // 'VE'
    	
    	/* ------------------------ A S I A ------------------------ */ // Region: 142 
    	
    	/* --- C E N T R A L    A S I A --- */ // Region: 143 
    	
    	['Turkmenistan', 700], // 'TM'
    	['Tajikistan', 700], // 'TJ'
    	['Kyrgyzstan', 700], // 'KG'
    	['Kazakhstan', 700], // 'KZ'
    	['Uzbekistan', 700], // 'UZ'
    	
    	/* --- E A S T E R N    A S I A --- */ // Region: 030 
    	
    	['China', 700], // 'CN'
    	['Hong Kong', 700], // 'HK'
    	['Japan', 700], // 'JP'
    	['Korea, Democratic People\'s Republic of', 700], // 'KP'
    	['Korea, Republic of', 700], // 'KR'
    	['Mongolia', 700], // 'MN'
    	['Macao', 700], // 'MO'
    	['Taiwan, Province of China', 700], // 'TW'
    	
    	/* --- S O U T H E R N    A S I A --- */ // Region: 034           
    	
    	['Afghanistan', 700], // 'AF'
    	['Bangladesh', 700], // 'BD'
    	['Bhutan', 700], // 'BT'
    	['India', 700], // 'IN'
    	['Iran, Islamic Republic of', 700], // 'IR'
    	['Sri Lanka', 700], // 'LK'
    	['Maldives', 700], // 'MV'
    	['Nepal', 700], // 'NP'
    	['Pakistan', 700], // 'PK'
    	
    	/* --- S O U T H     E A S T E R N    A S I A --- */ // Region: 035 
    	
    	['Brunei Darussalam', 700], // 'BN'
    	['Indonesia', 700], // 'ID'
    	['Cambodia', 700], // 'KH'
    	['Lao People\'s Democratic Republic', 700], // 'LA'
    	['Myanmar', 700], // 'MM'
    	['Burma', 700], // 'BM'
    	['Malaysia', 700], // 'MY'
    	['Philippines', 700], // 'PH'
    	['Singapore', 700], // 'SG'
    	['Thailand', 700], // 'TH'
    	['Timor-Leste', 700], // 'TL'
    	['East Timor', 700], // 'TP'
    	['Viet Nam', 700], // 'VT'
    	
    	/* --- W E S T E R N    A S I A --- */ // Region: 145 
    	
    	['United Arab Emirates', 700], // 'AE'
    	['Armenia', 700], // 'AM'
    	['Azerbaijan', 700], // 'AZ'
    	['Bahrain', 700], // 'BH'
    	['Cyprus', 700], // 'CY'
    	['Georgia', 700], // 'GE'
    	['Israel', 700], // 'IL'
    	['Iraq', 700], // 'IQ'
    	['Jordan', 700], // 'JO'
    	['Kuwait', 700], // 'KW'
    	['Lebanon', 700], // 'LB'
    	['Oman', 700], // 'OM'
    	['Palestine, State of', 700], // 'PS'
    	['Qatar', 700], // QA
    	['Saudi Arabia', 700], // 'SA'
    	['Neutral Zone', 700], // 'NT'
    	['Syrian Arab Republic', 700], // 'SY'
    	['Turkey', 700], // 'TR'
    	['Yemen', 700], // 'YE'
    	['Yemen, Democratic', 700], // 'YE'
    	
    	/* ------------------------ O C E A N I A ------------------------ */ // Region: 009 
    	
    	/* --- A U S T R A I L I A / N E W Z E A L A N D --- */ // Region: 053 
    	
    	['Austrailia', 700], // 'AU'
    	['Norfolk Island', 700], // 'NF'
    	['New Zealand', 700], // 'NZ'
    	
    	/* --- M E L A N E S I A --- */ // Region: 054 
    	
    	['Fiji', 700], // 'FJ'
    	['New Caledonia', 700], // 'NC'
    	['Papua New Guinea', 700], // PG
    	['Solomon Islands', 700], // 
    	['Vanuatu', 700], // 'SB'
    	
    	/* --- M I C R O N E S I A --- */ // Region: 057 
    	
    	['Micronesia, Federated States of', 700], // 'FM'
    	['Guam', 700], // 'GU'
    	['Kiribati', 700], // 'KI'
    	['Marshall Islands', 700], // 'MH'
    	['Northern Mariana Islands', 700], // MP
    	['Nauru', 700], // 'NR'
    	['Palau', 700], // 'PW'
    	
    	/* --- P O L Y N E S I A --- */ // Region: 061 
    	
    	['American Samoa', 700], // 'AS'
    	['Cook Islands', 700], // 'CK'
    	['French Polynesia', 700], // 'PF'
    	['Pitcairn', 700], // 'PN'
    	['Tokelau', 700], // 'TK'
    	['Tonga', 700], // 'TO'
    	['Tuvalu', 700], // 'TV'
    	['Wallis and Futuna', 700], // 'WF'
    	['Samoa', 700], // 'WS'
    
    	/* ------------------------ I N D I V I D U A L    C O U N T R I E S ------------------------ */
    	
    	/* --- U N I T E D    S T A T E S    O F   A M E R I C A --- */ //Region
		['Alaska', 700] // 'US-AK'
/*		['Alaska', 700] // 'US-AK'
    	['Alabama', 700], // 'US-AL'
    	['Arkansas', 700], // 'US-AR'
    	['American Samoa', 700], // 'US-AS'
    	['Arizona', 700], // 'US-AZ'
    	['California', 700], // 'US-CA'
    	['Colorado', 700], // 'US-CO'
    	['Connecticut', 700], // 'US-CT'
    	['District of Columbia', 700] // 'US-DC'
    	['Delaware', 700], // 'US-DE'
    	['Florida', 700], // 'US-FL'
    	['Georgia', 700], // 'US-GA'
    	['Guam', 700], // 'US-GU'
    	['Hawaii', 700], // 'US-HI'
    	['Iowa', 700], // 'US-IA'
    	['Idaho', 700], // 'US-ID'
    	['Illinois', 700], // 'US-IL'
    	['Indiana', 700] // 'US-IN'
    	['Kansas', 700], // 'US-KS'
    	['Kentucky', 700], // 'US-KY'
    	['Louisiana', 700], // 'US-LA'
    	['Massachusetts', 700], // 'US-MA'
    	['Maryland', 700], // 'US-MD'
    	['Maine', 700], // 'US-MI'
    	['Michigan', 700], // 'US-CO'
    	['Minnesota', 700], // 'US-MN'
    	['Missouri', 700] // 'US-MO'
    	['Northern Mariana Islands', 700], // 'US-MP'
    	['Mississippi', 700], // 'US-MS'
    	['Montana', 700], // 'US-MT'
    	['North Carolina', 700], // 'US-NC'
    	['North Dakota', 700], // 'US-ND'
    	['Nebraska', 700], // 'US-NE'
    	['New Hampshire', 700], // 'US-NH'
    	['New Jersey', 700], // 'US-NJ'
    	['New Mexico', 700] // 'US-NM'
    	['Nevada', 700], // 'US-NV'
    	['New York', 700], // 'US-NY'
    	['Ohio', 700], // 'US-OH'
    	['Oklahoma', 700], // 'US-OK'
    	['Oregon', 700], // 'US-OR'
    	['Puerto Rico', 700], // 'US-PR'
    	['District of Columbia', 700] // 'US-DC'
    	['Rhode Island', 700], // 'US-RI'
    	['South Carolina', 700], // 'US-SC'
    	['South Dakota', 700], // 'US-SD'
    	['Tennessee', 700], // 'US-TN'
    	['Texas', 700], // 'US-TX'
    	['United States Minor Outlying Islands', 700], // 'US-UM'
    	['Utah', 700], // 'US-UT'
    	['Virginia', 700], // 'US-VA'
    	['Virgin Islands, U.S.', 700], // 'US-VI'
    	['Vermont', 700], // 'US-VT'
    	['West Virginia', 700], // 'US-WV'
    	['Wisconsin', 700], // 'US-WI'
    	['Wyoming', 700], // 'US-WY'
    	['American Samoa', 700], // 'US-AS'
        ['United States Minor Outlying Islands', 700], // 'US-UM'
    	['Alabama', 700], // 'US-AL'
    	['Arkansas', 700], // 'US-AR'
    	['American Samoa', 700], // 'US-AS'
    	['Arizona', 700] // 'US-AZ'
*/    
    
    ]);
    
    var options = {
      region: region,
      resolution: 'provinces',
      defaultColor: 'blue',
      width: '1000px'
    };
    
    function selectHandler() {
      var selection = chart.getSelection();
      var message = '';
      for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null && item.column != null) {
          var str = data.getFormattedValue(item.row, item.column);
          //message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
          message = str;
        } else if (item.row != null) {
          var str = data.getFormattedValue(item.row, 0);
          //message += '{row:' + item.row + ', column:none}; value (col 0) = ' + str + '\n';
          message = str;

        } else if (item.column != null) {
          var str = data.getFormattedValue(0, item.column);
          //message += '{row:none, column:' + item.column + '}; value (row 0) = ' + str + '\n';
          message = str;
        }
      }
      if (message == '') {
        message = 'nothing';
      }
      //alert('You selected ' + message);
      $("#cp_title").html(message);
      displayregiontitle(message);
    }
    
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(data, options);
}

['#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#438094','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#DE3403','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E','#E0D39E'].forEach(test);
var test1;
function test(element, index, array){
    test1 += 1;
    $('#cp_info1').html(test1);
}

function displayregiontitle(title){
    
    fb.child("regions/United States/" + title).once('value', function (dataSnapshot) {
        $('#cp_info1').html(dataSnapshot.child('faction').val());    
        $('#cp_info2').html(dataSnapshot.child('troops').val());    
    });

}

test();