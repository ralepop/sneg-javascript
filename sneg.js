// Broj pahulja
var brojPahulja = 35;

// Boja pahulja
var bojaPahulje = ["#DDD", "#EEE"];

// Unikod
var unikod = "&#x2022;";

// Brzina kojom padaju pahulje
var brzinaPahulja = 0.75;

// Najmanja velicina pahulje
var najmanjaPahulja = 8;

// Najveca velicina pahulje
var najvecaPahulja = 24;

// Refresh Rate (milisekunde)
var pahuljaRefresh = 50;

// Dodatni stajlovi
var stajlovi = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

// Kod ispod se ne menja!

var pahulja = [],
	pozicija = [],
	koordinate = [],
	lefr = [],
	marginaDole,
	marginaDesno;

// pomocu ove funkcije ce se stvoriti nasumican broj pahulja
function nasumicno(range) { 
	rand = Math.floor(range * Math.random());
	return rand;
}

// sa ovom funkcijom stvaramo pahulje
function stvaranjeSnega() {
	var velicinaPahulje = najvecaPahulja - najmanjaPahulja;
	marginaDole = document.body.scrollHeight - 5;
	marginaDesno = document.body.clientWidth - 15;

	for (i = 0; i <= brojPahulja; i++) {
		koordinate[i] = 0;
		lefr[i] = Math.random() * 15;
		pozicija[i] = 0.03 + Math.random() / 10;
		pahulja[i] = document.getElementById("pahulja" + i);
		pahulja[i].style.fontFamily = "inherit";
		pahulja[i].size = nasumicno(velicinaPahulje) + najmanjaPahulja;
		pahulja[i].style.fontSize = pahulja[i].size + "px";
		pahulja[i].style.color = bojaPahulje[nasumicno(bojaPahulje.length)];
		pahulja[i].style.zIndex = 1000;
		pahulja[i].sink = brzinaPahulja * pahulja[i].size / 5;
		pahulja[i].pozicijaX = nasumicno(marginaDesno - pahulja[i].size);
		pahulja[i].pozicijaY = nasumicno(2 * marginaDole - marginaDole - 2 * pahulja[i].size);
		pahulja[i].style.left = pahulja[i].pozicijaX + "px";
		pahulja[i].style.top = pahulja[i].pozicijaY + "px";
	}

	padanjePahulja();
}

function resize() {
	marginaDole = document.body.scrollHeight - 5;
	marginaDesno = document.body.clientWidth - 15;
}


// sa ovom funkcijom se  pahulje pomeraju
function padanjePahulja() {
	for (i = 0; i <= brojPahulja; i++) {
		koordinate[i] += pozicija[i];
		pahulja[i].pozicijaY += pahulja[i].sink;
		pahulja[i].style.left = pahulja[i].pozicijaX + lefr[i] * Math.sin(koordinate[i]) + "px";
		pahulja[i].style.top = pahulja[i].pozicijaY + "px";

		if (pahulja[i].pozicijaY >= marginaDole - 2 * pahulja[i].size || parseInt(pahulja[i].style.left) > (marginaDesno - 3 * lefr[i])) {
			pahulja[i].pozicijaX = nasumicno(marginaDesno - pahulja[i].size);
			pahulja[i].pozicijaY = 0;
		}
	}

	setTimeout("padanjePahulja()", pahuljaRefresh);
}

for (i = 0; i <= brojPahulja; i++) {

	// sa document.write metodom ustvari ispisujemo pahuljice na ekran
	document.write("<span id='pahulja" + i + "' style='" + stajlovi + "position:absolute;top:-" + najvecaPahulja + "'>" + unikod + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', stvaranjeSnega);
