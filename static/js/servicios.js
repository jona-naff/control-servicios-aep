const cantidadPaginas = async (cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id,pag) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estado_id + '/' + municipio_id + '/' + colonia_id);
        const data =await response.json();

        if(data.message=="Success"){
            
            const given = [cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id];

            if (given.every(element => element === 0)){
                return 0;
            }else{
                return data.num_pags;
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


/*const hideLiElements = (num_pags) => {
    // Get the parent element (ul) by its id
    const myList = document.getElementById("ul-parent");

    // Iterate through each li element
    const liElements = myList.getElementsByTagName("li");
    for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];

        // Get the id attribute value and convert it to a number
        const id = li.id;
        id = id.slice(6);
        id = parseInt(id);
        console.log(id);
        // Check if the id is greater than num_pags
        if (id > num_pags) {
            // Hide the li element
            li.style.display = "none";
        } else {
            // Show the li element (in case it was previously hidden)
            li.style.display = "list-item";
        }
    }
};*/


const mostrarTabla = async (cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id,pag) => {
    try{
        const response=await fetch("./avaluos/"+ cliente_id + '/' + tipo_id + '/' + valuador_id + '/' + estatus_id + '/' + estado_id + '/' + municipio_id + '/' + colonia_id);
        const data =await response.json();
        console.log(data)

        if(data.message=="Success"){
            let opciones=`<thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Ubicación</th>
                                    <th>Fechas</th>
                                    <th>Cliente</th>
                                    <th>Valuador</th>
                                    <th>Estatus</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>`;
            const range = data.avaluos.slice((pag - 1) * 40, pag * 40);
            range.forEach((avaluo)=>{
                opciones+=`<tr value="${avaluo.id}">`;
                opciones+=`<td>${avaluo.id}</td>`;//<input type="checkbox" id="${avaluo.avaluoid}"></input>
                opciones+=`<td>${avaluo.ubicacion}</td>`;
                opciones+=`<td>Fecha de solicitud : ${avaluo.dtsolicitud} <br> Fecha de valuador : ${avaluo.dtvaluador}</td>`;
                opciones+=`<td>${avaluo.cliente}</td>`;
                opciones+=`<td>${avaluo.valuador}</td>`;
                opciones+=`<td>${avaluo.estatus}</td>`;
                opciones+=`<td><a class="nav-link" href="/servicios/avaluo/${avaluo.id}">Detalle</a></td>`;
                opciones+=`</tr></tbody>`;
            });
            const given = [cliente_id, tipo_id, valuador_id, estatus_id, estado_id, municipio_id, colonia_id];
            
            

            if (given.every(element => element === 0)){
                
                $('.PagGeneral').hide();
                //$('#cboTabla').hide();
                console.log(given);
                let alternativa = ``;
                cboTabla.innerHTML = alternativa;
            }else{
            console.log(data.num_pags);
            
            $('.PagGeneral').show();
            //$('#cboTabla').show();
            cboTabla.innerHTML = opciones;
            console.log(pag);
            console.log(data.num_pags);
            let limit = data.num_pags;
            if(pag === 1){
                $('#Primera').removeClass().addClass('page-link disabled');
                $('#Anterior').removeClass().addClass('page-link disabled');
            }else if (pag === limit){
                $('#Ultima, #Siguiente').removeClass().addClass('page-link disabled');
                $('#Primera, #Anterior').removeClass().addClass('page-link');

            }else {
                $('#Primera, #Anterior').removeClass().addClass('page-link');
                $('#Ultima, #Siguiente').removeClass().addClass('page-link');
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
            let alternativa=``;
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



const mostrarTabla_Inicial = async (pag) => {
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
        console.log(data);
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
let parametros = {"cliente_id":0, "tipo_id":0, "valuador_id":0, "estatus_id":0, "estado_id":0,"municipio_id":0,"colonia_id":0};
let parametros_fechas  = {"dtsolicitud_inicial":'0000-00-00', "dtsolicitud_final":'0000-00-00', "dtcliente_inicial":'0000-00-00', "dtcliente_final":'0000-00-00', "dtvaluador_inicial":'0000-00-00', "dtvaluador_final":'0000-00-00', "dtcobro_inicial":'0000-00-00', "dtcobro_final":'0000-00-00'};

let pag = 1;

const cargaInicial=async()=>{
    await listarClientes();
    await listarTipos();
    await listarValuadores();
    await listarEstatus();
    await listarEstados();

    cboCliente.addEventListener("change",(event)=>{
        parametros.cliente_id = event.target.value
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
    });

    cboTipo.addEventListener("change",(event)=>{
        parametros.tipo_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
    });

    cboValuador.addEventListener("change",(event)=>{
        parametros.valuador_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
    });

    cboEstatus.addEventListener("change",(event)=>{
        parametros.estatus_id = event.target.value;
        
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
    });

    cboEstado.addEventListener("change",(event)=>{
        console.log(event.target.value);
        parametros.estado_id = parseInt(event.target.value);
        let num_pags = cantidadPaginas(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
        console.log(num_pags);
        hideLiElements(num_pags);
        listarMunicipios(event.target.value);
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);

    });

    cboMunicipio.addEventListener("change",(event)=>{
        parametros.municipio_id = event.target.value;
        listarColonias(event.target.value);
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);

    });

    cboColonia.addEventListener("change",(event)=>{
        parametros.colonia_id = event.target.value;
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
    });



    

    document.getElementById('generar_fichas').addEventListener('click', function() {
        // Construct the URL based on parameters
        var url = parametros.cliente_id + '/' + parametros.tipo_id + '/' + parametros.valuador_id + '/' + parametros.estatus_id + '/' ;
        url += parametros.estado_id + '/' + parametros.municipio_id + '/' +  parametros.colonia_id;
        var redirectUrl = 'http://127.0.0.1:8000/servicios/avaluos/generar_pdf/' + url;

        // Redirect to the constructed URL
        console.log(redirectUrl);
        window.location.href = redirectUrl;
    });

};




window.addEventListener("load", async () => {
    await cargaInicial();
});



$(document).ready(function() {
        // Attach click event listener to links
    $('.page-link').on('click', function(e) {
        e.preventDefault(); // Prevent the default behavior of the link

        // Get the id of the clicked link
        var clickedLinkId = $(this).attr('id');
        
        // Find the next element with the same class
        var nextElementId = $(this).parent().next('.page-item').find('.page-link').attr('id');

        // Output the results to the console (you can modify this part based on your needs)
        pag = clickedLinkId;
        
        pag = pag.slice(7);
        pag = parseInt(pag);
        
        console.log('Clicked Link ID:', pag);

        console.log('Next Element ID:', nextElementId);
        
        mostrarTabla(parametros.cliente_id,parametros.tipo_id,parametros.valuador_id,parametros.estatus_id,parametros.estado_id,parametros.municipio_id,parametros.colonia_id,pag);
        
    });
});

