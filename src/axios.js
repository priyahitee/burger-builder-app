import axios from 'axios'

const instance = axios.create({
    baseURL : "https://burgerbuilder-app-5c63b-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

export default instance;
