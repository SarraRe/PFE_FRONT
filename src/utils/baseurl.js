export const url = 'http://localhost:5000'; 


export const decodetoken = () => {

    let token = localStorage.getItem("user_connected")
    if (token) {
    const jwtData = token.split('.')[1]
    const decodedJwtJsonData = window.atob(jwtData)
  return JSON.parse(decodedJwtJsonData)
    }

}
