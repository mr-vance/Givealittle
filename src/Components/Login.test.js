import { AddProducts, Login } from "./Login";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import tsAnyKeyword from "@babel/types"
import TestRenderer from 'react-test-renderer';
import {render, fireEvent, screen, getByText, configure, getByTextId} from '@testing-library/react';
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";
import { text } from "express";


test("renders login title", ()=>{
  
  //calling addproduct component
  const {getByTestId, getByLabelText} = render(
    <MemoryRouter>
      <Login/>
    </MemoryRouter>
  );

  //assign html element to a variable
  const titleLabel = screen.getByText('Login');

  //testing to check if the element is in the document
  expect(titleLabel).toBeInTheDocument();

})
