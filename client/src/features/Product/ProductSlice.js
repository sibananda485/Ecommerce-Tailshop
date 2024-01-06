import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductByFilter,
  fetchBrands,
  fetchCategories,
  addProduct,
  fetchProductById,
  updateProduct,
} from "./ProductAPI";

// State

const initialState = {
  selectProduct: null,
  products: [],
  categories: [],
  brands: [],
  status: "loading",
  totalResult: 0,
};

// Api Calling

export const fetchAllProductsAsync = createAsyncThunk(
  "productlist/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "productlist/frtchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const addProductAsync = createAsyncThunk(
  "productlist/addProduct",
  async (data) => {
    const response = await addProduct(data);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  "productlist/updateProduct",
  async (data) => {
    const response = await updateProduct(data);
    return response;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "productlist/fetchBrandsAsync",
  async () => {
    const response = await fetchBrands();
    return response;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "productlist/createAsyncThunk",
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

export const fetchProductByFilterAsync = createAsyncThunk(
  "productlist/fetchProductByFilter",
  async (query) => {
    const response = await fetchProductByFilter(query);
    return response;
  }
);

// Slice Methode

export const productSlice = createSlice({
  name: "producylist",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalResult = action.payload.total;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectProduct = action.payload;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (value) => value.id === action.payload.id
        );
        state.products.splice(index, 1, action.payload);
      });
  },
});

// export const { increment } = productSlice.actions;

export const getProducts = (state) => state.products.products;
export const getCategories = (state) => state.products.categories;
export const getBrands = (state) => state.products.brands;
export const getTotalResult = (state) => state.products.totalResult;
export const getSelectProduct = (state) => state.products.selectProduct;
export const getProductStatus = (state) => state.products.status;

// Exporting Reducer

export default productSlice.reducer;
