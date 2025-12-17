export function call({ uri, method = "GET", body = undefined }) {
    const token = JSON.parse(localStorage.getItem("token"))

    return fetch(`http://localhost:3333/api/${uri}`, {
        method: method,
        headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}