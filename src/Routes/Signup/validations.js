export const signupValidation = ({
  user_type,
  fullName,
  description,
  category,
  city,
  location,
  phone_number,
  date_of_birth,
  national_id,
  current_address,
  permanent_address,
  saller_img,
  photo_name,
  password,
  confirmpwd,
  email,
  agreed,
}) => {
  if (user_type == "Seller") {
    let dateHasError = "";

    if (
      date_of_birth instanceof Date &&
      date_of_birth.toDateString() != "Invalid Date"
    ) {
      let currentDate = new Date();
      let diff = currentDate.getTime() - date_of_birth.getTime();
      if (diff < 220898664000 || diff > 3155695200000) {
        dateHasError = "Minimum age is 7 years";
      }
    } else {
      dateHasError = "Invalid Date";
    }

    if (fullName.length < 1) {
      return "Seller Name required";
    } else if (category === "") {
      return "Please select category !";
    } else if (city === "") {
      return "Please your City !";
    } else if (location === "") {
      return "Please Inter your Location !";
    } else if (phone_number.length !== 11) {
      return "Phone Number should be not less than or greater than 11!";
    } else if (!!dateHasError) {
      return dateHasError;
    } else if (national_id.length < 10) {
      return "Your National Id must be at least 10 characters long !";
    } else if (current_address.length < 20) {
      return "Your current address must be at least 20 characters long !";
    } else if (permanent_address.length < 20) {
      return "Your permanent address must be at least 20 characters long !";
    } else if (description.length < 40 || description.length > 120) {
      return "An effective overview needs to be at least 40 to 120 characters";
    } else if (password.length < 8) {
      return "Your password must be at least 8 characters long !";
    } else if (confirmpwd !== password) {
      return "Password does not match";
    } else if (saller_img === null) {
      return "Please upload a picture !";
    } else if (!agreed) {
      return "Can't Sign Up without accepting the terms and conditions";
    } else {
      return "ok";
    }
    // "Seller" : "Buyer"
  } else {
    if (fullName.length < 1) {
      return "Please Enter full name !";
    } else if (phone_number.length <= 10) {
      return "Please inter valide Phone number !";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return "Please inter valide email !";
    } else if (password.length < 8) {
      return "Your password must be at least 8 characters long !";
    } else if (confirmpwd !== password) {
      return "Password does not match";
    } else if (saller_img === null) {
      return "Please upload a picture !";
    } else if (!agreed) {
      return "Can't Sign Up without accepting the terms and conditions";
    } else {
      return "ok";
    }
  }
};
