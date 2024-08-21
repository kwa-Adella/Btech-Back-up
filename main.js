import './style.css'

import {initializeApp} from 'firebase/app';
import { getFirestore, addDoc, where, query, getDocs, collection } from 'firebase/firestore';


 // Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyBpsPYCz4HgXc_gceQI-wyW6lo3uZ0TsKg",
  authDomain: "web-student-id-card-system.firebaseapp.com",
  projectId: "web-student-id-card-system",
  storageBucket: "web-student-id-card-system.appspot.com",
  messagingSenderId: "417734234435",
  appId: "1:417734234435:web:86386bb49148d2f14b5ff6",
  measurementId: "G-48J620QCJ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userID = collection(db,'idCards');

export async function submitIDCard() {
  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const pob = document.getElementById('pob').value;
  const program = document.getElementById('program').value;
  const matricule = document.getElementById('matricule').value;
  const validity = document.getElementById('validity').value;
  const photoInput = document.getElementById('photo');
  const photo = photoInput.files[0];

  const q = query(userID,where('Matricle', '==', matricule));
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.get());
  if (!querySnapshot.empty) {
    alert(`ID belonging to user of Matricule ${matricule} already exists`);
    return;
  }

  try {
      await addDoc(userID,{
          name, dob, pob, program, matricule, validity
      });
      alert('Submitted successfully!');
  } catch (error) {
      alert(`There was an error: ${error}`);
  }
  
}

