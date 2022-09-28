import { AddProducts } from "./AddProducts";
import React from "react";
import ReactDOM from 'react-dom';
import tsAnyKeyword from "@babel/types"
import TestRenderer from 'react-test-renderer';
import {render, fireEvent, screen, getByText, configure, getByTextId} from '@testing-library/react';
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";


test("renders product title", ()=>{
  
  //calling addproduct component
  const {getByTestId, getByLabelText} = render(<AddProducts/>);

  //assign html element to a variable
  const titleLabel = screen.getByText('Product Title');

  //testing to check if the element is in the document
  expect(titleLabel).toBeInTheDocument();

})