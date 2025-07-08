const url = `http://127.0.0.1:5000/api/`


// handle vans
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

export async function getVansHost(host_id){
    const end_point = url + `host/${host_id}/vans`
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

export async function getVanHostId(host_id,id) {
    const end_point = url + `host/${host_id}/vans/${id}`
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

// handle user accounts
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

export async function registration(creds) {
    const end_point = url + `users/register`
    const response = await fetch(end_point, {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(creds)
    })

    const data = await response.json()

    if (!response.ok){
        const error_msg = data["error"]
        
        const error_obj = {
            message: error_msg,
            status:response.status
        }

        throw error_obj
    }


    return data
}

// handle booking rentals 
export async function book_rental(rental_obj) {
    const end_point = url + `rentals/create_new_rental`
    const res = await fetch(end_point, {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(rental_obj)
    })
    const data = await res.json()
    if (data && data["success"] === "true"){
        console.log(data)
        console.log("rental added")
        return data
    }

    if (!res.ok) {
        const error_msg = data["error"]

        const error_obj = {
            message: error_msg,
            status:res.status
        }
        return error_obj
    }
}

// retrieve upcoming rental 
export async function get_upcoming_rentals(user_data) {
    const end_point = url + `rentals/upcoming_rentals`
    console.log(user_data)
    const res = await fetch(end_point, {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user_data)
    })
    const data = await res.json()
    if (data && data["success"] === "true"){
        console.log(data)
        return data["upcoming_rentals_list"]
    }

    if (!res.ok) {
        const error_msg = data["error"]

        const error_obj = {
            message: error_msg,
            status:res.status
        }
        return error_obj
    }

}

