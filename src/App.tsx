import React from 'react'
import './App.css'
import {soyYoApi} from './utils/'
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
} from '@chakra-ui/react'

function App() {
  const [isLegal, setIsLegal] = React.useState(false)

  const startConfig = async (form: any) => {
    await soyYoApi.onSubmit(form)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())
    const {identificationNumber, phoneNumber, email} = fieldValues
    const form = {
      entityId: '28',
      processType: 'ENR',
      documentType: 'CC',
      phoneIndicative: '57',
      appIdentifier: 'pocwompinuxt.vercel.app',
      channel: 'WEB_CLIENT',
      identificationNumber,
      phoneNumber,
      email,
    }

    startConfig(form)
  }

  return (
    <Container maxW="xl" p={12}>
      <Heading mb={8}>Datos Basicos</Heading>
      <form noValidate onSubmit={onSubmit}>
        <FormControl mb={6}>
          <FormLabel htmlFor="firstName">Nombre</FormLabel>
          <Input id="firstName" name="firstName" placeholder="Nombre" />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel htmlFor="lastName">Apellido</FormLabel>
          <Input id="lastName" name="lastName" placeholder="Apellido" />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel htmlFor="identificationNumber">
            Numero de identificación
          </FormLabel>
          <Input
            id="identificationNumber"
            name="identificationNumber"
            placeholder="Numero de identificación"
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel htmlFor="phoneNumber">Numero de telefono</FormLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Numero de telefono"
            type="tel"
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            placeholder="Numero de telefono"
            type="email"
          />
        </FormControl>
        <FormControl mb={6} as="fieldset">
          <FormLabel as="legend">Representante legal?</FormLabel>
          <Checkbox
            size="sm"
            colorScheme="red"
            onChange={e => setIsLegal(e.target.checked)}
          >
            Represetante legal
          </Checkbox>
        </FormControl>
        {isLegal ? (
          <FormControl mb={6}>
            <FormLabel htmlFor="nit">Nit</FormLabel>
            <Input id="nit" name="nit" placeholder="Nit" />
          </FormControl>
        ) : null}
        <Button type="submit">Registrarse y continuar</Button>
      </form>
    </Container>
  )
}

export default App
