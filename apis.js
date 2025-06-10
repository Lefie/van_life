const url = `http://127.0.0.1:5000/api/`

export async function getVans(){
    const end_point = url + `vans`
    const res = await fetch(end_point)
    if (!res.ok) {
        const error_obj = {
            message:`error getting vans `,
            status: res.status
        }
        throw error_obj
    }
    const data = await res.json()
    console.log(data.vans)
    return data.vans
}


export async function getVanById(id) {
    const end_point = url + 'vans/' + id
    const res = await fetch(end_point)
    if (!res.ok) {
        const error_obj = {
            message:`error getting van by id `,
            status: res.status
        }
        throw error_obj
    }
    const data = await res.json()
    return data.van
}



export async function getVansHost(){
    const end_point = url + 'host/vans'
    const res = await fetch(end_point)
    if (!res.ok) {
        const error_obj = {
            message:`error getting vans by host `,
            status: res.status
        }
        throw error_obj
    }
    const data = await res.json()
    return data.vans

}

export async function getVanHostId(id) {
    const end_point = url + `host/vans/${id}`
    const res = await fetch(end_point)
    if (!res.ok) {
        const error_obj = {
            message:`error getting van by id by host `,
            status: res.status
        }
        throw error_obj
    }
    const data = await res.json()
    return data.van
}

export async function login(creds){
    const end_point = url + "users/login"
    const res = await fetch(end_point,{
        method:"post",
        body:JSON.stringify(creds),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(!res.ok) {
        const error_obj = {
            message:`error logging in `,
            status: res.status
        }
        throw error_obj
    }

    const data = await res.json()
    return data
}

