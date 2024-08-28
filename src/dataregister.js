const components = {
  name: {
    label: "Name",
    type: "text",
    rule: (val) => val.length > 0 || "Enter your name",
    model: "",
    visible: true
  },
  email: {
    label: "Email",
    type: "email",
    rule: (val) => /\S+@\S+\.\S/.test(val) || "Email incorrect",
    model: "",
    visible: true
  },
  cpf: {
    label: "CPF",
    type: "text",
    rule: '',
    mask: "###.###.###-##",
    model: "",
    visible: true
  },
  cnpj: {
    label: "CNPJ",
    type: "text",
    rule: '',
    mask: "##.###.###/####-##",
    model: "",
    visible: false
  },
  password: {
    label: "Password",
    type: 'password',
    rule: (val) =>
      val.length > 8 || "Password incorrect",
    model: "",
    icon: 'visibility_off',
    hint: 'Password must be longer than 8 characters',
    visible: true
  },
  passwordTwofactor: {
    label: "Confirm password",
    type: "password",
    rule: '',
    model: "",
    visible: true
  },
  phone: {
    label: "Phone",
    type: "tel",
    rule: (val) => val.length >= 11 || "Enter your phone",
    mask: "(##)#####-####",
    model: "",
    visible: true
  },
  location: {
    label: "Location",
    type: "text",
    rule: (val) => val.length > 0 || "Enter your location",
    model: "",
    hint: 'Mask: road number, postcode city, country',
    visible: false
  },
  profilePicture: {
    model: null
  }
}

export default components;
