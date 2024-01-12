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
            let opciones=` <select name="" id="cboEstado"><option value="indef">Indefinido</option>`;
            data.estados.forEach((estado)=>{
                opciones+=`<option value='${estado.estado_id}'>${estado.nombre}</option>`;
            });
            opciones += `</select>`;
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
            opciones += `<select name="tipo" required id="id_tipo">`
            data.tipos.forEach((tipo)=>{
                opciones+=`<option value='${tipo.tipoid}'>${tipo.display}</option>`;
            });
            opciones+=`</select>`
            tipo_td.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};

const mostrarDictamen = async () =>{
    try{
      
            let opciones = ``;
            opciones+=`<input type="text" name="dictamen" maxlength="100" id="id_dictamen">`;
            
            dictamen_td.innerHTML = opciones;
            
       
    }catch(error){
        console.log(error);
    }   
};

const mostrarProyecto = async (tipoid) =>{
    try{
            let opciones = ``;
            opciones+=`<input type="text" name="proyecto" maxlength="200" id="id_proyecto">`;
            proyecto_td.innerHTML = opciones;
            
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
            console.log(data)
            let opciones=``;
            opciones += `<select name="valuador" required id="id_valuador">`
            data.valuadores.forEach((valuador)=>{
                opciones+=`<option value='${valuador.valuadorid}'>${valuador.display}</option>`;
            });
            opciones+=`</select>`
            valuador_td.innerHTML = opciones;
        }else{
            alert("Valuadores no encontradas");
        }
    }catch(error){
        console.log(error);
    }   
};


const campoM2c = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="m2c" id="id_m2c">`;
            opciones+=`</input>`;
            m2c_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};

const campoM2t = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="m2t" id="id_m2t">`;
            opciones+=`</input>`;
            m2t_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};



const campoValorImb = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="valor" id="id_valor">`;
            opciones+=`</input>`;
            valor_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};


const campoNumExt = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="number" name="numero" step="any" id="id_numero">`;
            opciones+=`</input>`;
            numero_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};

const campoNumInt = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="number" name="numeroint" step="any" id="id_numeroint">`;
            opciones+=`</input>`;
            numeroint_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};


const campoManzana = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="manzana" maxlength="50" id="id_manzana">`;
            opciones+=`</input>`;
            manzana_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};

const campoLote = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="lote" maxlength="50" id="id_lote">`;
            opciones+=`</input>`;
            lote_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};


const campoNoFactura = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="nofactura" maxlength="50" id="id_nofactura">`;
            opciones+=`</input>`;
            nofactura_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};

const campoCalle = async () =>{
    try{
        
            let opciones=``;
            opciones += `<input type="text" name="calle" maxlength="100" id="id_calle">`;
            opciones+=`</input>`;
            calle_td.innerHTML = opciones;
        
    }catch(error){
        console.log(error);
    }   
};


const campoUbicacion = async () =>{
    try{
        
        let opciones_estado=` <select name="" id="cboEstado"><option value="indef">Indefinido</option>`;
            estado_td.innerHTML = opciones_estado;
            
        let opciones_municipio=`<select name="" id="cboMunicipio"><option value="indef">Indefinido</option></select>`;
            municipio_td.innerHTML = opciones_municipio;
        let opciones_colonia=`<select name="colonia" required id="id_colonia"><option value="indef">Indefinido</option></select>`;
            colonia_td.innerHTML = opciones_colonia;
            listarEstados();


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
            opciones += `<select name="tipoimb" required id="id_tipoimb">`
            data.tiposimb.forEach((tipoimb)=>{
                opciones+=`<option value='${tipoimb.tipoimbid}'>${tipoimb.nombre}</option>`;
            });
            opciones+=`</select>`
            tipoimb_td.innerHTML = opciones;
        }else{
            alert("Tipos no encontradas");
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

    cboMunicipio.addEventListener("change",(event)=>{
        listarColonias(event.target.value);

    });

};


window.addEventListener("load", async () => {
    await cargaInicial();
    
});


$(document).ready(function() {
    $('#tipo_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
    
        listarTipos();
    });
    $('#dictamen_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
    
        mostrarDictamen();
    });
    $('#proyecto_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
    
        mostrarProyecto();
    });
    $('#valuador_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        listarValuadores();
    });
    $('#m2c_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoM2c();
    });
    $('#m2t_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoM2t();
    });

    $('#nofactura_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoNoFactura();
    });
    $('#tipoimb_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        listarTiposImb();
    });

    $('#valor_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoValorImb();
    });
    $('#calle_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoCalle();
    });
    $('#numero_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoNumExt();
    });
    $('#numeroint_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoNumInt();
    });
    $('#manzana_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoManzana();
    });
    $('#lote_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoLote();
    });

    $('#colonia_href').on('click',function(e) {
        // Prevent the default behavior of the link
        
        e.preventDefault();
        
        campoUbicacion();
        
        cboEstado.addEventListener("change",(event)=>{
            listarMunicipios(event.target.value);
    
        });
    
        cboMunicipio.addEventListener("change",(event)=>{
            listarColonias(event.target.value);
    
        });
    });

})