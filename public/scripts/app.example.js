class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");

    this.inputDate = document.getElementById("inputDate");
    this.inputTime = document.getElementById("inputTime");
    this.inputCapacity = document.getElementById("inputCapacity");
    this.searchBtn = document.getElementById("searchBtn");
  }

  async init() {
    await this.load();

    // Register click listener document.addEventListener('click')
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
    this.searchBtn.onclick = this.search;
  }


  search = async () => {
    //clear first
    this.clear();

    //collect data from form
    const dateValue = this.inputDate.value;
    const timeValue = this.inputTime.value;
    const capacityValue = this.inputCapacity.value;

    if(!dateValue || !timeValue || !capacityValue){
      alert("Mohon Isi semua inputan");
      return;
    }

    //make tanggal and waktu into datetime format
    const datetime = new Date(`${dateValue} ${timeValue}`);

    //Function filter
    const filterer = (car) => {
      const dateFilter = car.availableAt > datetime;
      const capacityFilter = car.capacity > capacityValue;

      return dateFilter && capacityFilter;
    }

    const cars = await Binar.listCars(filterer);

    Car.init(cars);

    if (cars.length === 0) {
      const node = document.createElement("div");
      node.innerHTML = "<strong>Mohon maaf, Tidak ada mobil</strong>";
      this.carContainerElement.appendChild(node);
    } else {
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    //cars: store list cars yang sudah di filter: [{}]

    //availableAt ==> field  tanggal dan waktu
    //capacity ==> jumlah penumpang


    const cars = await Binar.listCars();

    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
