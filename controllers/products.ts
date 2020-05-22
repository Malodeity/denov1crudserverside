import {v4} from  'https://deno.land/std/uuid/mod.ts'; //I,porting the uuid to generate an id

import {Product} from  '../types.ts';

let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        decription: "THis is One",
        price : 34.54,

    },
    {
        id: "2",
        name: "Product One",
        decription: "THis is One",
        price : 34.54,

    },
    {
        id: "3",
        name: "Product One",
        decription: "THis is One",
        price : 34.54,

    },
    {
        id: "4",
        name: "Product One",
        decription: "THis is One",
        price : 34.54,

    },
    {
        id: "5",
        name: "Product One",
        decription: "THis is One",
        price : 34.54,

    }
];


//@desc      Get All Products
//@route     Get /api/v1/products

const getProducts = ({response}: {response:any}) => {

    response.body = {

        success: true,
        data : products

    }

}

//@desc      Get Single Product
//@route     Get /api/v1/products/:id

const getProduct = ({params, response}: {params:{id : string },response:any}) => {

   const product: Product | undefined = products.find(p => p.id === params.id)
   if(product){
    response.status = 200
    response.body = {
        success: true,
        data: product
    }
   }else{

    response.status = 404
    response.body = {
        success: false,
        msg: 'No Data Found'

   }
}
}
//@desc      Add Single Product
//@route     Post /api/v1/products/:id

const addProduct = async ({request, response}: {request:any, response:any}) => {

    const body = await request.body()

    if(!request.hasBody){
        response.status = 400
        response.body = {
            success: false,
            msg: 'No Data Found'
    
       }
    }else{

        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
    
       }

        
    }
}

//@desc      Update Product
//@route     Put /api/v1/products/:id

const updateProduct = async({params, request, response}: {params:{id: string },request:any,response:any}) => {

    const product: Product | undefined = products.find(p => p.id === params.id)
   if(product){
     const body = await request.body()

     const updateData: {name?: string; decription?: string; price?: number} = body.value
     products = products.map(p => p.id === params.id ? {...p, ...updateData} :p)
       
     response.status = 200
     response.body = {
         success: false,
         data: products
 
    }

    }else{

    response.status = 404
    response.body = {
        success: false,
        msg: 'No Data Found'

   }
}
}


//@desc      Delete Product
//@route     Delete /api/v1/products/:id

const deleteProduct = ({params,response}: {params:{id: string },response:any}) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'product has been deleted'

   }

}


export {getProducts, getProduct,addProduct,updateProduct,deleteProduct}