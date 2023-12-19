///clase base para CRUD de entidades y otras funciones basicas.
class Manager {
  constructor(model) {
    this.model = model;
  }

  async create(object) {
    try {
      const createdObject = await this.model.create(object);

      return createdObject;
    } catch (error) {
      throw error;
    }
  }

  async getAll(filter) {
    try {
      const foundObjects = await this.model.find(filter);

      return foundObjects;
    } catch (error) {
      throw error;
    }
  }

  //TODO: Agregar metodo para encontrar index de un elemento
  // getIndex(productId) {
  //   try {
  //     const productIndex = this.products.findIndex(
  //       (product) => +productId === product.id
  //     );
  //     if (productIndex == -1) {
  //       return {
  //         result: false,
  //         msg: `El producto con el id ${productId} no existe en la lista.`,
  //         value: undefined,
  //       };
  //     }
  //     return {
  //       result: true,
  //       msg: `El producto con el id ${productId} existe en la lista`,
  //       value: productIndex,
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async getById(id) {
    try {
      const foundObject = await this.model.findById(id);
      if (!foundObject) {
        return {
          result: false,
          msg: `El elemento con el id ${id} no existe.`,
          value: undefined,
        };
      }
      return {
        result: true,
        msg: `El elemento con el id ${id} existe en la lista`,
        value: foundObject,
      };
    } catch (error) {
      throw error;
    }
  }

  async getByFilter(filter) {
    try {
      const foundObject = await this.model.findOne(filter);

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, object) {
    try {
      const updatedObject = await this.model.findByIdAndUpdate(id, object);

      return updatedObject;
    } catch (error) {
      throw error;
    }
  }

  async updateByFilter(filter, object) {
    try {
      const updatedObject = await this.model.findOneAndUpdate(filter, object);

      return updatedObject;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const deletedObject = await this.model.findByIdAndDelete(id);

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }
}

export default Manager;
