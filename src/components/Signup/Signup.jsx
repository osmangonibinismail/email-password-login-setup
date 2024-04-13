import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firbase.config";






const Signup = () => {

    const handleSignUp = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
        })
        .catch(error =>{
            console.error(error);
        })
    }
    
    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">please sign up</h2>
                <form onSubmit={handleSignUp}>
                    <input className="mt-3 mb-4 w-3/4 px-4 py-2 rounded-2xl bg-slate-300" type="email" name="email" placeholder="Email Address" id="" />
                    <br />
                    <input className="mb-4 w-3/4 px-4 py-2 rounded-2xl bg-slate-300" type="password" name="password" placeholder="Your password" id="" />
                    <br />
                    <input className="mb-4 w-3/4 btn btn-secondary" type="submit" value="Sign up" />
                </form>
            </div>
        </div>
    );
};

export default Signup;