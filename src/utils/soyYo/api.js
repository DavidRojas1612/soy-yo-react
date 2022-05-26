import { EnrollmentSDK } from '@soyyo/sdk_web_enrollment'

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

  constructor() {
    // Carga de información para captura de biometría.
    EnrollmentSDK.preInitialize()
    this.enrollment = new EnrollmentSDK(environments, (err) => {
      console.log('err', err)
    })
    // this.enrollment.initCaptureDocument()
  }

  async onSubmit(data) {
    // Capturar parámetros y almacenarlos en "data" según parámetros de entrada indicados
    try {
      // Llamada a método para registro de datos basicos basicDataRegister
      const response = await this.enrollment.basicDataRegister(data)
      if (!response) {
        throw new Error('Error el servidor no pudo procesar los datos basicos')
      }
      console.log('response', response)
      this.captureFace()
    } catch (error) {
      //Manejo de mensajes de error
      console.log('AAAMAAA', error)
    }
  }

  // captureFace() {
  //   this.enrollment.captureFace(
  //     (response) => {
  //       switch (response.liveness.code) {
  //         case 'EP006':
  //           this.documentValidate()
  //           break
  //         case 'EP004':
  //           //Llamada a activación del usuario o a validación del documento si así se requiere;
  //           break
  //       }
  //     },
  //     (error) => {}
  //   )
  // }

  captureFace() {
    this.enrollment.captureFace(
      (response) => {
        switch (response.liveness.code) {
          case 'EP006':
            //Se requiere validación de documento
            break
          case 'EP004':
            //Llamada a activación del usuario o a validación del documento si así se requiere
            break
        }
      },
      (error) => {}
    )
  }
}

export default BasicRegistryComponent
