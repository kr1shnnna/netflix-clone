
import { initializeApp } from "firebase/app";
import { addDoc, collection ,getFirestore} from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyDBzg_r3OUKz1p0QKDvfH3UPXUHGDOv2Rc",
  authDomain: "nextflix-clone-5d9ed.firebaseapp.com",
  projectId: "nextflix-clone-5d9ed",
  storageBucket: "nextflix-clone-5d9ed.firebasestorage.app",
  messagingSenderId: "677626633212",
  appId: "1:677626633212:web:2b3c2bdfdbc70406f6f079"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

const signup=async(name,email,password)=>{

    try{
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
       })

    }
    catch(err){
        console.log(err);
        alert(err.message);

    }

}


const login=async(email,password)=>{

    try{
        await  signInWithEmailAndPassword(auth,email,password);

    }
    catch(err){
        console.log(err);
        alert(err.message);
    }
    
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,signup,login,logout}