import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from './components/ContactForm'

test("renders App without crashing", () => {
  render(<ContactForm />);
});
test('user can fillout form', async () => {
  render(<ContactForm />)
  const firstName = screen.getByPlaceholderText(/edd/i)
  const lastName = screen.getByPlaceholderText(/burke/i)
  const email = screen.getByPlaceholderText(/email/i)
  const message = screen.getByPlaceholderText(/message/i)
  fireEvent.change(firstName, { target: { value: 'andrew', name: 'firstName' } })
  fireEvent.change(lastName, { target: { value: 'poppenberg', name: 'lastName' } })
  fireEvent.change(email, { target: { value: 'andrewpoppenberg@yahoo.com', name: 'email' } })
  fireEvent.change(message, { target: { value: 'hello', name: 'message' } })

  expect(firstName).toHaveValue('andrew')
  expect(lastName).toHaveValue('poppenberg')
  expect(email).toHaveValue('andrewpoppenberg@yahoo.com')
  expect(message).toHaveValue('hello')

  const submitter = screen.getByRole('submitter')
  fireEvent.click(submitter)

  const newFirstName = await screen.findByText(/andrew/i)
  expect(newFirstName).toBeTruthy()
  const newLastName = await screen.findByText(/poppenberg/i)
  expect(newLastName).toBeTruthy()
  const newEmail = await screen.findByText(/andrewpoppenberg@yahoo.com/i)
  expect(newEmail).toBeTruthy()
  const newMessage = await screen.findByText(/hello/i)
  expect(newMessage).toBeTruthy()

})