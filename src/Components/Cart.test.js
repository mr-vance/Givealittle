import { AddProducts, Login, Cart, Navbar } from "./Cart";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import tsAnyKeyword from "@babel/types"
import TestRenderer from 'react-test-renderer';
import {render, fireEvent, screen, getByText, configure, getByTextId, getElementsByClassName} from '@testing-library/react';
//import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";


test("renders cart title", ()=>{
  
  //calling addproduct component
  const {container} = render(
    <MemoryRouter>
      <Cart/>
    </MemoryRouter>
  );

  //assign html element to a variable
  const titleLabel = container.getElementsByClassName('text-center');

  //testing to check if the element is in the document
  console.log(titleLabel.length);

  expect(titleLabel.length).toBe(0);

})