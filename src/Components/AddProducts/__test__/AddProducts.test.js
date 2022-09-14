import { AddProducts } from "../AddProducts";
import React from "react";
import TestRenderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';


test('renders the form properly',()=>{
  const {getByTestId, getByLabelText} = render(<App/>)

  const titleLabel = getByText(/Product Title:/);
  const descriptionLabel = getByText(/Product Description:/);

  expect(titleLabel).toBeInDocument();
  expect(descriptionLabel).toBeInDocument();

})
