# Autentifikacija:

Razviti formu za prijavu korisnika koja direktno komunicira sa eksternim login API-jem.

Nakon uspešne prijave, JWT token treba sačuvati i korisnika preusmeriti na stranicu sa proizvodima.

Aplikacija treba da jasno prikazuje poruke o grešci u slučaju neuspešne prijave.

# Prikaz proizvoda:

Pre pristupa listi proizvoda, aplikacija mora proveriti postojanje JWT tokena i preusmeriti korisnika na login stranicu ako token nije prisutan.

Dinamički prikazati listu proizvoda, dohvatajući ih od sopstvenog backend API-ja (uz slanje JWT tokena za autorizaciju).

Omogućiti korisniku opciju "Odjavi se" koja će obrisati JWT token i vratiti ga na login stranicu.
