import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAwxEQoZ2e5BdG3wDBrefXqySgNL1T9zNA",
  authDomain: "idbi-4f238.firebaseapp.com",
  projectId: "idbi-4f238",
  storageBucket: "idbi-4f238.appspot.com",
  messagingSenderId: "1011911250487",
  appId: "1:1011911250487:web:72bf5a10101382ac05e5b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const storage = getStorage(app);
// export function submitPhotos(file){
//     const storageRef = ref(storage,'some-child');
//     uploadBytes(storageRef,file).them(snapShot=>{
//         console.log(file);
//     })
// }
