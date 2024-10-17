import admin from 'firebase-admin'
//import serviceAccount from './serviceAccountKey.json'

const serviceAccount = {
    "type": "service_account",
    "project_id": "jscribe-afa33",
    "private_key_id": "e8c3bc47dc1bf88dcca7d93a9b59f59ec8e62799",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0nuK2/b+XLGzb\nzl7shoUuW4re8jSisrOoMolBvMzy9hsr5REDmyJhBTqJBOs4cr9uUE96Np/t0KEI\ntnRsjNf9F9afE7wR9XROghPUH7JC2I2D3cHG01gwQOHGpBWdQk4GSNWBzEwwiAVK\nSh1K1iGXP4WpVWiXI8pYAtT17qVvlEv8AJd+e5XapJUXDOMqsmelEBre2SO8MdmY\nE/WC0waEX3tT5Mimo3FRvQsKNoWlOjJKf9gCsXQquE5JBLjekc+z7IyA8sk/9dc0\n8yH6JfAQFlgQdio4J55ajxaHIa6wGVdsu6M1iqakVOK05uU7AIHo0jFrdxxpdpdE\ndyy+HV8xAgMBAAECggEADvWLzwkOuaKxygtPsaTl2d7guQdJVGJFiTwqQa9f2rgx\nrD3Ws2br/tS+h4Od8aO7TBPLCVMF2t3pFb4laqodkgt2jd/wtxy49cRF3SSE5eQR\nOxHTjzfeJBzzi2P38E7XWc46yfsVd6gu+/tNwsQfrcBSkyGM6IZL0g87UQ+4qZge\n065juT8LNJTXX0han+tgUo/U/piq8xKCySb2ERS40qP8U9LgOyXZEyJX7pYfX2z/\nOmGFL9coMGove1EgDyxYSdK+Jt3cBf6YFn5Tv48vQcUkpGz1FxyVCc1k2spb7zH4\nlh9Swp+Bvxih+QksMdy0wmHBw0885WjSgISpdEGV0wKBgQD5G0gydqEiN0ajHx//\norQ2R82fqgCWduj+yFyd0OG2P7BMO//oIRbv5OXj1/ymUfqMj7BZSrm1XiXtLUun\nZwOgkkDr8gZmz6lza2nXgOSMVlz4p+kN2eMveuVcG+1eUEln6hv3ZZ03jwNI4vH1\nLwfpwLWdxUg+0yiZDM+04ZFFYwKBgQC5nm+2CW23eGHitntocWy+Du+ib05nyYsE\naRU2eUTam5HrhhN1Am+reRVcFh8VwCIxofeAuswP2PtfOLtWhGeC3SOjT+9WZSN0\nhMJPG+WXyAMCFzAmMuA5t5OXxpdBCxYGMR7EzdDp3OJua8i/4+7pfsh73AdpKbbZ\n8Jns7VwHWwKBgDiQEk+rEiFzza1CZwCj0Cm3GiCT+Hgx3evkUOtgv6+jPIPC5/Os\nd8nW/sBCjdKyMKL0CYXs6sgc7Z2yOEh1oqQ2MVmh5gQ4SPC1Rh4x3TNkdM3dSpTj\nkat5S1Uj3j0ZG+HljZ4aS52O8p79MRWMLU7NfC+r2SCyz7gY6ZzXzyWjAoGBAIAh\nHO3krkbio3czDhb3jN/ZQZO4D8BXAE5oF0uGBIB+uQiCgbXYm6sbJyJs5sJF4ZSv\nQEEtMKWT21lMuQys0yMjcXFPQWA66nGJHvQqxp6yY1kzFnqXze4piYlQfaJZe7eE\ner/Rbu+wGOGuJ2JGfenSKaROKxNtxxnEGwzQgCFXAoGBAIbuDHy2Ywr4/7yqBlVS\nf2Qq6zhDt4wWRKku5mAMFFOSpZEDdeY0FV64FE4k1eItHrXwxrPwYuozqYTZpb81\nb0bi+zgjpbc6TaiBhB1HUk+WjkaeXgQXfqdj8ENWyYP3rkRq8REk+RK1e2mYWM44\nDS17vMXCfj75Gxn2rPrMh5n7\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zcz8e@jscribe-afa33.iam.gserviceaccount.com",
    "client_id": "100891169368279210670",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zcz8e%40jscribe-afa33.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

export {admin}


