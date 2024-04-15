import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/Firbase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const HeroRegister = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('');

    const handleRegister = e => {
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

        else if (!accepted) {
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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="mb-4 relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered mb-4 w-full px-4 py-2"
                                        required
                                    />
                                    <span  className="absolute top-3 right-3"
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register now</button>
                            </div>
                        </form>
                        {
                            registerError && <p className="text-red-700">{registerError}</p>
                        }
                        {
                            success && <p className="text-green-600 text-center text-2xl">{success}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;