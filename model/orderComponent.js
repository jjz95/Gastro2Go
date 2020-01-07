//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const orderComponentExtent = [];

class OrderComponent {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(idUser, idProduct, iloscProduktow, dataZamowienia, statusZamowienia) {
        this.idUser = idUser
        this.idProduct = idProduct
        this.iloscProduktow = iloscProduktow
        this.dataZamowienia = dataZamowienia
        this.statusZamowienia = statusZamowienia
    }

    //dodawanie obiektu do bazy
    static async add(orderComponent) {
        if (!OrderComponent.list().some(u => u.idUser == idUser && u.idProduct == idProduct)) {
            orderComponentExtent.push(orderComponent);
            return true;
        }
        return false;
    }

    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return orderComponentExtent;
    }
    //edycja obiektu
    static async edit(idUser, idProduct, iloscProduktow, dataZamowienia, statusZamowienia) {
        let orderComponentToEdit = orderComponentExtent.find(u => u.idUser == idUser && u.idProduct == idProduct)
        orderComponentToEdit.iloscProduktow = iloscProduktow
        orderComponentToEdit.dataZamowienia = dataZamowienia
        orderComponentToEdit.dataZamowienia = dataZamowienia
        orderComponentToEdit.statusZamowienia = statusZamowienia
        return orderComponentToEdit;
    }

    //usuwanie obiektu po id
    static delete(id) {
        return orderComponentExtent.splice(orderComponentExtent.findIndex(u => u.idUser == idUser && u.idProduct == idProduct), 1)
    }

    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
    }

    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static async initData() {
        //usuwamy zawartość tablicy
        orderComponentExtent.splice(0, orderComponentExtent.length);
        //resetujemy licznik id
        nextId = 1;

        //nazwa, typ, waga, data_produkcji, data_waznosci, cena
        OrderComponent.add(new OrderComponent('pizza', 'food', 2, 20));
        OrderComponent.add(new OrderComponent('schabowy', 'food', 1, 10));
        OrderComponent.add(new OrderComponent('patelnia', 'tool', 3, 40));
    }
}

OrderComponent.initData();

module.exports = OrderComponent;
