import axios from "../custom-axios/axios";

const BASE_URL = "/persons";

const PersonService = {

    fetchPersons: () => {
        return axios.get(BASE_URL);
    },

    getPerson: (id) => {
        return axios.get(`${BASE_URL}/${id}`);
    },

    editPerson: (id, address, contactInformation) => {
        return axios.put(`${BASE_URL}/edit/${id}`, {
            "address": address,
            "contactInformation": contactInformation
        });
    },

    deletePerson: (id) => {
        return axios.delete(`${BASE_URL}/delete/${id}`);
    },

    login: (username, password) => {
        return axios.post(`${BASE_URL}/login`, {
            "username": username,
            "password": password
        });
    },

    register: (username, password, repeatPassword, name, surname, birthYear, streetName, streetNumber, city, postcode, email, phoneNumber) => {
        return axios.post(`${BASE_URL}/register`, {
            "username": username,
            "password": password,
            "repeatPassword": repeatPassword,
            "name": name,
            "surname": surname,
            "birthYear": birthYear,
            "streetName": streetName,
            "streetNumber": streetNumber,
            "city": city,
            "postcode": postcode,
            "email": email,
            "phoneNumber": phoneNumber
        });
    }
}

export default PersonService;