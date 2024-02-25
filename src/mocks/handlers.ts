// src/mocks/handlers.js
import {http, HttpResponse} from 'msw'

export const handlers = [
    http.get('api/getData', ({request, params, cookies}) => {
        let data_from:any=localStorage.getItem("user-data")
        let response=localStorage?JSON.parse(data_from):{
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@gmail.com',
            note: 'User interface designer and front-end developer'
        }
        return HttpResponse.json(response)
    }),
    http.post('api/userData',async ({ request, params, cookies }) => {
        const requestBody = await request.json() 
        localStorage?.setItem("user-data",JSON.stringify(requestBody))
        return HttpResponse.json(requestBody)
    }),
]