import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {

                const errorData = await response.json();
                return rejectWithValue(errorData || "Error al cargar productos.");
            }
            const products = await response.json();
            return products;
        } catch (error) {

            return rejectWithValue(error.message || "Error de conexión al cargar productos.");
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (newProductData, { rejectWithValue }) => {
        try {
            const response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProductData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData || "Error al crear el producto en la API.");
            }

            const addedProduct = await response.json();
            return {
                ...addedProduct,
                id: newProductData.id,
            };
        } catch (error) {
            return rejectWithValue(error.message || "Error de conexión con la API.");
        }
    }
);
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData || "Error al actualizar el producto en la API.");
            }
            await response.json();
            return productData;
        } catch (error) {
            return rejectWithValue(error.message || "Error de conexión con la API.");
        }
    }
);


const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        add(state, action) {
            state.entities.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.entities = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (!action.payload.rating) {
                    action.payload.rating = {
                        rate: action.meta.arg.rating?.rate || 0,
                        count: action.meta.arg.rating?.count || 0,
                    };
                }
                state.entities.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';

                const index = state.entities.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.entities[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { add } = productsSlice.actions;
export default productsSlice.reducer;