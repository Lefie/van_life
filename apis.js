const url = `http://127.0.0.1:5001/api/`
//const url = `https://vanlifebackend-production-5f4c.up.railway.app/api/`


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

export async function getVansHost(){
    const end_point = url + `vans/host`
    const jwt_token = localStorage.getItem("jwt_token")

    const res = await fetch(end_point, {
        headers: {
            Authorization:  `Bearer ${jwt_token}`
        }
    })

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

// allows host to retrieve a rental owned by host 
export async function getVanHostId(id) {
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `vans/${id}/host`
    const res = await fetch(end_point, {
        headers: {
            Authorization:  `Bearer ${jwt_token}`
        }
    })
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

export async function editVanByHost(data_update,id) {
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `vans/${id}/host`
    const res = await fetch(end_point, {
        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:  `Bearer ${jwt_token}`
        },
        body: JSON.stringify(data_update)

    })
    if (!res.ok) {
         const error_obj = {
            message:`error editing rental information `,
            status: res.status
        }
        throw error_obj
    }

    const data = await res.json()
    console.log(data)
    return data
}

export async function deleteVanByHost(id) {
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `vans/${id}/host`
    const res = await fetch(end_point, {
        method: "DELETE",
        headers: {
            Authorization:  `Bearer ${jwt_token}`
        }
    })

    if (!res.ok) {
        const error_obj = {
            message:`error deleting a van rental listing `,
            status: res.status
        }
        throw error_obj
    }

    const data = await res.json()
    console.log(data)
    return data
}

export async function createVanByHost(van_data) {
    console.log(van_data, typeof van_data)
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `vans/van/host`
    const res = await fetch(end_point, {
        method : "POST",
        headers: {
            "Content-Type":"application/json",
            Authorization:  `Bearer ${jwt_token}`
        },
        body: JSON.stringify(van_data)
    })

    if (!res.ok) {
        const error_obj = {
            message:`error creating a van rental listing `,
            status: res.status
        }
        throw error_obj
    }

    const data = await res.json()
    console.log(data)
    return data
}


// handle user accounts
export async function login(creds){
    const end_point = url + "users/login"
    console.log(end_point, creds)
    const res = await fetch(end_point,{
        method:"POST",
        headers: {"Content-type": "application/json"},
        body:JSON.stringify(creds)
    })

    if(!res.ok) {
        const error_obj = {
            message:`error logging in `,
            status: res.status
        }
        console.log("Error from logging in")
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
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `rentals`
    const res = await fetch(end_point, {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
            Authorization:  `Bearer ${jwt_token}`
        },
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
export async function get_upcoming_rentals() {
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `rentals/upcoming_rentals`

    const res = await fetch(end_point, {
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
            Authorization:  `Bearer ${jwt_token}`
        }
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

// retrieval rental history by user id
export async function get_rental_history(){
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `rentals/rental_history`
    const res = await fetch(end_point, {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:  `Bearer ${jwt_token}`
        }
    })

    const data = await res.json()
    console.log(data, "get rental history api call")
    if (data && data["success"] === "true") {
        return data["rental history list"]
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

// add a saved rental 
export async function add_to_saved_vans(van_id) {
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url  + `save/${van_id}`
    
    const res = await fetch(end_point, {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:  `Bearer ${jwt_token}`
        }
    })

    const data = await res.json()
    if (data && data["success"] === "true") {
        console.log("saving van", data)
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

export async function remove_from_saved_vans(van_id) {
    const jwt_token = localStorage.getItem("jwt_token")
    const end_point = url + `unsave/${van_id}`
    
    const res = await fetch(end_point, {
        method: 'DELETE',
        headers: {
            Authorization:  `Bearer ${jwt_token}`
        }
    })

    const data = await res.json()

    if (!res.ok) {
        const error_msg = data["error"]

        const error_obj = {
            message: error_msg,
            status:res.status
        }
        return error_obj
    }

}

export async function get_all_vans_saved_by_user() {
    const end_point = url+`saved_vans`
    const jwt_token = localStorage.getItem("jwt_token")
    console.log("from api get_all_vans_saved_by_user, jwt token ", jwt_token)
    const res = await fetch(end_point, {
        headers: {
            Authorization:  `Bearer ${jwt_token}`
        }
    })
    const data = await res.json()
    console.log(data)
    if (data && data["success"] === "true") {
        console.log(data)
        return data["saved_vans"]
    }

    if (!res.ok) {
        const error_msg = data["error"]
        console.log("error_msg from line 320", error_msg)

        const error_obj = {
            message: error_msg,
            status:res.status
        }
        return error_obj
    }
}

