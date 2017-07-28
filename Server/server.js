var http = require('http');
var fs = require('fs');

// Declarar un array de objetos
	var categorias = [   {  nombre: "Bebidas",
        subcategorias: [ "Sin alcohol", "Cocteles", "Jugos" ] },
    {  nombre: "Comidas",
        subcategorias: [ "Carne", "Pollo", "De mar" ] },
    { "nombre": "Entradas",
        subcategorias: [  "Ensaladas", "Tapas" ]
    },
    { nombre: "Postres", subcategorias: [  "Nacional", "Extranjero" ]},
	{ nombre: "Dieteticos", subcategorias: [ "postres lulo", "Agua" ]},
	{ nombre: "Tipicos", subcategorias: [ "Empanadas", "Buñuelos","Morcilla" ]}
      ];
	
	var productos;
	
	try{
		var archivo =fs.readFileSync('producto.json','utf8');
		productos = JSON.parse( archivo );
	}
	catch(error){
		console.log( error );
		productos = [];
	}
	
// Crea el servidor Web, que será atendido por la funcion serverCallback
var server = http.createServer( serverCallback );

function GurardarProducto(req, res){
		 function Recibir( data ){
			 console.log("Estoy esjecutando el envento");
			 console.log( data.toString() );
			 
			 var p = JSON.parse( data.toString() );
			 console.log( p );
			 productos.push( p );
			 console.log( productos  );
			 res.end("Ya recibi el producto");
			 fs.writeFile('producto.json',JSON.stringify( productos, null, '\t' ), null);
	 
		 }
		 
		 console.log("Voy a programar el evento");
		 req.on("data",Recibir);
		 console.log("Ya lo programe");

	}

// funcion que atiende las peticiones
function serverCallback(req, res){
		

	//mostrar en la pantalla
	console.log("Peticion recibida" + req.url);
	//res.end(" <html><body><h1>Hola mundo del navegador </h1></body></html>");

	if(req.url == "/"){
		fs.readFile("ingreso.html" , returnFile);
	}else if (req.url == '/categorias'){
		var s ="";
		s= JSON.stringify( categorias );
		console.log( s );
		res.end( s );
	}else if(req.url == "/productos") {
		res.end(JSON.stringify(productos));
	
	}else if(req.url.substring( 0,9 ) == "/producto" ){
			console.log('Entrando a producto');
			if(req.method == 'POST'){
				GurardarProducto(req, res);
			}else {
				var codigo = req.url.substring( 10 );
				console.log("Me estan pidiendo el producto" + codigo );
			}
				
	}else{
		fs.readFile( "./proyect" + req.url , returnFile);
	}	
	function returnFile(error,data){
		if (error !=null) {
		console.log("function returnFile:"+error);
		res.writeHead(404,{});
		res.end(error.toString());
		return;
	}
	res.end(data);
	}
}	
	 




console.log( "Servidor HTTP corriendo. Ctrl-c para terminar")
// Ejecuta el servidor
server.listen(process.argv[2] || 8080 );