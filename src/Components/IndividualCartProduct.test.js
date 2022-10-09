import { IndividualCartProduct } from "./IndividualCartProduct";
import React from "react";
import {CartProducts} from "./CartProducts";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import tsAnyKeyword from "@babel/types"
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth,fs} from '../Config/Config'
import TestRenderer from 'react-test-renderer';
import {render, fireEvent, screen, getByText, configure, getByTextId, getElementsByClassName} from '@testing-library/react';
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";


test("renders title", ()=>{
  
  //calling addproduct component
  const {container} = render(<IndividualCartProduct,cartProduct,cartProductIncrease,cartProductDecrease />);

  //assign html element to a variable
  const titleLabel = container.getElementsByClassName('product-text title');

  //testing to check if the element is in the document
  expect(titleLabel).toBeInTheDocument();

})