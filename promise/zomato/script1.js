let isOrderAccepted = false;
let hasRestaurantSeenYourOrder = false;
let isOrderDelivered = false;
let isValetFound = false;

let valetDeliveryTimer = null;
let restaurantTimer = null;
let valetTimer = null;
let acceptOrder = document.getElementById("acceptOrder");

acceptOrder.addEventListener("click", () => {
  checkIfOrderAcceptedFromRestaurant();
});
document.getElementById("deliverOrder").addEventListener("click", function () {
  setTimeout(() => {
    isOrderDelivered = true;
  }, 2000);
});

document.getElementById("findValet").addEventListener("click", function () {
  startSearchingForValets();
});

//step 1:

function checkIfOrderAcceptedFromRestaurant() {
  setTimeout(() => {
    isOrderAccepted = confirm("Should Restaurant Accept Order ...");
    hasRestaurantSeenYourOrder = true;
  }, 1000);
}

// step 2
function startPreparingOrder(work) {
  return new Promise((resolve, reject) => {
    restaurantTimer = setInterval(() => {
      console.log("check if Order Accepted Or not");
      if (!hasRestaurantSeenYourOrder) return;
      if (isOrderAccepted) resolve(work());
      else
        reject(
          "Sorry restaurant couldnt accept your order! Returing your amount with zomato shares"
        );
      clearInterval(restaurantTimer);
    }, 1000);
  });
}
//step 3
function updateOrderStatus() {
  if (isOrderDelivered) {
    document.getElementById("currentStatus").innerText =
      "Order Delivered Successfully";
  } else {
    document.getElementById("currentStatus").innerText = "Preparing Your Order";
  }
}
//step 3 more
function checkIfOrderDelieveredFromRes(callback) {
  valetDeliveryTimer = setInterval(() => {
    console.log("is order delivered by valet");
    if (isOrderDelivered) {
      console.log("Order Delivered Valet details");
      callback();
      clearInterval(valetDeliveryTimer);
    }
  }, 1000);
}

//step 4

function updateMapView() {
  setTimeout(() => {
    document.getElementById("mapview").style.opacity = "1";
  }, 1000);
}

//step 5

function checkIfValetAssigned(callback) {
  valetTimer = setInterval(() => {
    console.log("Searching For Volets");
    if (isValetFound) {
      callback();
      clearInterval(valetTimer);

    }

  }, 1000);
}

//step 6
function startSearchingForValets() {
  const valetsPromises = [];
  for (let i = 0; i < 5; i++) {
    valetsPromises.push(getRandomDriver());
  }
  console.log(valetsPromises);

  Promise.any(valetsPromises)
    .then((selectedValet) => {
      console.log("Selected a valet => ", selectedValet);
      isValetFound = true;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getRandomDriver() {
  const timeout = Math.random() * 1000;
  return setTimeout(() => {
    console.log("Valet - " + timeout);
  }, timeout);
}

//step 7
function updateValetDetails() {
  if (isValetFound) {
    document.getElementById("finding-driver").classList.add("none");

    document.getElementById("found-driver").classList.remove("none");
    document.getElementById("call").classList.remove("none");
  }
}

startPreparingOrder(updateOrderStatus)
  .then(() => {
    updateMapView();
  })
  .then(() => {
    checkIfOrderDelieveredFromRes(updateOrderStatus);
  })
  .then(() => {
    checkIfValetAssigned(updateValetDetails);
  })
  .then(()=>{
    setTimeout(()=>{
      alert('How was your food? Rate your food and delivery partner');
  },5000);
  })
  .catch((error) => {
    alert(error);
  });
