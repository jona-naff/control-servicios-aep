const mostrarTabla = async (cliente_id, tipo_id, valuador_id, estatus_id,coloniaid) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + coloniaid);
        const data =await response.json();
        console.log(data);
        if(data.message=="Success"){
            let opciones=``;
            data.avaluos.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.avaluoid}">`;
                opciones+=`<td><input type="checkbox" id="${avaluo.avaluoid}"></input></td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.ubicacion}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.fechas}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.cliente}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.valuador}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.estatus}</td>`;
                opciones+=`</tr>`;
            });
            cboTabla.innerHTML = opciones;
            
        }else{
            alert("Avaluo no encontrado");
        }
    }catch(error){
        console.log(error);
    }   
     
};

let dataTable;
let dataTableIsInitialized;
const initDataTable=async()=>{

    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await mostrarTabla_Inicial();

    dataTable=$('#cboTabla').DataTable({});
    console.log(dataTable);
    dataTableIsInitialized = true;
};

const mostrarTabla_Inicial = async () => {
    try{
        const response=await fetch("./avaluos/");
        const data =await response.json();
        console.log(data);

        if(data.message=="Success"){
            let opciones=``;
            data.avaluos.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.avaluoid}">`;
                opciones+=`<td><input type="checkbox" id="${avaluo.avaluoid}"></input></td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.ubicacion}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.fechas}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.cliente}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.valuador}</td>`;
                opciones+=`<td value="${avaluo.avaluoid}">${avaluo.estatus}</td>`;
                opciones+=`</tr>`;
            });
            cboTabla.innerHTML = opciones;
            
        }else{
            alert("Avaluo no encontrado");
        }
    }catch(error){
        console.log(error);
    }   
     
};

const listarClientes=async()=>{
    try{
        const response=await fetch("./clientes");
        const data=await response.json();
        console.log(data);

        if(data.message=="Success"){
            let opciones=``;
            data.clientes.forEach((cliente)=>{
                opciones+=`<option value='${cliente.clienteid}'>${cliente.nombre}</option>`;
            });
            cboCliente.innerHTML = opciones;
            
        }else{
            alert("Clientes no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};


const listarTipos=async()=>{
    try{
        const response=await fetch("./tipos");
        const data=await response.json();
        console.log(data);

        if(data.message=="Success"){
            let opciones=``;
            data.tipos.forEach((tipo)=>{
                opciones+=`<option value='${tipo.tipoid}'>${tipo.display}</option>`;
            });
            cboTipo.innerHTML = opciones;
            
        }else{
            alert("Estados no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};


const listarValuadores=async()=>{
    try{
        const response=await fetch("./valuadores");
        const data=await response.json();
        console.log(data);
        
        if(data.message=="Success"){
            let opciones=``;
            data.valuadores.forEach((valuador)=>{
                opciones+=`<option value='${valuador.valuadorid}'>${valuador.display}</option>`;
            });
            cboValuador.innerHTML = opciones;
            
        }else{
            alert("Valuadores no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};

const listarEstatus=async()=>{
    try{
        const response=await fetch("./estatus");
        const data=await response.json();
        console.log(data);
        
        if(data.message=="Success"){
            let opciones=``;
            data.estatus.forEach((estatu)=>{
                opciones+=`<option value='${estatu.estatusid}'>${estatu.nombre}</option>`;
            });
            cboEstatus.innerHTML = opciones;
            
        }else{
            alert("Estatus no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};


const listarColonias = async (municipioid) =>{
    try{
        const response=await fetch("./colonias/"+municipioid);
        const data =await response.json();
        console.log(data);
        
        if(data.message=="Success"){
            let opciones=``;
            data.colonias.forEach((colonia)=>{
                opciones+=`<option value='${colonia.coloniaid}'>${colonia.nombre}</option>`;
            });
            cboColonia.innerHTML = opciones;
        }else{
            alert("Colonias no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};

const listarMunicipios = async (estadoid) =>{
    try{
        const response=await fetch("./municipios/"+estadoid);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.municipios.forEach((municipio)=>{
                opciones+=`<option value='${municipio.municipioid}'>${municipio.nombre}</option>`;
            });
            cboMunicipio.innerHTML = opciones;
            listarColonias(data.municipios[0].municipioid);
        }else{
            alert("Municipios no encontrados");
        }
    }catch(error){
        console.log(error);
    }   
};

const listarEstados=async()=>{
    try{
        const response=await fetch("./estados");
        const data=await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            data.estados.forEach((estado)=>{
                opciones+=`<option value='${estado.estadoid}'>${estado.nombre}</option>`;
            });
            cboEstado.innerHTML = opciones;
            listarMunicipios(data.estados[0].estadoid);
            
        }else{
            alert("Estados no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};

//let parametros_sec = {"cliente_id":0, "tipo_id":0, "valuador_id":0, "estatus_id":0, "coloniaid":0}
let parametros = {"cliente_id":0, "tipo_id":0, "valuador_id":0, "estatus_id":0, "coloniaid":0};
const cargaInicial=async()=>{
    await listarClientes();
    await listarTipos();
    await listarValuadores();
    await listarEstatus();
    await listarEstados();
    await mostrarTabla_Inicial();

    cboCliente.addEventListener("change",(event)=>{
        parametros.cliente_id = event.target.value
        console.log(parametros);
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.coloniaid);
    });

    cboTipo.addEventListener("change",(event)=>{
        parametros.tipo_id = event.target.value
        console.log(parametros);

        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.coloniaid);
    });

    cboValuador.addEventListener("change",(event)=>{
        parametros.valuador_id = event.target.value
        console.log(parametros);

        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.coloniaid);
    });

    cboEstatus.addEventListener("change",(event)=>{
        parametros.estatus_id = event.target.value
        console.log(parametros);

        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.coloniaid);
    });

    cboEstado.addEventListener("change",(event)=>{
        listarMunicipios(event.target.value);
    });

    cboMunicipio.addEventListener("change",(event)=>{
        listarColonias(event.target.value);
    });

    cboColonia.addEventListener("change",(event)=>{
        parametros.coloniaid = event.target.value
        console.log(parametros);

        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.coloniaid);
    });
};


window.addEventListener("load", async () => {
    await cargaInicial();
});

