import api from '../api/products.js';

////////////////////////////////////////////////////////////////////////////////
//                                 GET Controller                             //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res,) => {
    res.json(await api.getProducts());
};

const getProduct = async (req, res) => {
    const id = req.params.id;
    res.json(await api.getProduct(id));
};

///////////////////////////////////////////////////////////////////////////////
//                                POST Controller                            //
///////////////////////////////////////////////////////////////////////////////
const postProduct = async (req, res) => {
    try {
        const { mainPhoto, ...productData } = req.body; // Extraemos mainPhoto del cuerpo de la solicitud

        // Guardamos la URL de la imagen en tu base de datos
        const product = {
            ...productData,
            mainPhoto, // Asignamos la URL de la imagen
        };

        const createdProduct = await api.createProduct(product);
        res.json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                 PUT Controller                            //
///////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const updatedProduct = await api.updateProduct(id, product);
    res.json(updatedProduct);
};

///////////////////////////////////////////////////////////////////////////////
//                               DELETE Controller                           //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await api.deleteProduct(id);
    res.json(deletedProduct);
};


export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
};