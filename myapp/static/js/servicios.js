const baseUrl = "http://127.0.0.1:8000";

const cantidadPaginas = async (cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id, dtcreate_inicial, dtcreate_final,dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final,dtpago_inicial, dtpago_final) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estado_id + '/' + municipio_id + '/' + colonia_id + '/' + dtcreate_inicial + '/' + dtcreate_final + '/' + dtsolicitud_inicial + '/' + dtsolicitud_final + '/' + dtcliente_inicial + '/' + dtcliente_final + '/' + dtvaluador_inicial + '/' + dtvaluador_final + '/' + dtcobro_inicial + '/' + dtcobro_final + '/' + dtpago_inicial + '/' + dtpago_final);
        const data =await response.json();

        if(data.message=="Success"){
            
            const given = [cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id,dtcreate_inicial, dtcreate_final,dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final,dtpago_inicial, dtpago_final];

            if (given.every(element => element === 0)){
                return 0;
            }else{
                const numero_paginas = data.num_pags;
                console.log(data.num_pags);
                $('#prueba-pag').val(numero_paginas);
            }
        }else{
            return 0;
        }
    }catch(error){
        console.log(error);
    }   
     
};



const hideLiElements = (num_pags) => {
    // Get elements by class name
    const liElements = document.getElementsByClassName("page-item");

    // Iterate through each li element
    for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];

        // Extract the numeric part from the id
        const idSuffix = li.id.match(/\d+$/); // Extracts numeric part from the end of the id
        const id = idSuffix ? parseInt(idSuffix[0]) : NaN; // Convert to number or NaN if no numeric part found

        // Check if the id is greater than num_pags
        if (!isNaN(id) && id > num_pags) {
            // Hide the li element
            li.style.display = "none";
        } else {
            // Show the li element (in case it was previously hidden)
            li.style.display = "list-item";
        }
    }
};



const mostrarTabla = async (cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id, dtcreate_inicial, dtcreate_final,dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final,dtpago_inicial, dtpago_final,pag) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estado_id + '/' + municipio_id + '/' + colonia_id + '/' + dtcreate_inicial + '/' + dtcreate_final + '/' + dtsolicitud_inicial + '/' + dtsolicitud_final + '/' + dtcliente_inicial + '/' + dtcliente_final + '/' + dtvaluador_inicial + '/' + dtvaluador_final + '/' + dtcobro_inicial + '/' + dtcobro_final + '/' + dtpago_inicial + '/' + dtpago_final);
        const data =await response.json();
        
        if(data.message=="Success"){
            
            let opciones=`<thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Ubicación</th>
                                    <th>Fechas</th>
                                    <th>Cliente</th>
                                    <th>Estatus</th>
                                    <th>Folio</th>
                                </tr>
                            </thead>
                            <tbody>`;

            if (pag === "Primera") {
                range = data.avaluos.slice(0, 40);
            }else if (pag === "Ultima") {
                const ver_pag = data.num_pags;
                range = data.avaluos.slice((ver_pag - 1) * 40, ver_pag * 40);
            }else if (data.num_pags<=pag) {
                const ver_pag = data.num_pags;
                range = data.avaluos.slice((ver_pag - 1) * 40, ver_pag * 40);
            }else if (pag<=0) {
                range = data.avaluos.slice(0,40);
            }else if (pag === "Penultima"){
                const ver_pag = data.num_pags - 1
                range = data.avaluos.slice((ver_pag - 1) * 40, ver_pag * 40);
            }else {
                var range = data.avaluos.slice((pag - 1) * 40, pag * 40);
            }
            range.forEach((avaluo)=>{
                let dtcrt = `${avaluo.dtcreate}`;
                let folio = `${avaluo.tipo}-${avaluo.cliente} / ` + dtcrt.slice(5,7) + `-` + dtcrt.slice(2,4) + `<br> / ${avaluo.consecutivo} - ${avaluo.valuador}`;
                let dtcrte = dtcrt.slice(8,10) + '/' + dtcrt.slice(5,7) + '/' + dtcrt.slice(0,4);
                let dtsol = `${avaluo.dtsolicitud}`;
                if ((dtsol === 'None') || (dtsol === "0000-00-00")){
                    dtsol = `No disponible`;
                } else {
                dtsol = dtsol.slice(8,10) + '/' + dtsol.slice(5,7) + '/' + dtsol.slice(0,4);
                }
                let dtval = `${avaluo.dtvaluador}`;
                if ((dtval === 'None') || (dtval === "0000-00-00")) {
                    dtval = `No disponible`;
                } else {
                dtval = dtval.slice(8,10) + '/' + dtval.slice(5,7) + '/' + dtval.slice(0,4);
                }
                let dtclt = `${avaluo.dtcliente}`;
                if ((dtclt === 'None') || (dtclt === "0000-00-00")) {
                    dtclt = `No disponible`;
                } else {
                dtclt = dtclt.slice(8,10) + '/' + dtclt.slice(5,7) + '/' + dtclt.slice(0,4);
                }
                let dtcbr = `${avaluo.dtcobro}`;
                if ((dtcbr === 'None') || (dtcbr === "0000-00-00")) {
                    dtcbr = `No disponible`;
                } else {
                dtcbr = dtcbr.slice(8,10) + '/' + dtcbr.slice(5,7) + '/' + dtcbr.slice(0,4);
                }
                let dtpgo = `${avaluo.dtpago}`;
                if ((dtpgo === 'None') || (dtpgo === "0000-00-00")) {
                    dtpgo = `No disponible`;
                } else {
                dtpgo = dtpgo.slice(8,10) + '/' + dtpgo.slice(5,7) + '/' + dtpgo.slice(0,4);
                }
                let html_dict = ``;
                let html_proy = ``;
                let tipo = `${avaluo.tipo}`;
                let dict = `${avaluo.dictamen}`;
                let proy = `${avaluo.proyecto}`;
                let lote = `${avaluo.lote}`;
                let manzana = `${avaluo.manzana}`;
                if(dict != "" && dict != "Undefined"){
                    html_dict+=`<br> Dictamen: ${avaluo.dictamen} `;
                   }
                if(proy != "" && proy != "Undefined"){
                html_proy+=`<br> Proyecto: ${avaluo.proyecto} </td>`;
                }
                if(lote != "" && lote != "Undefined"){
                    lote = `Lote: ` + `${avaluo.lote}`; 
                }else{
                    lote = ``;
                }
                if(manzana != "" && manzana != "Undefined"){
                    manzana = `Manzana: ` + `${avaluo.manzana}`; 
                }
                
                opciones+=`<tr value="${avaluo.id}">`;
                opciones+=`<td>${avaluo.id}</td>`;
                opciones+=`<td> ${avaluo.estado}, <br> ${avaluo.municipio}, <br> ${avaluo.colonia}, <br> ${avaluo.calle} ${avaluo.numero}, <br> ` + lote + `<br>` + manzana + ` </td>`;
                opciones+=`<td>Fecha de alta: `+ ` `+ dtcrte + `<br> Fecha de solicitud: `+ ` ` + dtsol + `  <br> Fecha de valuador: `+ ` ` + dtval+ `<br> Entrega cliente: `+ ` ` + dtclt+ ` <br> Fecha de cobro: `+ ` ` + dtcbr +`<br> Fecha de pago:  ` +` ` +dtcbr+` </td>`;
                opciones+=`<td>${avaluo.cliente}</td>`;
                opciones+=`<td>${avaluo.estatus}</td>`;
                opciones+=`<td>` + folio +  html_dict + html_proy;
                opciones+=`<td></tr><div sytle="display: flex; align-items: center; justify-content: center;"><a class="nav-link" href="/servicios/avaluo/${avaluo.id}">Detalle</a></div></td>`;
                opciones+=`</tbody>`;
            });
            const given = [cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id];
            const given_date = [dtcreate_inicial, dtcreate_final,dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final, dtpago_inicial, dtpago_final];
            
            

            if (given.every(element => element === 0) && given_date.every(element => element === '0000-00-00')){
                
                $('.PagGeneral').hide();
                //$('#cboTabla').hide();
                let alternativa = ``;
                cboTabla.innerHTML = alternativa;
            }else{
            
            $('.PagGeneral').show();
            //$('#cboTabla').show();
            cboTabla.innerHTML = opciones;

            let limit = data.num_pags;

            if((pag <= 1) || (pag === "Primera")){
                for (let i = 1; i <= data.num_pags+1; i++) {
                    let loc_pag = String(i);
                    $('#numpag'+loc_pag).removeClass().addClass('page-item');
                    } 
                $('#cboPags'+String(limit)).removeClass().addClass('page-link');
                $('#cboPags1').removeClass().addClass('page-link disabled');
                $('#cboPagsPrimera').removeClass().addClass('page-link disabled');
                $('#cboPagsAnterior').removeClass().addClass('page-link disabled');
                $('#cboPagsUltima, #cboPagsSiguiente').removeClass().addClass('page-link');

            }else if ((limit<=pag) || (pag === "Ultima")){
                for (let i = 1; i <= data.num_pags+1; i++) {
                    let loc_pag = String(i);
                    $('#numpag'+loc_pag).removeClass().addClass('page-item');
                    } 
                $('#cboPags'+String(limit)).removeClass().addClass('page-link disabled');
                $('#cboPags1').removeClass().addClass('page-link');

                $('#cboPagsUltima, #cboPagsSiguiente').removeClass().addClass('page-link disabled');
                $('#cboPagsPrimera, #cboPagsAnterior').removeClass().addClass('page-link');

            }else if (pag === "Penultima") {
                for (let i = 1; i <= data.num_pags+1; i++) {
                    let loc_pag = String(i);
                    $('#numpag'+loc_pag).removeClass().addClass('page-item');
                    } 
                var penult = limit -1; 
                penult = String(penult);
                $('#numpag'+ penult).removeClass().addClass('page-item active');

            }else {
                let current_pag = String(pag);
                for (let i = 1; i <= data.num_pags+1; i++) {
                    let loc_pag = String(i);
                    $('#numpag'+loc_pag).removeClass().addClass('page-item');
                    } 
                $('#numpag'+current_pag).removeClass().addClass('page-item active');
                $('#cboPags1').removeClass().addClass('page-link');
                $('#cboPags'+String(limit)).removeClass().addClass('page-link');
                $('#cboPagsPrimera, #cboPagsAnterior').removeClass().addClass('page-link');
                $('#cboPagsUltima, #cboPagsSiguiente').removeClass().addClass('page-link');
            }
            for (let i = 1; i <= data.num_pags_tot+1; i++) {
                ind = String(i);
                loc_id = '#numpag'+ind;
                $(loc_id).show();
                } 
            for (let i = data.num_pags + 1; i <= data.num_pags_tot; i++) {
                ind = String(i);
                loc_id = '#numpag'+ind;
                $(loc_id).hide();
                } 
            
            }
            
        }else{
            alert("Avaluo no encontrado");
            let alternativa=`Ingrese un filtro de búsqueda`;
            cboTabla.innerHTML = alternativa;
        }
    }catch(error){
        console.log(error);
    }   
     
};


const mostrarTabla_porfechas = async (dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final) => {
    try{
        const response=await fetch("./avaluos/bydate/"+ dtsolicitud_inicial + '/' + dtsolicitud_final + '/' + dtcliente_inicial + '/' + dtcliente_final + '/' + dtvaluador_inicial + '/' + dtvaluador_final + '/' + dtcobro_inicial + '/' + dtcobro_final);
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



const mostrarTabla_Inicial = async (cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id, dtcreate_inicial, dtcreate_final,dtsolicitud_inicial, dtsolicitud_final, dtcliente_inicial, dtcliente_final, dtvaluador_inicial, dtvaluador_final, dtcobro_inicial, dtcobro_final,dtpago_inicial, dtpago_final,pag) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estado_id + '/' + municipio_id + '/' + colonia_id + '/' + dtcreate_inicial + '/' + dtcreate_final + '/' + dtsolicitud_inicial + '/' + dtsolicitud_final + '/' + dtcliente_inicial + '/' + dtcliente_final + '/' + dtvaluador_inicial + '/' + dtvaluador_final + '/' + dtcobro_inicial + '/' + dtcobro_final + '/' + dtpago_inicial + '/' + dtpago_final);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=`<thead>
                            <tr>
                                <th>Id</th>
                                <th>Ubicación</th>
                                <th>Fechas</th>
                                <th>Cliente</th>
                                <th>Valuador</th>
                                <th>Estatus</th>
                            </tr>
                        </thead>
                        <tbody >`;
            const range = data.avaluos.slice((pag - 1) * 40, pag * 40);
            range.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.id}">`;
                opciones+=`<td>${avaluo.id}</td>`;//<input type="checkbox" id="${avaluo.avaluoid}"></input>
                opciones+=`<td>${avaluo.ubicacion}</td>`;
                opciones+=`<td>Fecha de solicitud : ${avaluo.dtsolicitud} <br> Fecha de valuador : ${avaluo.dtvaluador}</td>`;
                opciones+=`<td>${avaluo.cliente}</td>`;
                opciones+=`<td>${avaluo.valuador}</td>`;
                opciones+=`<td>${avaluo.estatus}</td>`;
                opciones+=`</tr>`;
            });
            opciones+=`</tbody>`;
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

const Paginacion=async()=>{
    try{
        const response=await fetch("./avaluos/");
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=`<thead>
                            <tr>
                                <th>Id</th>
                                <th>Ubicación</th>
                                <th>Fechas</th>
                                <th>Cliente</th>
                                <th>Valuador</th>
                                <th>Estatus</th>
                            </tr>
                        </thead>
                        <tbody >`;
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
            opciones+=`</tbody>`;
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


const listarColonias = async (municipio_id) =>{
    try{
        const response=await fetch("./colonias/"+municipio_id);
        const data =await response.json();
        
        if(data.message=="Success"){
            let opciones=``;
            data.colonias.forEach((colonia)=>{
                opciones+=`<option value='${colonia.colonia_id}'>${colonia.nombre}</option>`;
            });
            cboColonia.innerHTML = opciones;
        }else{
            alert("Colonias no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};

const listarMunicipios = async (estado_id) =>{
    try{
        const response=await fetch("./municipios/"+estado_id);
        const data =await response.json();
        if(data.message=="Success"){
            let opciones=``;
            data.municipios.forEach((municipio)=>{
                opciones+=`<option value='${municipio.municipio_id}'>${municipio.nombre}</option>`;
            });
            cboMunicipio.innerHTML = opciones;
            listarColonias(data.municipios[0].municipio_id);
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
                opciones+=`<option value='${estado.estado_id}'>${estado.nombre}</option>`;
            });
            cboEstado.innerHTML = opciones;
            listarMunicipios(data.estados[0].estado_id);
            
        }else{
            alert("Estados no encontrados");
        }
    }catch(error){
        console.log(error);
    }
};

//let parametros_sec = {"cliente_id":0, "tipo_id":0, "valuador_id":0, "estatus_id":0, "coloniaid":0}
let parametros = {"cliente_id":0, 
                  "tipo_id":0, 
                  "valuador_id":0, 
                  "estatus_id":0, 
                  "estado_id":0,
                  "municipio_id":0,
                  "colonia_id":0,
                  "dtcreate_inicial":'0000-00-00', 
                  "dtcreate_final":'0000-00-00', 
                  "dtsolicitud_inicial":'0000-00-00', 
                  "dtsolicitud_final":'0000-00-00', 
                  "dtcliente_inicial":'0000-00-00', 
                  "dtcliente_final":'0000-00-00', 
                  "dtvaluador_inicial":'0000-00-00', 
                  "dtvaluador_final":'0000-00-00', 
                  "dtcobro_inicial":'0000-00-00', 
                  "dtcobro_final":'0000-00-00',
                  "dtpago_inicial":'0000-00-00', 
                  "dtpago_final":'0000-00-00',
                };


let pag = 1;

const cargaInicial=async()=>{
    await listarClientes();
    await listarTipos();
    await listarValuadores();
    await listarEstatus();
    await listarEstados();

    cboCliente.addEventListener("change",(event)=>{
        parametros.cliente_id = event.target.value
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);
    });

    cboTipo.addEventListener("change",(event)=>{
        parametros.tipo_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);
    });

    cboValuador.addEventListener("change",(event)=>{
        parametros.valuador_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);
    });

    cboEstatus.addEventListener("change",(event)=>{
        parametros.estatus_id = event.target.value;
        
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);
    });

    cboEstado.addEventListener("change",(event)=>{
        parametros.estado_id = parseInt(event.target.value);
        listarMunicipios(event.target.value);
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);

    });

    cboMunicipio.addEventListener("change",(event)=>{
        parametros.municipio_id = event.target.value;
        listarColonias(event.target.value);
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);

    });

    cboColonia.addEventListener("change",(event)=>{
        parametros.colonia_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);
        
    });



    /*document.getElementById('GeneratePDFView').addEventListener('click', function() {
        // Construct the URL based on parameters
        var url = parametros.cliente_id + '/' + parametros.tipo_id + '/' + parametros.valuador_id + '/' + parametros.estatus_id + '/' ;
        url += parametros.estado_id + '/' + parametros.municipio_id + '/' +  parametros.colonia_id  + '/' + parametros.dtcreate_inicial + '/' + parametros.dtcreate_final + '/' + parametros.dtsolicitud_inicial + '/' + parametros.dtsolicitud_final + '/' +  parametros.dtcliente_inicial + '/' + parametros.dtcliente_final + '/' + parametros.dtvaluador_inicial + '/' + parametros.dtvaluador_final + '/' + parametros.dtcobro_inicial + '/' + parametros.dtcobro_final + '/' + parametros.dtpago_inicial + '/' + parametros.dtpago_final;
        var redirectUrl = 'http://127.0.0.1:8000/servicios/avaluos/generar_pdf/' + url;

        // Redirect to the constructed URL
        console.log(redirectUrl);
        window.location.href = redirectUrl;
    });

    
    document.getElementById('generar_excel').addEventListener('click', function() {
        // Construct the URL based on parameters
        var url = parametros.cliente_id + '/' + parametros.tipo_id + '/' + parametros.valuador_id + '/' + parametros.estatus_id + '/' ;
        url += parametros.estado_id + '/' + parametros.municipio_id + '/' +  parametros.colonia_id  + '/' + parametros.dtcreate_inicial + '/' + parametros.dtcreate_final + '/' + parametros.dtsolicitud_inicial + '/' + parametros.dtsolicitud_final + '/' +  parametros.dtcliente_inicial + '/' + parametros.dtcliente_final + '/' + parametros.dtvaluador_inicial + '/' + parametros.dtvaluador_final + '/' + parametros.dtcobro_inicial + '/' + parametros.dtcobro_final + '/' + parametros.dtpago_inicial + '/' + parametros.dtpago_final;
        
        var redirectUrl = 'http://127.0.0.1:8000/servicios/avaluos/generar_excel/' + url;

        // Redirect to the constructed URL
        window.location.href = redirectUrl;
    });*/
   

};




window.addEventListener("load", async () => {
    await cargaInicial();

    
});



function firstDay(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    //return [year, month, day].join('-');
    return [year, month, '01'].join('-');
}



$(document).ready(function() {
    let primer_dia = new Date();
    parametros.dtcreate_inicial = firstDay(primer_dia);
    mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,pag);
    
    $('#GeneratePDFView').on('click',function(e) {
        // Prevent the default behavior of the link
        e.preventDefault();
        
        var url = parametros.cliente_id + '/' + parametros.tipo_id + '/' + parametros.valuador_id + '/' + parametros.estatus_id + '/' ;
        url += parametros.estado_id + '/' + parametros.municipio_id + '/' +  parametros.colonia_id  + '/' + parametros.dtcreate_inicial + '/' + parametros.dtcreate_final + '/' + parametros.dtsolicitud_inicial + '/' + parametros.dtsolicitud_final + '/' +  parametros.dtcliente_inicial + '/' + parametros.dtcliente_final + '/' + parametros.dtvaluador_inicial + '/' + parametros.dtvaluador_final + '/' + parametros.dtcobro_inicial + '/' + parametros.dtcobro_final + '/' + parametros.dtpago_inicial + '/' + parametros.dtpago_final;
        var redirectUrl = baseUrl+'/servicios/avaluos/generar_pdf/' + url;

        // Redirect to the constructed URL
    
        window.location.href = redirectUrl;
      });    

      $('#generar_excel').on('click',function(e) {
        // Prevent the default behavior of the link
        e.preventDefault();

        var url = parametros.cliente_id + '/' + parametros.tipo_id + '/' + parametros.valuador_id + '/' + parametros.estatus_id + '/' ;
        url += parametros.estado_id + '/' + parametros.municipio_id + '/' +  parametros.colonia_id  + '/' + parametros.dtcreate_inicial + '/' + parametros.dtcreate_final + '/' + parametros.dtsolicitud_inicial + '/' + parametros.dtsolicitud_final + '/' +  parametros.dtcliente_inicial + '/' + parametros.dtcliente_final + '/' + parametros.dtvaluador_inicial + '/' + parametros.dtvaluador_final + '/' + parametros.dtcobro_inicial + '/' + parametros.dtcobro_final + '/' + parametros.dtpago_inicial + '/' + parametros.dtpago_final;
        var redirectUrl = baseUrl+'/servicios/avaluos/generar_excel/' + url;

        // Redirect to the constructed URL
        window.location.href = redirectUrl;
      });    
    
    var nextpag = 2;
    var prevpag = 1;
    var nextElementId = 1;
    var indicador = 0;
    $('.page-link').on('click', function(e) {
        e.preventDefault(); // Prevent the default behavior of the link

        // Get the id of the clicked link
        var clickedLinkId = $(this).attr('id');
        
        // Find the next element with the same class
        var prevElementId = $(this).parent().prev('.page-item').find('.page-link').attr('id');

        

        // Output the results to the console (you can modify this part based on your needs)
        clickedLinkId = clickedLinkId.slice(7);
        /*if ((clickedLinkId != "Ultima")){
        nextElementId = nextElementId.slice(7);
            } 
        if ((clickedLinkId != "Primera")){
            prevElementId = prevElementId.slice(7);
                } */
        
        

    
        if (Number.isInteger(parseInt(clickedLinkId))){
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,parseInt(clickedLinkId));

        pag = parseInt(clickedLinkId);
        nextpag = parseInt(clickedLinkId) + 1;
        prevpag = parseInt(clickedLinkId) - 1;
            }else if (clickedLinkId == "Siguiente") {
        //nextpag += 1;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,nextpag);
        prevpag = nextpag-1;
        nextpag += 1;

            }else if (clickedLinkId == "Anterior") {
                //
                //console.log(prevpag);
                if(indicador === 1){
                    //console.log(indicador);
                    indicador = 0;
                    mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,"Penultima");
                    

                    //let prueba = prevpag.then(callback);
                   // console.log("El num : " + $('#prueba-pag').val());
                    prevpag = parseInt($('#prueba-pag').val());
                    prevpag = prevpag-2;

                }else{
                mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,prevpag);
               
                nextpag = prevpag + 1;
                prevpag = prevpag - 1;
                }
        
            }else if (clickedLinkId == "Ultima") {
                indicador = 1;
                mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,"Ultima");
                
        
                }else if (clickedLinkId == "Primera") {
                    nextpag=2;
                    mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,parametros.dtcreate_inicial,parametros.dtcreate_final,parametros.dtsolicitud_inicial,parametros.dtsolicitud_final,parametros.dtcliente_inicial,parametros.dtcliente_final,parametros.dtvaluador_inicial,parametros.dtvaluador_final,parametros.dtcobro_inicial,parametros.dtcobro_final,parametros.dtpago_inicial,parametros.dtpago_final,1);
            
            }
    
        
       
     
        
    });

});