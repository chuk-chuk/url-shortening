import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("APP", () => {
  it("renders a component", () => {
    render(<App />);
    expect(screen.getByText("URL shortening")).toBeInTheDocument();
  })
})