import Signup from "../Signup";
import React from "react";
import {render, screen} from '@testing-library/react'
import { getAuth } from 'firebase/auth';
const auth = getAuth(app);

test("check if email label is rendering",() =>{
const {getByTestId, getByLabelText} = render(<Signup/>);

const emailLabel = screen.getByText("Email");

expect(emailLabel).toBeInTheDocument();
})