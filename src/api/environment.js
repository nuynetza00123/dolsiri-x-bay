import axios from "axios";

export default axios.create({
  baseURL: `https://punn-api.fs-omc.io/api/`,
  // baseURL: `https://10.144.66.34/api/`,
});

// const environment = {
//     // apiUrl: 'https://localhost:44368/api/'
//     // apiUrl: 'https://localhost:44368/api/'
//     // apiUrl: 'https://192.168.0.1:444/api/'
//     apiUrl: 'https://10.144.66.34/api/',
//     // apiUrl: 'https://punn-api.fs-omc.io/api/'

//     //  apiUrl: 'https://10.40.24.133:446/api/'  // Server JLK
//     //  apiUrl: 'https://61.91.54.42:446/api/'  //
//     //  apiUrl: 'https://parking-api.fyi-center.com/api/'  //
//     //  apiUrl: 'https://onebangkok-payment-api.dreamy-germain.119-59-118-127.plesk.page/api/'  // Server VPS

// }
// export default environment
