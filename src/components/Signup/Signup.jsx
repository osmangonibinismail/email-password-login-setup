import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firbase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";





const Signup = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('');


    const handleSignUp = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted)
        // reset error
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }

        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one uppercase characters')
            return;
        }

        else if(!accepted){
            setRegisterError('Please accept our terms and condition')
            return;
        }


        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('user created successfully')
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">please sign up</h2>
                <form onSubmit={handleSignUp}>
                    <input className="mt-3 mb-4 w-full px-4 py-2 rounded-2xl bg-slate-300" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="mb-4 relative">
                        <input
                            className="mb-4 w-full px-4 py-2 rounded-2xl bg-slate-300" type="password"
                            name="password"
                            placeholder="Your password"
                            id="" required />
                        <span className="absolute top-3 right-3"
                            onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms an Conditions</a></label>
                    </div>
                    <br />
                    <input className="mb-4 w-full btn btn-secondary" type="submit" value="Sign up" required />
                </form>
                {
                    registerError && <p className="text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-green-600 text-center text-2xl">{success}</p>
                }
            </div>
        </div>
    );
};

export default Signup;