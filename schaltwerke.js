//Interrupts
window.onresize = scale;
//----------

//globale Variablen
	//Diagramm
	var d_active = 0;
	var d_von = 0;
	var d_zu = 0;
	var secret = "";
	
	var farbe00 = "#F08080";
	var farbe10 = "#90EE90";
	var farbe01 = "#ADD8E6";
	var farbe11 = "#FFDEAD";
	//----------
	
	//Skalierung
	var scale_aktiv = 1;
	var breite = 0;
	var hoehe = 0;
	//----------
	
	//Animation
	var zeitlupe_aktiv = 0;
	var frequenz = 2;
	var intervall_takt = 0;
	var intervall_eingang = 0;
	var counter_takt = 0;
	var counter_eingang = 0;
	//----------
//----------

//Funktionen
	//Diagramm
	function change_f(x) {
		if(document.getElementById('F'.concat(x.toString())).innerHTML=='X')
		{
			document.getElementById('F'.concat(x.toString())).innerHTML = "Z0";
		}
		else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z0")
		{
			document.getElementById('F'.concat(x.toString())).innerHTML = "Z1";
		}
		else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z1")
		{
			document.getElementById('F'.concat(x.toString())).innerHTML = "Z2";
		}
		else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z2")
		{
			document.getElementById('F'.concat(x.toString())).innerHTML = "Z3";
		}
		else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z3")
		{
			document.getElementById('F'.concat(x.toString())).innerHTML = "Z0";
		}
		reload_d();
	}

	function change_a(x) {
		if(document.getElementById('A'.concat(x.toString())).innerHTML=='X')
		{
			document.getElementById('A'.concat(x.toString())).innerHTML = '0';
		}
		else if(document.getElementById('A'.concat(x.toString())).innerHTML=='0')
		{
			document.getElementById('A'.concat(x.toString())).innerHTML = '1';
		}
		else if(document.getElementById('A'.concat(x.toString())).innerHTML=='1')
		{
			document.getElementById('A'.concat(x.toString())).innerHTML = '0';
		}
		
		if(x<16)
		{
			reload_d();
		}
	}

	function my_clear(x) {	
		document.getElementById("A".concat(x.toString())).innerHTML = "X";
		document.getElementById("A".concat(x.toString())).style.fontcolor = "black";
		document.getElementById("A".concat(x.toString())).style.pointerEvents = "auto";
		
		if(x<16)
		{
			document.getElementById('F'.concat(x.toString())).innerHTML = "X";
			reload_d();
		}
		else
		{
			document.getElementById("overlay_".concat(x-16).toString()).style.visibility = "hidden";
			document.getElementById("rahmen_".concat(x-16).toString()).style.borderBottom = "2px inset darkgrey";
		}
	}

	function my_clear_d() {	
		for(x=16;x<20;x++)
		{
			document.getElementById("A".concat(x.toString())).innerHTML = "X";
			document.getElementById("A".concat(x.toString())).style.fontcolor = "black";
			document.getElementById("A".concat(x.toString())).style.pointerEvents = "auto";
			document.getElementById("overlay_".concat(x-16).toString()).style.visibility = "hidden";
			document.getElementById("rahmen_".concat(x-16).toString()).style.borderBottom = "2px inset darkgrey";
		}
	}

	function my_clear_all() {	
		for(x=0;x<16;x++)
		{
			document.getElementById('A'.concat(x.toString())).innerHTML = "X";
			document.getElementById('F'.concat(x.toString())).innerHTML = "X";
		}
		reload_d();
	}

	function edit_d_v(a,b) {
			d_active = 1;
			d_von = a;
			edit_d(b);
	}

	function edit_d(x) {	
		if(d_active==0)
		{
			d_active = 1;
			d_von = x;
			document.getElementById("abbrechen").style.visibility="visible";
			
			document.getElementById("pfeil".concat(Math.round(-1.33*d_von**3+5*d_von**2-1.67*d_von).toString())).style.visibility="visible"; //Uhrzeigersinn
			document.getElementById("pfeil".concat(Math.round(1.33*d_von**3-6.5*d_von**2+8.17*d_von+8).toString())).style.visibility="visible"; //Mitte
			document.getElementById("pfeil".concat(Math.round(-0.67*d_von**3+5*d_von**2-8.33*d_von+5).toString())).style.visibility="visible"; //Gegenuhrzeigersinn
			document.getElementById("pfeil".concat(Math.round(d_von**3-4.5*d_von**2+5.5*d_von+12).toString())).style.visibility="visible"; //Zurück
		}
		else if(d_active==1)
		{
			d_active = 2;
			d_zu = x;
			document.getElementById("titel").innerHTML = "Z".concat(d_von.toString())+" "+"&#10230;"+" Z".concat(d_zu.toString());
			document.getElementById("tabelle_d").style.visibility="visible";
			reload_d(0);
			
			if(d_zu == (d_von+1)%4)
			{		
				document.getElementById("pfeil".concat(Math.round(-1.33*d_von**3+5*d_von**2-1.67*d_von).toString())).style.visibility="visible";
			}
			if(d_zu == (d_von+2)%4)
			{
				document.getElementById("pfeil".concat(Math.round(1.33*d_von**3-6.5*d_von**2+8.17*d_von+8).toString())).style.visibility="visible";
			}
			if(d_von == (d_zu+1)%4)
			{
				document.getElementById("pfeil".concat(Math.round(-0.67*d_von**3+5*d_von**2-8.33*d_von+5).toString())).style.visibility="visible";
			}
			if(d_von == d_zu)
			{
				document.getElementById("pfeil".concat(Math.round(d_von**3-4.5*d_von**2+5.5*d_von+12).toString())).style.visibility="visible";
			}
			
			for(x=16;x<20;x++)
			{
				if(document.getElementById("F".concat((4*d_von+(x-16)).toString())).innerHTML == "Z".concat(d_zu.toString()))
				{
					document.getElementById("A".concat(x.toString())).innerHTML = document.getElementById("A".concat((4*d_von+(x-16)).toString())).innerHTML;
				}
				else if(document.getElementById("F".concat((4*d_von+(x-16)).toString())).innerHTML != "X")
				{
					document.getElementById("A".concat(x.toString())).style.fontcolor = "grey";
					document.getElementById("A".concat(x.toString())).style.pointerEvents = "none";
					
					document.getElementById("rahmen_".concat(x-16).toString()).style.borderBottom = "0px inset darkgrey";
					document.getElementById("overlay_".concat(x-16).toString()).style.visibility = "visible";
					document.getElementById("overlay_".concat(x-16).toString()+"_text").innerHTML = "Z".concat(d_von.toString())+"&#10230;"+document.getElementById("F".concat((4*d_von+(x-16)).toString())).innerHTML;
				}
			}
		}
		else
		{		
			for(x=16;x<20;x++)
			{
				if(document.getElementById("A".concat(x.toString())).innerHTML!='X')
				{
					document.getElementById("F".concat((4*d_von+(x-16)).toString())).innerHTML = "Z".concat(d_zu.toString());
					document.getElementById("A".concat((4*d_von+(x-16)).toString())).innerHTML = document.getElementById("A".concat(x.toString())).innerHTML;
				}
				else if(document.getElementById("A".concat(x.toString())).style.fontcolor != "grey")
				{
					document.getElementById("F".concat((4*d_von+(x-16)).toString())).innerHTML = "X";
					document.getElementById("A".concat((4*d_von+(x-16)).toString())).innerHTML = "X";
				}
			}
			reload_d();
		}
	}

	function reload_d(x) {
		if(x != 0)
		{		
			document.getElementById("tabelle_d").style.visibility="hidden";
			document.getElementById("abbrechen").style.visibility="hidden";
			d_active = 0;
			my_clear_d();
			
			for(x=0;x<4;x++)
			{
				document.getElementById("overlay_".concat(x).toString()).style.visibility = "hidden";
				document.getElementById("rahmen_".concat(x).toString()).style.borderBottom = "2px inset darkgrey";
			}
		}
		
		for(x=0;x<16;x++)
		{
			document.getElementById("pfeil".concat(x.toString())).style.visibility="hidden";
		}
		for(x=0;x<16;x++)
		{
			document.getElementById("bp".concat(x.toString())).style.visibility="hidden";
			document.getElementById("bp".concat(x.toString())).innerHTML = '';
		}

		for(x=0;x<16;x++)
		{
			if(x<=3)
			{
				if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z0")
				{
					document.getElementById("pfeil12").style.visibility="visible";
					document.getElementById("bp12").style.visibility="visible";
					document.getElementById("bp12").innerHTML += ''.concat((Math.round((x-0.1)/2)),x%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z1")
				{
					document.getElementById("pfeil0").style.visibility="visible";
					document.getElementById("bp0").style.visibility="visible";
					document.getElementById("bp0").innerHTML += ''.concat((Math.round((x-0.1)/2)),x%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z2")
				{
					document.getElementById("pfeil8").style.visibility="visible";
					document.getElementById("bp8").style.visibility="visible";
					document.getElementById("bp8").innerHTML += ''.concat((Math.round((x-0.1)/2)),x%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z3")
				{
					document.getElementById("pfeil5").style.visibility="visible";
					document.getElementById("bp5").style.visibility="visible";
					document.getElementById("bp5").innerHTML += ''.concat((Math.round((x-0.1)/2)),x%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
			}
			else if(x<=7)
			{
				if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z0")
				{
					document.getElementById("pfeil1").style.visibility="visible";
					document.getElementById("bp1").style.visibility="visible";
					document.getElementById("bp1").innerHTML += ''.concat((Math.round(((x-4)-0.1)/2)),(x-4)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z1")
				{
					document.getElementById("pfeil14").style.visibility="visible";
					document.getElementById("bp14").style.visibility="visible";
					document.getElementById("bp14").innerHTML += ''.concat((Math.round(((x-4)-0.1)/2)),(x-4)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z2")
				{
					document.getElementById("pfeil2").style.visibility="visible";
					document.getElementById("bp2").style.visibility="visible";
					document.getElementById("bp2").innerHTML += ''.concat((Math.round(((x-4)-0.1)/2)),(x-4)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z3")
				{
					document.getElementById("pfeil11").style.visibility="visible";
					document.getElementById("bp11").style.visibility="visible";
					document.getElementById("bp11").innerHTML += ''.concat((Math.round(((x-4)-0.1)/2)),(x-4)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
			}
			else if(x<=11)
			{
				if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z0")
				{
					document.getElementById("pfeil9").style.visibility="visible";
					document.getElementById("bp9").style.visibility="visible";
					document.getElementById("bp9").innerHTML += ''.concat((Math.round(((x-8)-0.1)/2)),(x-8)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z1")
				{
					document.getElementById("pfeil3").style.visibility="visible";
					document.getElementById("bp3").style.visibility="visible";
					document.getElementById("bp3").innerHTML += ''.concat((Math.round(((x-8)-0.1)/2)),(x-8)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z2")
				{
					document.getElementById("pfeil13").style.visibility="visible";
					document.getElementById("bp13").style.visibility="visible";
					document.getElementById("bp13").innerHTML += ''.concat((Math.round(((x-8)-0.1)/2)),(x-8)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z3")
				{
					document.getElementById("pfeil6").style.visibility="visible";
					document.getElementById("bp6").style.visibility="visible";
					document.getElementById("bp6").innerHTML += ''.concat((Math.round(((x-8)-0.1)/2)),(x-8)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
			}
			else if(x<=15)
			{
				if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z0")
				{
					document.getElementById("pfeil4").style.visibility="visible";
					document.getElementById("bp4").style.visibility="visible";
					document.getElementById("bp4").innerHTML += ''.concat((Math.round(((x-12)-0.1)/2)),(x-12)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z1")
				{
					document.getElementById("pfeil10").style.visibility="visible";
					document.getElementById("bp10").style.visibility="visible";
					document.getElementById("bp10").innerHTML += ''.concat((Math.round(((x-12)-0.1)/2)),(x-12)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z2")
				{
					document.getElementById("pfeil7").style.visibility="visible";
					document.getElementById("bp7").style.visibility="visible";
					document.getElementById("bp7").innerHTML += ''.concat((Math.round(((x-12)-0.1)/2)),(x-12)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
				else if(document.getElementById('F'.concat(x.toString())).innerHTML=="Z3")
				{
					document.getElementById("pfeil15").style.visibility="visible";
					document.getElementById("bp15").style.visibility="visible";
					document.getElementById("bp15").innerHTML += ''.concat((Math.round(((x-12)-0.1)/2)),(x-12)%2,"&nbsp;|&nbsp;",document.getElementById('A'.concat(x.toString())).innerHTML,' ').toString();
				}
			}
		}

		//Farbe Folgezustand
		for(x=0;x<16;x++)
		{
			if(document.getElementById('F'.concat(x.toString())).innerHTML=='X')
			{
				document.getElementById('F'.concat(x.toString())).style.backgroundColor = "whitesmoke";
			}
			else if(document.getElementById('F'.concat(x.toString())).innerHTML=='Z0')
			{
				document.getElementById('F'.concat(x.toString())).style.backgroundColor = "#F08080";
			}
			else if(document.getElementById('F'.concat(x.toString())).innerHTML=='Z1')
			{
				document.getElementById('F'.concat(x.toString())).style.backgroundColor = "#90EE90";
			}
			else if(document.getElementById('F'.concat(x.toString())).innerHTML=='Z2')
			{
				document.getElementById('F'.concat(x.toString())).style.backgroundColor = "#ADD8E6";
			}
			else if(document.getElementById('F'.concat(x.toString())).innerHTML=='Z3')
			{
				document.getElementById('F'.concat(x.toString())).style.backgroundColor = "#FFDEAD";
			}
		}
		
		//Mealey
		var Spalte = parseInt(document.getElementById('E0').innerHTML)+parseInt(document.getElementById('E1').innerHTML)*2+parseInt(document.getElementById('Q0z').innerHTML)*4+parseInt(document.getElementById('Q1z').innerHTML)*8;
		
		document.getElementById('Af').innerHTML = document.getElementById("A".concat(Spalte.toString())).innerHTML;
		
		if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z0')
		{
			document.getElementById('D0g').innerHTML = '0';
			document.getElementById('D1g').innerHTML = '0';
		}
		else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z1')
		{
			document.getElementById('D0g').innerHTML = '1';
			document.getElementById('D1g').innerHTML = '0';
		}
		else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z2')
		{
			document.getElementById('D0g').innerHTML = '0';
			document.getElementById('D1g').innerHTML = '1';
		}
		else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z3')
		{
			document.getElementById('D0g').innerHTML = '1';
			document.getElementById('D1g').innerHTML = '1';
		}
		else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'X')
		{
			document.getElementById('D0g').innerHTML = 'X';
			document.getElementById('D1g').innerHTML = 'X';
		}
		
		document.getElementById('ausgang').innerHTML = document.getElementById('Af').innerHTML;
		document.getElementById('D1z').innerHTML = document.getElementById('D1g').innerHTML;
		document.getElementById('D0z').innerHTML = document.getElementById('D0g').innerHTML;
		
		change_active_z();
		
		var secret = "";
		for(x=0;x<16;x++)
		{
			secret += document.getElementById('A'.concat(x.toString())).innerHTML;
		}
		if(secret == "0100011101010000")
		{
			alert("\x22\x45\x61\x73\x74\x65\x72 \x45\x67\x67\x22\n\n\x53\x65\x68\x72 \x67\x65\x65\x68\x72\x74\x65 \x4e\x75\x74\x7a\x65\x72\x69\x6e\x21 \x53\x65\x68\x72 \x67\x65\x65\x68\x72\x74\x65\x72 \x4e\x75\x74\x7a\x65\x72\x21\n\n\x49\x63\x68 \x68\x6f\x66\x66\x65\x2c \x64\x61\x73\x73 \x49\x68\x6e\x65\x6e \x64\x69\x65\x73\x65 \x53\x69\x6d\x75\x6c\x61\x74\x69\x6f\x6e \x64\x61\x73 \x4c\x65\x72\x6e\x65\x6e \x65\x74\x77\x61\x73 \x65\x72\x6c\x65\x69\x63\x68\x74\x65\x72\x74\x21\n\n\x57\x65\x6e\x6e \x64\x65\x6d \x73\x6f \x69\x73\x74 \x28\x6f\x64\x65\x72 \x53\x69\x65 \x65\x69\x6e\x66\x61\x63\x68 \x6e\x75\x72 \x64\x65\x6e \x48\x69\x6e\x74\x65\x72\x67\x72\x75\x6e\x64\n\x64\x65\x72 \x22\x62\x65\x73\x6f\x6e\x64\x65\x72\x65\x6e\x22 \x5a\x61\x68\x6c\x65\x6e\x6b\x6f\x6d\x62\x69\x6e\x61\x74\x69\x6f\x6e \x65\x72\x66\x61\x68\x72\x65\x6E \x77\x6f\x6c\x6c\x65\x6e\x29\x2c\n\x77\u00fc\x72\x64\x65 \x69\x63\x68 \x6d\x69\x63\x68 \u00fc\x62\x65\x72 \x65\x69\x6e\x65 \x45\x2d\x4d\x61\x69\x6c \x66\x72\x65\x75\x65\x6e \x3a\x29 \x21\n\n\x6d\x69\x74 \x66\x72\x65\x75\x6e\x64\x6c\x69\x63\x68\x65\x6e \x47\x72\u00fc\u00df\x65\x6e\x2C\n\x47\x65\x72\x6e\x6f\x74 \x50\x6f\x6c\x69\x76\x6b\x61\x2c \x30\x35\x2e\x30\x32\x2e\x32\x30\x32\x31\n\x67\x65\x72\x6e\x6f\x74\x2e\x70\x6f\x6c\x69\x76\x6b\x61\x40\x67\x6d\x61\x69\x6c\x2e\x63\x6f\x6d\n\n");
		}
	}
	//----------

	//Animation
	function change_e(x) {
		document.getElementById("E".concat(x.toString())).innerHTML = (parseInt((document.getElementById('E'.concat(x.toString())).innerHTML))+1)%2;
		
		clearInterval(intervall_eingang);
		intervall_eingang = setInterval(change_e_ani, 700*(1+zeitlupe_aktiv/2));
		change_e_ani();
	}

	function change_e_ani() {
		switch(counter_eingang)
		{
			case 0:
				document.getElementById("gelb_0").style.animation = null;
				document.getElementById("gelb_1").style.animation = null;
				document.getElementById("gelb_2").style.animation = null;
				document.getElementById("gelb_3").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_0").style.animation = "frames_0 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				document.getElementById("gelb_1").style.animation = "frames_1 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				document.getElementById("gelb_2").style.animation = "frames_2 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				document.getElementById("gelb_3").style.animation = "frames_3 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				counter_eingang++;
				break;
			case 1:
				document.getElementById('E1f').innerHTML = document.getElementById('E1').innerHTML;
				document.getElementById('E0f').innerHTML = document.getElementById('E0').innerHTML;
				document.getElementById('E1g').innerHTML = document.getElementById('E1').innerHTML;
				document.getElementById('E0g').innerHTML = document.getElementById('E0').innerHTML;
				
				document.getElementById("gelb_8").style.animation = null;
				document.getElementById("gelb_10").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_8").style.animation = "frames_8 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				document.getElementById("gelb_10").style.animation = "frames_10 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				counter_eingang++;
				break;
			case 2:				
				var Spalte = parseInt(document.getElementById('E0f').innerHTML)+parseInt(document.getElementById('E1f').innerHTML)*2+parseInt(document.getElementById('Q0f').innerHTML)*4+parseInt(document.getElementById('Q1f').innerHTML)*8;
				document.getElementById('Af').innerHTML = document.getElementById("A".concat(Spalte.toString())).innerHTML;
				
				if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z0')
				{
					document.getElementById('D0g').innerHTML = '0';
					document.getElementById('D1g').innerHTML = '0';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z1')
				{
					document.getElementById('D0g').innerHTML = '1';
					document.getElementById('D1g').innerHTML = '0';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z2')
				{
					document.getElementById('D0g').innerHTML = '0';
					document.getElementById('D1g').innerHTML = '1';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z3')
				{
					document.getElementById('D0g').innerHTML = '1';
					document.getElementById('D1g').innerHTML = '1';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'X')
				{
					document.getElementById('D0g').innerHTML = 'X';
					document.getElementById('D1g').innerHTML = 'X';
				}
				
				document.getElementById("gelb_6").style.animation = null;
				document.getElementById("gelb_7").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_6").style.animation = "frames_6 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				document.getElementById("gelb_7").style.animation = "frames_7 ".concat(0.7*(1+zeitlupe_aktiv/2)).toString()+"s linear 0s 1";
				counter_eingang++;
				break;
			case 3:
				clearInterval(intervall_eingang);				
				document.getElementById('ausgang').innerHTML = document.getElementById('Af').innerHTML;
				document.getElementById('D1z').innerHTML = document.getElementById('D1g').innerHTML;
				document.getElementById('D0z').innerHTML = document.getElementById('D0g').innerHTML;
				reload_d();
				counter_eingang = 0;
				break;
		}
	}

	function change_z_start(x) {
		document.getElementById('Q1z').innerHTML = Math.round((x-0.5)/2);
		document.getElementById('Q0z').innerHTML = x%2;
		
		document.getElementById('Q1f').innerHTML = document.getElementById('Q1z').innerHTML;
		document.getElementById('Q0f').innerHTML = document.getElementById('Q0z').innerHTML;
		document.getElementById('Q1g').innerHTML = document.getElementById('Q1z').innerHTML;
		document.getElementById('Q0g').innerHTML = document.getElementById('Q0z').innerHTML;
		
		reload_d();
	}

	function change_active_z() {
		for(x=0;x<4;x++)
		{
			document.getElementById("d_Z".concat(x.toString())).style.boxShadow = "0px 0px 0px 2px grey, 0px 0px 0px 5px transparent";
			document.getElementById("ani_Z".concat(x.toString())).style.boxShadow = "0px 0px 0px 1px grey, 0px 0px 0px 5px transparent";
		}
		
		for(x=0;x<16;x++)
		{
			document.getElementById("E1_".concat(x.toString())).style.border = null;
			document.getElementById("E0_".concat(x.toString())).style.border = null;
			document.getElementById("AZ_".concat(x.toString())).style.border = null;
			document.getElementById("F".concat(x.toString())).style.border = null;
			document.getElementById("A".concat(x.toString())).style.border = null;
		}
		
		var Spalte = parseInt(document.getElementById('E0').innerHTML)+parseInt(document.getElementById('E1').innerHTML)*2+parseInt(document.getElementById('Q0z').innerHTML)*4+parseInt(document.getElementById('Q1z').innerHTML)*8;
		document.getElementById("farbez").style.backgroundColor = window["farbe"+document.getElementById('Q0z').innerHTML.concat(document.getElementById('Q1z').innerHTML).toString()];
		document.getElementById("d_Z".concat((parseInt(document.getElementById('Q0z').innerHTML)+parseInt(document.getElementById('Q1z').innerHTML)*2).toString())).style.boxShadow = "0px 0px 0px 5px black, 0px 0px 0px 10px transparent";
		document.getElementById("ani_Z".concat((parseInt(document.getElementById('Q0z').innerHTML)+parseInt(document.getElementById('Q1z').innerHTML)*2).toString())).style.boxShadow = "0px 0px 0px 3px black, 0px 0px 0px 5px transparent";
		document.getElementById("active_z_overlay").style.transform = "translate(".concat(Spalte*59.6).toString()+"px)";
		
		if(document.getElementById('D0z').innerHTML == 'X')
		{
			document.getElementById("wt_pfeil").style.visibility = "hidden";
		}
		else
		{
			document.getElementById("wt_pfeil").style.visibility = "visible";
			var Spalte = parseInt(document.getElementById('E0').innerHTML)+parseInt(document.getElementById('E1').innerHTML)*2+parseInt(document.getElementById('D0z').innerHTML)*4+parseInt(document.getElementById('D1z').innerHTML)*8;
			document.getElementById("wt_pfeil").style.transform = "translate(".concat(Spalte*59.6).toString()+"px)";
		}
	}

	function zeitlupe() {
		if(zeitlupe_aktiv == 1)
		{
			zeitlupe_aktiv = 0;
			document.getElementById("zeitlupe").style.borderColor = "#299724";
			document.getElementById("zeitlupe").style.backgroundColor = "#B9DDB9";
			document.getElementById("p_takt").innerHTML = "1/4&nbsp;&nbsp;&nbsp;Hz<br>1/8&nbsp;&nbsp;&nbsp;Hz";
		}
		else
		{
			zeitlupe_aktiv = 1
			document.getElementById("zeitlupe").style.borderColor = "darkred";
			document.getElementById("zeitlupe").style.backgroundColor = "#FF6961";
			document.getElementById("p_takt").innerHTML = "1/10&nbsp;Hz<br>1/14&nbsp;Hz";
		}
	}

	function change_takt(auswahl) {
		frequenz = auswahl;
		for(x=0;x<3;x++)
		{
			document.getElementById("takt_".concat(x*2+1).toString()).style.visibility = "hidden";
		}
		document.getElementById("takt_".concat(frequenz*2+1).toString()).style.visibility = "visible";
		
		if(frequenz == 2)
		{
			document.getElementById("flanke_img_active").style.visibility = "visible";
			document.getElementById("flanke_img_dummy").style.visibility = "hidden";
		}
		else
		{
			document.getElementById("flanke_img_active").style.visibility = "hidden";
			document.getElementById("flanke_img_dummy").style.visibility = "visible";
			run();
		}
	}

	function run() {
		switch(counter_takt)
		{
			case 0:
				intervall_takt = setInterval(run, 750+1500*zeitlupe_aktiv);
				
				document.getElementById("flanke_img_active").style.visibility = "hidden";
				document.getElementById("flanke_img_dummy").style.visibility = "visible";
				emulate_click(0);
				
				if(document.getElementById('D1z').innerHTML != "X")
				{
					var von = parseInt(document.getElementById('Q0z').innerHTML)+parseInt(document.getElementById('Q1z').innerHTML)*2;
					var zu  = parseInt(document.getElementById('D0z').innerHTML)+parseInt(document.getElementById('D1z').innerHTML)*2;
					
					switch(von)
					{
						case 0:
							pfeil = Math.round(-5.17*zu**3+25.5*zu**2-32.33*zu+12);
						break;
						
						case 1:
							pfeil = Math.round(7.67*zu**3-35.5*zu**2+40.83*zu+1);
						break;
						
						case 2:
							pfeil = Math.round(-5.5*zu**3+24.5*zu**2-25*zu+9);
						break;
						
						case 3:
							pfeil = Math.round(3.33*zu**3-14.5*zu**2+17.17*zu+4);
						break;
					}					
					document.getElementById("d_gelb_".concat(pfeil)).style.animation = null;
					document.getElementById("main").offsetHeight;
					document.getElementById("d_gelb_".concat(pfeil)).style.animation = "d_frames_".concat(pfeil)+" ".concat(0.75+1.5*zeitlupe_aktiv-0.200).toString()+"s linear 0.200s 1";
				}
				
				document.getElementById("gelb_12").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_12").style.animation = "frames_12 ".concat(0.75+1.5*zeitlupe_aktiv-0.200).toString()+"s linear 0.200s 1";
				counter_takt++;
				break;			
			case 1:
				if(document.getElementById('D1z').innerHTML == "X")
				{
					alert("Folgezustand nicht definiert!");
					clearInterval(intervall_takt);
					counter_takt = 0;
					change_takt(2);
					return 0;
				}
				else
				{
					document.getElementById('Q1z').innerHTML = document.getElementById('D1z').innerHTML;
					document.getElementById('Q0z').innerHTML = document.getElementById('D0z').innerHTML;
					change_active_z();
				}			
				document.getElementById("gelb_4").style.animation = null;
				document.getElementById("gelb_5").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_4").style.animation = "frames_4 ".concat(0.75+1.5*zeitlupe_aktiv).toString()+"s linear 0s 1";
				document.getElementById("gelb_5").style.animation = "frames_5 ".concat(0.75+1.5*zeitlupe_aktiv).toString()+"s linear 0s 1";
				counter_takt++;
				break;
			case 2:
				document.getElementById('Q1g').innerHTML = document.getElementById('Q1z').innerHTML;
				document.getElementById('Q0g').innerHTML = document.getElementById('Q0z').innerHTML;
				document.getElementById('Q1f').innerHTML = document.getElementById('Q1z').innerHTML;
				document.getElementById('Q0f').innerHTML = document.getElementById('Q0z').innerHTML;
				
				document.getElementById("gelb_9").style.animation = null;
				document.getElementById("gelb_11").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_9").style.animation = "frames_9 ".concat(0.75+1.5*zeitlupe_aktiv).toString()+"s linear 0s 1";
				document.getElementById("gelb_11").style.animation = "frames_11 ".concat(0.75+1.5*zeitlupe_aktiv).toString()+"s linear 0s 1";
				counter_takt++;
				break;
			case 3:
				var Spalte = parseInt(document.getElementById('E0f').innerHTML)+parseInt(document.getElementById('E1f').innerHTML)*2+parseInt(document.getElementById('Q0f').innerHTML)*4+parseInt(document.getElementById('Q1f').innerHTML)*8;
				document.getElementById('Af').innerHTML = document.getElementById("A".concat(Spalte.toString())).innerHTML;
				if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z0')
				{
					document.getElementById('D0g').innerHTML = '0';
					document.getElementById('D1g').innerHTML = '0';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z1')
				{
					document.getElementById('D0g').innerHTML = '1';
					document.getElementById('D1g').innerHTML = '0';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z2')
				{
					document.getElementById('D0g').innerHTML = '0';
					document.getElementById('D1g').innerHTML = '1';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'Z3')
				{
					document.getElementById('D0g').innerHTML = '1';
					document.getElementById('D1g').innerHTML = '1';
				}
				else if(document.getElementById('F'.concat(Spalte.toString())).innerHTML == 'X')
				{
					document.getElementById('D0g').innerHTML = 'X';
					document.getElementById('D1g').innerHTML = 'X';
				}			
				document.getElementById("gelb_6").style.animation = null;
				document.getElementById("gelb_7").style.animation = null;
				document.getElementById("main").offsetHeight;
				document.getElementById("gelb_6").style.animation = "frames_6 ".concat(0.75+1.5*zeitlupe_aktiv).toString()+"s linear 0s 1";
				document.getElementById("gelb_7").style.animation = "frames_7 ".concat(0.75+1.5*zeitlupe_aktiv).toString()+"s linear 0s 1";
				counter_takt++;
				break;
			case 4:
				clearInterval(intervall_takt);
				document.getElementById('ausgang').innerHTML = document.getElementById('Af').innerHTML;
				document.getElementById('D1z').innerHTML = document.getElementById('D1g').innerHTML;
				document.getElementById('D0z').innerHTML = document.getElementById('D0g').innerHTML;
				reload_d();
				counter_takt = 0;
				if(frequenz == 2)
				{
					document.getElementById("flanke_img_active").style.visibility = "visible";
					document.getElementById("flanke_img_dummy").style.visibility = "hidden";
				}
				else
				{
					setTimeout(restart_animation, 1000+frequenz*4000/(1+zeitlupe_aktiv));
				}
				break;
		}
	}
	
	function restart_animation() {
		if(frequenz != 2)
		{
			run();
		}
	}

	function emulate_click(x) {
		if(x == 0)
		{
			document.getElementById("flanke_img_dummy").style.boxShadow = "0px 0px 0px 3px firebrick inset";
			
			document.getElementById("takt").style.animation = null;
			document.getElementById("main").offsetHeight;
			document.getElementById("takt").style.animation = "frames_takt 0.200s linear 0s 1";
			
			setTimeout(emulate_click, 200, 1);
		}
		else
		{
			document.getElementById("flanke_img_dummy").style.boxShadow = null;
		}
	}

	function reset_animation() {
		clearInterval(intervall_eingang);
		clearInterval(intervall_takt);
		counter_eingang = 0;
		counter_takt = 0;
		
		document.getElementById("flanke_img_active").style.visibility = "visible";
		document.getElementById("flanke_img_dummy").style.visibility = "hidden";
		
		for(x=0;x<3;x++)
		{
			document.getElementById("takt_".concat(x*2+1).toString()).style.visibility = "hidden";
		}
		document.getElementById("takt_5").style.visibility = "visible";
		frequenz = 2;
		
		zeitlupe_aktiv = 0;
		document.getElementById("zeitlupe").style.borderColor = "#299724";
		document.getElementById("zeitlupe").style.backgroundColor = "#B9DDB9";
		document.getElementById("p_takt").innerHTML = "1/4&nbsp;&nbsp;&nbsp;Hz<br>1/8&nbsp;&nbsp;&nbsp;Hz";
		
		document.getElementById('E1').innerHTML = '0';
		document.getElementById('E0').innerHTML = '0';
		
		document.getElementById('D1z').innerHTML = '0';
		document.getElementById('D0z').innerHTML = '0';
		document.getElementById('Q1z').innerHTML = '0';
		document.getElementById('Q0z').innerHTML = '0';
		
		document.getElementById('Q1f').innerHTML = '0';
		document.getElementById('Q0f').innerHTML = '0';
		document.getElementById('Q1g').innerHTML = '0';
		document.getElementById('Q0g').innerHTML = '0';
		
		document.getElementById('E1f').innerHTML = '0';
		document.getElementById('E0f').innerHTML = '0';
		document.getElementById('E1g').innerHTML = '0';
		document.getElementById('E0g').innerHTML = '0';
		
		document.getElementById('D1g').innerHTML = '0';
		document.getElementById('D0g').innerHTML = '0';
		
		document.getElementById('Af').innerHTML = '0';
		document.getElementById('ausgang').innerHTML = 'X';
		
		document.getElementById('farbez').style.backgroundColor = "lightcoral";
		
		reload_d();
	}
	//----------

	//Skalierung
	function scale(){
		hoehe = window.innerHeight;
		breite = window.innerWidth;
		
		if(scale_aktiv ==1 && !navigator.userAgent.match(/Android/i)&&!navigator.userAgent.match(/webOS/i)&&!navigator.userAgent.match(/iPhone/i)&&!navigator.userAgent.match(/iPad/i)&&!navigator.userAgent.match(/iPod/i)&&!navigator.userAgent.match(/BlackBerry/i)&&!navigator.userAgent.match(/Windows Phone/i))
		{	
			document.body.style = "overflow:hidden";		
			if(breite/hoehe <= 1.74)
			{
				document.getElementById("main").style.cssText = "margin:".concat(breite/1220*10).toString()+"px; transform: translateY(".concat((hoehe-(710*breite/1220)-2*(breite/1220*10))/2).toString()+"px) scale(".concat(breite/1220).toString()+")";
			}
			else
			{
				document.getElementById("main").style.cssText = "margin:".concat(hoehe/710*10).toString()+"px; transform: translateX(".concat((breite-(1220*hoehe/710)-2*(hoehe/710*10))/2).toString()+"px) scale(".concat(hoehe/710).toString()+")";
			}
		}
		else
		{
			document.getElementById("main").style.cssText = "margin: 10px; transform: translateX(0px) translateY(0px) scale(1)";
			document.body.style = "overflow:visible";
		}
	}

	function change_scale(x){
		if(x==1)
		{
			document.getElementById("scale_1").style.visibility = "visible";
			document.getElementById("scale_0").style.visibility = "hidden";
			scale_aktiv = 1;
		}
		else
		{
			document.getElementById("scale_0").style.visibility = "visible";
			document.getElementById("scale_1").style.visibility = "hidden";
			scale_aktiv = 0;
		}
		scale();
	}
	//----------

	//Impressum
	function Andreas() {
		if(document.getElementById('Andreas').innerHTML == "Andreas Wagner")
		{
			document.getElementById('Andreas').innerHTML = "andreas.wagner@fh-campuswien.ac.at";
		}
		else
		{
			document.getElementById('Andreas').innerHTML = "Andreas Wagner";
		}		
	}

	function Gernot() {
		if(document.getElementById('Gernot').innerHTML == "Gernot Polivka")
		{
			document.getElementById('Gernot').innerHTML = "gernot.polivka@gmail.com";
		}
		else
		{
			document.getElementById('Gernot').innerHTML = "Gernot Polivka";
		}		
	}
	//----------