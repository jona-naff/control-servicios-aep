const listarColonias = async (municipio_id) =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/colonias/";
        const response=await fetch(baseUrl+endpoint+municipio_id);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            data.colonias.forEach((colonia)=>{
                opciones+=`<option value='${colonia.colonia_id}'>${colonia.nombre}</option>`;
            });
            id_colonia.innerHTML = opciones;
        }else{
            alert("Colonias no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};

const listarMunicipios = async (estado_id) =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/municipios/";
        const response=await fetch(baseUrl+endpoint+estado_id);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.municipios.forEach((municipio)=>{
                opciones+=`<option value='${municipio.municipio_id}'>${municipio.nombre}</option>`;
            });
            cboMunicipio.innerHTML = opciones;
            //listarColonias(data.municipios[0].municipio_id);
        }else{
            alert("Municipios no encontrados");
        }
    }catch(error){
        console.log(error);
    }   
};

const listarEstados=async()=>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/estados";
        const response=await fetch(baseUrl+endpoint);
        const data=await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.estados.forEach((estado)=>{
                opciones+=`<option value='${estado.estado_id}'>${estado.nombre}</option>`;
            });
            cboEstado.innerHTML = opciones;
            //listarMunicipios(data.estados[0].estado_id);
            
        }else{
            alert("Estados no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};


/*const cambiarHTML=async(peticion)=>{
    try{
        const value = String(peticion);
        $('#id_colonia').val(value);
            
        
    }catch(error){
        console.log(error);
    }
};*/


const cargaInicial=async()=>{

    await listarEstados();

    cboEstado.addEventListener("change",(event)=>{
        listarMunicipios(event.target.value);

    });

    cboMunicipio.addEventListener("change",(event)=>{
        listarColonias(event.target.value);

    });

    cboColonia.addEventListener("change",(event)=>{

    });

};


window.addEventListener("load", async () => {
    await cargaInicial();
});