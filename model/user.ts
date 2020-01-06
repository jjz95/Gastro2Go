const bcrypt = require('bcryptjs');

//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const userExtent = [];

class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    dateOfBirth: Date;
    contactNumber: number;
    business: string;
    address: string;
    zipCode: string;
    country: string;
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName: string, lastName: string, email: string, passwordHash: string, dateOfBirth: Date, contactNumber: number, business: string, address: string, zipCode: string, country: string, id: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.dateOfBirth = dateOfBirth;
        this.contactNumber = contactNumber;
        this.business = business;
        this.address = address;
        this.zipCode = zipCode;
        this.country = country;
    }

    //dodawanie obiektu do bazy
    static async add(user: User) {
        // user.id = nextId++;
        // userExtent.push(user);
        // return user;
        if (!User.list().some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
            user.id = nextId++;
            let hashedPass = await bcrypt.hash(user.passwordHash, 10)
            user.passwordHash = hashedPass
            userExtent.push(user);
            return true;
        }
        return false;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return userExtent;
    }

    //edycja obiektu
    static edit(user: any) {
        //FIXME
    }

    //usuwanie obiektu po id
    static delete(id: any) {
        //FIXME
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id: any) {
        //FIXME
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        userExtent.splice(0, userExtent.length);
        //resetujemy licznik id
        nextId = 1;

        //dla uproszczenia wszyscy użytkowinicy mają takie samo hasło :)

        // @ts-ignore
        User.add(new User('Jan', 'Kowalski', 'jk@wp.pl', '1234', new Date("1990-03-25"), 123456789, 'fishing', 'koszykowa', '00-001', 'Poland'));
        // @ts-ignore
        User.add(new User('Anna', 'Wiśniewska', 'aw@onet.pl', '1234', new Date("1991-03-25"), 111111111, 'skiing', 'hitler strasse', '00-003', 'Germany'));
        // @ts-ignore
        User.add(new User('Andrzej', 'Nowak', 'an@gmail.com', '1234', new Date("1992-03-25"), 222222222, 'snowboard', 'smith street', '00-002', 'England'));
    }

    static findByEmail(email: any) {
        return userExtent.find(u => u.email == email);
    }

    static hashPassword(plainPassword: any) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return bcrypt.hash(plainPassword, 12);
    }

    comparePassword(plainPassword: any) {
        //wołanie asynchroniczne
        //zwraca promesę, a nie wynik bezpośrednio
        return bcrypt.compare(plainPassword, this.passwordHash);
    }
}

User.initData();

module.exports = User;
