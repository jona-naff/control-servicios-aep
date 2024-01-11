

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


const listarTipos = async () =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/tipos";
        const response=await fetch(baseUrl+endpoint);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            opciones += ``
            data.tipos.forEach((tipo)=>{
                opciones+=`<option value='${tipo.tipoid}'>${tipo.display}</option>`;
            });
            opciones+=`</select>`
            id_tipo.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};


const listarClientes = async () =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/clientes";
        const response=await fetch(baseUrl+endpoint);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            opciones += ``
            data.clientes.forEach((cliente)=>{
                opciones+=`<option value='${cliente.clienteid}'>${cliente.nombre}</option>`;
            });
            opciones+=`</select>`
            id_cliente.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};


const listarValuadores = async () =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/valuadores";
        const response=await fetch(baseUrl+endpoint);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            opciones += ``
            data.valuadores.forEach((valuador)=>{
                opciones+=`<option value='${valuador.valuadorid}'>${valuador.display}</option>`;
            });
            opciones+=`</select>`
            id_valuador.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};



const listarEstatus = async () =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/estatus";
        const response=await fetch(baseUrl+endpoint);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            opciones += ``;
            data.estatus.forEach((estatu)=>{
                opciones+=`<option value='${estatu.estatusid}'>${estatu.nombre}</option>`;
            });
            opciones+=`</select>`
            id_estatus.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};




const listarTiposImb = async () =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/tiposimb";
        const response=await fetch(baseUrl+endpoint);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            opciones += ``
            data.tiposimb.forEach((tipoimb)=>{
                opciones+=`<option value='${tipoimb.tipoimbid}'>${tipoimb.nombre}</option>`;
            });
            opciones+=`</select>`
            id_tipoimb.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};


const mostrarDictamen = async (tipoid) =>{
    try{
        const baseUrl = "http://127.0.0.1:8000";
        const endpoint = "/servicios/tipobyid/"+tipoid;
        const response=await fetch(baseUrl+endpoint);
        const data =await response.json();
        console.log(data);
        if(data.message=="Success"){
            
            let opciones1=``;
            let opciones2=``;
            if(data.tipo != "OV"  &&  data.tipo != "AV" ){
            opciones1+=`Número de dictamen`
            opciones1+=`<input type="text" name="dictamen" maxlength="100" id="id_dictamen">`;
            opciones2+=`Nombre del proyecto`
            opciones2+=`<input type="text" name="proyecto" maxlength="200" id="id_proyecto">`;
            tipodictamen.innerHTML = opciones1;
            tipoproyecto.innerHTML = opciones2;
            }else{
            opciones1+=``
            opciones2+=``
            tipodictamen.innerHTML = opciones1;
            tipoproyecto.innerHTML = opciones2;
            }
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};


const cargaInicial=async()=>{

    await listarEstados();

    await listarTipos();

    await listarClientes();

    await listarValuadores();

    await listarEstatus();

    await listarTiposImb();

    cboEstado.addEventListener("change",(event)=>{
        listarMunicipios(event.target.value);

    });

    cboMunicipio.addEventListener("change",(event)=>{
        listarColonias(event.target.value);

    });

    id_tipo.addEventListener("change",(event)=>{
        console.log(event)
        mostrarDictamen(event.target.value)
    });

    
};


window.addEventListener("load", async () => {
    await cargaInicial();
});

    

