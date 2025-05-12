
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD8K8tJgWs3_SlS4hf3D6iWHTrV1m8cXp8",
  authDomain: "vanlife-8c467.firebaseapp.com",
  projectId: "vanlife-8c467",
  storageBucket: "vanlife-8c467.firebasestorage.app",
  messagingSenderId: "230164550996",
  appId: "1:230164550996:web:d59be907a432ca78a624c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans")

export async function getVans(){
   
    const querySnapshot = await getDocs(vansCollectionRef)
    const vans = querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVanById(id) {
    const docRef = doc(db,"vans",id)
    const docSnap = await getDoc(docRef);
    const data = {
        ...docSnap.data(),
        id:docSnap.id
    }

    return data
}

export async function getVansHost(){
    const q = query(vansCollectionRef, where("hostId","==","123")) // logged in host
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id
    }))
    return data
}

export async function getVanHostId(id) {

  const q = query(vansCollectionRef, where("hostId","==","123"))
  const querySnapshot = await getDocs(q)
  const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id:doc.id
  }))
  const res = data.filter(doc => doc.id ===id)
  return res[0]
}

export async function login(creds){
    const res = await fetch("/api/login",{
        method:"post",
        body:JSON.stringify(creds)
    })

    if(!res.ok) {
        const error_obj = {
            message:`error logging in `,
            status: res.status
        }
        throw error_obj
    }

    const data = await res.json()
    return data
}

