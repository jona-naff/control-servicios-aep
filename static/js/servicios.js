function generarPdf(cliente_id, tipo_id, valuador_id, estatus_id, estadoid, coloniaid) {
    try{
        const response=fetch("./avaluos/generar_pdf/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estadoid + '/' + coloniaid);
        
    }catch(error){
        console.log(error);
    }   
     
};

const mostrarTabla = async (cliente_id, tipo_id, valuador_id, estatus_id, estadoid, coloniaid) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estadoid + '/' + coloniaid);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.avaluos.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.id}">`;
                opciones+=`<td>${avaluo.id}</td>`;//<input type="checkbox" id="${avaluo.avaluoid}"></input>
                opciones+=`<td>${avaluo.ubicacion}</td>`;
                opciones+=`<td>Fecha de solicitud : ${avaluo.dtsolicitud} <br> Fecha de valuador : ${avaluo.dtvaluador}</td>`;
                opciones+=`<td>${avaluo.cliente}</td>`;
                opciones+=`<td>${avaluo.valuador}</td>`;
                opciones+=`<td>${avaluo.estatus}</td>`;
                opciones+=`</tr>`;
            });
            cboTabla.innerHTML = opciones;
            
        }else{
            alert("Avaluo no encontrado");
            let opciones=``;
            cboTabla.innerHTML = opciones;
        }
    }catch(error){
        console.log(error);
    }   
     
};


const mostrarTabla_porfechas = async (dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final) => {
    try{
        const response=await fetch("./avaluos/"+ dtsolicitud_inicial + '/' + dtsolicitud_final + '/' + dtcliente_inicial + '/' + dtcliente_final + '/' + dtvaluador_inicial + '/' + dtvaluador_final + '/' + dtcobro_inicial + '/' + dtcobro_final);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.avaluos.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.id}">`;
                opciones+=`<td>${avaluo.id}</td>`;//<input type="checkbox" id="${avaluo.avaluoid}"></input>
                opciones+=`<td>${avaluo.ubicacion}</td>`;
                opciones+=`<td>Fecha de solicitud : ${avaluo.dtsolicitud} <br> Fecha de valuador : ${avaluo.dtvaluador}</td>`;
                opciones+=`<td>${avaluo.cliente}</td>`;
                opciones+=`<td>${avaluo.valuador}</td>`;
                opciones+=`<td>${avaluo.estatus}</td>`;
                opciones+=`</tr>`;
            });
            cboTabla.innerHTML = opciones;
            
        }else{
            alert("Avaluo no encontrado");
            let opciones=``;
            cboTabla.innerHTML = opciones;
        }
    }catch(error){
        console.log(error);
    }   
     
};


const mostrarTabla_Inicial = async () => {
    try{
        const response=await fetch("./avaluos/");
        const data =await response.json();

        if(data.message=="Success"){
            let opciones=``;
            data.avaluos.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.id}">`;
                opciones+=`<td>${avaluo.id}</td>`;//<input type="checkbox" id="${avaluo.avaluoid}"></input>
                opciones+=`<td>${avaluo.ubicacion}</td>`;
                opciones+=`<td>Fecha de solicitud : ${avaluo.dtsolicitud} <br> Fecha de valuador : ${avaluo.dtvaluador}</td>`;
                opciones+=`<td>${avaluo.cliente}</td>`;
                opciones+=`<td>${avaluo.valuador}</td>`;
                opciones+=`<td>${avaluo.estatus}</td>`;
                opciones+=`</tr>`;
            });
            cboTabla.innerHTML = opciones;
            
        }else{
            alert("Avaluo no encontrado");
            let opciones=``;
            cboTabla.innerHTML = opciones;
        }
    }catch(error){
        console.log(error);
    }   
     
};


const listarClientes=async()=>{
    try{
        const response=await fetch("./clientes");
        const data=await response.json();

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
let parametros = {"cliente_id":0, "tipo_id":0, "valuador_id":0, "estatus_id":0, "estadoid":0,"coloniaid":0};
let parametros_fechas  = {"dtsolicitud_inicial":'0000-00-00', "dtsolicitud_final":'0000-00-00', "dtcliente_inicial":'0000-00-00', "dtcliente_final":'0000-00-00', "dtvaluador_inicial":'0000-00-00', "dtvaluador_final":'0000-00-00', "dtcobro_inicial":'0000-00-00', "dtcobro_final":'0000-00-00'};

const cargaInicial=async()=>{
    await listarClientes();
    await listarTipos();
    await listarValuadores();
    await listarEstatus();
    await listarEstados();
    await mostrarTabla_Inicial();

    cboCliente.addEventListener("change",(event)=>{
        parametros.cliente_id = event.target.value
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estadoid,parametros.coloniaid);
    });

    cboTipo.addEventListener("change",(event)=>{
        parametros.tipo_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estadoid,parametros.coloniaid);
    });

    cboValuador.addEventListener("change",(event)=>{
        parametros.valuador_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estadoid,parametros.coloniaid);
    });

    cboEstatus.addEventListener("change",(event)=>{
        parametros.estatus_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estadoid,parametros.coloniaid);
    });

    cboEstado.addEventListener("change",(event)=>{
        console.log(event.target.value);
        parametros.estadoid = event.target.value;
        
        listarMunicipios(event.target.value);
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estadoid,parametros.coloniaid);

    });

    cboMunicipio.addEventListener("change",(event)=>{
        listarColonias(event.target.value);
    });

    cboColonia.addEventListener("change",(event)=>{
        parametros.coloniaid = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estadoid,parametros.coloniaid);
    });
    document.getElementById('generar_fichas').addEventListener('click', function() {
        // Construct the URL based on parameters
        var url = parametros.cliente_id + '/' + parametros.tipo_id + '/' + parametros.valuador_id + '/' + parametros.estatus_id + '/' ;
        url += parametros.estadoid + '/' +  parametros.coloniaid;
        var redirectUrl = 'http://127.0.0.1:8000/servicios/avaluos/generar_pdf/' + url;

        // Redirect to the constructed URL
        console.log(redirectUrl);
        window.location.href = redirectUrl;
    });
    

};


window.addEventListener("load", async () => {
    await cargaInicial();
});

