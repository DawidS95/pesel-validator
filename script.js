window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 13) 
        check();
}

function check()
{
				var pesel=Number(document.getElementById("peselinput").value);
				var length=document.getElementById("peselinput").value.length;
				var k1=document.getElementById("peselinput").value.substr(length-11, 1);
				var k2=document.getElementById("peselinput").value.substr(length-10, 1);
				var k3=document.getElementById("peselinput").value.substr(length-9, 1);
				var k4=document.getElementById("peselinput").value.substr(length-8, 1);
				var k5=document.getElementById("peselinput").value.substr(length-7, 1);
				var k6=document.getElementById("peselinput").value.substr(length-6, 1);
				var k7=document.getElementById("peselinput").value.substr(length-5, 1);
				var k8=document.getElementById("peselinput").value.substr(length-4, 1);
				var k9=document.getElementById("peselinput").value.substr(length-3, 1);
				var k10=document.getElementById("peselinput").value.substr(length-2, 1);
				var k11=document.getElementById("peselinput").value.substr(length-1, 1);
				var checksum=(9*k1 + 7*k2 + 3*k3 + 1*k4 + 9*k5 + 7*k6 + 3*k7 + 1*k8 + 9*k9 + 7*k10)%10;
				var sex;
				if (k10%2==0)
					sex="kobieta"; else
					sex="mężczyzna";
				var century;
				var pesel_month;
				var pesel_day=k5+k6;
				var birthday;
				var month_description;
				var actual_year=new Date();
				actual_year=actual_year.getFullYear();
				var actual_month=new Date();
				actual_month=actual_month.getMonth();
				actual_month=actual_month+1;
				var actual_day=new Date();
				actual_day=actual_day.getDate();
				var age_infostring;
				var error;
                var error_code="";
				if (k3==0||k3==1)
				{
					century=19;
					pesel_month=k3+k4;
				}				else
				if (k3==2||k3==3)
				{
					century=20;
					pesel_month=(k3-2)+k4;
				}				else
				if (k3==4||k3==5)
				{
					century=21;
					pesel_month=(k3-4)+k4;
				}				else
				if (k3==6||k3==7)
				{
					century=22;
					pesel_month=(k3-6)+k4;
				}				else
				if (k3==8||k3==9)
				{
					century=18;
					pesel_month=(k3-8)+k4;
				}
				
				switch(pesel_month)
					{
						case "01": {month_description="w styczniu";} break;
						case "02": {month_description="w lutym";} break;
						case "03": {month_description="w marcu";} break;
						case "04": {month_description="w kwietniu";} break;
						case "05": {month_description="w maju";} break;
						case "06": {month_description="w czerwcu";} break;
						case "07": {month_description="w lipcu";} break;
						case "08": {month_description="w sierpniu";} break;
						case "09": {month_description="we wrześniu";} break;
						case "10": {month_description="w październiku";} break;
						case "11": {month_description="w listopadzie";} break;
						case "12": {month_description="w grudniu";} break;
					}
				
				birthday=century+k1+k2+"-"+pesel_month+"-"+pesel_day;
				var pesel_year=century+k1+k2;
				var is_leap;
                if ( (pesel_year % 4 == 0 && pesel_year % 100 != 0) || (pesel_year % 400 == 0) )
                    is_leap=1; else is_leap=0;
					
				if (actual_year>pesel_year)
					age_infostring="Ta osoba ma obecnie "+(actual_year-pesel_year)+" lat (rocznikowo).";
				else if (actual_year==pesel_year)
					{
						if(actual_month>pesel_month)
							age_infostring="Ta osoba ma obecnie 0 lat i "+(actual_month-pesel_month)+" miesięcy.";
						else if(actual_month==pesel_month)
							{
								if((actual_day-pesel_day)==1)
									age_infostring="Ta osoba urodziła się wczoraj.";
								else if(actual_day>pesel_day)
									age_infostring="Ta osoba ma obecnie "+(actual_day-pesel_day)+" dni.";
								else if((pesel_day-actual_day)==1)
									age_infostring="Ta osoba urodzi się jutro.";
								else if(actual_day<pesel_day)
									age_infostring="Ta osoba urodzi się dopiero za "+(pesel_day-actual_day)+" dni.";
								else if(actual_day==pesel_day)
									age_infostring="Ta osoba urodziła się dzisiaj.";
							} 
						else if((pesel_month-actual_month)==1)
							age_infostring="Ta osoba urodzi się w przyszłym miesiącu.";
						else
							age_infostring="Ta osoba urodzi się dopiero za "+(pesel_month-actual_month)+" miesięcy.";
					} else
				age_infostring="Ta osoba urodzi się dopiero za "+(pesel_year-actual_year)+" lat.";
				if(Number.isInteger(pesel)==false)
                    {
                        document.getElementById("is_correct_div").innerHTML="Błędny numer PESEL - wpisz 11 cyfr.";
                        error=1;
                        error_code="wrong_input_format";
                    }
				else
					{
						if (length>11)
							{
								document.getElementById("is_correct_div").innerHTML="Wpisany numer jest za długi ("+length+" cyfr), usuń "+(length-11);
								error=1;
                                error_code="too_many_characters: "+length;
							}
						else if (length<11)
							{
								document.getElementById("is_correct_div").innerHTML="Wpisany numer jest za krótki ("+length+" cyfr), wpisz jeszcze "+(11-length);
								error=1;
                                error_code="not enough characters: "+length;
							}
						else if (length==11)
							{
								if (checksum!=k11)
									{
										document.getElementById("is_correct_div").innerHTML="Błędny numer pesel (błędna suma kontrolna)";
										error=1;
                                        error_code="wrong checksum: "+k11;
									}
								else
									{
										if (pesel_month>12||pesel_month<1)
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL niepoprawny: błędny miesiąc urodzenia - "+pesel_month+" (trzecia i czwarta cyfra).";
												error=1;
                                                error_code="wrong month: "+pesel_month;
											}
										else if (pesel_day<1)
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL niepoprawny: błędny dzień urodzenia - "+pesel_day+" (piąta i szósta cyfra).";
												error=1;
                                                error_code="wrong day: "+pesel_day;
											}
										else if (pesel_day>31)
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL niepoprawny: "+month_description+" nie ma "+pesel_day+" dni (piąta i szósta cyfra).";
												error=1;
                                                error_code="wrong day: "+pesel_day;
											}
										else if (is_leap==0&&pesel_month==02&&pesel_day>28)
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL niepoprawny: błędny dzień urodzenia - "+pesel_day+"  (rok "+pesel_year+" nie jest rokiem przestępnym).";
												error=1;
                                                error_code="no leap year exception";
											}
										else if (is_leap==1&&pesel_month==02&&pesel_day>29)
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL niepoprawny: błędny dzień urodzenia - "+pesel_day+" (mimo iż rok "+pesel_year+" jest rokiem przestępnym, to nie ma aż "+pesel_day+" dni w lutym).";
												error=1;
                                                error_code="wrong day: "+pesel_day;
											}
										else if ((pesel_month==4&&pesel_day>30)||(pesel_month==6&&pesel_day>30)||(pesel_month==9&&pesel_day>30)||(pesel_month==11&&pesel_day>30))
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL niepoprawny: "+month_description+" nie ma "+pesel_day+" dni.";
												error=1;
                                                error_code="wrong day: "+pesel_day;
											}
										else
											{
												document.getElementById("is_correct_div").innerHTML="Numer PESEL jest poprawny.";
												document.getElementById("pesel_div").innerHTML="Wprowadzony numer PESEL: "+document.getElementById("peselinput").value;
												document.getElementById("birthday_div").innerHTML="Data urodzenia: "+birthday;
												document.getElementById("sex_div").innerHTML="Pleć: "+sex;
												document.getElementById("age_div").innerHTML=age_infostring;
												error=0;
											}
									}
							}
					}
				if(error==1)
					{
                        document.getElementById("properties").style.opacity = "0";
                        document.getElementById("wrap").style.height = "230px";
                        hide("properties");
                        setTimeout("clear_properties()",1000);
					} 
                else
                    {
                        document.getElementById("properties").style.opacity = "1";
                        document.getElementById("wrap").style.height = "440px";
                        show("properties");
                    }
				/*
				console.log("Wpisany PESEL: "+pesel);
				console.log("Długość: "+length);
				console.log("Płeć: "+sex);
				console.log("Rok: "+pesel_year);
				console.log("Miesiąc: "+pesel_month);
				console.log("Dzień: "+pesel_day);
				console.log("Czy rok jest przestępny? "+is_leap);
				console.log("Czy wystąpił błąd? "+error);
				console.log("Dzisiejszy rok: "+actual_year);
				console.log("Dzisiejszy miesiąc: "+actual_month);
				console.log("Dzisiejszy dzień: "+actual_day);
				console.log("Suma kontrolna: "+checksum);
                */
    
                console.log("Wpisany PESEL: "+document.getElementById("peselinput").value+", Długość: "+length+"\nRok: "+pesel_year+"        Miesiąc: "+pesel_month+"        Dzień: "+pesel_day+"\nDzisiejszy rok: "+actual_year+"       Dzisiejszy miesiąc: "+actual_month+"        Dzisiejszy dzień: "+actual_day+"\nCzy rok "+pesel_year+" jest przestępny? "+is_leap+"\nPłeć: "+sex+"\nCzy wystąpił błąd? "+error+"\nKod błędu: "+error_code+"\nSuma kontrolna: "+checksum);
}

function clear_properties(){
						document.getElementById("pesel_div").innerHTML="";
						document.getElementById("birthday_div").innerHTML="";
						document.getElementById("sex_div").innerHTML="";
						document.getElementById("age_div").innerHTML="";
}

function show(id) 
{
    document.getElementById(id).style.visibility = "visible";
}
function hide(id) {
    document.getElementById(id).style.visibility = "hidden";
}