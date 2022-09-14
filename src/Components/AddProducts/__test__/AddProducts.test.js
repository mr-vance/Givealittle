import { AddProducts } from "../AddProducts";
import React from "react";
import ReactDOM from 'react-dom';
import tsAnyKeyword from "@babel/types"
import TestRenderer from 'react-test-renderer';
import {render, fireEvent, screen, getByText, configure, getByTextId} from '@testing-library/react';
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";


it("renders without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<label></label>, div);
})

test("renders product title and description text", ()=>{
  const {getByTestId, getByLabelText} = render(<AddProducts/>);

  const titleLabel = screen.getByText('Product Title');
  const titleDescr = screen.getByText('Product Description');
  expect(titleLabel).toBeInTheDocument();
  expect(titleDescr).toBeInTheDocument();

  // expect(titleLabel).toHaveAttribute('type','text');
})