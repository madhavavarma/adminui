import axios from "axios";
import { ITag } from "../models/ITag";
import { IVariant } from "../models/IVariant";
import { IOrder } from "../models/IOrder";
import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";

// Base URL for the API
const API_URL = 'https://localhost:7172'; // Adjust URL if needed

// Axios instance for making API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const isMock = true;

export const getProducts = async () => {

  if(!isMock) {
      return (await axios.get<ICategory[]>('/adminui/json/products.json')).data;
  }
  
  try {
    const response = await api.get(`/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching variants:', error);
    throw error;
  }

}

export const getProduct = async (id: number) => {

  if(!isMock) {
      return (await axios.get<ICategory>('/adminui/json/product.json')).data;
  }
  
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  } 

}

export const createProduct = async (product: IProduct) => {
try {
  const response = await api.post(`/api/products`, product);
  return response.data;
} catch (error) {
  console.error('Error creating products:', error);
  throw error;
}
};

export const updateProduct = async (id: number, categoryData: ICategory) => {
try {
  const response = await api.put(`/api/products/${id}`, categoryData);
  return response.data;
} catch (error) {
  console.error(`Error updating products with ID ${id}:`, error);
  throw error;
}
};

export const deleteProduct = async (id: number) => {
try {
  await api.delete(`/api/products/${id}`);
  return id;
} catch (error) {
  console.error(`Error deleting products with ID ${id}:`, error);
  throw error;
}
};

export const getCategories = async () => {

    if(!isMock) {
        return (await axios.get<ICategory[]>('/adminui/json/categories.json')).data;
    }
    
    try {
      const response = await api.get(`/api/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }

}

export const getCategory = async (id: number) => {

    if(!isMock) {
        return (await axios.get<ICategory>('/adminui/json/category.json')).data;
    }
    
    try {
      const response = await api.get(`/api/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    } 

}

export const createCategory = async (categoryData: ICategory) => {
  try {
    const response = await api.post(`/api/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating categories:', error);
    throw error;
  }
};

export const updateCategory = async (id: number, categoryData: ICategory) => {
  try {
    const response = await api.put(`/api/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating categories with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await api.delete(`/api/categories/${id}`);
    return id;
  } catch (error) {
    console.error(`Error deleting categories with ID ${id}:`, error);
    throw error;
  }
};



export const getVariants = async () => {

    if(!isMock) {
        return (await axios.get<IVariant[]>('/adminui/json/variants.json')).data;
    }

    try {
      const response = await api.get(`/api/variant`);
      return response.data;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  };
  
  export const getVariant = async (id: number) => {

    if(!isMock) {
        return (await axios.get<IVariant>('/adminui/json/variant.json')).data;
    }

    try {
      const response = await api.get(`/api/variant/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching variant with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const createVariant = async (variantData: IVariant) => {
    try {
      const response = await api.post(`/api/variant`, variantData);
      return response.data;
    } catch (error) {
      console.error('Error creating variant:', error);
      throw error;
    }
  };
  
  export const updateVariant = async (id: number, variantData: IVariant) => {
    try {
      const response = await api.put(`/api/variant/${id}`, variantData);
      return response.data;
    } catch (error) {
      console.error(`Error updating variant with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteVariant = async (id: number) => {
    try {
      await api.delete(`/api/variant/${id}`);
      return id;
    } catch (error) {
      console.error(`Error deleting variant with ID ${id}:`, error);
      throw error;
    }
  };

export const getTags = async () => {

    if(!isMock) {
        return (await axios.get<ITag[]>('/adminui/json/tags.json')).data;
    }
    else {
        return (await api.get<ITag[]>('/api/tags')).data;
    }   
}

export const createTag = async (tag: ITag) => {
    try {
      const response = await api.post('/api/tags', tag);
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }

  export const updateTag = async (tag: ITag) => {
    try {
      const response = await api.put(`/api/tags/${tag.id}`, tag);
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }

  export const deleteTag = async (id: number) => {
    try {
      const response = await api.delete(`/api/tags/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }

export const getOrders = async () => {

    if(isMock) {
        return (await axios.get<IOrder[]>('/adminui/json/orders.json')).data;
    }
    else {
        return (await axios.get<IOrder[]>('/adminui/orders.json')).data;
    }   

}

export const getOrder = async (id: number) => {

    if(isMock) {
        return (await axios.get<IOrder>('/adminui/json/order.json')).data;
    }
    else {
        return (await axios.get<IOrder>('/adminui/order.json' + id)).data;
    }   

}