document.addEventListener('DOMContentLoaded', () => {
	const SUPABASE_URL = 'https://uovnktwyxiaqcgiqdkfu.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_ywqne3m8odLtuWIB5KbcCg_Iu8VlTrQ';
	const { createClient } = window.supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
	
	async function safeInsert(table, payload) {
		try {
			const { data, error } = await supabaseClient
				.from(table)
				.insert(payload)
				.select();

			return {
				data: data || [],
				error
			};
		} catch (err) {
			return {
				data: [],
				error: err
			};
		}
	}

	async function saveContactForm() {
		const name = document.getElementById('name').value.trim();
		const surname = document.getElementById('surname').value.trim();
		const emailAddress = document.getElementById('mail').value.trim();
		const message = document.getElementById('wiadomosc').value.trim();

		const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;

		if (!regex.test(name) || !regex.test(surname)) {
			alert('Imię i nazwisko nie może zawierać niedozwolonych znaków!');
			return;
		}

		if (!emailAddress || !message) {
			alert('Uzupełnij email i wiadomość.');
			return;
		}

		const userResult = await safeInsert('UserData', [
			{
				name: name,
				surname: surname,
				emailAddress: emailAddress
			}
		]);

		if (userResult.error) {
			console.error('Błąd Supabase:', userResult.error);
			alert(userResult.error.message || 'Błąd zapisu danych użytkownika.');
			return;
		}

		const user = userResult.data[0];
		console.log('Dodany user:', user);
		console.log('ID usera:', user.id);

		const messageResult = await safeInsert('UsersMessages', [
			{
				message: message,
				User_ID: user.id
			}
		]);

		if (messageResult.error) {
			console.log('Pełny błąd wiadomości:', JSON.stringify(messageResult.error, null, 2));
			alert(messageResult.error.message || JSON.stringify(messageResult.error));
			return;
		}

		alert('Wiadomość została wysłana.');

		document.getElementById('name').value = '';
		document.getElementById('surname').value = '';
		document.getElementById('mail').value = '';
		document.getElementById('wiadomosc').value = '';
	}

	const saveBtn = document.getElementById('saveToLocalStorage');

	saveBtn.addEventListener('click', async () => {
		await saveContactForm();
	});

	
});


const themeLink = document.getElementById("arkusz-stylow");

	function zmienStyl() {
		if (themeLink.getAttribute("href") === "red.css") {
			themeLink.setAttribute("href", "green.css");
		} else {
			themeLink.setAttribute("href", "red.css");
		}
	}
	// Funkcja do wygaszenia/pokazania jednej sekcji
	/*function przelaczWyksztalcenie() {
		const sekcja = document.getElementById("wyksztalcenie");
		const przycisk = document.getElementById("pokazLubSchowaj");

		if (sekcja.style.display === "none") {
			sekcja.style.display = "block";
			przycisk.textContent = "Ukryj wykształcenie";
		} else {
			sekcja.style.display = "none";
			przycisk.textContent = "Pokaż wykształcenie";
		}
	} */
	// Funkcja do wygaszenia/pokazania sekcji z klasy "sekcja"
	function przelaczSekcje() {
		const sekcje = document.querySelectorAll(".sekcja");
		const przycisk = document.getElementById("pokazLubSchowaj");

		sekcje.forEach(function (sekcja) {
			if (sekcja.style.display === "none") {
				sekcja.style.display = "block";
				przycisk.textContent = "Ukryj sekcje";
			} else {
				sekcja.style.display = "none";
				przycisk.textContent = "Pokaż sekcje";
			}
		});
	}
	//--------------------------------------------------------------------------------------------------------------------
	async function wczytajDaneCV() {
		try {
			// 1. Pobranie pliku JSON
			const response = await fetch('cv.json');
			
			// Sprawdzenie, czy plik istnieje i został poprawnie pobrany
			if (!response.ok) {
				throw new Error(`Błąd ładowania pliku: ${response.status}`);
			}
			
			const dane = await response.json();

			// 2. Wypełnianie nagłówka
			document.getElementById('naglowek-cv').textContent = 
				`${dane.daneOsobowe.imieNazwisko} ${dane.daneOsobowe.numerIndeksu} - Curriculum Vitae`;

			// 3. Wypełnianie listy umiejętności
			const listaUmiejetnosci = document.getElementById('lista-umiejetnosci');
			listaUmiejetnosci.innerHTML = ''; // Czyścimy przykładowe dane z HTML
			dane.umiejetnosci.forEach(tekst => {
				const li = document.createElement('li');
				li.textContent = tekst;
				listaUmiejetnosci.appendChild(li);
			});

			// 4. Wypełnianie sekcji Wykształcenie
			const sekcjaWyksztalcenie = document.getElementById('wyksztalcenie');
			// Łączymy tablicę w jeden ciąg znaków z przełamaniem linii
			sekcjaWyksztalcenie.innerHTML = dane.wyksztalcenie.join('<br/>');

			// 5. Wypełnianie listy projektów
			const listaProjektow = document.getElementById('lista-projektow');
			listaProjektow.innerHTML = '';
			dane.projekty.forEach(projekt => {
				const li = document.createElement('li');
				li.textContent = projekt;
				listaProjektow.appendChild(li);
			});

			console.log("Dane CV zostały pomyślnie załadowane!");

		} catch (error) {
			console.error("Wystąpił problem z wczytywaniem danych:", error);
		}
	}

	// Wywołaj funkcję po załadowaniu strony
	window.addEventListener('DOMContentLoaded', wczytajDaneCV);
	//--------------------------------------------------------------------------------------------------------------------
	const wejscieDanych = document.querySelector('#wiadomosc');
	const wyswietlDane = document.querySelector('#textToLocalStorage');
	const zapiszDoLocalStorageBtn = document.querySelector('#saveToLocalStorage');
	// Przechowywana zmienna
	const zapisaneWejscie = localStorage.getItem('textInput');
	// Zmienna usuwajaca dane z localStorage
	const wyczyscLocalStorageBtn = document.querySelector('#wyczyscLocalStorage');

	if(wejscieDanych)
	{
		wyswietlDane.textContent = zapisaneWejscie
	}

	wejscieDanych.addEventListener('input', litera => {
		wyswietlDane.textContent = litera.target.value;
	})

	const zapiszDoLocalStorage = () => {
		localStorage.setItem('textInput', wyswietlDane.textContent);
	}
	// Zapis do LocalStorage
	zapiszDoLocalStorageBtn.addEventListener('click', zapiszDoLocalStorage);
	// Usuwanie z LocalStorage
	wyczyscLocalStorageBtn.addEventListener('click', () => {
		localStorage.removeItem('textInput');
		wyswietlDane.textContent = '';
	})
