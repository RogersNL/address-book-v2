//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(addressType, street, city, state) {
  this.addressType = addressType;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.addressType + ": " + this.street + ", " + this.city + ", " + this.state;
}

var emptyForm = true;
var emptyNewForm = true;
function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
}

// user interface logic
$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<label for="address-type">Address Type</label>' +
                                 '<select class="form-control" id="address-type">' +
                                   '<option value="Home">Home</option>' +
                                   '<option value="Work">Work</option>' +
                                   '<option value="Other">Other</option>' +
                                 '</select>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    if (inputtedFirstName === "") {
      emptyForm = true;
    } else {
      emptyForm = false;
    }
    $(".new-address").each(function() {
      var inputtedAddressType = $(this).find("select#address-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedAddressType, inputtedStreet, inputtedCity, inputtedState)
      if (inputtedStreet === "" || inputtedCity === "" || inputtedState === ""){
        emptyNewForm = true;
      } else {
        emptyNewForm = false;
      }
      if (inputtedStreet === "" && emptyNewForm) {
        $("#new-addresses .new-address:last").remove();
      } else {
        emptyForm = false;
        newContact.addresses.push(newAddress)
      }
    });
    if(!emptyForm) {
      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    }
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    resetFields();

  });
});
