import { useEffect, useState } from "react";
import initializeFirebase from "../pages/Login/Firebase/firebase.init";
import { getAuth,createUserWithEmailAndPassword,signOut, onAuthStateChanged,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,updateProfile,getIdToken  } from "firebase/auth";


initializeFirebase();
const useFirebase=()=>{
    const[user,setUser]=useState({});
    const[isLoading,setIsLoading]=useState(true);
    const[authError,setAuthError]=useState('');
    const[admin,setAdmin]=useState(false);
    const[token,setToken]=useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const registerUser=(email,password,name,navigate)=>{
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setAuthError('');
            const newUser={email, displayName:name}
            setUser(newUser);

            //saveuser to the data base function called here
            saveUser(email,name,'POST');

            //send name to firebase after creation
            updateProfile(auth.currentUser, {
              displayName: {name}
            }).then(() => {
            }).catch((error) => {
            });
            navigate("/")
          })
          .catch((error) => {
            setAuthError(error.message);
          })
          .finally(()=>setIsLoading(false));
    }

    const loginUser=(email,password,location,navigate)=>{
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const destination=location?.state?.from || "/";
          navigate(destination);
            setAuthError('');
     })
        .catch((error) => {
            setAuthError(error.message);
        })
        .finally(()=>setIsLoading(false));
}

    const signInUsingGoogle=(location,navigate)=>{
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
  .then((result) => {
    const user = result.user;
    saveUser(user.email, user.displayName, 'PUT');
    setAuthError('');
        const destination = location?.state?.from || "/";
        navigate(destination);
  }).catch((error) => {
    setAuthError(error.message);
    })
    .finally(()=>setIsLoading(false));
}

    //observe user state

    useEffect(()=>{
        const unsubscribed=onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              getIdToken(user)
              .then(idToken=>{
                setToken(idToken);
              })
            } else {
              setUser({});
            }

            setIsLoading(false);

          });
          return ()=> unsubscribed;

    },[])

    const logOut=()=>{
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=>setIsLoading(false));
    }

    //saveuser to the data base function
    const saveUser=(email,displayName,method)=>{
      const user={email,displayName};
      fetch('http://localhost:5000/users',{
        method: method,
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(user)
      })
        .then()
    }

    //fetch data to check admin
    useEffect(()=>{
      fetch(`http://localhost:5000/users/${user.email}`)
      .then(res=>res.json())
      .then(data=>setAdmin(data.admin))
    },[user.email])

    return{
        user,
        registerUser,
        loginUser,
        logOut,
        isLoading,
        authError,
        signInUsingGoogle,
        admin,
        token
    }
}
export default useFirebase;