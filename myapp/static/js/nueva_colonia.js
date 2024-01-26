const baseUrl = "http://127.0.0.1:8000";

const listarMunicipios = async (estado_id) =>{
    try{
        const endpoint = "/servicios/municipios/";
        const response=await fetch(baseUrl+endpoint+estado_id);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.municipios.forEach((municipio)=>{
                opciones+=`<option value='${municipio.municipio_id}'>${municipio.nombre}</option>`;
            });
            id_municipio.innerHTML = opciones;
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



const cargaInicial=async()=>{

    await listarEstados();

    cboEstado.addEventListener("change",(event)=>{
        listarMunicipios(event.target.value);

    });

    id_municipio.addEventListener("change",(event)=>{
        listarColonias(event.target.value);

    });


};


window.addEventListener("load", async () => {
    await cargaInicial();
});