
import { useState } from 'react';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    required
                />
                <div className='buttons-container'>
                    <Button
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Button
                        type='button'
                        onClick={signInWithGoogle}
                        buttonType='google'
                    >
                        Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;