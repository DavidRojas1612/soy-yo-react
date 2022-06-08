import {EnrollmentSDK} from '@soyyo/sdk_web_enrollment'
const environments = {
  API_COGNITO: 'https://soyyo-snb.auth.us-east-1.amazoncognito.com',
  API_REGISTRY:
    'https://api.soyyo.mobi/snb-enrollment-process/enrollment-process/v1.0',
  API_AUTHENTICATION:
    'https://api.soyyo.mobi/snb-authentication-process/authentication-process/v1.0',
  API_KEY: 'PBxc0p3bsb4E2gqSzx29oDwaBgQPFM377ASwIBic',
  CLIENT_ID: '4prar45fh00jpiu2mt0jcu6m99',
  CLIENT_SECRET: '5uti50q4gr3g8bic4r75cidhvok8583e2cmvt9lk5vgn30gsp4q',
  API_GET_ENROLLMENT:
    'https://api.soyyo.mobi/snb-enrollment/enrollment/v2.1/enrollments/',
}

class BasicRegistryComponent {
  enrollment
  processId
  constructor() {
    EnrollmentSDK.preInitialize()
    // Carga de información para captura de biometría.
    this.enrollment = new EnrollmentSDK(environments, err => {
      console.log('err', err)
    })
    this.enrollment.initCaptureDocument()
  }

  async onSubmit(data) {
    // Capturar parámetros y almacenarlos en "data" según parámetros de entrada indicados
    try {
      // Llamada a método para registro de datos basicos basicDataRegister
      const response = await this.enrollment.basicDataRegister(data)
      if (!response) {
        throw new Error('Error el servidor no pudo procesar los datos basicos')
      }
      this.captureFace()
    } catch (error) {
      //Manejo de mensajes de error
      console.log(error)
    }
  }

  captureFace() {
    this.enrollment.captureFace(
      response => {
        switch (response.liveness.code) {
          case 'EP006':
            //Se requiere validación de documento
            this.processId = response.liveness.data.processId
            this.documentValidate()
            break
          case 'EP004':
            //Llamada a activación del usuario o a validación del documento si así se requiere
            this.activatedUser(response.liveness.data.processId)
            break
          default:
            break
        }
      },
      error => {},
    )
  }

  documentValidate() {
    this.enrollment.documentValidate(
      res => {
        //Llamada a activación del usuario
        console.log('res docs', res)
        this.activatedUser(this.processId)
      },
      error => {
        console.log('erros docs', error)
      },
    )
  }

  async activatedUser(processId) {
    const response = await fetch(
      'https://soyyo-snb.auth.us-east-1.amazoncognito.com/oauth2/token?client_id=4prar45fh00jpiu2mt0jcu6m99&client_secret=5uti50q4gr3g8bic4r75cidhvok8583e2cmvt9lk5vgn30gsp4q&grant_type=client_credentials',
      {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 'PBxc0p3bsb4E2gqSzx29oDwaBgQPFM377ASwIBic',
        },
      },
    )

    const data = await response.json()
    console.log('data', data)

    const responseActivation = await fetch(
      `https://api.soyyo.mobi/snb-enrollment-process/enrollment-process/v1.0/userActivation/WEB_CLIENT/${processId}`,
      {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'PBxc0p3bsb4E2gqSzx29oDwaBgQPFM377ASwIBic',
          Authorization: `Bearer ${data.access_token}`,
        },
      },
    )

    const dataActivation = await responseActivation.json()
    console.log('dataActivation', dataActivation)
  }
}

export default BasicRegistryComponent
