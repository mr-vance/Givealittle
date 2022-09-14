import { AddProducts } from "../AddProducts";
import React from "react";
import ReactDOM from 'react-dom';
import tsAnyKeyword from "@babel/types"
import TestRenderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react';


it("renders without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<label></label>, div);
})