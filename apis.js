
export async function getVans() {
    const res = await fetch("/api/vans")
    console.log(res)
    if (!res.ok) {
        const error_obj = {
            message:"error retrieving all the vans",
            status: res.status
        }
        throw error_obj
    }
    const data = await res.json()
    console.log(data)
    return data.vans
}

export async function getVansById(id){
    const res = await fetch(`/api/vans/${id}`)
    
    if(!res.ok) {
        const error_obj = {
            message:`error retrieving van ${id}`,
            status: res.status
        }
        throw error_obj
    }

    const data = await res.json()
    return data.vans
}

export async function getVansHost(){
    const res = await fetch('/api/host/vans')
    const data = await res.json()
    if(!res.ok) {
        const error_obj = {
            message:`error retrieving vans `,
            status: res.status
        }
        throw error_obj
    }
    return data.vans
}

export async function getVanHostId(id) {
    const res = await fetch(`/api/host/vans/${id}`)
    const data = await res.json()
    console.log(data.vans[0])
    if(!res.ok) {
        const error_obj = {
            message:`error retrieving vans `,
            status: res.status
        }
        throw error_obj
    }
    return data.vans[0]
}


